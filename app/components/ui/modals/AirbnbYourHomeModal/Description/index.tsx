import { Button, TextInput } from "@/app/components/base";
import Heading from "@/app/components/base/Heading";
import { AirbnbYourHomeModalComponentsProps } from "..";

const Description = ({
  handleData,
  data,
  handleStep,
}: AirbnbYourHomeModalComponentsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="How would you describe your place?"
        subTitle="Short and sweet works best!"
      />
      <>
        <TextInput
          placeholder="Title"
          onChange={(e) => handleData({ ...data, title: e.target.value })}
          required={true}
        />
        <TextInput
          placeholder="Description"
          onChange={(e) => handleData({ ...data, description: e.target.value })}
          required={true}
        />
      </>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={() => handleStep(3)} />
          <Button
            text="Next"
            onClick={() => handleStep(5)}
            disabled={!data?.title || !data?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Description;
