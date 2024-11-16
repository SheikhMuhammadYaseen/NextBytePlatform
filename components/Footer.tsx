"use client";

import React from "react";
import useMenuActive from "../hooks/useMenuActive";
import LinkItem from "./LinkItem";
import { Links } from "../constants/links";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 gap-10 text-white rounded dark:bg-dark dark:text-white border-t dark:border-none">
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

      <nav className="grid grid-flow-col gap-4">
        
        <a
          href="https://github.com"
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current hover:fill-black"
          >
            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.304 3.438 9.8 8.205 11.387.6.11.82-.26.82-.577v-2.021c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.743.084-.727.084-.727 1.205.085 1.84 1.242 1.84 1.242 1.07 1.835 2.809 1.305 3.495.998.107-.774.42-1.305.763-1.605-2.665-.306-5.467-1.334-5.467-5.933 0-1.31.465-2.381 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.506 11.506 0 013.005-.404c1.02.005 2.045.138 3.005.404 2.292-1.552 3.3-1.23 3.3-1.23.653 1.653.242 2.873.118 3.176.773.84 1.236 1.911 1.236 3.22 0 4.61-2.807 5.625-5.477 5.922.43.372.815 1.102.815 2.222v3.293c0 .32.22.694.825.577C20.565 22.092 24 17.597 24 12.297 24 5.67 18.627.297 12 .297z" />
          </svg>
        </a>

        <a
          href="https://youtube.com"
          aria-label="YouTube"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current hover:fill-red-600"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </a>

        <a
          href="https://facebook.com"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-105 text-xl flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="fill-current hover:fill-blue-600"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </a>
      </nav>

      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Shaikh Muhammad Yaseen</p>
      </aside>
    </footer>
  );
};

export default Footer;