"use client";

import { useState, useEffect } from "react";
import { Post } from "../constants/posts";
import PostsCard from "./PostsCard";
import { posts as defaultPosts } from "../constants/posts";

const LatestPost: React.FC = () => {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  const getPostsFromLocalStorage = (): Post[] => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("posts");
      return savedPosts ? JSON.parse(savedPosts) : [];
    }
    return [];
  };

  useEffect(() => {
    const allPosts = getPostsFromLocalStorage();
    const sortedPosts = allPosts.length > 0 ? allPosts.sort((a, b) => b.id - a.id) : defaultPosts;
    setLatestPosts(sortedPosts.slice(0, 6));
  }, []);

  return (
    <section className="w-full mt-10">
      <div className="wrapper">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-100 px-3 text-gray-900 text-2xl font-semibold dark:bg-medium dark:text-gray-50">
              Latest Post
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 grid-cols-2 max-sm:grid-cols-1 mt-10">
          {latestPosts.map((post: Post, index: number) => (
            <PostsCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPost;