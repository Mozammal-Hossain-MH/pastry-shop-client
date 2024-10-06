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
import CustomFieldForArray from "@/Shared/Fields/CustomFieldForArray";
import CustomFileUploader from "@/Shared/Fields/CustomFileUploader";
import CustomMultiSelect from "@/Shared/Fields/CustomMultiSelect";
import CustomTextareaField from "@/Shared/Fields/CustomTextAreaField";

const CreateAndUpdateProduct = ({ handleClosePopup, popupOption }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    features: [""],
    specifications: [""],
    speciality: "",
    description: "",
    images: [],
  });
  const { unauthorizedLogout } = useAuthContext();
  const { data: categories, isPending } = useAuthContext();
  const options = categories?.map((category, i) => ({
    id: i + 1,
    label: category?.name,
  }));

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
    if (!formData.price === "") {
      newErrors.price = "Price is required";
    }

    //   VALIDATE CATEGORY
    if (!formData.category || formData.category.trim() === "") {
      newErrors.category = "Category is required";
    }

    // VALIDATE IMAGES
    if (formData.images.length <= 0) {
      newErrors.image = "At least one image is required";
    }

    setErrors(newErrors);

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

  const handleFormArrayChange = (e) => {
    const { name, value } = e.target;
    const formName = name?.split("_")[0];
    const formIndex = parseInt(name?.split("_")[1], 10);

    const updatedArray = [...formData[formName]];
    updatedArray[formIndex] = value;

    setFormData((prev) => ({
      ...prev,
      [formName]: updatedArray,
    }));
  };

  const [filesUploading, setFilesUploading] = useState(false);
  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);

    const validFiles = [];

    for (const file of fileArray) {
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
      uploadProductPic(validFiles)
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...res],
          }));
          setFilesUploading(false);
        })
        .catch((error) => {
          setFilesUploading(false);
        });
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

  //   SUBMIT DATA
  const handleSubmit = async () => {
    // Validate form
    if (await validateForm()) {
      if (popupOption?.id) {
        updateFunction(formData);
      } else {
        createFunction(formData);
      }
    }
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
        <CustomField
          defaultValue={formData?.price}
          disable={false}
          fieldClassName={"w-full"}
          error={errors?.price}
          id={"price"}
          label={"Price"}
          name={"price"}
          onChange={handleFormChange}
          placeholder={"Price"}
          type={"number"}
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
        />

        {/* FEATURES */}
        <div className={`flex flex-col gap-2`}>
          {formData?.features?.map((field, i) => (
            <div key={i} className={`flex items-end gap-6`}>
              <CustomFieldForArray
                value={formData?.features[i]}
                array={formData?.features}
                setFormData={setFormData}
                disable={false}
                fieldClassName={"w-full"}
                error={errors?.features}
                id={`feature${i}`}
                label={`${i === 0 ? "Features" : ""}`}
                name={`features_${i}`}
                onChange={handleFormArrayChange}
                placeholder={`Feature ${i + 1}`}
                type={"text"}
                wrapperClassName={"w-full"}
              />
              {formData?.features?.length - 1 === i ? (
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      features: [...formData?.features, ""],
                    })
                  }
                  className={`flex justify-center items-center gap-1 px-6 py-3 text-heading-secondary bg-btn-primary rounded-[5px] font-bold transition-transform hover:scale-105 active:scale-95`}
                >
                  <span>Add</span>
                  <span>More</span>
                </button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        {/* SPECIFICATIONS */}
        <div className={`flex flex-col gap-2`}>
          {formData?.specifications?.map((field, i) => (
            <div key={i} className={`flex items-end gap-6`}>
              <CustomFieldForArray
                value={formData?.specifications[i]}
                array={formData?.specifications}
                setFormData={setFormData}
                disable={false}
                fieldClassName={"w-full"}
                error={errors?.specifications}
                id={`specification${i}`}
                label={`${i === 0 ? "Specifications" : ""}`}
                name={`specifications_${i}`}
                onChange={handleFormArrayChange}
                placeholder={`Specification ${i + 1}`}
                type={"text"}
                wrapperClassName={"w-full"}
              />
              {formData?.specifications?.length - 1 === i ? (
                <button
                  onClick={() =>
                    setFormData({
                      ...formData,
                      specifications: [...formData?.specifications, ""],
                    })
                  }
                  className={`flex justify-center items-center gap-1 px-6 py-3 text-heading-secondary bg-btn-primary rounded-[5px] font-bold transition-transform hover:scale-105 active:scale-95`}
                >
                  <span>Add</span>
                  <span>More</span>
                </button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>

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
          files={formData?.images}
          fileFolder={"product"}
          // isFileUploading={filesUploaderQuery.isPending}
          onFileSelect={async (e) => handleFileUpload(e)}
          onDrop={(files) => handleFileUpload(files)}
          onRemove={(e) => {
            setFormData({
              ...formData,
              images: [...formData?.images].filter(
                (file_url) => file_url !== e
              ),
            });
          }}
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
