import { Button, Heading } from "@/app/components/base";
import useReviewModal from "@/app/hooks/useReviewModal";
import { IReview } from "@/app/types";
import React from "react";
import { boolean } from "yup";
import Ratings from "./Ratings";
import ListReview from "./ListReview";

type Props = {
  propertyId: string;
  reviews?: IReview[] | null;
  userCanLeaveReview: boolean;
  showLeaveReviewButton: boolean;
};

const Reviews = ({
  reviews,
  userCanLeaveReview,
  showLeaveReviewButton,
}: Props) => {
  const reviewModal = useReviewModal();
  return (
    <div className="flex flex-col gap-8 p-8">
      <Heading title="Reviews and Ratings" />
      {showLeaveReviewButton ? (
        <div className=" flex float-right w-1/5 absolute top-2 right-2">
          <Button
            text="Leave a Review"
            small
            onClick={reviewModal.onOpen}
            disabled={!userCanLeaveReview}
          />
        </div>
      ) : null}

      <Ratings reviews={reviews as IReview[]} />
      <ListReview reviews={reviews} />
    </div>
  );
};

export default Reviews;
