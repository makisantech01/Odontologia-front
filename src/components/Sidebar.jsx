import React, { useState } from "react";
import {
  DASHBOARD_SIDEBAR_LINKS,
} from "../lib/consts/navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "universal-cookie";

library.add(faArrowRightFromBracket);

const linkClasses =
  "flex items-center gap-2 font-light transition-all duration-200 ease-in-out px-3 py-2 hover:bg-secondary-100 hover:no-underline rounded-sm text-base";

const SidebarLink = ({ item }) => {
  const { pathname } = useLocation();
  return (
    <Link
      to={item.path}
      className={classNames(
        pathname === item.path ? "text-white bg-secondary-100" : "text-white",
        linkClasses
      )}
    >
      <span className="text-xl">{item.icon}</span>
      {item.label}
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onLogout = () => {
    const cookie = new Cookie();
    cookie.remove("token");
    const tokenExists = cookie.get("token");
    if (!tokenExists) {
      window.location.href = "/";
    }
  };

  return (
    <section
      className={`${
        isOpen ? "left-0" : "-left-full"
      }  bg-primary lg:bg-primary w-[20vw] lg:w-[20vw] flex flex-col  justify-between py-4 fixed h-screen z-50 transition-all duration-200 lg:left-0`}
    >
      <div className="flex items-center justify-center gap-2 px-1 py-3">
        <span className="text-neutral-100 text-3xl font-bold">Conident</span>
      </div>
      <div className="flex-1 py-8 flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 pt-2">
        <button
          className={classNames("text-red-500 cursor-pointer", linkClasses)}
          onClick={onLogout}
        >
          <span className="text-xl">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
          Logout
        </button>
      </div>
    </section>
  );
};

export default Sidebar;
