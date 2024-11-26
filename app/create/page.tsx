"use client";

import { useState } from "react";
import { addPost, Post } from "../../constants/posts";

const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const CreatePost = () => {
  const [formData, setFormData] = useState<Omit<Post, "id">>({
    title: "",
    image_url: "",
    paragraph: "",
    tags: [],
    authorImage: "",
    authorName: "",
    publishDate: "",
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "tags" ? value.split(",").map((tag) => tag.trim()) : value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          [name]: reader.result as string,
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.paragraph && formData.authorName && formData.publishDate) {
      const formattedDate = formatDate(formData.publishDate);

      addPost({
        id: Date.now(),
        ...formData,
        publishDate: formattedDate,
      });

      setAlertMessage("Post added successfully!");
      setAlertType("success");

      setFormData({
        title: "",
        image_url: "",
        paragraph: "",
        tags: [],
        authorImage: "",
        authorName: "",
        publishDate: "",
      });
    } else {
      setAlertMessage("Please fill in all required fields.");
      setAlertType("error");
    }
  };

  const alertStyles = alertType === "success" 
    ? "bg-green-500 text-white" 
    : "bg-red-500 text-white";

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[1200px] py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 sm:p-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 uppercase mb-4">
            Create a Post
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Share your thoughts with the world!
          </p>
        </div>

        {alertMessage && (
          <div className={`p-4 rounded-lg ${alertStyles} mb-6`}>
            <p>{alertMessage}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full rounded-lg p-4 border"
          />
          <input
            type="file"
            name="image_url"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full rounded-lg p-4 border"
          />
          <textarea
            name="paragraph"
            value={formData.paragraph}
            onChange={handleChange}
            placeholder="Write your content here"
            rows={6}
            className="block w-full rounded-lg p-4 border"
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma-separated)"
            value={formData.tags.join(", ")}
            onChange={handleChange}
            className="block w-full rounded-lg p-4 border"
          />
          <input
            type="file"
            name="authorImage"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full rounded-lg p-4 border"
          />
          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={formData.authorName}
            onChange={handleChange}
            className="block w-full rounded-lg p-4 border"
          />
          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            min={getTodayDate()}
            className="block w-full rounded-lg p-4 border"
          />
          <button type="submit" className="block w-full bg-blue-500 text-white p-4 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;