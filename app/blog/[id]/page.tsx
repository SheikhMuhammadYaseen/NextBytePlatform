"use client";

import Image from "next/image";
import { FC, useState, useEffect, useCallback } from "react";

interface BlogPageProps {
  params: { id: string };
  searchParams: {
    image_url?: string;
    tags?: string;
    title?: string;
    authorImage?: string;
    authorName?: string;
    publishDate?: string;
    paragraph?: string;
  };
}

interface Comment {
  text: string;
  profileImage: string;
  replies: Comment[];
}

const Page: FC<BlogPageProps> = ({ params, searchParams }) => {
  const post = searchParams;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [replyText, setReplyText] = useState<string>("");
  const [replyingTo, setReplyingTo] = useState<{ index: number; replyIndex?: number } | null>(null);

  const profileImages = [
    "/assets/profile1.png",
    "/assets/profile2.png",
    "/assets/profile3.png",
    "/assets/profile4.png",
  ];

  useEffect(() => {
    if (replyingTo) {
      setReplyText("");
    }
  }, [replyingTo]);

  const handleAddComment = useCallback(() => {
    if (newComment.trim()) {
      const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
      setComments((prevComments) => [
        ...prevComments,
        { text: newComment, profileImage: randomImage, replies: [] },
      ]);
      setNewComment("");
    }
  }, [newComment, profileImages]);

  const handleAddReply = useCallback(() => {
    if (replyText.trim() && replyingTo !== null) {
      const randomImage = profileImages[Math.floor(Math.random() * profileImages.length)];
      setComments((prevComments) => {
        const updatedComments = [...prevComments];

        if (replyingTo.replyIndex !== undefined) {
          updatedComments[replyingTo.index].replies[replyingTo.replyIndex].replies.push({
            text: replyText,
            profileImage: randomImage,
            replies: [],
          });
        } else {
          updatedComments[replyingTo.index].replies.push({
            text: replyText,
            profileImage: randomImage,
            replies: [],
          });
        }

        return updatedComments;
      });
      setReplyingTo(null);
    }
  }, [replyText, replyingTo, profileImages]);

  return (
    <div className="py-10 bg-cover">
      <div
        className="mx-auto max-w-[1400px] md:w-[90%] bg-cover relative"
        style={{
          backgroundImage: `url(${post.image_url})`,
          backgroundPosition: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 bg-black/40 w-full h-full" />
        <div className="relative p-10 flex justify-center flex-col w-full items-center">
          <span className="bg-sky-400 px-2 text-gray-50 rounded-md">
            {post.tags}
          </span>
          <h1 className="text-3xl font-bold text-gray-50 mt-5">{post.title}</h1>
          <div className="w-full flex flex-col justify-center items-center gap-4 text-gray-50">
            <Image
              src={post.authorImage || ""}
              width={300}
              height={300}
              alt="author"
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
      <div className="comments-section mt-10 p-5 bg-gray-100 dark:bg-gray-800 rounded-md max-w-[90%] mx-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-50">Comments</h2>
        <div className="mb-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4 text-gray-900 dark:text-gray-50">
                <div className="flex items-center gap-3 mb-2">
                  <Image
                    src={comment.profileImage}
                    width={40}
                    height={40}
                    alt="profile"
                    className="rounded-full"
                  />
                  <span>{comment.text}</span>
                  <button
                    className="ml-auto text-blue-500 dark:text-blue-300"
                    onClick={() => setReplyingTo({ index })}
                  >
                    Reply
                  </button>
                </div>
                {comment.replies.length > 0 && (
                  <div className="ml-10 text-gray-800 dark:text-gray-50">
                    {comment.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="mb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <Image
                            src={reply.profileImage}
                            width={30}
                            height={30}
                            alt="profile"
                            className="rounded-full"
                          />
                          <span>{reply.text}</span>
                          <button
                            className="ml-auto text-blue-500 dark:text-blue-300"
                            onClick={() =>
                              setReplyingTo({ index, replyIndex })
                            }
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {replyingTo && replyingTo.index === index && (
                  <div className="ml-10 flex gap-2 mt-2">
                    <input
                      type="text"
                      className="flex-1 p-2 border border-gray-300 rounded text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-700"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-400"
                      onClick={handleAddReply}
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-900 dark:text-gray-50">No comments yet. Be the first to comment!</p>
          )}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded text-gray-900 dark:text-gray-50 bg-white dark:bg-gray-700"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-400"
            onClick={handleAddComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
