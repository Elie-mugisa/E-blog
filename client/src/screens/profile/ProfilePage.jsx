/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import MainLayout from "./../../components/MainLayout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfile } from "../../services/index/user";
import ProfilePicture from "../../components/ProfilePicture";
import toast from "react-hot-toast";
import { userActions } from "../../store/reducers/userReducers";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);

  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ["profile"],
  });

  // use mutation, updating
  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password },
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Profile mis en jour avec succée!");
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    values: {
      name: profileIsLoading ? "" : profileData.name,
      email: profileIsLoading ? "" : profileData.email,
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  // console.log(errors);

  return (
    <div>
      <MainLayout>
        <section className=" relative container mx-auto px-5  py-10">
          <div className="w-full min-h-[69.5vh]  max-w-sm mx-auto">
            <ProfilePicture avatar={profileData?.avatar} />

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="flex flex-col gap-6"
            >
              {/* name */}
              <div className={`flex flex-col relative w-full  `}>
                <label
                  htmlFor="name"
                  className="text-prim text-xs absolute left-2 -top-2.5 bg-white px-2  block "
                >
                  name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    minLength: {
                      value: 1,
                      message: "Ce champ est obligagtoire svp!",
                    },
                    required: {
                      value: true,
                      message: "Completer ce champ svp!",
                    },
                  })}
                  placeholder="Tap name"
                  className={`placeholder:text-[#959ead] p-2 text-[14px]  text-dark-hard rounded-md  block  outline-none  border ${
                    errors.name ? "border-red-500" : "border-[#c3cad9]"
                  }  `}
                />
                {errors.name?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              {/* email */}
              {/* /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, */}
              <div className={`flex flex-col relative w-full  `}>
                <label
                  htmlFor="email"
                  className="text-prim text-xs absolute left-2 -top-2.5 bg-white px-2  block "
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Entrez un email valid!",
                    },
                    required: {
                      value: true,
                      message: "Completer ce champ svp!",
                    },
                  })}
                  placeholder="exemple@gmail.com"
                  className={`placeholder:text-[#959ead] p-2 text-[14px]  text-dark-hard rounded-md  block  outline-none  border ${
                    errors.email ? "border-red-500" : "border-[#c3cad9]"
                  }   `}
                />
                {errors.email?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className={`flex flex-col relative w-full  `}>
                <label
                  htmlFor="password"
                  className="text-prim text-xs absolute left-2 -top-2.5 bg-white px-2  block "
                >
                  Nouveau mot de pass(facultatif)
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  placeholder="xx xx xx "
                  className={`placeholder:text-[#959ead] p-2 text-[14px]  text-dark-hard rounded-md  block  outline-none  border ${
                    errors.password ? "border-red-500" : "border-[#c3cad9]"
                  }   `}
                />
                {errors.password?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              {/* btn register */}
              <button
                type="submit"
                disabled={
                  !isValid || profileIsLoading || updateProfileIsLoading
                }
                className="bg-prim text-white font-bold text-lg px-8 py-2 w-full rounded-lg my-6 disabled:opacity-50 disabled:cursor-not-allowed  "
              >
                Mettre en jours
              </button>
            </form>
          </div>
        </section>
      </MainLayout>
    </div>
  );
};

export default ProfilePage;
