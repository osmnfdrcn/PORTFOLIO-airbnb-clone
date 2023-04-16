"use client";

import { Button, Calendar } from "@/app/components/base";
import { Range } from "react-date-range";

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
  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
        sticky top-[100px]
      "
    >
      <div
        className="
      flex flex-row items-center justify-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <div className="        flex flex-col items-center justify-center ">
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
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-center
          gap-4
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default PropertyReservation;
