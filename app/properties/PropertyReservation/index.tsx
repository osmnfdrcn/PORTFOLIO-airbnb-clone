"use client";

import { Button, Calendar } from "@/app/components/base";
import { Range } from "react-date-range";
import { differenceInDays, eachDayOfInterval } from "date-fns";

interface PropertyReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const PropertyReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: PropertyReservationProps) => {
  const dayCount = differenceInDays(dateRange.endDate!, dateRange.startDate!);

  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden sticky top-[110px]">
      <div className="flex flex-row items-center justify-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="flex flex-col items-center justify-center ">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
      </div>

      <hr />
      <div className="p-4">
        <Button disabled={disabled} text="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="p-4 flex flex-row items-center justify-center gap-4
          font-semibold text-lg"
      >
        <div className="flex flex-col gap-2 w-full text-sm font-light">
          <div className="flex justify-between w-full ">
            <p className="underline">
              ${price} x {!dayCount ? 1 : dayCount}
              {" nights"}
            </p>
            <p> ${totalPrice}</p>
          </div>
          <div className="flex justify-between w-full ">
            <p className="underline">Cleaning Fee</p>
            <p> $0</p>
          </div>
          <div className="flex justify-between w-full ">
            <p className="underline">Airbnb Service Fee</p>
            <p> $0</p>
          </div>
          <hr />
          <div className="flex justify-between w-full font-semibold">
            <p>Total</p>
            <p> ${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyReservation;
