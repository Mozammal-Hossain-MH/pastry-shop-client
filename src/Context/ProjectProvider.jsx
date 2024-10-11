"use client";
import CreateAndUpdateProduct from "@/app/admin/all-products/CreateAndUpdateProduct";
import ViewProduct from "@/app/admin/all-products/ViewProduct";
import CreateAndUpdateCategory from "@/app/admin/categories/CreateAndUpdateCategory";
import CustomPopup from "@/Shared/CustomPopup";
import FileViewer from "@/Shared/FileViewer";
import React, { createContext, useState, useContext } from "react";

export const ProjectContext = createContext();
const ProjectProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });
  const value = { login, setLogin, popupOption, setPopupOption };
  return (
    <ProjectContext.Provider value={value}>
      <CustomPopup
        popupClasses={`w-[70vw] h-[90vh]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {popupOption?.type === "product" && <CreateAndUpdateProduct />}
            {popupOption?.type === "viewProduct" && <ViewProduct />}
            {popupOption?.type === "viewFile" && <FileViewer />}
            {popupOption?.type === "category" && <CreateAndUpdateCategory />}
          </>
        }
      />
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useAuthContext = () => {
  const { login, setLogin } = useContext(ProjectContext);

  return { login, setLogin };
};

export const usePopupContext = () => {
  const { popupOption, setPopupOption } = useContext(ProjectContext);

  return { popupOption, setPopupOption };
};
