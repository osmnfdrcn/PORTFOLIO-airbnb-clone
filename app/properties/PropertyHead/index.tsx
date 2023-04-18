"use client";

import Image from "next/image";

import { IUser } from "@/app/types";
import { Heading, Heart } from "@/app/components/base";
import useImageSlider from "@/app/hooks/useImageSlider";
import { useCallback } from "react";

interface PropertyHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string[];
  id: string;
  currentUser?: IUser | null;
}

const PropertyHead = ({
  title,
  locationValue,
  imageSrc,
  id,
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
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        {/* Masonry Gallery */}
        {/* <div className="columns-2 md:columns-3 lg:columns-4">
          {imageSrc?.map((image, i) => {
            return (
              <div className="mb-4" key={i}>
                <Image
                  width={500}
                  height={500}
                  className="object-cover w-full h-full rounded-lg"
                  src={image}
                  alt="Image 1"
                />
              </div>
            );
          })}
        </div> */}

        <>
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
        </>

        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <Heart propertyId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default PropertyHead;
