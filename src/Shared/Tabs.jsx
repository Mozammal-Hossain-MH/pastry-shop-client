"use client";
import { React, useState } from "react";

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.name);
  console.log({ activeTab });
  return (
    <div className={`flex justify-center items-center text-[20px]`}>
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.name)}
          className={` px-6 pt-3 relative hover:text-primary transition-colors ${
            activeTab === tab?.name
              ? "border border-primary rounded-full text-primary"
              : ""
          }`}
        >
          <p>{tab?.name}</p>
          <div
            className={`w-full ${activeTab === tab?.name ? "opacity-0" : ""}`}
          >
            <div className={`wavy-line-tabs`}></div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default Tabs;
