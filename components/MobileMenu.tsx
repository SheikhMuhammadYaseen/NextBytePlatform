"use client";

import Link from "next/link";
import { Links } from "../constants/links";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

const MobileMenu: React.FC = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu((prev) => !prev);
  };

  return (
    <>
      <label className="swap swap-rotate md:hidden">
        <input
          type="checkbox"
          onChange={mobileMenuHandler}
          checked={!openMobileMenu}
        />
        <span className="dark:text-white swap-on fill-current">
          <HiMenu size={24} />
        </span>
        <span className="dark:text-white swap-off fill-current">
          <MdOutlineClose size={24} />
        </span>
      </label>

      {openMobileMenu && (
        <div className="mobile-menu">
          {Links.map((link, index) => (
            <Link key={index} href={link.route}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileMenu;