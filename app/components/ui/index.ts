import dynamic from "next/dynamic";

export const MainMap = dynamic(() => import("./MainMap"));

// modals
export const AirbnbYourHomeModal = dynamic(
  () => import("./modals/AirbnbYourHomeModal")
);
export const LoginModal = dynamic(
  () => import("./modals/AuthModals/LoginModal")
);
export const RegisterModal = dynamic(
  () => import("./modals/AuthModals/RegisterModal")
);
export const SearchModal = dynamic(() => import("./modals/SearchModal"));

// navbar
export const Navbar = dynamic(() => import("./navbar"));

// cards
export const PropertyCard = dynamic(() => import("./property/PropertyCard"));
export const ReservationCard = dynamic(
  () => import("./property/ReservationCard")
);

//no-result
export const NoResult = dynamic(() => import("./NoResult"));

//map
export const MapWrapper = dynamic(() => import("./MainMap/MapWrapper"));
