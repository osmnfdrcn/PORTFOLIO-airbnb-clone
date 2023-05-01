"use client";

import { useRouter } from "next/navigation";
import { Button, Heading } from "../../../components/base";
interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const NoResult = ({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subTitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            text="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default NoResult;
