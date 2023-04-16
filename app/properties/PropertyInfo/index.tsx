"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { IUser } from "@/app/types";
import PropertyCategory from "../PropertyCategory";
import { Avatar } from "@/app/components/base";

const Map = dynamic(
  () => import("../../components/ui/modals/AirbnbYourHomeModal/Map"),
  {
    ssr: false,
  }
);

interface PropertyInfoProps {
  isYourProperty: boolean;
  user: IUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories:
    | [
        {
          icon: IconType;
          label: string;
          description: string;
        }
      ]
    | undefined;
  locationValue: string;
  coordinates: number[];
}

const PropertyInfo = ({
  isYourProperty,
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  categories,
  coordinates,
}: PropertyInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {isYourProperty ? "You" : user?.name} </div>
          <Avatar image={user?.image} />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />

      {categories?.map((c) => {
        return (
          <PropertyCategory
            key={c.label}
            icon={c.icon}
            label={c?.label}
            description={c?.description}
          />
        );
      })}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default PropertyInfo;
