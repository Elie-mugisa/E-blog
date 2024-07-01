/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const SuggestedPost = ({ className, header, posts = [], tags = [] }) => {
  return (
    <div className={`w-full shadow-lg rounded-lg p-4 lg:p-5  ${className} `}>
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl ">{header}</h2>

      {/* latest */}
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-1 ">
        {posts.map((item) => (
          <div
            key={item.id}
            className="flex items-center flex-nowrap space-x-3"
          >
            <img
              src={item.image}
              alt="caffee"
              className="aspect-square object-cover rounded-lg w-1/5  "
            />

            <div className="text-sm font-nunito text-dark-hard font-medium">
              <h3 className=" text-sm font-roboto text-dark-hard font-medium md:text-base">{item.title}</h3>
              <span className="text-xs opacity-60 ">
                {new Date(item.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* tags */}
      <h2 className="mt-8 font-medium text-dark-hard  ">Tags</h2>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <Link
            key={tag}
            to={"/"}
            className="inline-block rounded-md px-3 py-1.5 bg-prim font-nunito text-xs text-white md:text-sm "
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPost;
