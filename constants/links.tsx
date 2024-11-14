interface Link {
  route: string;
  label: string;
}

export const Links: Link[] = [
  {
    route: "/",
    label: "Home",
  },
  {
    route: "/about",
    label: "About",
  },
  {
    route: "/posts",
    label: "Posts",
  },
  {
    route: "/contact",
    label: "Contact",
  },
];
