import { Button, Heading, TextInput } from "@/app/components/base";
import { ILocation } from "@/app/types";
import axios from "axios";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AirbnbYourHomeModalComponentsProps } from "..";
import { v4 as uuidv4 } from "uuid";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const Locations = ({
  handleData,
  data,
  handleStep,
  step,
}: AirbnbYourHomeModalComponentsProps) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [selectPosition, setSelectPosition] = useState<ILocation | null>(null);
  const { location } = data;
  const handleBackClick = () => handleStep(--step);
  const handleNextClick = () => handleStep(++step);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
        loading: () => (
          <div className="h-[35vh] rounded-lg bg-neutral-200">Loading...</div>
        ), //find a better way to fix flickering
      }),
    [location]
  );

  const params = useMemo(
    () => ({
      q: searchText,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
    }),
    [searchText]
  );

  const handleLocationClick = (item: ILocation): void => {
    handleData({ ...data, location: item });
    setSelectPosition(item);
    setListPlace([]);
    setSearchText("");
  };

  const handleSearchClick = (): void => {
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    axios(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions).then(
      (response) => setListPlace(response.data)
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subTitle="Help us to find your place!"
      />

      {/* fix flickering */}
      <Map
        center={[
          parseFloat(location?.lat!) || 39.91987,
          parseFloat(location?.lon!) || 32.85427,
        ]}
      />
      <p>{location?.display_name}</p>
      <div className="flex gap-1">
        <div className="w-4/5 ">
          <TextInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSearchText(event.target.value);
            }}
            placeholder="Find your place location"
          />
        </div>
        <div className="w-1/5">
          <Button narrow text="Search" onClick={handleSearchClick} />
        </div>
      </div>

      <div
        className={`
          absolute top-0 left-0 right-0 z-10 
          flex flex-col gap-4  
          bg-white px-8 text-sm text-neutral-400 
          ${listPlace.length ? "h-full " : null} `}
      >
        {listPlace.length ? (
          <div
            className="flex justify-end cursor-pointer m-4"
            onClick={() => setListPlace([])}
          >
            <IoMdClose />
          </div>
        ) : null}

        {listPlace.map((item: ILocation) => (
          <p
            key={uuidv4()}
            className="hover:text-black cursor-pointer"
            onClick={() => handleLocationClick(item)}
          >
            {item?.display_name}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <Button outline text="Back" onClick={handleBackClick} />
          <Button
            text="Next"
            onClick={handleNextClick}
            disabled={!location?.display_name}
          />
        </div>
      </div>
    </div>
  );
};

export default Locations;
