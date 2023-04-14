"use client";

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Heading, Heart } from "@/app/components/base";

interface PropertyHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
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
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
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
