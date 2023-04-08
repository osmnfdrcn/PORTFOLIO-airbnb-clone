import countries from "world-countries";
import { City, State } from "country-state-city";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useLocations = () => {
  const getAllCountries = () => formattedCountries;

  const getCountryByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  const getStatesOfGivenCountry = (countryCode: string) => {
    return State.getStatesOfCountry(countryCode);
  };

  const getCitiesOfGivenState = (countryCode: string, stateCode: string) => {
    console.log(City.getCitiesOfState(countryCode, stateCode));

    return City.getCitiesOfState(countryCode, stateCode);
  };

  return {
    getAllCountries,
    getCountryByValue,
    getStatesOfGivenCountry,
    getCitiesOfGivenState,
  };
};

export default useLocations;
