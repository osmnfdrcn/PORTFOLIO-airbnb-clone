import { Button, Counter, Heading } from "@/app/components/base";
import { AirbnbYourHomeModalComponentsProps } from "..";

type Counter = {
  id: number;
  value: number;
  onChange: (value: number) => void;
  title: string;
  subtitle: string;
};

const Info = ({
  data,
  handleData,
  handleStep,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const handleBackClick = () => handleStep(--step);
  const handleNextClick = () => handleStep(++step);
  const counters: Counter[] = [
    {
      id: 1,
      value: data?.guestCount,
      onChange: (value: number) => handleData({ ...data, guestCount: value }),
      title: "Guests",
      subtitle: "How many guests do you allow?",
    },
    {
      id: 2,
      value: data?.roomCount,
      onChange: (value: number) => handleData({ ...data, roomCount: value }),
      title: "Rooms",
      subtitle: "How many rooms do you have?",
    },
    {
      id: 3,
      value: data?.bathroomCount,
      onChange: (value: number) =>
        handleData({ ...data, bathroomCount: value }),
      title: "Bathrooms",
      subtitle: "How many bathrooms do you have?",
    },
  ];

  const isDataValid =
    data?.guestCount && data?.roomCount && data?.bathroomCount;

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subTitle="What amenities do you have?"
      />
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          onChange={counter.onChange}
          value={counter.value}
          title={counter.title}
          subtitle={counter.subtitle}
        />
      ))}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={handleBackClick} />
          <Button
            text="Next"
            onClick={handleNextClick}
            disabled={!isDataValid}
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
