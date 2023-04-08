import React from "react";
import { IconType } from "react-icons";

type CategoryInputProps = {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  icon: IconType;
};

function CategoryInput(props: CategoryInputProps) {
  const { onClick, label, selected, icon: Icon } = props;
  return (
    <div
      onClick={() => onClick(label)}
      className={`}
        flex flex-col gap-3
        border-2 rounded-xl hover:border-black
        p-4
        transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
}

export default CategoryInput;
