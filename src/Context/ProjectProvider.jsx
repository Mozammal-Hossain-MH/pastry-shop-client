"use client";
import CreateAndUpdateProduct from "@/app/admin/all-products/CreateAndUpdateProduct";
import CustomPopup from "@/Shared/CustomPopup";
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
            {popupOption?.type === "product" && (
              <CreateAndUpdateProduct
                popupOption={popupOption}
                handleClosePopup={popupOption?.onClose}
              />
            )}
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
