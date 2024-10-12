import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();

// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getAllFaqs = async () => {
  try {
    const res = await axiosPublic.get(`/faqs`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postFaq = async (formData) => {
  try {
    const res = await axiosSecure.post(`/faqs`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// PUT API
// ----------------------------------------------------------------
export const updateFaq = async (formData) => {
  try {
    const res = await axiosSecure.put(`/faqs`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteFaq = async ({ id }) => {
  try {
    const res = await axiosSecure.delete(`/faqs/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
