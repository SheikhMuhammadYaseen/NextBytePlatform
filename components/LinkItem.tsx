import Link from "next/link";
import clsx from "clsx";
import { FC } from "react";

interface LinkItemProps {
  route: string;
  label: string;
  isActive: boolean;
  footer?: boolean;
}

const LinkItem: FC<LinkItemProps> = ({ route, label, isActive, footer }) => {
  return (
    <Link
      href={route}
      className={clsx(
        "px-3 py-1",
        isActive && !footer && "bg-sky-400 text-white rounded-md",
        footer && isActive && "text-sky-400 rounded-none bg-transparent link"
      )}
    >
      {label}
    </Link>
  );
};

export default LinkItem;