import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router-dom";
import { path } from "../../utils/constants";

import imgLogo_1 from "../../assets/images/logoUMoney_1.png";
import imgLogo_2 from "../../assets/images/logoUMoney_2.png";

import { MdOutlineSupervisorAccount } from "react-icons/md";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (route) => {
    if (route === path.common.Home) {
      return location.pathname === route; // Exact match for home
    }
    return location.pathname.includes(route); // Partial match for other routes
  };

  return (
    <div className={`bg-white h-auto min-h-[100vh] p-5 ${isCollapsed ? "w-20" : "w-72"} duration-300 relative flex items-start gap-4 flex-col`}>
      <img
        className="cursor-pointer"
        src={isCollapsed ? imgLogo_2 : imgLogo_1}
        onClick={() => {
          navigate("../" + path.common.Transaction);
        }}
      ></img>
      <button className={"w-[52px] h-[40px] mx-1 flex justify-start items-center text-[#6DA4DA] hover:text-[#3187DC] pv:max-md:hidden"}
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <Icon icon={"line-md:menu-fold-right"} className="w-8 h-8" />
        ) : (
          <Icon icon={"line-md:menu-fold-left"} className="w-8 h-8" />
        )}
      </button>

      {/* Sidebar Menu */}
      <ul className="flex flex-col gap-1">
        <li
          className={`flex items-center ${isCollapsed ? "p-x-1 p-1" : "p-x-4 p-2"} text-black text-sm rounded-md cursor-pointer ${isActive(path.private.Transaction)
            ? "bg-[#3187DC] text-white"
            : "hover:bg-[#6DA4DA] hover:text-white"
            }`}
          onClick={() => navigate("../" + path.private.Transaction)}
        >
          <Icon icon={"material-symbols:dashboard"} className={`${isCollapsed ? "w-8 h-8" : "w-12 h-12"}`} />
          <span
            className={`${isCollapsed && "hidden"} origin-left duration-200 flex items-center p-2 text-lg`}
          >
            Giao dịch
          </span>
        </li>

        <li
          className={`flex items-center ${isCollapsed ? "p-x-1 p-1" : "p-x-4 p-2"} text-black text-sm rounded-md cursor-pointer ${isActive(path.private.AccountManage)
            ? "bg-[#3187DC] text-white"
            : "hover:bg-[#6DA4DA] hover:text-white"
            }`}
          onClick={() => navigate("../" + path.private.AccountManage)}
        >
          <MdOutlineSupervisorAccount className={`${isCollapsed ? "w-8 h-8" : "w-12 h-12"}`} />
          <span
            className={`${isCollapsed && "hidden"} origin-left duration-200 flex items-center p-2 text-lg`}
          >
            Tài khoản
          </span>
        </li>
      </ul>

      <div
        className={` ${isCollapsed
          ? "flex items-center flex-col gap-4"
          : "flex items-center gap-4"
          }`}
      >
        {/* <Button
          type="default"
          className={
            "mx-1 bg-red-400 hover:bg-[#70B557] flex justify-center items-center text-white hover:text-black"
          }
          onClick={() => {
            sessionStorage.clear();
            navigate("../" + path.common.Login);
          }}
        >
          <Icon icon={"material-symbols:logout"} className="w-6 h-6"></Icon>
        </Button> */}
      </div>
    </div>
  );
};

export default Sidebar;
