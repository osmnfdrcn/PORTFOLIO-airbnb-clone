import React from "react";

type Props = {
  label: string;
  setAmenityList: any;
};

const Checkbox = ({ label, setAmenityList }: Props) => {
  return (
    <div className="block">
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="w-6 h-6 s" />
          <span className="ml-4 text-lg text-gray-400">{label} </span>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
