import { IReview } from "@/app/types";
import { v4 as uuidv4 } from "uuid";
type Props = {
  reviews: IReview[];
};

const Ratings = ({ reviews }: Props) => {
  const cumulativeRatings = calculateCumulativeRatings(reviews);
  const styles: Record<string, { width: string }> = {};

  const ratingItems = cumulativeRatings.map((rating) => {
    return {
      style: { width: `${rating.value * 10}%` },
      item: rating.value || "No any review yet",
      text: rating.title,
    };
  });

  return (
    <div className="grid grid-cols-1 gap-2 w-full my-4 border-b pb-8">
      {ratingItems.map((i) => (
        <div className="flex items-center gap-2 " key={uuidv4()}>
          <div className={`block bg-gray-400 h-[3px]`} style={i.style}></div>
          <span className="text-xs text-gray-500">{i.text}</span>
          <span className="text-sm text-gray-600">{i.item}</span>
        </div>
      ))}
    </div>
  );
};

export default Ratings;

interface ICumulativeRatings {
  name: string;
  value: number;
  title: string;
}
const calculateCumulativeRatings = (data: IReview[]): ICumulativeRatings[] => {
  const length = data.length;
  const accuracy = +(
    data.reduce((total, item) => total + item.accuracy, 0) / length
  ).toFixed(1);
  const location = +(
    data.reduce((total, item) => total + item.location, 0) / length
  ).toFixed(1);
  const value = +(
    data.reduce((total, item) => total + item.value, 0) / length
  ).toFixed(1);
  const checkIn = +(
    data.reduce((total, item) => total + item.checkIn, 0) / length
  ).toFixed(1);
  const cleanliness = +(
    data.reduce((total, item) => total + item.cleanliness, 0) / length
  ).toFixed(1);
  const communication = +(
    data.reduce((total, item) => total + item.communication, 0) / length
  ).toFixed(1);
  return [
    { name: "accuracy", title: "Accuracy", value: accuracy },
    { name: "location", title: "Location", value: location },
    { name: "value", title: "Value", value },
    { name: "checkIn", title: "Check-In", value: checkIn },
    { name: "cleanliness", title: "Cleanliness", value: cleanliness },
    { name: "communication", title: "Communication", value: communication },
  ];
};
