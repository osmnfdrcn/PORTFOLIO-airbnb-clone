"use client";
import { v4 as uuidv4 } from "uuid";

import { Button, CategoryInput, Heading } from "@/app/components/base";
import { categoryList } from "@/app/config/categoryList";
import { AirbnbYourHomeModalComponentsProps } from "../..";

const Categories = ({
  handleData,
  handleStep,
  data,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const handleNextClick = () => handleStep(++step);

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick categories"
      />
      <div
        className="
          grid grid-cols-2 md:grid-cols-3 gap-3  
          max-h-[50vh] overflow-y-auto"
      >
        {categoryList.map(({ label, image }) => (
          <div key={uuidv4()} className="col-span-1">
            <CategoryInput
              onClick={(arr) => {
                handleData({ ...data, categories: arr });
              }}
              category={data.categories}
              selected={data.categories.includes(label)}
              label={label}
              image={image}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button
            text="Next"
            onClick={handleNextClick}
            disabled={!data.categories.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
