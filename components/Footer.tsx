"use client";

import React from "react";
import LinkItem from "./LinkItem";
import { Links } from "../constants/links";
import { FaGithub, FaYoutube, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: "https://github.com",
      label: "GitHub",
      icon: <FaGithub size={24} />,
    },
    {
      href: "https://youtube.com",
      label: "YouTube",
      icon: <FaYoutube size={24} />,
    },
    {
      href: "https://facebook.com",
      label: "Facebook",
      icon: <FaFacebookF size={24} />,
    },
    {
      href: "https://twitter.com",
      label: "Twitter",
      icon: <FaTwitter size={24} />,
    },
  ];

  return (
    <footer className="footer footer-center p-10 bg-base-200 gap-10 text-white rounded dark:bg-dark dark:text-white border-t dark:border-none">
      <nav className="grid grid-flow-col text-lg gap-4">
        {Links.map((link, index) => (
          <LinkItem key={index} route={link.route} label={link.label} isActive={false} footer />
        ))}
      </nav>

      <nav className="grid grid-flow-col gap-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-105 text-xl flex items-center gap-1"
          >
            {social.icon}
          </a>
        ))}
      </nav>

      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Shaikh Muhammad Yaseen</p>
      </aside>
    </footer>
  );
};

export default Footer;