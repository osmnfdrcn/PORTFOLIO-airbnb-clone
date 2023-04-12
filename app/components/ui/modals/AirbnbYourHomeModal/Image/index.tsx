import { Button, Heading, ImageUpload } from "@/app/components/base";
import { AirbnbYourHomeModalComponentsProps } from "..";

const PropertyImage = ({
  data,
  handleData,
  handleStep,
}: AirbnbYourHomeModalComponentsProps) => {
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
          <Button outline text="Back" onClick={() => handleStep(2)} />
          <Button
            text="Next"
            onClick={() => handleStep(4)}
            disabled={!data?.imageSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyImage;
