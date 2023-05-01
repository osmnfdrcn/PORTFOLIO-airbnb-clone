import { IReview } from "@/app/types";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

type Props = {
  reviews?: IReview[] | null;
};

const ListReview = ({ reviews }: Props) => {
  return (
    <>
      {reviews?.map((r: any) => {
        return (
          <div key={uuidv4()} className="flex flex-col gap-2 mb-4 w-full">
            <div className="flex gap-3">
              <Image
                src={r.userImage}
                className="rounded-full"
                width={50}
                height={50}
                alt=""
              />
              <div className="flex flex-col ">
                <div className="flex gap-2 text-slate-600">
                  <p>{r.userName}</p>
                  <p>{r.cumulativeRating}</p>
                </div>

                <p className="text-sm text-slate-400">
                  {format(r.createdAt, "PP")}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-700">{r.reviewText}</p>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default ListReview;
