import React from "react";
import { IconType } from "react-icons";

type CategoryInputProps = {
  onClick: (value: string[]) => void;
  category: string[];
  selected: boolean;
  label: string;
  icon: IconType;
};

function CategoryInput(props: CategoryInputProps) {
  const { onClick, label, selected, category, icon: Icon } = props;
  let selectedCategories = category;
  return (
    <div
      onClick={() => {
        selected
          ? (selectedCategories = selectedCategories.filter((c) => c != label))
          : selectedCategories.push(label);
        onClick(selectedCategories);
      }}
      className={`}
        flex item-center justify-center gap-2
        border-2 rounded-xl hover:border-rose-500
        p-4
        transition cursor-pointer
        ${selected ? "bg-rose-300" : "border-neutral-200"}
    `}
    >
      <Icon size={20} />
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
}

export default CategoryInput;
