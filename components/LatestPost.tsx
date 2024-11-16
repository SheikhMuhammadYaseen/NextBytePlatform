import { posts, Post } from "../constants/posts";
import PostsCard from "./PostsCard";

const LatestPost: React.FC = () => {
  return (
    <section className="w-full mt-10">
      <div className="wrapper">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-400" /> {/* Lighter border */}
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-100 px-3 text-gray-900 text-2xl font-semibold dark:bg-medium dark:text-gray-50">
              Latest Post
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-10 grid-cols-2 max-sm:grid-cols-1 mt-10">
          {posts.slice(7, 13).map((post: Post, index: number) => (
            <PostsCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestPost;