/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FiMessageSquare, FiEdit2, FiTrash } from "react-icons/fi";

import photo from "../../assets/44.jpeg";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  logginedUserId,
  affectedComment,
  setAffectedComment,
  addComment,
  parentId = null,
  updateComment,
  deleteComment,
  replies,
}) => {
  const isUserLoggined = Boolean(logginedUserId);
  const commentBelongsToUser = logginedUserId === comment.user._id;

  const isReplying =
    affectedComment &&
    affectedComment.type === "replying" &&
    affectedComment._id === comment._id;

  const isEditing =
    affectedComment &&
    affectedComment.type === "editing" &&
    affectedComment._id === comment._id;

  const repliedComment = parentId ? parentId : comment._id;
  const repliedOnUserId = comment.user._id;

  return (
    <div className="flex flex-nowrap items-start gap-3 bg-[#F2F4F5] p-3 rounded-lg ">
      {/* left side */}
      <img
        src={photo}
        alt="User profile"
        className="w-9 h-9 object-cover rounded-full"
      />
      {/* right side */}
      <div className="flex-1 flex flex-col">
        <h5 className="font-bold text-dark-hard text-xs ">
          {comment.user.name}
        </h5>
        <span className="text-xs text-dark-light">
          {new Date(comment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
          })}
        </span>

        {/* body */}
        {!isEditing && (
          <p className="font-opensans mt-[10px] text-dark-light  ">
            {comment.desc}
          </p>
        )}

        {/* editing */}
        {isEditing && (
          <CommentForm
            btnLabel="Update"
            formSubmitHandler={(value) => updateComment(value, comment._id)}
            formCancelHandler={() => setAffectedComment(null)}
            initialText={comment.desc}
          />
        )}
        {/* actions */}
        <div className="flex justify-between items-center  text-dark-light font-roboto text-sm my-3 md:justify-normal md:gap-6 ">
          {isUserLoggined && (
            <button
              onClick={() =>
                setAffectedComment({ type: "replying", _id: comment._id })
              }
              className="flex items-center space-x-2"
            >
              <FiMessageSquare className="w-4 h-auto" />
              <span>Reply</span>
            </button>
          )}

          {commentBelongsToUser && (
            <>
              <button
                className="flex items-center space-x-2"
                onClick={() =>
                  setAffectedComment({ type: "editing", _id: comment._id })
                }
              >
                <FiEdit2 className="w-4 h-auto" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => deleteComment(comment._id)}
                className="flex items-center space-x-2"
              >
                <FiTrash className="w-4 h-auto" />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
        {/* replying */}
        {isReplying && (
          <CommentForm
            btnLabel="Reply"
            formSubmitHandler={(value) =>
              addComment(value, repliedComment, repliedOnUserId)
            }
            formCancelHandler={() => setAffectedComment(null)}
          />
        )}
        {/* replies content */}
        {replies.length > 0 && (
          <div>
            {replies.map((reply, index) => (
              <Comment
                key={index}
                addComment={addComment}
                affectedComment={affectedComment}
                setAffectedComment={setAffectedComment}
                comment={reply}
                deleteComment={deleteComment}
                logginedUserId={logginedUserId}
                replies={[]}
                updateComment={updateComment}
                parentId={comment._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
