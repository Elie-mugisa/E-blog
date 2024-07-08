/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import stables from "../../../constants/stables";
import sampleImg from "../../../../public/images/sampleImage.png";

const SuggestedPost = ({ className, header, posts = [], tags = [] }) => {
  return (
    <div className={`w-full shadow-lg rounded-lg p-4 lg:p-5  ${className} `}>
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl ">
        {header}
      </h2>

      {/* latest */}
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-5 lg:grid-cols-1 ">
        {posts.map((item) => (
          <div
            key={item.id}
            className="flex items-center flex-nowrap space-x-3"
          >
            <img
              src={
                item?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo
                  : sampleImg
              }
              alt="caffee"
              className="aspect-square object-cover rounded-lg w-1/5  "
            />

            <div className="text-sm font-nunito text-dark-hard font-medium">
              <h3 className=" text-sm font-roboto text-dark-hard font-medium md:text-base">
                <Link to={`/blog/${item.slug}`}>{item.title}</Link>
              </h3>
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
      {tags.length === 0 ? (
        <p className=" mt-3 text-sm text-dark-hard/50   ">
          Aucun tag pour ce post
        </p>
      ) : (
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
      )}
    </div>
  );
};

export default SuggestedPost;
