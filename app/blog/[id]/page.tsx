"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post, posts } from "../../../constants/posts";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const BlogPost = ({ params }: PageProps) => {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const { id } = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      const postId = Number(id);

      const savedPosts = localStorage.getItem("posts");
      const allPosts: Post[] = savedPosts ? JSON.parse(savedPosts) : posts;
      const selectedPost = allPosts.find((p) => p.id === postId);

      if (!selectedPost) {
        router.push("/404");
        return;
      }

      setPost(selectedPost);

      const savedComments = localStorage.getItem(`comments_${postId}`);
      setComments(savedComments ? JSON.parse(savedComments) : []);
    };

    fetchPost();
  }, [id, router]);

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setNewComment("");

      if (post) {
        localStorage.setItem(`comments_${post.id}`, JSON.stringify(updatedComments));
      }
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const postId = Number(id);

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
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag: string, index: number) => (
              <span key={index} className="px-3 py-1 bg-sky-500 text-white rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-50 mt-5 text-center">
            {post.title}
          </h1>
          <div className="w-full flex flex-col justify-center items-center gap-4 text-gray-50">
            <img
              src={post.authorImage || "/assets/default-author.jpg"}
              alt={post.authorName}
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
        <p className="prose lg:prose-lg dark:prose-invert">{post.paragraph}</p>
      </div>

      <div className="wrapper mt-12">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Related Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts
            .filter((p) => p.id !== postId)
            .slice(0, 3)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="w-full h-[200px] overflow-hidden">
                  <img
                    src={relatedPost.image_url || "https://via.placeholder.com/150"}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-sky-500 transition-all">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {relatedPost.paragraph}
                  </p>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold text-lg">Read More</span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className="wrapper mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Comments</h2>
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
            <p className="text-gray-700 dark:text-gray-300 text-center">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-300 dark:border-gray-600 shadow-md hover:shadow-lg transition-all"
              >
                <Image
                  src="/assets/user.png"
                  alt="User Avatar"
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-sky-500"
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

export default BlogPost;