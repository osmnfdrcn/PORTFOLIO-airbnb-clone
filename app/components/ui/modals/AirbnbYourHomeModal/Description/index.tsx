import { Button, TextInput } from "@/app/components/base";
import Heading from "@/app/components/base/Heading";
import { AirbnbYourHomeModalComponentsProps } from "..";

const Description = ({
  handleData,
  data,
  handleStep,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const { title, description } = data;
  const handleBackClick = () => handleStep(--step);
  const handleNextClick = () => handleStep(++step);
  const isDisabled = !title || !description;

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subTitle="Short and sweet works best!"
      />
      <>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleData({ ...data, title: e.target.value })
          }
          required
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleData({ ...data, description: e.target.value })
          }
          required
        />
      </>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={handleBackClick} />
          <Button text="Next" onClick={handleNextClick} disabled={isDisabled} />
        </div>
      </div>
    </div>
  );
};

export default Description;
