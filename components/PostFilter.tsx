"use client";
import { useEffect } from "react";
import clsx from "clsx";
import { posts, Post } from "../constants/posts";

interface PostFilterProps {
  setFiltered: React.Dispatch<React.SetStateAction<Post[]>>;
  setActiveCategory: (category: string) => void;
  activeCategory: string;
}

const PostFilter: React.FC<PostFilterProps> = ({
  setFiltered,
  setActiveCategory,
  activeCategory,
}) => {
  useEffect(() => {
    if (activeCategory === "all") {
      setFiltered(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.tags?.includes(activeCategory)
      );
      setFiltered(filtered);
    }
  }, [activeCategory, setFiltered]);

  return (
    <div className="flex gap-5 my-10 flex-wrap justify-center text-gray-900 dark:text-white">
      <button
        className={clsx(
          "py-1 px-3",
          activeCategory === "all" ? "bg-sky-400 text-white rounded-md" : "text-gray-900 dark:text-white"
        )}
        onClick={() => setActiveCategory("all")}
      >
        All
      </button>
      <button
        className={clsx(
          "py-1 px-3",
          activeCategory === "web development"
            ? "bg-sky-400 text-white rounded-md"
            : "text-gray-900 dark:text-white"
        )}
        onClick={() => setActiveCategory("web development")}
      >
        Web Development
      </button>
      <button
        className={clsx(
          "py-1 px-3",
          activeCategory === "cybersecurity"
            ? "bg-sky-400 text-white rounded-md"
            : "text-gray-900 dark:text-white"
        )}
        onClick={() => setActiveCategory("cybersecurity")}
      >
        Cybersecurity
      </button>
      <button
        className={clsx(
          "py-1 px-3",
          activeCategory === "mobile development"
            ? "bg-sky-400 text-white rounded-md"
            : "text-gray-900 dark:text-white"
        )}
        onClick={() => setActiveCategory("mobile development")}
      >
        Mobile Development
      </button>
      <button
        className={clsx(
          "py-1 px-3",
          activeCategory === "artificial intelligence"
            ? "bg-sky-400 text-white rounded-md"
            : "text-gray-900 dark:text-white"
        )}
        onClick={() => setActiveCategory("artificial intelligence")}
      >
        AI
      </button>
    </div>
  );
};

export default PostFilter;
