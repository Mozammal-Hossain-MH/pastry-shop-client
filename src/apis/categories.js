import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();

// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getAllCategories = async () => {
  try {
    const res = await axiosPublic.get(`/categories`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postCategory = async (formData) => {
  try {
    const res = await axiosSecure.post(`/categories`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// PUT API
// ----------------------------------------------------------------
export const updateCategory = async (formData) => {
  try {
    const res = await axiosSecure.put(`/categories`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteCategory = async ({ id }) => {
  try {
    const res = await axiosSecure.delete(`/categories/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
