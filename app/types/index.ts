import { User } from "@prisma/client";

// user type's date serialization problem
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Location = {
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
export type Property = {
  category: string;
  location: Location | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
};
