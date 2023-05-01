"use client";
import { Button, Heart } from "@/app/components/base";
import useImageSlider from "@/app/hooks/useImageSlider";
import { IProperties, IReservation, IUser } from "@/app/types";
import { isPast } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";

interface PropertyCardProps {
  data: IProperties;
  reservation?: IReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: IUser | null;
}

const PropertyCard = ({
  data,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: PropertyCardProps) => {
  const router = useRouter();
  const location = data?.locationValue.split(",");
  const country = location[location?.length - 1];
  const city = location[0];
  const [showImageArrows, setShowImageArrows] = useState(false);

  const isReservationEndDatePast = data.reservations?.map((r) =>
    isPast(new Date(r!.endDate))
  );

  const rating = data?.reviews?.length
    ? (
        data?.reviews.reduce(
          (total, item) => total + item.cumulativeRating,
          0
        ) / data?.reviews.length
      ).toFixed(1)
    : 0;

  const [currentImage, handlePrevImage, handleNextImage] = useImageSlider(
    data?.imageSrc,
    false
  );

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
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
    <div
      onClick={() => router.push(`/properties/${data.id}`)}
      className="col-span-1 cursor-pointer group bg-slate-50 hover:bg-slate-100 transition duration-500 h-full"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            h-[270px]
            relative 
            overflow-hidden 
          "
        >
          <>
            <Image
              onMouseOver={() => setShowImageArrows(true)}
              onMouseOut={() => setShowImageArrows(false)}
              fill
              className="
              object-cover 
              w-full 
            "
              src={currentImage as string}
              alt="Properties"
            />

            {showImageArrows ? (
              <div
                className="w-full flex justify-between absolute z-10 top-[47%]"
                onMouseOver={() => setShowImageArrows(true)}
                onMouseOut={() => setShowImageArrows(false)}
              >
                <button
                  className="w-7 h-7 hover:w-8 hover:h-8 transition-all duration-300 ease-in-out rounded-full bg-neutral-200 text-stone-600 p-1 flex justify-center items-center"
                  onClick={(e) => handleImage(e, "back")}
                >
                  {"<"}
                </button>
                <button
                  className="w-7 h-7 hover:w-8 hover:h-8 transition-all duration-300 ease-in-out rounded-full bg-neutral-200 text-stone-600 p-1 flex justify-center items-center"
                  onClick={(e) => handleImage(e, "next")}
                >
                  {">"}
                </button>
              </div>
            ) : null}
          </>

          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            {/* user cannot favorite his/her own property */}
            {data?.userId != currentUser?.id ? (
              <Heart propertyId={data.id} currentUser={currentUser} />
            ) : null}
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex justify-between">
            <div className=" text-sm">
              {city}
              {", "}
              {country}
            </div>
            <div className="font-semibold text-sm flex items-center">
              {" "}
              {rating ? rating : "NEW"}{" "}
              <AiOutlineStar
                size={20}
                className="text-yellow-500 font-extrabold"
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-1 ">
            <div className="font-semibold">$ {data.price}</div>

            <div className="font-light">night</div>
          </div>
        </div>

        {/* for myproperties page => checking end date of a reservation is not past. if not, it cannot be cancelled. */}
        {onAction && actionLabel && !!isReservationEndDatePast.length && (
          <Button
            disabled={disabled}
            small
            text={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
