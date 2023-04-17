"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface AuthFormTextInputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}
const AuthFormTextInput = (props: AuthFormTextInputProps) => {
  const {
    id,
    label,
    type = "text",
    disabled = false,
    formatPrice = false,
    required = false,
    register,
    errors,
  } = props;

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-700"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          w-full p-4 pt-6 
          bg-white  font-light 
          border-2 rounded-md outline-none
          transition
          disabled:opacity-70 disabled:cursor-not-allowed
          peer
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
          absolute top-5 z-10 
          text-md
          transform -translate-y-3 origin-[0] duration-150 
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${formatPrice ? "left-9" : "left-4"}
          ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
      <p className="text-[10px] text-rose-700">
        {errors[id]?.message?.toString()}
      </p>
    </div>
  );
};

export default AuthFormTextInput;
