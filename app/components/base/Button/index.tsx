"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  narrow?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({
  text,
  disabled,
  outline,
  small,
  icon: Icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`relative flex items-center justify-around w-full 
        p-1 disabled:opacity-70 disabled:cursor-not-allowed         hover:opacity-80 transition} 
        ${
          outline
            ? "bg-neutral-100 border-black text-black"
            : "bg-rose-500 border-rose-500 text-white"
        }
        ${
          small
            ? "py-1 text-sm font-light border-[1px]"
            : "py-3 text-md font-semibold border=[2px]"
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="absolute left-4" size={`${small ? 18 : 24}`} />}
      {text}
    </button>
  );
}

export default Button;
