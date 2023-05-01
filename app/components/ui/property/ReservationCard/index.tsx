"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Button } from "@/app/components/base";
import { IProperties, IReservation } from "@/app/types";
import { format, isPast } from "date-fns";

interface PropertyCardProps {
  data: IProperties;
  reservation?: IReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUserId?: string;
}

const ReservationCard = ({
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUserId,
}: PropertyCardProps) => {
  const router = useRouter();
  const isReservationStartDatePast = isPast(new Date(reservation!.startDate));
  const isReservationEndDatePast = isPast(new Date(reservation!.endDate));

  const currentImage = reservation?.property.imageSrc[0];

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/properties/${reservation?.propertyId}`)}
      className=" cursor-pointer group bg-slate-50 hover:bg-slate-100 tsransition duration-500  flex flex-row relative h-[150px]"
    >
      <div className="aspect-square relative overflow-hidden ">
        {/* card image start */}
        <>
          <div className="h-full">
            <Image
              className="object-cover w-full h-full"
              src={currentImage as string}
              alt="Properties"
              width={200}
              height={200}
            />
          </div>
        </>
        <div className="absolute top-3 right-3"></div>
      </div>
      {/* card image end */}

      {/* card info */}
      <div className="flex flex-col p-3">
        <div className=" text-sm">{reservation?.property.title}</div>
        <div className="text-xs">{reservationDate}</div>
        <div className="font-semibold">$ {reservation?.totalPrice}</div>
        <div className=" text-xs text-rose-500">
          {isReservationStartDatePast
            ? !isReservationEndDatePast
              ? "This is an active reservation"
              : "Past reservation"
            : ""}
        </div>
      </div>

      {/* for myreservations and trips pages => checking end start date of a reservation is not past. if not, it cannot be cancelled. */}
      {onAction && actionLabel && !isReservationStartDatePast && (
        <div className="absolute bottom-2 right-2 ">
          <Button
            disabled={disabled}
            small
            text={actionLabel}
            onClick={handleCancel}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
