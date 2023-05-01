"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import Image from "next/image";

interface CategoryBoxProps {
  image: string;
  label: string;
  selected?: boolean;
}

const CategoryBox = ({ image, label, selected }: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updatedQuery: any = { ...currentQuery, category: label };
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }
    const url = qs.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-start flex-1 gap-1         px-3 pb-2 border-b-2 hover:text-neutral-800 transition        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Image
        src={image}
        width={24}
        height={24}
        alt={label}
        className="brightness-0"
      />
      <div className="font-medium text-[12px] md:text-[14px]">{label}</div>
    </div>
  );
};

export default CategoryBox;
