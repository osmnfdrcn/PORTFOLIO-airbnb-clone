import { IReview } from "@/app/types";

const calculateCumulativeRatings = (data: IReview[]) => {
  const length = data.length;
  const accuracy =
    data.reduce((total, item) => total + item.accuracy, 0) / length;
  const location =
    data.reduce((total, item) => total + item.location, 0) / length;
  const value = data.reduce((total, item) => total + item.value, 0) / length;
  const checkIn =
    data.reduce((total, item) => total + item.checkIn, 0) / length;
  const cleanliness =
    data.reduce((total, item) => total + item.cleanliness, 0) / length;
  const communication =
    data.reduce((total, item) => total + item.communication, 0) / length;
  return { accuracy, location, value, checkIn, cleanliness, communication };
};
