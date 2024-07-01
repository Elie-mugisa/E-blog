/* eslint-disable react/jsx-key */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import BreadCrumbs from "../../components/BreadCrumbs";
import MainLayout from "../../components/MainLayout";
import imageDetail from "../../assets/11.jpg";
import { Link, useParams } from "react-router-dom";
import SuggestedPost from "./container/SuggestedPost";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareBtn from "../../components/SocialShareBtn";
import stables from "./../../constants/stables";
import samplePic from "/images/sampleImage.png";
import { getSinglePost } from "../../services/index/post";
import { useEffect, useState } from "react";

import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
// Option 2: Browser-only (lightweight)
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";

import { useQuery } from "@tanstack/react-query";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import toast from "react-hot-toast";
import parse from "html-react-parser";

// const breadCrumbsData = [
//   { name: "home", link: "/" },
//   { name: "blog", link: "/blog" },
//   { name: "Article title", link: "/blog/1" },
// ];

const postData = [
  {
    id: "1",
    image: imageDetail,
    title: "Help Children get better life",
    createdAt: "2024-01-28T15:35:52.607+0000",
  },
  {
    id: "2",
    image: imageDetail,
    title: "Help Children get better life",
    createdAt: "2024-01-28T15:35:52.607+0000",
  },
  {
    id: "3",
    image: imageDetail,
    title: "Help Children get better life",
    createdAt: "2024-01-28T15:35:52.607+0000",
  },
  {
    id: "4",
    image: imageDetail,
    title: "Help Children get better life",
    createdAt: "2024-01-28T15:35:52.607+0000",
  },
  {
    id: "5",
    image: imageDetail,
    title: "Help Children get better life",
    createdAt: "2024-01-28T15:35:52.607+0000",
  },
];

const tagsData = ["Medical", "Lifestyle", "Learn", "Food", "Diet", "Educatio"];

const ArticleDetail = () => {
  const { slug } = useParams();
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
  });

  useEffect(() => {
    if (isSuccess) {
      setBreadCrumbsData([
        { name: "home", link: "/" },
        { name: "blog", link: "/blog" },
        { name: "Article title", link: `/blog/${data.slug}` },
      ]);

      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
    }
  }, [data]);

  // console.log(data.body);

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleCardSkeleton />
      ) : isError ? (
        <ErrorMessage
          message={"Erreur servenue lors de telechargement de la page"}
        />
      ) : (
        <section className="container mx-auto flex flex-col p-5 max-w-5xl lg:flex-row lg:items-start lg:gap-8 ">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <div className="w-full border border-prim rounded-md h-[50vh] ">
              <img
                src={
                  data?.photo
                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                    : samplePic
                }
                alt={data?.title}
                className="rounded-xl h-full w-full object-cover  "
              />
            </div>

            <div className="mt-4 flex gap-2 ">
              {data?.categories.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="text-prim text-sm font-roboto inline-block mt-4 font-bold  md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <h1 className="font-roboto text-xl font-medium mt-4 text-dark-light md:text-[26px] ">
              {data?.title}
            </h1>

            <div className="mt-4 prose prose-sm sm:prose-base ">{body}</div>

            {/* comments */}
            <CommentsContainer className="mt-10" logginedUserId="a" />
          </article>

          {/* Social media box */}
          <div className="flex flex-col gap-8 sticky -top-24 ">
            <SuggestedPost
              header="Latest Article"
              posts={postData}
              tags={tagsData}
              className="mt-8 lg:p-0 lg:max-w-xs "
            />

            <div>
              <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl  ">
                Share on:
              </h2>
              <SocialShareBtn
                url={encodeURI(
                  "https://moonfo.com/post/client-side-and-server-side-explanation"
                )}
                title={encodeURIComponent("Client-side and server-side")}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetail;
