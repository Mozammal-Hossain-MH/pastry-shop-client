"use client";
import { useAuthContext, usePopupContext } from "@/Context/ProjectProvider";
import CustomLoading from "@/Shared/CustomLoading";
import CustomToaster from "@/Shared/CustomToaster";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CustomField from "@/Shared/Fields/CustomField";
import CustomFileUploader from "@/Shared/Fields/CustomFileUploader";
import CustomMultiSelect from "@/Shared/Fields/CustomMultiSelect";
import CustomNumberField from "@/Shared/Fields/CustomNumberField";
import CustomTextareaField from "@/Shared/Fields/CustomTextAreaField";
import { postProduct, updateProduct, uploadProductPic } from "@/apis/products";
import ButtonSpinner from "@/Shared/ButtonSpinner";
import { errorHandler } from "@/Utils/errorHandler";

const CreateAndUpdateProduct = () => {
  const { popupOption } = usePopupContext();
  console.log({ popupOption });
  const [formData, setFormData] = useState({
    id: popupOption?.data ? popupOption?.data?.id : "",
    name: popupOption?.data ? popupOption?.data?.name : "",
    price: popupOption?.data ? popupOption?.data?.price : "",
    inStock: popupOption?.data ? popupOption?.data?.inStock : "",
    category: popupOption?.data ? popupOption?.data?.category : "",
    description: popupOption?.data ? popupOption?.data?.description : "",
    images: popupOption?.data ? popupOption?.data?.images : [],
  });
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [localImage, setLocalImage] = useState(
    popupOption?.data
      ? popupOption?.data?.images?.map((image) => ({
          localImg: image?.file,
          id: image?.id,
        }))
      : []
  );
  console.log({ formData, localImage, filesToUpload });
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

  const [filesUploading, setFilesUploading] = useState(false);
  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);
    console.log({ fileArray });

    setLocalImage((prev) => [
      ...prev,
      ...fileArray.map((file) => ({
        localImg: URL.createObjectURL(file),
        id: file?.name,
      })),
    ]);
    setFilesToUpload([...filesToUpload, ...fileArray]);
  };

  const fileUploadToServer = async (files) => {
    console.log({ files });
    const validFiles = [];

    // Validate each file for size
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

    // If there are valid files, proceed with the upload
    if (validFiles.length > 0) {
      setFilesUploading(true);
      try {
        // Upload valid files
        const res = await uploadProductPic(validFiles);
        if (res?.length > 0) {
          // Clear files to upload and update formData with image links
          setFilesToUpload([]);
          setFormData((prev) => ({
            ...prev,
            images: [...prev?.images, ...res], // Add uploaded image URLs to formData
          }));
          const updatedFormData = {
            ...formData,
            images: [...(formData?.images || []), ...res], // Add uploaded image URLs
          };
          setFilesUploading(false);
          return updatedFormData; // Return uploaded image links
        }
      } catch (error) {
        setFilesUploading(false);
        throw error; // Propagate error if needed
      }
    }
  };

  // SUBMIT DATA
  const handleSubmit = async () => {
    // Validate form
    if (validateForm()) {
      if (popupOption?.data) {
        if (filesToUpload.length > 0) {
          const res = await fileUploadToServer(filesToUpload);
          console.log({ res });
          if (res?.images?.length > 0) {
            updateFunction(res);
          }
        } else {
          updateFunction(formData);
        }
      } else {
        const res = await fileUploadToServer(filesToUpload);
        console.log({ res });
        if (res?.images?.length > 0) {
          createFunction(res);
        }
      }
    }
  };

  const [isProductCreating, setIsProductCreating] = useState(false);
  const createFunction = (data) => {
    setIsProductCreating(true);
    postProduct(data)
      .then((res) => {
        console.log({ res });
        if (res?.success) {
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
            inStock: "",
            category: "",
            description: "",
            images: [],
          });
          popupOption?.onClose();
          popupOption.setIsUpdating(Math.random());
          setIsProductCreating(false);
        }
      })
      .catch((err) => {
        errorHandler({ err, setLoading: setIsProductCreating });
      });
  };

  const [isProductUpdating, setIsProductUpdating] = useState(false);
  const updateFunction = (data) => {
    setIsProductUpdating(true);
    updateProduct(data)
      .then((res) => {
        if (res?.success) {
          toast.custom((t) => (
            <CustomToaster
              t={t}
              type={"success"}
              text={`Product updated successfully`}
            />
          ));
          popupOption?.onClose();
          popupOption.setIsUpdating(Math.random());
          setIsProductUpdating(false);
        }
      })
      .catch((err) => {
        errorHandler({ err, setLoading: setIsProductUpdating });
      });
  };

  if (isProductCreating || isProductUpdating) {
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
          loading={false}
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
          files={localImage?.map((file) => ({
            file: file?.localImg,
            id: file?.id,
          }))}
          fileFolder={"Products"}
          // isFileUploading={filesUploaderQuery.isPending}
          onFileSelect={async (e) => handleFileUpload(e)}
          onDrop={(files) => handleFileUpload(files)}
          onRemove={(e) => {
            console.log({ e });
            setLocalImage((prev) =>
              prev?.filter((file) => file?.localImg !== e?.file)
            );
            setFilesToUpload((prev) =>
              prev?.filter((file) => file?.name !== e?.id)
            );
            setFormData((prev) => ({
              ...prev,
              images: prev?.images?.filter((file) => file?.id !== e?.id),
            }));
          }}
          required
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center md:justify-end items-center py-5 gap-2">
        <button
          disabled={filesUploading || isProductCreating || isProductUpdating}
          onClick={popupOption?.onClose}
          className="btn w-full md:btn-wide btn-outline btn-primary"
        >
          Cancel
        </button>
        <button
          disabled={filesUploading || isProductCreating || isProductUpdating}
          onClick={handleSubmit}
          className="btn w-full md:btn-wide btn-primary"
        >
          {filesUploading || isProductCreating || isProductUpdating ? (
            <ButtonSpinner />
          ) : popupOption?.data ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateAndUpdateProduct;
