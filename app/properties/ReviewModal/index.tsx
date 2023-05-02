"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
type Props = {
  propertyId: string;
  reservations: IReservation[] | null;
};

export type ReviewValuesProps = {
  cleanliness: number;
  communication: number;
  checkIn: number;
  location: number;
  accuracy: number;
  value: number;
  reviewText: string;
};

const INITIAL_VALUES = {
  cleanliness: 0,
  communication: 0,
  checkIn: 0,
  location: 0,
  accuracy: 0,
  value: 0,
  reviewText: "",
};

import useReviewModal from "@/app/hooks/useReviewModal";
import { IReservation } from "@/app/types";
import { format, parseISO } from "date-fns";
import ModalContainer from "../../components/ui/modals/ModalContainer";
import RatingStars from "./RatingStars";

const ReviewModal = ({ propertyId, reservations }: Props) => {
  const reviewModal = useReviewModal();
  const [reviewValues, setReviewValues] = useState(INITIAL_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const router = useRouter();
  const handleReset = () => {
    setReviewValues(INITIAL_VALUES);
  };

  const {
    cleanliness,
    location,
    value,
    checkIn,
    communication,
    accuracy,
    reviewText,
  } = reviewValues;
  const cumulativeRating = +(
    (cleanliness + location + value + checkIn + communication + accuracy) /
    6
  ).toFixed(1);

  const isButtonDisable =
    isLoading ||
    !cleanliness ||
    !location ||
    !communication ||
    !value ||
    !checkIn ||
    !accuracy ||
    !reservationId;

  const handleClose = () => {
    reviewModal.onClose();
  };

  const onSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/reviews", {
        reviewValues,
        cumulativeRating,
        propertyId,
        reservationId,
      })
      .then(() => {
        toast.success("Review created!");
        router.refresh();
        handleReset();
      })
      .catch(() => {
        handleReset();
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
        handleClose();
      });
  };

  const ratingSteps = [
    {
      text: "Cleanliness",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, cleanliness: rating }),
      rating: reviewValues.cleanliness,
    },
    {
      text: "Communication",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, communication: rating }),
      rating: reviewValues.communication,
    },
    {
      text: "Check-in",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, checkIn: rating }),
      rating: reviewValues.checkIn,
    },
    {
      text: "Accuracy",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, accuracy: rating }),
      rating: reviewValues.accuracy,
    },
    {
      text: "Location",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, location: rating }),
      rating: reviewValues.location,
    },
    {
      text: "Value",
      handleRating: (rating: number) =>
        setReviewValues({ ...reviewValues, value: rating }),
      rating: reviewValues.value,
    },
  ];

  let bodyContent = (
    <div className="flex flex-col items-center justify-center gap-2">
      {/* reservation select */}
      <div className="flex items-center justify-between  gap-1 w-3/4 mb-2">
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
        >
          <option value={""}>Choose a Reservation</option>
          {reservations?.map((r) => {
            return (
              <option value={r.id} className="text-lg " key={uuidv4()}>
                {format(parseISO(r.startDate), "PP")}
                {" - "}
                {format(parseISO(r.endDate), "PP")}
              </option>
            );
          })}
        </select>
      </div>
      {/* rating section */}
      <div className="flex rounded-lg border border-solid border-gray-300 bg-white w-full">
        <div className="flex-col gap-1 mb-1 p-2 w-4/5">
          {ratingSteps.map((item) => {
            return (
              <div
                className="flex items-center justify-center w-full"
                key={uuidv4()}
              >
                <p className="w-2/6 text-sm font-extra-light">{item.text}</p>

                <RatingStars
                  handleRating={item.handleRating}
                  rating={item.rating}
                />
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center ">
          <div className="flex items-center justify-center text-2xl text-white w-[50px] h-[50px] rounded-full bg-yellow-400 p-8">
            {cumulativeRating}
          </div>
        </div>
      </div>
      <textarea
        onChange={(e: any) =>
          setReviewValues({ ...reviewValues, reviewText: e.target.value })
        }
        value={reviewValues.reviewText}
        rows={8}
        placeholder="Write your thoughts here..."
        className="focus:shadow-soft-primary-outline min-h-unset text-sm leading-5.6 ease-soft block h-auto w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-rose-500 focus:outline-none mb-1"
      />
    </div>
  );

  return (
    <ModalContainer
      isOpen={reviewModal.isOpen}
      title="Leave your review"
      actionText={"Create"}
      onSubmit={onSubmit}
      onClose={handleClose}
      body={bodyContent}
      disabled={isButtonDisable}
    />
  );
};

export default ReviewModal;
