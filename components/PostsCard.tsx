import Link from "next/link";
import Image from "next/image";
import { Post } from "../constants/posts";

interface PostsCardProps {
  post: Post;
  index: number;
}

const PostsCard: React.FC<PostsCardProps> = ({ post, index }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <div
        key={index}
        className="group relative dark:bg-dark rounded-sm overflow-hidden shadow-xl transition-transform duration-300 hover:shadow-2xl h-[450px] flex flex-col justify-between"
      >
        <div className="relative w-full h-[250px] overflow-hidden">
          <Image
            src={post.image_url || "/path/to/default/image.jpg"}
            alt={`Image for ${post.title}`}
            layout="fill"
            objectFit="cover"
            className="rounded-sm transform transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-40"></div>
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="px-3 inline-block text-gray-50 bg-sky-400 rounded-md whitespace-nowrap">
              {post.tags.join(", ")}
            </div>
            <div className="text-xl mt-3 text-gray-900 font-bold dark:text-white line-clamp-2">
              {post.title}
            </div>
            <p className="mt-3 dark:text-white text-gray-900 text-sm line-clamp-3">
              {post.paragraph ? `${post.paragraph.substring(0, 150)}...` : ""}
            </p>
          </div>
          <div className="flex mt-4 gap-3 items-center">
            <Image
              src={post.authorImage || "/path/to/default/author.jpg"}
              width={40}
              height={40}
              alt={`Image of author ${post.authorName}`}
              className="rounded-full object-cover w-10 h-10 border-2 border-sky-400"
            />
            <div className="flex gap-2 dark:text-white text-gray-500 text-sm">
              <span>{post.authorName}</span>
              <span>⋅</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostsCard;