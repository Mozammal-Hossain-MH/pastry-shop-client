import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const axiosSecure = useAxiosSecure();
const axiosPublic = useAxiosPublic();

// ----------------------------------------------------------------
// GET API
// ----------------------------------------------------------------
export const getUser = async () => {
  try {
    const res = await axiosSecure.get(`/auth/user/info`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const createUser = async (formData) => {
  try {
    const res = await axiosPublic.post(`/auth/register`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const res = await axiosSecure.post(`/auth/login`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const isUserExist = async (formData) => {
  try {
    const res = await axiosSecure.post(`/auth/is-user-exist`, formData);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const jwt = async (user) => {
  try {
    const res = await axiosSecure.post(`/auth/jwt`, user);
    return res?.data;
  } catch (error) {
    throw error;
  }
};
// ----------------------------------------------------------------
// PUT API
// ----------------------------------------------------------------
export const verifyUser = async ({ email, otp }) => {
  try {
    const res = await axiosPublic.put(`/auth/user/verify/${email}?otp=${otp}`);
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserPassword = async (email, info) => {
  try {
    const res = await axiosPublic.put(
      `/auth/user/reset-password/${email}`,
      info
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// // ----------------------------------------------------------------
// // DELETE API
// // ----------------------------------------------------------------
// export const deleteCategory = async ({ id }) => {
//   try {
//     const res = await axiosSecure.delete(`/categories/${id}`);
//     return res?.data;
//   } catch (error) {
//     throw error;
//   }
// };
