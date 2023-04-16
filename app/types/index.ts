import { Properties, Reservation, User } from "@prisma/client";

// date serialization problems
export type IProperties = Omit<Properties, "createdAt"> & {
  createdAt: string;
};

export type IReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: IProperties;
};

export type IUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type ILocation = {
  address: {
    ISO3166_2_lvl4: string;
    city: string;
    country: string;
    country_code: string;
    county: string;
    postcode: string;
    province: string;
    region: string;
  };
  boundingbox: string[];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  type: string;
};
export type IProperty = {
  categories: string[];
  location: ILocation | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};
