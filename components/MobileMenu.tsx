"use client";

import Link from "next/link";
import { Links } from "../constants/links";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

interface LinkType {
  route: string;
  label: string;
}

const MobileMenu: React.FC = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  return (
    <>
      <label className="swap swap-rotate md:hidden">
        <input
          type="checkbox"
          onChange={mobileMenuHandler} // Use onChange instead of onClick
          checked={!openMobileMenu}
        />
      <span className="dark:text-white swap-on fill-current">
         <HiMenu size={24} /> {/* Adjust the size as needed */}
      </span>
      <span className="dark:text-white swap-off fill-current">
     <MdOutlineClose size={24} /> {/* Adjust the size as needed */}
      </span>
      </label>

      {openMobileMenu && (
        <div className="mobile-menu">
          {Links.map((link: LinkType, index: number) => (
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