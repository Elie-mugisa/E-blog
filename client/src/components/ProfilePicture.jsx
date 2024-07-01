/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineCamera } from "react-icons/hi";

import { stables } from "../constants";
import CropEasy from "./crop/CropEasy";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfilePicture } from "../services/index/user";
import { userActions } from "../store/reducers/userReducers";

const ProfilePicture = ({ avatar }) => {
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [openCrop, setOpenCrop] = useState(false);
  const [photo, setPhoto] = useState(null);

  // use mutation, updating
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ token, formData }) => {
      return updateProfilePicture({
        token: token,
        formData: formData,
      });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      setOpenCrop(false);
      localStorage.setItem("account", JSON.stringify(data));
      queryClient.invalidateQueries(["profile"]);
      toast.success("Photo de profile supprimée avec succée!");
    },
    onError: (error) => {
      toast.error(error.message); 
      // console.log(error);
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhoto({ url: URL.createObjectURL(file), file });
    setOpenCrop(true);
  };

  const handleDeleteImage = async () => {
    if (window.confirm("Voulez-vous supprimer cette photo?")) {
      try {
        const formData = new FormData();
        formData.append("profilePicture", undefined);

        mutate({ token: userState.userInfo.token, formData: formData });
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <>
      {openCrop &&
        createPortal(
          <CropEasy photo={photo} setOpenCrop={setOpenCrop} />,
          document.getElementById("portal")
        )}
      <div className="w-full p-4 flex items-center gap-4 mb-4">
        <div
          className="relative flex justify-center items-center 
       w-32 h-32 rounded-full outline outline-offset-2 outline-prim overflow-hidden "
        >
          <label
            htmlFor="profilePicture"
            className="cursor-pointer absolute inset-0 rounded-full bg-transparent "
          >
            {avatar ? (
              <img
                src={stables.UPLOAD_FOLDER_BASE_URL + avatar}
                className="w-full h-full object-cover "
                alt="Profile"
              />
            ) : (
              <div className="w-full h-full bg-blue-50/50 flex justify-center items-center ">
                <HiOutlineCamera className="w-7 h-auto text-prim " />
              </div>
            )}
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            id="profilePicture"
            className="sr-only"
          />
        </div>

        {/* action */}
        <button
          onClick={handleDeleteImage}
          type="button"
          className="border border-red-500 rounded-lg px-4 py-1 text-red-500"
        >
          Supprimer
        </button>
      </div>
    </>
  );
};

export default ProfilePicture;
