"use client";
import { getUser } from "@/apis/auth";
import CreateAndUpdateProduct from "@/app/admin/all-products/CreateAndUpdateProduct";
import ViewProduct from "@/app/admin/all-products/ViewProduct";
import CreateAndUpdateCategory from "@/app/admin/categories/CreateAndUpdateCategory";
import CreateAndUpdateFaq from "@/app/admin/faq/CreateAndUpdateFaq";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import CustomPopup from "@/Shared/CustomPopup";
import FileViewer from "@/Shared/FileViewer";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ProjectContext = createContext();
const ProjectProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [login, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserComing, setIsUserComing] = useState();

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then((res) => {
        console.log({ res });
        setUser(res?.user);
        if (res?.user?.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [isUserComing]);

  console.log({ user });

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Logout!",
      customClass: {
        confirmButton: "bg-primary",
        cancelButton: "bg-error",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          ?.post("/auth/logout")
          .then((res) => {
            console.log({ logoutRes: res });
            if (res?.data?.success) {
              setIsUserComing(Math.random());
              setUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Logout successful",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {});
      }
    });
  };

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
  const value = {
    // LOGIN
    login,
    setLogin,

    // POPUP OPTIONS
    popupOption,
    setPopupOption,

    // USER
    logout,
    isUserComing,
    setIsUserComing,
    user,
    setUser,
    isLoading,
    setIsLoading,

    // ADMIN
    isAdmin,
    setIsAdmin,
  };
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
            {popupOption?.type === "faq" && <CreateAndUpdateFaq />}
          </>
        }
      />
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useAuthContext = () => {
  const {
    login,
    setLogin,
    logout,
    isUserComing,
    setIsUserComing,
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAdmin,
    setIsAdmin,
  } = useContext(ProjectContext);

  return {
    login,
    setLogin,
    logout,
    isUserComing,
    setIsUserComing,
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAdmin,
    setIsAdmin,
  };
};

export const usePopupContext = () => {
  const { popupOption, setPopupOption } = useContext(ProjectContext);

  return { popupOption, setPopupOption };
};
