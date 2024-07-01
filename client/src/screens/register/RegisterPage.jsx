/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import MainLayout from "./../../components/MainLayout";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/user";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onSuccess: (data) => {
      toast.success("Connecter avec succée");
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.message);
      // console.log(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      ConfirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };
  // console.log(errors);

  const password = watch("password");

  return (
    <div>
      <MainLayout>
        <section className="container mx-auto px-5  py-10">
          <div className="w-full min-h-[69.5vh]  max-w-sm mx-auto">
            <h1 className="font-roboto text-center text-2xl font-bold text-dark-hard mb-8 ">
              Sign Up
            </h1>

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
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password", {
                    minLength: {
                      value: 6,
                      message: "Le mot de pass doit être aumoins 6 caractères",
                    },
                    required: {
                      value: true,
                      message: "Le mot de pass est obligatoire",
                    },
                  })}
                  placeholder="xx xxx xx"
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

              {/* ConfirmPass */}
              <div className={`flex flex-col relative w-full  `}>
                <label
                  htmlFor="ConfirmPass"
                  className="text-prim text-xs absolute left-2 -top-2.5 bg-white px-2  block "
                >
                  Confirm Pass
                </label>
                <input
                  type="password"
                  id="ConfirmPass"
                  {...register("ConfirmPassword", {
                    required: {
                      value: true,
                      message: "Vous devez confirmer le mot de pass",
                    },
                    validate: (value) => {
                      if (value !== password) {
                        return "Le mot de pass ne corespond pas";
                      }
                    },
                  })}
                  placeholder="xx xxx xx"
                  className={`placeholder:text-[#959ead] p-2 text-[14px]  text-dark-hard rounded-md  block  outline-none  border ${
                    errors.ConfirmPassword
                      ? "border-red-500"
                      : "border-[#c3cad9]"
                  }   `}
                />
                {errors.ConfirmPassword?.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.ConfirmPassword?.message}
                  </p>
                )}
              </div>

              

              {/* btn register */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="bg-prim text-white font-bold text-lg px-8 py-2 w-full rounded-lg my-6 disabled:opacity-50 disabled:cursor-not-allowed  "
              >
                Register
              </button>

              <p className="text-sm font-semibold text-[#5a7184] ">
                You have an account?{" "}
                <Link to={"/login"} className="text-prim">
                  Login now
                </Link>
              </p>
            </form>
          </div>
        </section>
      </MainLayout>
    </div>
  );
};

export default RegisterPage;
