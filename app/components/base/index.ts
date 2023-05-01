import dynamic from "next/dynamic";

export const Avatar = dynamic(() => import("./Avatar"));
export const Button = dynamic(() => import("./Button"));
export const Heading = dynamic(() => import("./Heading"));
export const Heart = dynamic(() => import("./Heart"));
export const HydrationErrorFix = dynamic(() => import("./HydrationErrorFix"));
export const LocationSelect = dynamic(() => import("./LocationSelect"));

// inputs
export const AuthFormTextInput = dynamic(
  () => import("./inputs/AuthFormTextInput")
);
export const Calendar = dynamic(() => import("./inputs/Calendar"));
export const CategoryInput = dynamic(() => import("./inputs/CategoryInput"));
export const Checkbox = dynamic(() => import("./inputs/Checkbox"));
export const Counter = dynamic(() => import("./inputs/Counter"));
export const ImageUpload = dynamic(() => import("./inputs/ImageUpload"));
export const TextInput = dynamic(() => import("./inputs/TextInput"));
