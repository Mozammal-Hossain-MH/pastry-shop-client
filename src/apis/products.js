import axios from "axios";

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
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}&perPage=${perPage}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};
export const getAllIdAndNameOfProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/all-products`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};
export const getProductsByCategory = async ({ id }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/category/${id}?limit=8`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};

// export const getServerSideProps = async (context) => {
//   const { id } = context.params; // Extract the 'id' from params
//   try {
//     const res = await axiosPublic.get(`/products?id=${id}`);
//     return {
//       props: {
//         product: res?.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         error: "Product not found",
//       },
//     };
//   }
// };

// ----------------------------------------------------------------
// POST API
// ----------------------------------------------------------------
export const postProduct = async (formData) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      formData
    );
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
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
      formData
    );
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
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`
    );
    return res?.data;
  } catch (error) {
    throw error;
  }
};
