"use client";
import { useState } from "react";
import { posts, Post } from "../constants/posts";
import PostsCard from "./PostsCard";
import PostFilter from "./PostFilter";

const Posts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [filtered, setFiltered] = useState<Post[]>(posts); // Use the consistent Post type

  return (
    <div className="w-full h-fit">
      <div className="wrapper">
        <PostFilter
          setFiltered={setFiltered}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          {filtered.map((post, index) => (
            <PostsCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="py-10">
          {filtered.length > 6 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setFiltered((prev) => prev.concat(posts.slice(filtered.length, filtered.length + 4)))}
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
