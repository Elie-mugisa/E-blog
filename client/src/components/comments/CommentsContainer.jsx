/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import CommentForm from "./CommentForm";

import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCommment,
  deleteCommment,
  updateCommment,
} from "./../../services/index/comments";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const CommentsContainer = ({
  className,
  logginedUserId,
  comments,
  postSlug,
}) => {
  const queryClient = useQueryClient();
  const userState = useSelector((state) => state.user);
  const [affectedComment, setAffectedComment] = useState(null);

  const { mutate: mutateNewComment, isLoading: isLoadingNewComment } =
    useMutation({
      mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
        return createCommment({
          token,
          desc,
          slug,
          parent,
          replyOnUser,
        });
      },
      onSuccess: () => {
        toast.success(
          "Votre commentaire a été poster avec succé, il sera visible après la confirmaion de l'administrateur"
        );
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const { mutate: mutateUpdateComment } = useMutation({
    mutationFn: ({ token, desc, commentId }) => {
      return updateCommment({
        token,
        desc,
        commentId,
      });
    },
    onSuccess: () => {
      toast.success("Votre commentaire a été modifié avec succé");
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const { mutate: mutateDeleteComment } = useMutation({
    mutationFn: ({ token, commentId }) => {
      return deleteCommment({
        token,
        commentId,
      });
    },
    onSuccess: () => {
      toast.success("Votre commentaire a été modifié avec succé");
      queryClient.invalidateQueries(["blog", postSlug]);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const addCommentHandler = (value, parent = null, replyOnUser = null) => {
    mutateNewComment({
      desc: value,
      parent,
      replyOnUser,
      token: userState.userInfo.token,
      slug: postSlug,
    });
    setAffectedComment(null);
  };

  const updateCommentHandler = (value, commentId) => {
    mutateUpdateComment({
      token: userState.userInfo.token,
      desc: value,
      commentId,
    });
    setAffectedComment(null);
  };

  const deleteCommentHandler = (commentId) => {
    mutateDeleteComment({
      token: userState.userInfo.token,
      commentId
    })
  };

  return (
    <div className={` ${className}`}>
      <CommentForm
        btnLabel="Send"
        formSubmitHandler={(value) => addCommentHandler(value)}
        loading={isLoadingNewComment}
      />

      <div className=" space-y-4 mt-8 ">
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            logginedUserId={logginedUserId}
            affectedComment={affectedComment}
            setAffectedComment={setAffectedComment}
            addComment={addCommentHandler}
            updateComment={updateCommentHandler}
            deleteComment={deleteCommentHandler}
            replies={comment.replies}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentsContainer;
