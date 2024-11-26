"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { posts, deletePost, Post } from "../../constants/posts";

const DeletePosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<string>("");

  useEffect(() => {
    setAllPosts([...posts]);
  }, []);

  const openDeletePopup = (post: Post) => {
    setCurrentPost(post);
    setIsPopupOpen(true);
  };

  const closeDeletePopup = () => {
    setCurrentPost(null);
    setIsPopupOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (currentPost) {
      deletePost(currentPost.id);
      setAllPosts([...posts]);
      setAlertMessage("Post deleted successfully!");
      setAlertType("success");
      closeDeletePopup();
    }
  };

  const alertStyles = alertType === "success" 
    ? "bg-green-500 text-white" 
    : "bg-red-500 text-white";

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[1200px] py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 sm:p-12 space-y-8">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 uppercase text-center mb-8">
          Delete Posts
        </h1>

        {alertMessage && (
          <div className={`p-4 rounded-lg ${alertStyles} mb-6`}>
            <p>{alertMessage}</p>
          </div>
        )}

        {allPosts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">No posts available to delete.</p>
        ) : (
          <div className="space-y-4">
            {allPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <Link href={`/blog/${post.id}`}>
                  <Image
                      src={post.image_url || "https://via.placeholder.com/80"}
                      alt={post.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                    />
                  </Link>
                  <div>
                    <Link href={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 cursor-pointer">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{post.publishDate}</p>
                  </div>
                </div>

                <button
                  onClick={() => openDeletePopup(post)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && currentPost && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-[90%] max-w-md relative">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center">
              Do you want to delete this blog permanently?
            </h2>
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={closeDeletePopup}
                className="px-4 py-2 bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                No
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePosts;