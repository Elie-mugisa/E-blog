/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
const myColor = "#5a7184";

const InputField = ({
  className = "",
  labelName = "",
  inputStyle = "",
  type = "",

  placeholder = "",
  errors = {},
  register = () => {},
}) => {
  const fields = ["name", "email", "password", "ConfirmPassword"];

  return (
    <div className={`flex flex-col relative w-full ${className} `}>
      <label
        htmlFor={labelName}
        className="text-prim text-xs absolute left-2 -top-2.5 bg-white px-2  block "
      >
        {labelName}
      </label>
      <input
        type={type}
        id={labelName}
        {...register(labelName, {
          minLength: {
            value: 1,
            message: "Ce champ est obligagtoire svp!",
          },
          required: {
            value: true,
            message: "Completer ce champ svp!",
          },
        })}
        placeholder={placeholder}
        className={`placeholder:text-[#959ead] p-2 text-[14px]  text-dark-hard rounded-md  block  outline-none  border border-[#c3cad9] ${inputStyle} `}
      />
      {errors.labelName?.message && (
        <p className="text-red-500 text-xs mt-1">{errors.labelName?.message}</p>
      )}
    </div>
  );
};

export default InputField;
