import Image from "next/image";

const Page: React.FC = () => {
  return (
    <div className="py-10">
      <div className="wrapper flex flex-col gap-5 justify-center items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
          Our Journey
        </h1>
        <Image src="/assets/about.jpg" width={600} height={600} alt="about us" className="rounded-md" />
        
        <div className="max-w-[600px] text-center text-black dark:text-gray-50 space-y-4">
          <p>
            Welcome to NextByte – where technology meets tomorrow! Our mission is simple: to make the fast-changing world of technology accessible and relevant for everyone. Founded by tech enthusiasts, NextByte was created from a shared passion for innovation and a curiosity to explore what’s next in tech.
          </p>
          <p>
            Sign up on our platform to share your thoughts with the world! Once registered, you can easily create, edit, update, or delete your posts as needed.
          </p>
          <p>
          From the latest gadgets and software breakthroughs to industry trends and practical guides, we’re here to provide you with fresh insights and trusted information. At NextByte, we go beyond just reporting tech news – we explore the why and how, crafting articles that are both insightful and easy to understand.
          </p>
          <p className="mb-2">
            Thank you for being part of our journey. Together, let’s discover the next big thing, byte by byte!
          </p>
        </div>        
        <Image src="/assets/signature.png" width={400} height={400} alt="tech pulse" />
      </div>
    </div>
  );
};

export default Page;