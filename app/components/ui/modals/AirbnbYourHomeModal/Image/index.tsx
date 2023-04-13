import { Button, Heading, ImageUpload } from "@/app/components/base";
import { AirbnbYourHomeModalComponentsProps } from "..";

const PropertyImage = ({
  data,
  handleData,
  handleStep,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const handleBackClick = () => handleStep(--step);
  const handleNextClick = () => handleStep(++step);
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subTitle="Show guests what your place looks like!"
      />
      <ImageUpload
        onChange={(value) => {
          handleData({ ...data, imageSrc: value });
        }}
        value={data?.imageSrc}
      />
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={handleBackClick} />
          <Button
            text="Next"
            onClick={handleNextClick}
            disabled={!data?.imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyImage;
