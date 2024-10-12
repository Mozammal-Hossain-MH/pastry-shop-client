import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();

// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getAllMessages = async ({ page, perPage }) => {
  try {
    const res = await axiosSecure.get(
      `/messages?page=${page}&perPage=${perPage}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postMessage = async (formData) => {
  try {
    const res = await axiosSecure.post(`/messages`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteMessage = async ({ id }) => {
  try {
    const res = await axiosSecure.delete(`/messages/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
