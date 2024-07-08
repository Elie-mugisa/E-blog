/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ArticleCard from "../../../components/ArticleCard";
// import avatar from "../../../assets/66.jpg";

import { FaArrowRight } from "react-icons/fa";

// import photo1 from "../../../assets/11.jpg";
// import photo5 from "../../../assets/55.jpg";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/post";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Article = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <section
      className={` py-5 flex flex-col justify-center text-center gap-8  px-5 lg:py-10 lg:px-10`}
    >
      <div className="px-10 space-y-2 pb-6 lg:mb-16 lg:space-y-4 lg:px-20">
        <h1 className="text-dark-hard font-nunito text-xl font-bold lg:text-3xl ">
          Read from herer
        </h1>
        <p className="text-sm text-dark-soft/60 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad esse odio
          voluptas rem eius aliquam omnis error eveniet mollitia quos eos saepe
          non praesentium voluptatum excepturi atque, ratione aspernatur
          suscipit.
        </p>
      </div>

      <div className="flex gap-8">
        {isLoading ? (
          [...Array(3)].map((item, index) => (
            <ArticleCardSkeleton
              key={index}
              className={
                "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] "
              }
            />
          ))
        ) : isError ? (
          <ErrorMessage
            message={"Un problem survenu lors de téléchragement des posts"}
          />
        ) : (
          data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className={
                "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              }
            />
          ))
        )}
      </div>

      {/* btn see more */}
      <button className="border-2 border-prim  mx-auto flex items-center text-prim font-semibold gap-2 rounded-lg px-5 py-2 hover:bg-prim hover:text-white ">
        <span>More articles</span>
        <FaArrowRight />
      </button>
    </section>
  );
};

export default Article;
