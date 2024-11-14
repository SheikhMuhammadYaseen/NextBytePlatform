"use client";

import { usePathname } from "next/navigation";

const useMenuActive = (route: string): boolean => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(route) && route.length > 1) ||
    pathname === route;

  return isActive;
};

export default useMenuActive;
