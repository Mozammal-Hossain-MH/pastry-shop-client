"use client";
import React, { createContext, useState, useContext } from "react";

export const ProjectContext = createContext();
const ProjectProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const value = { login, setLogin };
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;

export const useAuthContext = () => {
  const { login, setLogin } = useContext(ProjectContext);

  return { login, setLogin };
};
