"use client";
import Select from "react-select";

import useLocations from "@/app/hooks/useLocations";

export type CitySelectValue = {
  name: string;
  countryCode: string;
  stateCode: number;
  latitude: string;
  longitude: string;
};

interface CitySelectProps {
  cityValue?: CitySelectValue;
  onChange: (value: CitySelectValue) => void;
  countryCode: string;
  stateCode: string;
}

const CitySelect = (props: any) => {
  const { countryCode, stateCode, cityValue, onChange } = props;
  const { getCitiesOfGivenState } = useLocations();

  return (
    <div className="flex flex-col gap-2">
      <Select
        placeholder="City"
        isClearable
        options={getCitiesOfGivenState(countryCode, stateCode)}
        value={cityValue}
        onChange={(cityValue) => onChange(cityValue as CitySelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
              flex flex-row items-center gap-3
            "
          >
            <span className="text-neutral-500 ml-1">{option.name}</span>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CitySelect;
