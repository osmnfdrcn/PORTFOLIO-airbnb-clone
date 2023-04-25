"use client";
import Image from "next/image";
interface CategoryViewProps {
  image: string;
  label: string;
  description: string;
}

const PropertyCategory = ({ image, label, description }: CategoryViewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <Image
          src={image}
          width={24}
          height={24}
          className="text-neutral-600"
          alt={label}
        />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCategory;
