import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();
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
    const res = await axiosSecure.post("/products/upload", formData, {
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
// GET API
// ----------------------------------------------------------------
export const getAllProducts = async (filters) => {
  const { page, perPage } = filters;
  try {
    const res = await axiosPublic.get(
      `/products?page=${page}&per_page=${perPage}`
    );
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
// PUT API
// ----------------------------------------------------------------
export const updateProduct = async (formData) => {
  try {
    const res = await axiosSecure.put(`/products`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteProduct = async ({ id }) => {
  try {
    const res = await axiosSecure.delete(`/products/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
