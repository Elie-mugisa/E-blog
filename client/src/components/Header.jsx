/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
import { Link, useNavigate } from "react-router-dom";

const NavItemInfo = [
  { index: 1, name: "Home", type: "link", href: "/" },
  { index: 2, name: "Articles", type: "link", href: "articles" },
  {
    index: 3,
    name: "Pages",
    type: "dropdown",
    items: [
      { index: 1, title: "About us", href: "/about" },
      { index: 2, title: "Contact us", href: "/contact" },
    ],
  },
  { index: 4, name: "Pricing", type: "link", href: "pricing" },
  { index: 5, name: "Faq", type: "link", href: "faq" },
];

const NavItems = ({ item, className = "" }) => {
  return (
    <li className={` ${className}  relative group`}>
      {item.type === "link" ? (
        <>
          {" "}
          <Link to={item.href}>{item.name}</Link>
          <span
            className={`text-sky-500 font-black rounded-3xl opacity-0 absolute right-0 top-0 transition-all duration-500 group-hover:opacity-100 group-hover:right-[110%] `}
          >
            /
          </span>
        </>
      ) : (
        <div className=" flex items-center gap-1">
          <a href="/">{item.name}</a>
          <MdKeyboardArrowDown className="cursor-pointer  transition-all group-hover:transform group-hover:rotate-180" />
          <div className="hidden z-50 bg-dark-hard  transition-all duration-500 pt-2 absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max rounded-lg lg:bg-white ">
            <ul className="flex flex-col w-max shadow-lg rounded-lg ">
              {item.items.map((page) => (
                <Link
                  key={page.index}
                  to={page.href}
                  className="hover:bg-dark-hard hover:text-white rounded-lg px-4 py-2 text-white lg:text-dark-soft text-xs"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(true);
  const userState = useSelector((state) => state.user);
  const [profileDropDown, setProfileDropDown] = useState(false);

  const navIsVisibleHandler = () => {
    setNavIsVisible((currentState) => {
      return !currentState;
    });
  };

  const logoutHandler = () => {
    // console.log("Logged out!!");
    dispatch(logout());
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-40">
      <header className=" bg-white flex justify-between items-center px-10 py-4 ">
        {/* logo */}
        <Link
          to={"/"}
          className="text-3xl font-black font-nunito  text-prim cursor-pointer "
        >
          E<span className=" text-sm">Blog</span>
        </Link>

        {/* hambu */}
        <div className="flex justify-center items-center h-[30px] w-[30px] lg:hidden ">
          {navIsVisible ? (
            <HiOutlineMenuAlt1
              onClick={navIsVisibleHandler}
              className="text-dark-hard   h-full w-full "
            />
          ) : (
            <CgClose
              onClick={navIsVisibleHandler}
              className="text-dark-hard   h-full w-full "
            />
          )}
        </div>

        {/* menu */}
        <div className=" hidden gap-10 lg:flex  ">
          <ul className="flex items-center gap-x-8">
            {NavItemInfo.map((item) => (
              <NavItems key={item.index} item={item} />
            ))}
          </ul>

          {/* btn sign in */}
          {userState.userInfo ? (
            <div className="flex flex-col gap-4  text-dark-harditems-center group  gap-x-8 ">
              <div className=" flex items-center gap-1">
                <button
                  className="px-4 py-2 flex gap-x-1 items-center"
                  onClick={() => setProfileDropDown(!profileDropDown)}
                >
                  <span className="text-dark-hard  ">Profile</span>
                  <MdKeyboardArrowDown
                    className={`cursor-pointer  transition-all group-hover:transform ${
                      profileDropDown ? "group-hover:rotate-180" : ""
                    } `}
                  />
                </button>

                <div
                  className={` ${
                    profileDropDown ? "block" : "hidden"
                  }  z-50 bg-dark-hard transition-all duration-500  absolute bottom-3 right-8 transform translate-y-full  flex items-start   w-max rounded-lg lg:bg-white  `}
                >
                  <ul className="flex flex-col w-max shadow-lg  rounded-lg ">
                    <button
                      onClick={() => navigate("/profile")}
                      type="button"
                      className="hover:bg-dark-hard rounded-t-lg hover:text-white px-4 py-2 text-white lg:text-dark-soft text-xs"
                    >
                      Profile Page
                    </button>
                    <button
                      onClick={logoutHandler}
                      type="button"
                      className="hover:bg-dark-hard rounded-b-lg hover:text-white px-4 py-2 text-white lg:text-dark-soft text-xs"
                    >
                      Se Deconneter
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="border transition-all duration-500  border-prim  text-prim  px-6 py-1.5 rounded-3xl hover:bg-gradient-to-r from-prim to-purple-500 hover:text-white "
            >
              Se Connecter
            </button>
          )}
        </div>
      </header>

      {/* MENU MOBILE */}
      <div
        className={` ${
          navIsVisible ? "-right-full opacity-0" : "right-0 opacity-100 "
        } fixed transition-all flex flex-col px-10 justify-around bg-dark-hard w-full z-10 h-[60vh] l`}
      >
        <ul className="flex flex-col gap-4 text-white  items-center gap-x-8">
          {NavItemInfo.map((item) => (
            <NavItems key={item.index} item={item} className="text-lg " />
          ))}
        </ul>

        {/* btn sign in */}
        {userState.userInfo ? (
          <div className="flex flex-col gap-4 text-white  items-center gap-x-8 lg:text-dark-soft">
            <div className=" flex items-center gap-1">
              {/* <a href="/">{item.name}</a> */}
              <button
                className="px-4 py-2 flex gap-x-1 items-center"
                onClick={() => setProfileDropDown(!profileDropDown)}
              >
                <span>Profile</span>
                <MdKeyboardArrowDown className="cursor-pointer  transition-all group-hover:transform group-hover:rotate-180" />
              </button>

              <div
                className={` ${
                  profileDropDown ? "block" : "hidden"
                }  z-50 bg-dark-hard overflow-hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max rounded-lg lg:bg-white `}
              >
                <ul className="flex flex-col w-max shadow-lg rounded-lg ">
                  <button
                    onClick={() => navigate("/profile")}
                    type="button"
                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft text-xs"
                  >
                    Profile Page
                  </button>
                  <button
                    onClick={logoutHandler}
                    type="button"
                    className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft text-xs"
                  >
                    Se Deconneter
                  </button>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="border transition-all duration-500  border-prim  bg-prim  text-white px-6 py-2 rounded-3xl"
          >
            Se Connecter
          </button>
        )}
      </div>
    </section>
  );
};

export default Header;
