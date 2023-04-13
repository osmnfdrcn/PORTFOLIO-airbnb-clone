import { Button, Heading, TextInput } from "@/app/components/base";
import { AirbnbYourHomeModalComponentsProps } from "..";

const Price = ({
  handleData,
  handleStep,
  handleSubmit,
  data,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const { title, description } = data;

  const handleBackClick = () => handleStep(--step);

  const isCreateButtonDisabled = !title || !description;
  return (
    <div className="flex flex-col gap-8">
      <>
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <TextInput
          placeholder="Price"
          type="number"
          required={true}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleData({ ...data, price: +e.target.value })
          }
          price={true}
        />
      </>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={handleBackClick} />
          <Button
            text="Create"
            onClick={handleSubmit!}
            disabled={isCreateButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};
export default Price;
