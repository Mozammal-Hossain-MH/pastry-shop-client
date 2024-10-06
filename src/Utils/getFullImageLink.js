export const getFullImageLink = (url, fileFolder) => {
  return `${import.meta.env.VITE_BACKEND_URL}/${fileFolder}/${url}`;
};
