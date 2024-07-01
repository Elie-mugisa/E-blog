/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { LuBadgeCheck } from "react-icons/lu";
import stables from "./../constants/stables";
import samplePic from "/images/sampleImage.png";
import { Link } from "react-router-dom";

const ArticleCard = ({ className, post }) => {
  return (
    <div className={`${className} rounded-xl overflow-hidden shadow-lg `}>
      {/* photo */}
      <Link to={`/blog/${post.slug}`}>
        <div className="wf-full relative h-[20vh] lg:h-[30vh] ">
          <img
            src={
              post.photo
                ? stables.UPLOAD_FOLDER_BASE_URL + post.photo
                : samplePic
            }
            alt="picture1"
            className="w-full object-cover object-center h-full "
          />
        </div>
      </Link>
      {/* text */}
      <div className="p-5">
        {/* titre */}
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto font-bold text-dark-soft text-xl ">
            {post.title}
          </h2>
          {/* para */}
          <p className="text-sm mt-3 text-dark-light">{post.caption}</p>
        </Link>

        {/*  */}
        <div className="mt-6 flex justify-between items-center">
          {/* auth profil */}
          <div className="flex items-center gap-3">
            {/* ico */}
            <div className="h-10 w-10 bg-dark-soft rounded-full overflow-hidden ">
              <img
                src={
                  post.user.avatar
                    ? stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar
                    : samplePic
                }
                alt="User"
                className="w-full h-full object-cover "
              />
            </div>
            {/* name */}
            <div className="flex flex-col ">
              <h2 className="  text-start font-nunito font-bold text-dark-hard   text-sm lg:text-lg ">
                {post.user.name}
              </h2>
              <div className="flex items-center gap-2">
                <p className="italic text-xs text-dark-light  ">
                  Ecrivain{" "}
                  {post.user.verified ? "verifié(e)" : "non verifié(e)"}
                </p>
                {/* ico */}
                <div className="h-4 w-4 flex justify-center items-center rounded-full ">
                  <LuBadgeCheck
                    className={`${
                      post.user.verified ? "text-green-400" : "text-red-400"
                    } h-full w-full `}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* date */}
          <div className="text-dark-light font-semibold text-sm ">
            {new Date(post.createdAt).getDate()}
            {"  "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
