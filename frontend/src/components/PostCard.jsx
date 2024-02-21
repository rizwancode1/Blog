import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

function PostCard({ slug, title, featured_image, content, author, author_id }) {
  return (
    <div className="max-w-sm max-h-3/4 break-words border border-gray-800/50 rounded-lg shadow">
      <img className="rounded-t-lg" src={featured_image} alt="" />

      <div className="p-3">
        <h5 className=" text-xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>

        <div className="mb-3  font-normal text-gray-700 flex">
          {parse(content.substring(0, 30))} <b>...</b>
        </div>
        <Link
          to={`/detail/${slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
