"use client";
import { useAuthContext } from "@/Context/ProjectProvider";
import CustomLoading from "@/Shared/CustomLoading";
import CustomToaster from "@/Shared/CustomToaster";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import {
//   getProductsById,
//   postProduct,
//   updateProduct,
//   uploadProductPic,
// } from "../../../Apis/products";
import CustomField from "@/Shared/Fields/CustomField";
import CustomFileUploader from "@/Shared/Fields/CustomFileUploader";
import CustomMultiSelect from "@/Shared/Fields/CustomMultiSelect";
import CustomNumberField from "@/Shared/Fields/CustomNumberField";
import CustomTextareaField from "@/Shared/Fields/CustomTextAreaField";
import { uploadProductPic } from "@/apis/products";

const CreateAndUpdateProduct = ({ handleClosePopup, popupOption }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    inStock: "",
    category: "",
    description: "",
    images: [],
  });
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [localImage, setLocalImage] = useState([]);
  console.log({ formData, localImage, filesToUpload });
  const { unauthorizedLogout } = useAuthContext();
  const { data: categories, isPending } = useAuthContext();
  const options = [
    {
      id: 1,
      name: "Chocolate",
      label: "chocolate",
    },
    {
      id: 2,
      name: "Milk",
      label: "milk",
    },
    {
      id: 3,
      name: "Honey",
      label: "honey",
    },
  ];

  const [isProductLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    if (popupOption?.id) {
      setIsProductLoading(true);
      getProductsById(popupOption?.id)
        .then((res) => {
          setFormData({
            name: res?.name,
            price: res?.price,
            category: res?.category,
            features: res?.features,
            specifications: res?.specifications,
            speciality: res?.speciality,
            description: res?.description,
            images: res?.images,
          });
          setIsProductLoading(false);
        })
        .catch((err) => {
          setIsProductLoading(false);
        });
    }
  }, [popupOption?.id]);

  // VALIDATION
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};

    // VALIDATE NAME
    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }
    // VALIDATE PRICE
    if (!formData.price) {
      newErrors.price = "Price is required";
    }
    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    }
    // VALIDATE STOCK
    if (!formData.inStock) {
      newErrors.inStock = "Stock is required";
    }
    if (formData.inStock < 0) {
      newErrors.inStock = "Stock cannot be negative";
    }

    //   VALIDATE CATEGORY
    if (!formData.category || formData.category.trim() === "") {
      newErrors.category = "Category is required";
    }

    // VALIDATE IMAGES
    if (localImage.length <= 0) {
      newErrors.image = "At least one image is required";
    }

    setErrors(newErrors);
    console.log({ newErrors });
    // ValidationErrorHandler(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.custom((t) => (
        <CustomToaster
          t={t}
          type={"error"}
          errors={{
            validationErrors: Object.entries(newErrors).map((error, i) => {
              if (Array.isArray(error[1])) {
                return Object.entries(error[1][0])
                  ?.filter((error2, j) => error2[0] !== "id")
                  ?.map((error2, j) => error2[1])
                  ?.join(" & ");
              } else {
                return error[1];
              }
            }),
          }}
          text={`You are submitting invalid data`}
        />
      ));
    }

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };
  // CHANGE FORM DATA
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleFormArrayChange = (e) => {
  //   const { name, value } = e.target;
  //   const formName = name?.split("_")[0];
  //   const formIndex = parseInt(name?.split("_")[1], 10);

  //   const updatedArray = [...formData[formName]];
  //   updatedArray[formIndex] = value;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [formName]: updatedArray,
  //   }));
  // };

  const [filesUploading, setFilesUploading] = useState(false);
  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);

    setLocalImage((prev) => [
      ...prev,
      ...fileArray.map((file) => ({
        localImg: URL.createObjectURL(file),
      })),
    ]);
    setFilesToUpload([...filesToUpload, ...fileArray]);
  };

  const fileUploadToServer = async (files) => {
    console.log({ files });
    const validFiles = [];

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        // File size exceeds 5MB, show error message
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"error"}
            text={`File "${file.name}" exceeds the limit of 5MB`}
          />
        ));
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length > 0) {
      setFilesUploading(true);
      try {
        const res = await uploadProductPic(validFiles); // Await the result here
        if (res?.length > 0) {
          setFilesToUpload([]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev?.images, ...res],
          }));
          setFilesUploading(false);
          return res; // Return the response here
        }
      } catch (error) {
        setFilesUploading(false);
        throw error; // Optional: propagate error if needed
      }
    }
  };

  //   SUBMIT DATA
  const handleSubmit = async () => {
    // Validate form
    if (validateForm()) {
      if (popupOption?.id) {
        updateFunction(formData);
      } else {
        const res = await fileUploadToServer(filesToUpload);
        console.log({ res });
        if (res?.length > 0) {
          createFunction(formData);
        }
      }
    }
  };

  const [isProductCreating, setIsProductCreating] = useState(false);
  const createFunction = (formData) => {
    setIsProductCreating(true);
    postProduct(formData)
      .then((res) => {
        if (res?.insertedId) {
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"success"}
              text={`Product added successfully`}
            />
          ));

          setFormData({
            name: "",
            price: "",
            category: "",
            features: [""],
            specifications: [""],
            speciality: "",
            description: "",
            images: [],
          });
          handleClosePopup();
          popupOption.refetch();
          setIsProductCreating(false);
        }
      })
      .catch((err) => {
        setIsProductCreating(false);
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
  };

  const updateFunction = () => {
    setIsProductCreating(true);
    updateProduct(formData, popupOption?.id)
      .then((res) => {
        popupOption?.refetch();
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"success"}
            text={`Product updated successfully`}
          />
        ));
        handleClosePopup();
        setIsProductCreating(false);
      })
      .catch((err) => {
        setIsProductCreating(false);
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
  };

  if (isProductCreating || isProductLoading) {
    return <CustomLoading />;
  }
  return (
    <div className={` pb-12 h-full flex flex-col justify-between`}>
      <div>
        {/* NAME */}
        <CustomField
          defaultValue={formData?.name}
          disable={false}
          fieldClassName={"w-full"}
          error={errors?.name}
          id={"name"}
          label={"Name"}
          name={"name"}
          onChange={handleFormChange}
          placeholder={"Name"}
          type={"text"}
          wrapperClassName={"w-full"}
          required={true}
        />
        {/* PRICE */}
        <CustomNumberField
          defaultValue={formData?.price}
          disable={false}
          fieldClassName={"w-full"}
          error={errors?.price}
          id={"price"}
          label={"Price"}
          name={"price"}
          onChange={handleFormChange}
          placeholder={"Price"}
          wrapperClassName={"w-full"}
          required={true}
        />

        {/* STOCK */}
        <CustomNumberField
          defaultValue={formData?.inStock}
          disable={false}
          fieldClassName={"w-full"}
          error={errors?.inStock}
          id={"inStock"}
          label={"Stock"}
          name={"inStock"}
          onChange={handleFormChange}
          placeholder={"Stock"}
          wrapperClassName={"w-full"}
          required={true}
        />

        {/* CATEGORY */}
        <CustomMultiSelect
          disable={false}
          label={"Category"}
          loading={isPending}
          placeholder="Select Category"
          selectedValues={options?.filter(
            (m) => m?.label === formData?.category
          )}
          setSelectedValues={(e) => {
            setFormData({ ...formData, category: e[0]?.label || null });
          }}
          options={options}
          singleSelect
          error={errors?.category}
        />

        {/* DESCRIPTION */}
        <CustomTextareaField
          defaultValue={formData?.description}
          disable={false}
          fieldClassName={"w-full"}
          error={errors?.description}
          id={"description"}
          label={"Description"}
          name={"description"}
          onChange={handleFormChange}
          placeholder={"Description"}
          type={"text"}
          wrapperClassName={"w-full"}
        />
        <CustomFileUploader
          details={`Allowed .png, .jpg, .jpeg, .pdf files under 5MB`}
          accept={".png, .jpg, .jpeg, .pdf"}
          files={localImage?.map((file) => file?.localImg)}
          fileFolder={"product"}
          // isFileUploading={filesUploaderQuery.isPending}
          onFileSelect={async (e) => handleFileUpload(e)}
          onDrop={(files) => handleFileUpload(files)}
          onRemove={(e) => {
            setLocalImage((prev) =>
              prev?.filter((file) => file?.localImg !== e)
            );
          }}
          required
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center md:justify-end items-center py-5 gap-2">
        <button
          disabled={filesUploading || isProductCreating}
          onClick={handleClosePopup}
          className="btn w-full md:btn-wide btn-outline btn-primary"
        >
          Cancel
        </button>
        <button
          disabled={filesUploading || isProductCreating}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {/* {isPendingSubmit || createDepartmentQuery.isPending ? (
            <ButtonSpinner />
          ) : ( */}
          {popupOption?.id ? "Update" : "Create"}
          {/* )} */}
        </button>
      </div>
    </div>
  );
};

export default CreateAndUpdateProduct;
