"use client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { IProperties, IReservation, IUser } from "@/app/types";
import { Button, Heart } from "@/app/components/base";

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

  const location = data.locationValue.split(",");
  const country = location[location.length - 1];
  const city = location[0];
  console.log(data);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
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
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
            "
            src={data.imageSrc}
            alt="Properties"
          />
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
        <div className="font-semibold text-lg">
          {city}
          {" | "}
          {country}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.categories}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
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