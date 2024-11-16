import Image from "next/image";

const Page: React.FC = () => {
  return (
    <div className="py-10">
      <div className="wrapper flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Our Story
        </h1>
        <Image src="/assets/about.jpg" width={600} height={600} alt="about us" className="rounded-md" />
        
        <div className="max-w-[600px] text-center text-black dark:text-gray-50 space-y-4">
          <p>
            Welcome to NextByte – where technology meets tomorrow! Our journey started with a simple goal: to decode the fast-paced world of technology and make it accessible, exciting, and relevant for everyone. Founded by a group of tech enthusiasts, NextByte was born out of a shared passion for innovation and a curiosity to explore what’s next in tech.
          </p>
          <p>
            From the latest gadgets and software breakthroughs to industry trends and in-depth guides, we’re here to bring you fresh insights and trusted information. We believe that technology has the power to shape the world, and we’re on a mission to keep our readers informed, empowered, and inspired.
          </p>
          <p>
            At NextByte, we go beyond just reporting on tech news – we dive into the why and the how, delivering articles that are both insightful and easy to understand. Every byte of information we share is thoughtfully crafted with our readers in mind, helping you stay ahead in an ever-evolving digital landscape.
          </p>
          <p>
            Thank you for being a part of our journey. Here’s to discovering the next big thing, byte by byte!
          </p>
        </div>
        
        <Image src="/assets/signature.png" width={400} height={400} alt="tech pulse" />
      </div>
    </div>
  );
};

export default Page;