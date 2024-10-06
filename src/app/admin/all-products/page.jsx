"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import Swal from "sweetalert2";
// import { deleteProduct } from "../../../Apis/products";
// import useRandomProducts from "../../../Hooks/useRandomProducts";
import { useAuthContext } from "@/Context/ProjectProvider";
import CustomLoading from "@/Shared/CustomLoading";
import CustomToaster from "@/Shared/CustomToaster";
import { Pagination } from "@/Shared/Pagination";
import SplitDescription from "@/Shared/SplitDescription";
import Table from "@/Shared/Table";
import { getFullImageLink } from "@/Utils/getFullImageLink";
import { useRouter } from "next/navigation";
import Heading from "@/Shared/Heading";
import TableComponentHeading from "@/Shared/TableComponentHeading";
import Button from "@/Shared/Button";

const page = () => {
  const navigate = useRouter();
  const { unauthorizedLogout, popupOption, setPopupOption } = useAuthContext();

  // ALL SELECTED IDs
  const [selectedIds, setSelectedIds] = useState([]);

  // FILTERS
  const [filters, setFilters] = useState({
    perPage: 20,
    page: 1,
  });

  const { data, isPending, refetch, isRefetching } = useAuthContext(filters);

  // HANDLE PER PAGE
  const setPerPage = (count) => {
    setFilters({ ...filters, perPage: count, page: 1 });
  };

  // HANDLE DELETE PRODUCT
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const handleDeleteProduct = (id) => {
    setIsDeleteLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "bg-primary",
        cancelButton: "bg-error",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
          .then((res) => {
            if (res?.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Product has been deleted.",
                icon: "success",
              });
              refetch();
              setIsDeleteLoading(false);
            }
          })
          .catch((err) => {
            setIsDeleteLoading(false);
            if (err?.response?.status === 401) {
              unauthorizedLogout();
            } else if (err?.response?.status === 403) {
              toast.custom((t) => (
                <CustomToaster
                  t={t}
                  type={"error"}
                  text={`Your access is forbidden to perform this action`}
                />
              ));
            }
          });
      }
    });
  };

  // HANDLE VIEW
  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  // HANDLE EDIT
  const handleEdit = (id) => {
    setPopupOption({
      ...popupOption,
      open: true,
      type: "addProduct",
      title: "Edit Product",
      refetch: refetch,
      id: id,
    });
  };

  // ALL ACTION BUTTONS
  const [actions, setActions] = useState([
    {
      name: "view",
      handler: handleView,
      Icon: AiFillEye,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      disabledOn: [],
    },
    {
      name: "edit",
      handler: handleEdit,
      Icon: RiEdit2Fill,
      colorClass: "text-secondary",
      backgroundColorClass: "bg-secondary-content",
      disabledOn: [],
    },
    {
      name: "delete",
      handler: handleDeleteProduct,
      Icon: MdDelete,
      colorClass: "text-red-600",
      backgroundColorClass: "bg-red-200",
      isLoading: isDeleteLoading,
      disabledOn: [],
    },
  ]);

  // ALL DISPLAYED COLUMNS IN TABLE
  const [cols, setCols] = useState([
    {
      name: "#",
      attribute_name: "count",
      minWidth: 5,
      show: true,
      isMainField: true,
    },
    {
      name: "Name",
      attribute_name: "name",
      minWidth: 20,
      show: true,
      isMainField: true,
    },
    {
      name: "Image",
      attribute_name: "image",
      minWidth: 20,
      show: true,
      isMainField: true,
    },
    {
      name: "Price",
      attribute_name: "price",
      minWidth: 20,
      show: true,
      isMainField: true,
    },
    {
      name: "Description",
      attribute_name: "description",
      minWidth: 30,
      show: true,
    },
    {
      name: "Category",
      attribute_name: "category",
      minWidth: 30,
      show: true,
    },
    {
      name: "Speciality",
      attribute_name: "speciality",
      minWidth: 30,
      show: true,
    },
  ]);

  if (isPending) {
    return <CustomLoading />;
  }
  return (
    <div
      className={`max-w-screen-xl mx-auto px-3 flex flex-col gap-10 pt-36 mb-20`}
    >
      <TableComponentHeading
        routes={
          <div className={`text-[14px]`}>
            <span className={`text-primary`}>Home</span> //{" "}
            <span>All Products</span>
          </div>
        }
        heading={"Products"}
      />
      {/* HEADING AREA */}
      <div className={`flex justify-between items-center`}>
        <div>
          {/* <Heading text={"All Products"} /> */}
          <p className={`text-[14px]`}>
            Total {data?.total} {data?.total > 1 ? "Products" : "Product"} Found
          </p>
        </div>
        <Button text={"Add"} />
        {/* <button
          onClick={() =>
            setPopupOption({
              ...popupOption,
              open: true,
              type: "addProduct",
              title: "Add New Product",
              refetch: refetch,
            })
          }
          className={``}
        >
          Add
        </button> */}
      </div>
      {/* TABLE AREA */}
      <div className={`space-y-10`}>
        <Table
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          itemsPerPage={filters?.perPage}
          totalItems={data?.total}
          setPageNo={(data) => setFilters({ ...filters, page: data })}
          setPerPage={setPerPage}
          perPage={filters?.perPage}
          isLoading={isPending || isRefetching}
          rows={data?.result?.map((d, i) => ({
            ...d,
            id: d?._id,
            count: (filters?.page - 1) * filters?.perPage + i + 1,
            name: d?.name,
            description: <SplitDescription text={d?.description} length={30} />,
            image: (
              <img
                src={getFullImageLink(d?.images ? d?.images[0] : "", "product")}
                alt={d?.name}
                className={`w-16 h-16 object-cover`}
              />
            ),
            price: d?.price,
            category: (
              <div className={`flex gap-1 capitalize`}>
                {d?.category?.split("_")?.map((c) => (
                  <span>{c}</span>
                ))}
              </div>
            ),
            speciality: (
              <div className={`flex gap-1 capitalize`}>
                {d?.speciality?.split("_")?.map((c) => (
                  <span>{c}</span>
                ))}
              </div>
            ),
          }))}
          actions={actions}
          cols={cols}
        />
        {/* PAGINATION */}
        <Pagination
          setFilters={setFilters}
          filters={filters}
          total={data?.total}
        />
      </div>
    </div>
  );
};

export default page;
