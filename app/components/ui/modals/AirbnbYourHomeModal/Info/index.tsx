import { Button, Counter, Heading } from "@/app/components/base";
import { AirbnbYourHomeModalComponentsProps } from "..";

const Info = ({
  data,
  handleData,
  handleStep,
}: AirbnbYourHomeModalComponentsProps) => {
  const counters = [
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
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subTitle="What amenitis do you have?"
      />
      {counters.map((c) => (
        <div key={c.id}>
          <Counter
            onChange={c.onChange}
            value={c.value}
            title={c.title}
            subtitle={c.subtitle}
          />
        </div>
      ))}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={() => handleStep(1)} />
          <Button text="Next" onClick={() => handleStep(3)} />
        </div>
      </div>
    </div>
  );
};

export default Info;
