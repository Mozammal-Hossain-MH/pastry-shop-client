import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();

// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getAllCartItems = async ({ email }) => {
  console.log(email);
  try {
    const res = await axiosPublic.get(`/carts/${email}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postCart = async (formData) => {
  try {
    const res = await axiosSecure.post(`/carts`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
export const postCheckout = async (formData) => {
  try {
    const res = await axiosSecure.post(`/carts/checkout`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
export const postPayment = async (products) => {
  try {
    const res = await axiosSecure.post(`/carts/create-payment`, products);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// PUT API
// ----------------------------------------------------------------

export const updateQuantity = async (info) => {
  try {
    const res = await axiosSecure.put(`/carts`, info);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// DELETE API
// ----------------------------------------------------------------
export const deleteCart = async ({ id }) => {
  try {
    const res = await axiosSecure.delete(`/carts/${id}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
