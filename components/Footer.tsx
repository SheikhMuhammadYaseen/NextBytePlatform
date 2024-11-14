// myblog/components/Footer.tsx
"use client";

import React from "react";
import useMenuActive from "../hooks/useMenuActive";
import LinkItem from "./LinkItem";
import { Links } from "../constants/links";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 gap-10 text-base-content rounded dark:bg-dark dark:text-white border-t dark:border-none">
      {/* Navigation Links */}
      <nav className="grid grid-flow-col text-lg gap-4">
        {Links.map((link, index) => {
          const isActive = useMenuActive(link.route);
          return (
            <LinkItem
              key={index}
              route={link.route}
              label={link.label}
              isActive={isActive}
              footer
            />
          );
        })}
      </nav>

      {/* Social Media Icons */}
      <nav className="grid grid-flow-col gap-4">
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:text-[#a1c4fd] hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557a9.861 9.861 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.868 9.868 0 01-3.127 1.195 4.918 4.918 0 00-8.384 4.482A13.955 13.955 0 011.671 3.15a4.917 4.917 0 001.523 6.574 4.903 4.903 0 01-2.229-.616v.06a4.919 4.919 0 003.946 4.827 4.921 4.921 0 01-2.224.084 4.923 4.923 0 004.6 3.419 9.867 9.867 0 01-6.102 2.105c-.396 0-.79-.023-1.178-.068a13.94 13.94 0 007.548 2.212c9.055 0 14.007-7.514 14.007-14.026 0-.213-.004-.425-.014-.636a9.935 9.935 0 002.457-2.548z" />
          </svg>
        </a>
        <a
          href="https://youtube.com"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:text-[#a1c4fd] hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </a>
        <a
          href="https://facebook.com"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:text-[#a1c4fd] hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </a>
      </nav>

      {/* Footer Copyright */}
      <aside>
        <p className="text-med">Copyright © 2025 - All rights reserved by Shaikh Muhammad Yaseen</p>
      </aside>
    </footer>
  );
};

export default Footer;