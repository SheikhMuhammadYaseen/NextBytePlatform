"use client";
import { useState } from "react";
import { posts, Post } from "../constants/posts";
import PostsCard from "./PostsCard";
import PostFilter from "./PostFilter";

const Posts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filtered, setFiltered] = useState<Post[]>(posts);
  const [visibleCount, setVisibleCount] = useState<number>(6); 
  const visiblePosts = filtered.slice(0, visibleCount);

  return (
    <div className="w-full h-fit">
      <div className="wrapper">
        <PostFilter
          setFiltered={setFiltered}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {visiblePosts.map((post, index) => (
            <PostsCard key={post.id} post={post} index={index} /> 
          ))}
        </div>

        <div className="py-10">
          {filtered.length > visibleCount && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 4)}
                className="bg-sky-400 hover:bg-sky-200 py-2 px-4 text-white rounded-md"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;