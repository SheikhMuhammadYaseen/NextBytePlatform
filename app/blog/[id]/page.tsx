"use client";

import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const Page: FC = () => {
  const searchParams = useSearchParams();

  const post = useMemo(() => ({
    title: searchParams.get("title") || "Default Title",
    image_url: searchParams.get("image_url") || "/assets/default-image.jpg",
    tags: searchParams.get("tags") || "No tags available",
    authorImage: searchParams.get("authorImage") || "/assets/default-author.jpg",
    authorName: searchParams.get("authorName") || "Anonymous",
    publishDate: searchParams.get("publishDate") || "Unknown Date",
    paragraph: searchParams.get("paragraph") || "No content provided.",
  }), [searchParams]);

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="py-10 bg-cover">
      <div
        className="mx-auto max-w-[1400px] md:w-[90%] bg-cover relative"
        style={{
          backgroundImage: `url(${post.image_url})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 bg-black/40 w-full h-full" />
        <div className="relative p-10 flex justify-center flex-col w-full items-center">
          <span className="bg-sky-400 px-2 text-gray-50 rounded-md">{post.tags}</span>
          <h1 className="text-3xl font-bold text-gray-50 mt-5">{post.title}</h1>
          <div className="w-full flex flex-col justify-center items-center gap-4 text-gray-50">
            <Image
              src={post.authorImage}
              width={300}
              height={300}
              alt="Author"
              className="rounded-full w-40 h-40 object-cover border-sky-400 border-4 mt-5"
            />
            <div className="flex flex-col gap-1 text-center font-bold">
              <span>{post.authorName}</span>
              <span>{post.publishDate}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="wrapper mt-10 text-gray-900 dark:text-gray-50 flex flex-col gap-5">
        <p>{post.paragraph}</p>
      </div>

{/* Comments Section */}
<div className="wrapper mt-10">
  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
    Comments
  </h2>

  <div className="space-y-4">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows={4}
      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
      placeholder="Write a comment..."
    />
    <button
      onClick={handleCommentSubmit}
      className="w-full lg:w-1/2 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 shadow-md transition-all mx-auto block"
    >
      Submit Comment
    </button>
  </div>

  <div className="mt-8 space-y-6">
    {comments.length === 0 ? (
      <p className="text-gray-700 dark:text-gray-300 text-center">
        No comments yet. Be the first to comment!
      </p>
    ) : (
      comments.map((comment, index) => (
        <div
          key={index}
          className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all"
        >
          <img
            src="/assets/comment.png"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-sky-500"
          />
          <div>
            <span className="block font-bold text-sky-500 mb-1">John Doe</span>
            <p>{comment}</p>
          </div>
        </div>
      ))
    )}
  </div>
</div>

    </div>
  );
};

export default Page;