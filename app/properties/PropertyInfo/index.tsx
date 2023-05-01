"use client";
import { Avatar } from "@/app/components/base";
import { IReview, IUser } from "@/app/types";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import PropertyCategory from "../PropertyCategory";
const Map = dynamic(
  () => import("../../components/ui/modals/AirbnbYourHomeModal/Map"),
  {
    ssr: false,
  }
);

interface PropertyInfoProps {
  propertyId: string;
  isYourProperty: boolean;
  user: IUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  categories:
    | [
        {
          image: string;
          label: string;
          description: string;
        }
      ]
    | undefined;
  locationValue: string;
  coordinates: number[];
  reviews?: IReview[] | null;
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
        <div className="text-xl font-semibold flex flex-row items-center       gap-2">
          <div>Hosted by {isYourProperty ? "You" : user?.name} </div>
          <Avatar image={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light            text-neutral-500">
          <p>{guestCount} guests</p>
          <p>{roomCount} rooms</p>
          <p>{bathroomCount} bathrooms</p>
        </div>
      </div>
      <hr />
      {categories?.map((c) => {
        return (
          <PropertyCategory
            key={uuidv4()}
            image={c.image}
            label={c?.label}
            description={c?.description}
          />
        );
      })}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default PropertyInfo;
