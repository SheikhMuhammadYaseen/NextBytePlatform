// myblog/hooks/useMenuActive.tsx
"use client"; // <-- Add this line to mark this file as a client component

import { usePathname } from "next/navigation";

const useMenuActive = (route: string): boolean => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(route) && route.length > 1) ||
    pathname === route;

  return isActive;
};

export default useMenuActive;
