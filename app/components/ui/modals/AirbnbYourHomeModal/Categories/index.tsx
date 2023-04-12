"use client";
import { Button, CategoryInput, Heading } from "@/app/components/base";
import { categories } from "@/app/config/categoryList";
import { AirbnbYourHomeModalComponentsProps } from "..";

const Categories = ({
  handleData,
  handleStep,
  data,
}: AirbnbYourHomeModalComponentsProps) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div
        className="
          grid grid-cols-1 md:grid-cols-2 gap-3  
          max-h-[50vh] overflow-y-auto"
      >
        {categories.map((c) => (
          <div key={c.label} className="col-span-1">
            <CategoryInput
              onClick={() => {
                handleData({ ...data, category: c.label });
              }}
              selected={data.category === c.label}
              label={c.label}
              icon={c.icon}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button
            text="Next"
            onClick={() => handleStep(1)}
            disabled={!data.category}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;
