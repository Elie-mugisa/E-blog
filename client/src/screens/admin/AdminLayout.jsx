/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/user";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        console.log("Oupssss! not an admin");
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (!profileData?.admin) {
        navigate("/");
        toast.error("Vous n'êtes pas autorisé(e), seul les admins!");
      }
    }

    if (isError) {
      if (!profileData?.admin) {
        navigate("/");
        toast.error("Vous n'êtes pas autorisé(e), seul les admins!");
      }
    }
  }, [profileData?.admin, isSuccess, isError, navigate]);

  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-500">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen lg:flex-row">
      <Header className={" lg:block "} />
      <main className="  min-h-screen p-2 lg:ml-60  ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
