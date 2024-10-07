import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();
// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getProductsBySpeciality = async (special, filters) => {
  const { page, perPage } = filters;
  try {
    const res = await axiosPublic.get(
      `/products/${special}?page=${page}&per_page=${perPage}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};
export const getProductsById = async (id) => {
  try {
    const res = await axiosPublic?.get(`/products/single/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postProduct = async (formData) => {
  try {
    const res = await axiosSecure.post(`/products`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// PATCH API
// ----------------------------------------------------------------
export const updateProduct = async (info, id) => {
  try {
    const res = await axiosSecure.patch(`/product/${id}`, info);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// UPLOAD API
// ----------------------------------------------------------------
export const uploadProductPic = async (files) => {
  try {
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(`files`, file);
    });
    console.log(files);
    const res = await axiosPublic.post("/products/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteProduct = async (id) => {
  try {
    const res = await axiosSecure.delete(`/product/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
