import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
type City = {
  name: string;
  countryCode: string;
  stateCode: string;
  latitude: string;
  longitude: string;
};
const Cities = () => {
  const cities: any = City.getCitiesOfCountry("TR");

  return <>city</>;
};

export default Cities;
