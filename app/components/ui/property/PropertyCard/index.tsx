"use client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { IProperties, IReservation, IUser } from "@/app/types";
import { Button, Heart } from "@/app/components/base";
import useImageSlider from "@/app/hooks/useImageSlider";
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
  reservation,
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

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/properties/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <>
            <Image
              onMouseOver={() => setShowImageArrows(true)}
              onMouseOut={() => setShowImageArrows(false)}
              fill
              className="
              object-cover 
              h-full 
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
        <div className="flex flex-col">
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

          <div className="flex flex-row items-center gap-1 -mt-2">
            <div className="font-semibold">$ {price}</div>

            {!reservation && <div className="font-light s">night</div>}
          </div>
        </div>

        {onAction && actionLabel && (
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
