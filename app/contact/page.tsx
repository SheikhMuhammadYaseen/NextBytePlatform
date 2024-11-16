import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FC } from "react";

const Page: FC = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-[1200px] py-10 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 sm:p-12 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-gray-100 uppercase mb-4">
            Get in Touch!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
            Please allow 24 hours for a response.
          </p>

          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://facebook.com"
              className="p-3 bg-sky-500 text-white rounded-full transition-all transform hover:scale-110 hover:bg-sky-400 dark:hover:bg-sky-600"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              className="p-3 bg-sky-500 text-white rounded-full transition-all transform hover:scale-110 hover:bg-sky-400 dark:hover:bg-sky-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://youtube.com"
              className="p-3 bg-sky-500 text-white rounded-full transition-all transform hover:scale-110 hover:bg-sky-400 dark:hover:bg-sky-600"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://instagram.com"
              className="p-3 bg-sky-500 text-white rounded-full transition-all transform hover:scale-110 hover:bg-sky-400 dark:hover:bg-sky-600"
            >
              <AiFillInstagram size={24} />
            </a>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your name"
              className="block w-full rounded-lg text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
            <input
              type="email"
              placeholder="Your email"
              className="block w-full rounded-lg text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className="block w-full rounded-lg text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
          />
          <textarea
            className="block w-full rounded-lg text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 p-4 border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
            placeholder="Your Message"
            style={{ resize: "none" }}
            cols={5}
            rows={6}
          />
          <button
            type="submit"
            className="w-full lg:w-3/4 mx-auto block bg-sky-500 p-4 rounded-lg text-white shadow-lg hover:bg-sky-400 dark:hover:bg-sky-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;