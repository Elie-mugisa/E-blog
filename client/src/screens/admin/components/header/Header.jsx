/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiFillDashboard } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaComments } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

import { useWindowSize } from "@uidotdev/usehooks";

const MENU_ITEMS = [
  {
    index: 1,
    title: "Dashboard",
    link: "/admin",
    icon: <AiFillDashboard className="text-xl" />,
    name: "dashboard",
    type: "link",
  },
  {
    index: 2,
    title: "Comments",
    link: "/admin/comments",
    icon: <FaComments className="text-xl" />,
    name: "comments",
    type: "link",
  },
  {
    index: 3,
    title: "Posts",
    content: [
      { index: 1, title: "New", link: "/admin/posts/new" },
      { index: 2, title: "Manage", link: "/admin/posts/manage" },
    ],
    icon: <MdDashboard className="text-xl" />,
    name: "posts",
    type: "collapse",
  },
];

const Header = ({ className }) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  const isMenuActiveHandler = () => {
    setIsMenuActive((currentState) => {
      return !currentState;
    });
  };

  // useEffect(() => {
  //   if (windowSize.width < 967) {
  //     setIsMenuActive(false);
  //   } else {
  //     setIsMenuActive(true);
  //   }
  // }, [windowSize.width]);

  return (
    <>
      <header className="flex w-full items-start justify-between px-5 md:px-10 lg:hidden">
        {/* logo */}
        <Link
          to={"/"}
          className="block text-3xl font-black font-nunito  text-prim cursor-pointer lg:hidden "
        >
          E<span className=" text-sm">Blog</span>
        </Link>

        {/* hambu */}
        <div className="flex justify-center items-center h-[30px] w-[30px] z-30 lg:hidden">
          {isMenuActive ? (
            <CgClose
              onClick={isMenuActiveHandler}
              className="text-dark-hard h-full w-full "
            />
          ) : (
            <HiOutlineMenuAlt1
              onClick={isMenuActiveHandler}
              className="text-dark-hard   h-full w-full "
            />
          )}
        </div>

        {/* sidebar container */}
        {isMenuActive && (
          <div className="fixed top-10 inset-0 lg:hidden">
            {/* underlay */}
            <div
              onClick={isMenuActiveHandler}
              className="fixed top-10 inset-0 bg-black/30 backdrop-blur-sm  "
            />
            {/* sidebar */}
            <div className="fixed flex flex-col gap-8 top-0 bottom-0 left-0 z-30 w-3/4 overflow-y-auto bg-white pt-0 pl-5 p-4">
              {/* logo */}
              <Link
                to={"/"}
                className="text-3xl font-black font-nunito  text-prim cursor-pointer "
              >
                E<span className=" text-sm">Blog</span>
              </Link>

              {/* main menu */}
              <div className="font-nunito font-bold text-dark-hard/30">
                <h4 className="">MAIN MENU</h4>
              </div>
              {/* menu items */}
              <div className="p-4 flex flex-col gap-y-2 ">
                {MENU_ITEMS.map((item) =>
                  item.type === "link" ? (
                    <NavItem
                      key={item.index}
                      title={item.title}
                      link={item.link}
                      name={item.name}
                      icon={item.icon}
                      activeNavName={activeNavName}
                      setActiveNavName={setActiveNavName}
                    />
                  ) : (
                    <NavItemCollapse
                      key={item.index}
                      title={item.title}
                      content={item.content}
                      name={item.name}
                      icon={item.icon}
                      activeNavName={activeNavName}
                      setActiveNavName={setActiveNavName}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <div className={`hidden ${className}`}>
        {/* sidebar */}
        <div className="fixed bg-prim/5 flex flex-col gap-8 top-0 bottom-0 left-0 z-30 w-[15vw] overflow-y-auto  pt-0 pl-5 p-4">
          {/* logo */}
          <Link
            to={"/"}
            className="text-3xl font-black font-nunito  text-prim cursor-pointer "
          >
            E<span className=" text-sm">Blog</span>
          </Link>

          {/* main menu */}
          <div className="font-nunito font-bold text-dark-hard/30">
            <h4 className="">MAIN MENU</h4>
          </div>
          {/* menu items */}
          <div className="p-4 flex flex-col gap-y-2 ">
            {MENU_ITEMS.map((item) =>
              item.type === "link" ? (
                <NavItem
                  key={item.index}
                  title={item.title}
                  link={item.link}
                  name={item.name}
                  icon={item.icon}
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
              ) : (
                <NavItemCollapse
                  key={item.index}
                  title={item.title}
                  content={item.content}
                  name={item.name}
                  icon={item.icon}
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
