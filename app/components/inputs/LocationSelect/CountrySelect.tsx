"use client";
import Select from "react-select";

import useLocations from "@/app/hooks/useLocations";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  countryValue?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = (props: CountrySelectProps) => {
  const { countryValue, onChange } = props;
  const { getAllCountries } = useLocations();
  console.log({ countryValue });

  return (
    <div className="flex flex-col gap-2">
      <Select
        placeholder="Country"
        isClearable
        options={getAllCountries()}
        value={countryValue}
        onChange={(value) => {
          onChange(value as CountrySelectValue);
        }}
        formatOptionLabel={(option: any) => (
          <div
            className="
              flex flex-row items-center gap-3
            "
          >
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
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

export default CountrySelect;
