"use client";
import { useAuthContext } from "@/Context/ProjectProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { FiAlignLeft, FiX } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { OutsideClickHandler } from "./OutsideClickHandler";
import Link from "next/link";

const Navbar = () => {
  const { login, setLogin } = useAuthContext();
  const [sidebar, setSidebar] = useState(false);
  const [currentTab, setCurrentTab] = useState("login");
  // const { data } = useCart(user?.email);
  const [isExpanded, setIsExpanded] = useState("");
  const [openDropdown, seOpenDropdown] = useState(false);

  const handleLogin = () => {
    setLogin(true);
    setCurrentTab("login");
    setSidebar(false);
  };
  const handleRegister = () => {
    setLogin(true);
    setCurrentTab("register");
    setSidebar(false);
  };
  const handleCloseMenu = () => {
    setSidebar(false);
  };

  const handleOpenDropdown = () => {
    seOpenDropdown(!openDropdown);
  };

  const menus = [
    {
      id: 1,
      name: "Home",
      path: "/",
      // Icon: <Home className="h-4 w-4" />,
      handler: handleCloseMenu,
      permission: true,
      Children: [],
    },
    {
      id: 2,
      name: "Product",
      path: "/products",
      // Icon: <ShoppingBag className="h-4 w-4" />,
      handler: handleCloseMenu,
      permission: true,
      Children: [
        {
          id: 1,
          name: "Shop",
          path: "/products",
          // Icon: <Tag className="h-4 w-4" />,
          handler: handleCloseMenu,
        },
      ],
    },

    {
      id: 4,
      name: "Admin Panel",
      // Icon: <LayoutDashboard className="h-4 w-4" />,
      handler: handleOpenDropdown,
      path: "/admin",
      permission: true,
      Children: [
        {
          id: 1,
          name: "Products",
          path: "/admin/all-products",
          // Icon: <Tag className="h-4 w-4" />,
          handler: handleCloseMenu,
        },
        {
          id: 1,
          name: "Categories",
          path: "/admin/categories",
          // Icon: <Tag className="h-4 w-4" />,
          handler: handleCloseMenu,
        },
      ],
    },
  ];
  return (
    <div
      className={`h-32 w-full bg-transparent relative flex flex-col justify-center text-base-300 px-5 xl:px-20`}
    >
      <div className={`w-full px-3 mx-auto z-50`}>
        <div className={`flex justify-between items-center w-full `}>
          <img
            className={`w-20 h-auto hidden xl:block`}
            src="/cremeLogo.png"
            alt="logo"
          />
          <div
            className={`flex justify-between items-center gap-2 w-full xl:w-auto`}
          >
            <div onClick={() => setSidebar(true)} className={`xl:hidden `}>
              <FiAlignLeft
                className={`text-4xl text-btn-primary transition-transform hover:scale-105 active:scale-95`}
              />
            </div>
            <img
              className={`w-20 h-auto xl:hidden`}
              src="/cremeLogo.png"
              alt="logo"
            />
            <div className={`xl:hidden`}></div>
            <ul className="hidden xl:flex ">
              {menus?.map((menu, i) =>
                menu?.permission ? (
                  menu?.Children?.length > 0 ? (
                    <NavItemWithChildren
                      key={i}
                      icon={menu?.Icon}
                      label={menu?.name}
                      isExpanded={isExpanded}
                      setIsExpanded={setIsExpanded}
                    >
                      {menu?.Children?.map((menu, i) => (
                        <NavItemForDesktop
                          key={i}
                          icon={menu?.Icon}
                          href={menu?.path}
                        >
                          {menu?.name}
                        </NavItemForDesktop>
                      ))}
                    </NavItemWithChildren>
                  ) : (
                    <NavItemForDesktop
                      key={i}
                      icon={menu?.Icon}
                      href={menu?.path}
                      handler={menu?.handler}
                    >
                      {menu?.name}
                    </NavItemForDesktop>
                  )
                ) : (
                  ""
                )
              )}
            </ul>
          </div>
          <div className={`flex items-center gap-4 sm:gap-10`}>
            {false ? (
              <button
                data-tip={`Sign Out`}
                onClick={() => logout()}
                className={`tooltip tooltip-custom-primary tooltip-bottom items-center gap-1 hidden xl:flex px-3  sm:px-6 py-2 sm:py-3 bg-btn-primary text-base-300 rounded-full font-bold transition-transform hover:scale-105 active:scale-95`}
              >
                Logout <IoIosLogOut className={`text-2xl`} />
              </button>
            ) : (
              <button
                data-tip="Sign In"
                onClick={() => setLogin(true)}
                className={`tooltip tooltip-custom-primary tooltip-bottom items-center gap-1 hidden xl:flex px-3 sm:px-6 py-2 sm:py-3 bg-btn-primary text-base-300 rounded-full font-bold transition-transform hover:scale-105 active:scale-95`}
              >
                Login <CiLogin className={`text-2xl`} />
              </button>
            )}
          </div>
          <OutsideClickHandler
            onOutsideClick={() => {
              setSidebar(false);
            }}
            className={` h-screen bg-base-100 fixed transition-all ${
              sidebar ? "left-0" : "-left-[320px]"
            } bottom-0 top-0 shadow-xl z-[1000] overflow-y-auto`}
          >
            <div className="flex flex-col h-screen w-[320px] overflow-hidden bg-base-100 border-r ">
              <div className="p-4 flex justify-between items-center">
                <img
                  className={`w-20 h-auto`}
                  src="/cremeLogo.png"
                  alt="logo"
                />
                <FiX
                  onClick={() => setSidebar(false)}
                  className={`text-4xl m-5 p-2 rounded-full w-auto text-primary bg-secondary transition-transform hover:scale-105 active:scale-95`}
                />
              </div>
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                  {menus?.map((menu, i) =>
                    menu?.permission ? (
                      menu?.Children?.length > 0 ? (
                        <NavItemWithChildren
                          key={i}
                          icon={menu?.Icon}
                          label={menu?.name}
                          isExpanded={isExpanded}
                          setIsExpanded={setIsExpanded}
                        >
                          {menu?.Children?.map((menu, i) => (
                            <NavItem
                              key={i}
                              icon={menu?.Icon}
                              href={menu?.path}
                              handler={menu?.handler}
                            >
                              {menu?.name}
                            </NavItem>
                          ))}
                        </NavItemWithChildren>
                      ) : (
                        <NavItem
                          key={i}
                          icon={menu?.Icon}
                          href={menu?.path}
                          handler={menu?.handler}
                        >
                          {menu?.name}
                        </NavItem>
                      )
                    ) : (
                      ""
                    )
                  )}
                </ul>
              </nav>
              <div className="p-4 border-t dark:border-gray-700">
                <div className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    {/* <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {user?.name
                        ?.split(" ")
                        ?.map((char) => char.charAt(0).toUpperCase())}
                    </span> */}
                  </div>
                  {false ? (
                    <div className="ml-3">
                      <p className="text-sm font-medium text-heading-main ">
                        {user?.name}
                      </p>
                      <p className="text-xs font-semibold text-heading-main ">
                        {user?.email}
                      </p>
                    </div>
                  ) : (
                    <div className="ml-3 text-sm font-semibold text-heading-main">
                      Please{" "}
                      <span
                        className={`link link-hover hover:text-heading-brand`}
                        onClick={handleLogin}
                      >
                        Login
                      </span>{" "}
                      or{" "}
                      <span
                        className={`link link-hover hover:text-heading-brand`}
                        onClick={handleRegister}
                      >
                        Register
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={false ? logout : handleLogin}
                  className="w-full mt-4 px-4 py-2 text-sm font-medium bg-transparent text-heading-main hover:text-gray-100 hover:bg-gray-700 rounded-md flex items-center justify-start"
                >
                  {/* {user ? (
                    <LogOut className="mr-2 h-4 w-4" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )} */}
                  {false ? "Logout" : "Login"}
                </button>
              </div>
            </div>
          </OutsideClickHandler>

          <OutsideClickHandler
            onOutsideClick={() => {
              setLogin(false);
            }}
            className={`w-[320px] md:w-[640px] h-screen bg-primary fixed transition-all ${
              login ? "right-0" : "-right-[320px] md:-right-[640px]"
            } bottom-0 top-0 shadow-xl z-[1000]`}
          >
            <div
              onClick={() => setLogin(false)}
              className={`text-4xl m-5 p-2 rounded-full w-fit text-btn-primary bg-secondary transition-transform hover:scale-105 active:scale-95`}
            >
              <FiX />
            </div>
            <div className={`h-screen w-full`}>
              {/* {currentTab === "login" && (
                <Login setCurrentTab={setCurrentTab} setLogin={setLogin} />
              )}
              {currentTab === "register" && (
                <Register setCurrentTab={setCurrentTab} />
              )}
              {currentTab === "enter_code" && (
                <Code
                  setCurrentTab={setCurrentTab}
                  passwordResetData={passwordResetData}
                  setPasswordResetData={setPasswordResetData}
                />
              )}
              {currentTab === "reset_password" && (
                <ResetPassword
                  setCurrentTab={setCurrentTab}
                  currentTab={currentTab}
                  setFormData={setPasswordResetData}
                  formData={passwordResetData}
                />
              )}
              {currentTab === "enter_new_password" && (
                <EnterNewPassword
                  setCurrentTab={setCurrentTab}
                  currentTab={currentTab}
                  setFormData={setPasswordResetData}
                  formData={passwordResetData}
                />
              )} */}
            </div>
          </OutsideClickHandler>
        </div>
      </div>
      <div className={`w-full`}>
        <div className={`wavy-line-nav`}></div>
      </div>
    </div>
  );
};

export default Navbar;

function NavItem({ icon, href, children, handler }) {
  return (
    <li>
      <Link
        href={href}
        onClick={handler}
        className="flex items-center rounded-lg px-3 py-2 gap-2 font-semibold text-heading-main hover:text-gray-100 hover:bg-gray-700"
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}

function NavItemForDesktop({ icon, href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center rounded-lg  px-3 py-2 gap-2 font-semibold text-heading-main hover:text-gray-100 hover:bg-gray-700"
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}

function NavItemWithChildren({
  icon,
  label,
  children,
  isExpanded,
  setIsExpanded,
}) {
  return (
    <li className={`relative`}>
      <button
        onClick={() => setIsExpanded(isExpanded === label ? "" : label)}
        className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-heading-main hover:text-gray-100 hover:bg-gray-700"
        aria-expanded={isExpanded === label}
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <motion.span
          animate={{ rotate: isExpanded === label ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* <ChevronRight className="h-4 w-4" /> */}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded === label && (
          <motion.ul
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="ml-6 mt-2 space-y-2 overflow-hidden xl:bg-primary xl:absolute xl:w-[180px]"
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
