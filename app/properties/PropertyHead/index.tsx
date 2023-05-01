"use client";

import Image from "next/image";

import { Heading, Heart } from "@/app/components/base";
import useImageSlider from "@/app/hooks/useImageSlider";
import { IUser } from "@/app/types";
import { useCallback } from "react";

interface PropertyHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: IUser | null;
  propertyOwnerId: string;
}

const PropertyHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  propertyOwnerId,
  currentUser,
}: PropertyHeadProps) => {
  const length = locationValue.split(",").length;
  const region = locationValue.split(",")[0];
  const country = locationValue.split(",")[length - 1];
  const [currentImage, handlePrevImage, handleNextImage] = useImageSlider(
    imageSrc,
    true
  );

  const handleImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
      e.stopPropagation();

      if (action === "next") {
        handleNextImage();
      }
      if (action === "back") {
        handlePrevImage();
      }
    },
    [handleNextImage, handlePrevImage]
  );

  return (
    <>
      <Heading title={title} subTitle={`${region}, ${country}`} />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <>
          <div className="flex flex-col w-full h-full">
            <Image
              src={currentImage as string}
              fill
              className="object-cover w-full"
              alt="Image"
            />
            <div className="w-full flex justify-between absolute z-10 top-[47%] px-2">
              <button
                className="w-7 h-7 hover:w-8 hover:h-8 transition-all duration-500 ease-in-out rounded-full bg-neutral-200 text-stone-600 p-1 flex justify-center items-center"
                onClick={(e) => handleImage(e, "back")}
              >
                {"<"}
              </button>
              <button
                className="w-7 h-7 hover:w-8 hover:h-8 transition-all duration-500 ease-in-out rounded-full bg-neutral-200 text-stone-600 p-1 flex justify-center items-center"
                onClick={(e) => handleImage(e, "next")}
              >
                {">"}
              </button>
            </div>
          </div>

          <div className="absolute top-5 right-5">
            {/* user cannot favorite its own property */}
            {propertyOwnerId != currentUser?.id ? (
              <Heart propertyId={id} currentUser={currentUser} />
            ) : null}
          </div>
        </>
      </div>
    </>
  );
};

export default PropertyHead;
