"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import { Links } from "../constants/links";
import { IoMdPulse } from "react-icons/io";
import { auth } from "../firebaseConfig";
import LoginModal from "./LoginModal"; 

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="w-full py-5 dark:bg-dark">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="flex-1">
          <div className="flex gap-1 items-center">
            <h1 className="font-bold text-gray-900 text-2xl dark:text-white">NextByte</h1>
            <span className="text-3xl text-sky-400" aria-hidden="true">
              <IoMdPulse />
            </span>
          </div>
        </Link>

        <div className="flex gap-8 max-lg:gap-5 items-center flex-1 max-md:hidden text-black dark:text-white justify-center font-semibold">
          {Links.map((link, index) => (
            <Link
              key={index}
              href={link.route}
              className={pathname === link.route ? "text-sky-400 font-bold" : "hover:text-sky-400"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1 justify-end flex gap-3 items-center relative">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <Image
                  src="/assets/user.png"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border rounded-lg shadow-lg z-50">
                  <Link
                    href="/create"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Create Post
                  </Link>
                  <Link
                    href="/edit"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Edit Post
                  </Link>
                  <Link
                    href="/delete"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Delete Post
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-6 py-3 bg-sky-400 text-white rounded-lg hover:bg-sky-700 text-lg font-semibold"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
          )}
          {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />} {/* Render LoginModal */}
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;