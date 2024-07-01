/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const CommentForm = ({
  btnLabel,
  formSubmitHandler,
  formCancelHandler = null,
  initialText = ""
}) => {
  const [value, setValue] = useState(initialText);

  const sumbitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };

  return (
    <form onSubmit={sumbitHandler}>
      <div className="flex flex-col items-end border border-prim rounded-lg p-4 ">
        <textarea
          rows="5"
          className="w-full focus:outline-none bg-transparent  "
          placeholder="Leave your comment.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex flex-col-reverse   items-center gap-2 pt-2 min-[420px]:flex-row ">
          {formCancelHandler && (
            <button
            onClick={formCancelHandler}
              type="submit"
              className="px-6 py-1.5 text-xs border border-red-500 rounded-lg text-red-500  mt-2  "
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-1.5 text-xs border border-prim rounded-lg bg-prim text-white font-semibold mt-2  "
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
