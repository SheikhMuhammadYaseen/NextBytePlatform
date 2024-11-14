import Image from "next/image";
import { posts } from "../constants/posts";
import Link from "next/link";
import { FC } from "react";

// Define Post type based on the structure of each post object
interface Post {
  id: number;
  title: string;
  image_url?: string;
  paragraph?: string;
  featured?: boolean;
  tags: string[];
  authorImage?: string;
  authorName?: string;
  publishDate?: string;
}

const Hero: FC = () => {
  const featuredPost = posts.filter((post: Post) => post.featured);
  const topPosts = featuredPost.slice(0, 2);
  const bottomPost = featuredPost.slice(2, 5);

  return (
    <section className="py-5">
      <div className="wrapper">
        <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-x-0 md:gap-x-6 gap-5">
          {topPosts.map((post, index) => (
            <div
              key={index}
              className="group md:px-0 md:col-span-2 lg:col-span-3 overflow-hidden rounded-sm shadow"
            >
              <Link
                href={{
                  pathname: `blog/${post.id}`,
                  query: { ...post },
                }}
              >
                <div className="relative overflow-hidden w-full">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  
                  {/* Text container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
                    <div>
                      <h2 className="text-white text-3xl font-bold mb-2 px-1">
                        {post.title}
                      </h2>
                      <span className="text-gray-50 bg-sky-400 rounded-md px-2">
                        {post.tags.join(", ")}
                      </span>
                    </div>
                    <div className="text-white font-bold text-sm">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>
                  {post.image_url && (
                  <Image
                src={post.image_url}
                alt="blog picture"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                height={400}
                width={400}
                  />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-0 md:gap-x-6 mt-6 gap-5">
          {bottomPost.map((post, index) => (
            <div
              key={index}
              className="group md:px-0 relative rounded-sm overflow-hidden shadow"
            >
              <Link
                href={{
                  pathname: `blog/${post.id}`,
                  query: { ...post },
                }}
              >
                <div className="relative overflow-hidden w-full">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  
                  {/* Text container */}
                  <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
                    <div>
                      <h2 className="text-white text-3xl font-bold mb-2 px-1">
                        {post.title}
                      </h2>
                      <span className="text-gray-50 bg-sky-400 rounded-md px-2">
                        {post.tags.join(", ")}
                      </span>
                    </div>
                    <div className="text-white font-bold text-sm">
                      <span>{post.publishDate}</span>
                    </div>
                  </div>
                  {post.image_url && (
                  <Image
                src={post.image_url}
                alt="blog picture"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                height={400}
                width={400}
                  />
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;