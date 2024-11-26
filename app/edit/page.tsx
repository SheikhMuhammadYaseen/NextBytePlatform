"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { posts, Post } from "../../constants/posts";

const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const formatToInputDate = (date: string | undefined): string => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return parsedDate.toISOString().split("T")[0];
};

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const EditPosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<string>("");

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    setAllPosts(savedPosts ? JSON.parse(savedPosts) : [...posts]);
  }, []);

  const savePostsToLocalStorage = (updatedPosts: Post[]) => {
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setAllPosts(updatedPosts);
  };

  const openEditModal = (post: Post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setCurrentPost(null);
    setIsModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!currentPost) return;
    const { name, value } = e.target;
    setCurrentPost({
      ...currentPost,
      [name]: name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPost) return;
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setCurrentPost({
            ...currentPost,
            [name]: reader.result.toString(),
          });
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
    setTimeout(() => setAlertMessage(null), 15000);
  };

  const handleSaveChanges = () => {
    if (!currentPost) return;

    const { title, paragraph, tags, authorName, publishDate } = currentPost;

    if (!title || !paragraph || !tags.length || !authorName || !publishDate) {
      showAlert("Please fill in all required fields.", "error");
      return;
    }

    const selectedDate = new Date(publishDate);
    const todayDate = new Date(getTodayDate());
    if (selectedDate < todayDate) {
      showAlert("The publish date cannot be earlier than today's date.", "error");
      return;
    }

    const formattedDate = formatDate(publishDate);
    const updatedPosts = allPosts.map((post) =>
      post.id === currentPost.id ? { ...currentPost, publishDate: formattedDate } : post
    );

    savePostsToLocalStorage(updatedPosts);
    showAlert("Post updated successfully!", "success");

    setTimeout(() => {
      closeEditModal();
    }, 2000);
  };

  const alertStyles = alertType === "success"
    ? "bg-green-500 text-white p-4 rounded-md mb-6 shadow-lg"
    : "bg-red-500 text-white p-4 rounded-md mb-6 shadow-lg";

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[1200px] py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 sm:p-12 space-y-8">
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 uppercase text-center mb-8">
          Edit Posts
        </h1>

        {alertMessage && (
          <div className={alertStyles}>
            <p>{alertMessage}</p>
          </div>
        )}

        {allPosts.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">No posts available to edit.</p>
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
                  onClick={() => openEditModal(post)}
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && currentPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-[90%] max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
              onClick={closeEditModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-100 mb-4">Edit Post</h2>
            <form className="space-y-4">
              <input
                type="text"
                name="title"
                value={currentPost.title}
                onChange={handleFormChange}
                placeholder="Post Title"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                name="image_url"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="paragraph"
                value={currentPost.paragraph}
                onChange={handleFormChange}
                placeholder="Post Content"
                rows={5}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="tags"
                value={currentPost.tags.join(", ")}
                onChange={handleFormChange}
                placeholder="Tags (comma-separated)"
                className="w-full p-2 border rounded"
              />
              <input
                type="file"
                name="authorImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="authorName"
                value={currentPost.authorName}
                onChange={handleFormChange}
                placeholder="Author Name"
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="publishDate"
                value={formatToInputDate(currentPost.publishDate)}
                onChange={handleFormChange}
                min={getTodayDate()}
                className="block w-full rounded-lg p-4 border"
              />
              <button
                type="button"
                onClick={handleSaveChanges}
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPosts;