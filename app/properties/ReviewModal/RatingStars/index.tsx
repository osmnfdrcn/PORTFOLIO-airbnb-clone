"use client";
import { Rating } from "react-simple-star-rating";
type Props = {
  handleRating?: (value: number) => void;
  rating: number;
};

const RatingStars = ({ handleRating, rating }: Props) => {
  return (
    <div className="flex justify-end items-end  ">
      <Rating
        emptyStyle={{ display: "flex" }}
        fillStyle={{ display: "-webkit-inline-box" }}
        onClick={handleRating}
        iconsCount={5}
        size={20}
        transition
        allowFraction
        titleSeparator="."
      />
      <div className="text-sm font-light w-10 text-right pr-4">{rating}</div>
    </div>
  );
};

export default RatingStars;
