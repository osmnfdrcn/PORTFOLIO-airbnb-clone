"use client";
import Select from "react-select";

import useLocations from "@/app/hooks/useLocations";

export type StateSelectValue = {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
};

interface StateSelectProps {
  stateValue?: StateSelectValue;
  onChange: (value: StateSelectValue) => void;
  country: string;
}

const StateSelect = (props: any) => {
  const { country, stateValue, onChange } = props;
  const { getStatesOfGivenCountry, getAllCountries } = useLocations();

  return (
    <div className="flex flex-col gap-2">
      <Select
        placeholder="State"
        isClearable
        options={getStatesOfGivenCountry(country)}
        value={stateValue}
        onChange={(value) => onChange(value as StateSelectProps)}
        formatOptionLabel={(option: any) => (
          <div
            className="
              flex flex-row items-center gap-3
            "
          >
            <div>
              {option.name},
              <span className="text-neutral-500 ml-1">
                {option.countryCode}
              </span>
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

export default StateSelect;
