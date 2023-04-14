"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useRentModal } from "@/app/hooks";
import AirBnbMyHomeModalContainer from "./AirBnbYourHomeModalContainer";
import { useState } from "react";
import Categories from "./Categories";
import Locations from "./Locations";
import Info from "./Info";
import PropertyImage from "./Image";
import Description from "./Description";
import Price from "./Price";
import { Property } from "@/app/types";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export type AirbnbYourHomeModalComponentsProps = {
  handleSubmit?: () => void;
  reset?: () => void;
  handleData: (data: Property) => void;
  handleStep: (value: number) => void;
  data: Property;
  step: number;
};

const INITIAL_STATE = {
  category: "",
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: "",
  price: 1,
  title: "",
  description: "",
};

const AirbnbYourHomeModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [data, setData] = useState<Property>(INITIAL_STATE);
  console.log(data);

  // reset state and step
  const handleReset = () => {
    setStep(0);
    setData(INITIAL_STATE);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/properties", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        setStep(STEPS.CATEGORY);
        handleReset();
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const renderStep = (step: STEPS) => {
    switch (step) {
      case STEPS.CATEGORY:
        return (
          <Categories
            handleData={setData}
            handleStep={setStep}
            data={data}
            step={step}
          />
        );
      case STEPS.LOCATION:
        return (
          <Locations
            handleData={setData}
            handleStep={setStep}
            data={data}
            step={step}
          />
        );
      case STEPS.INFO:
        return (
          <Info
            handleData={setData}
            handleStep={setStep}
            data={data}
            step={step}
          />
        );
      case STEPS.IMAGES:
        return (
          <PropertyImage
            handleData={setData}
            handleStep={setStep}
            data={data}
            step={step}
          />
        );
      case STEPS.DESCRIPTION:
        return (
          <Description
            handleData={setData}
            handleStep={setStep}
            data={data}
            step={step}
          />
        );
      case STEPS.PRICE:
        return (
          <Price
            handleSubmit={handleSubmit}
            handleData={setData}
            handleStep={setStep}
            data={data}
            reset={handleReset}
            step={step}
          />
        );
      default:
        return null;
    }
  };
  return (
    <AirBnbMyHomeModalContainer handleReset={handleReset}>
      {renderStep(step)}
    </AirBnbMyHomeModalContainer>
  );
};

export default AirbnbYourHomeModal;
