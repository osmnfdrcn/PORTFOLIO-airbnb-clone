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
import { Listing } from "@prisma/client";
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
};

const AirbnbYourHomeModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const [data, setData] = useState<Property>({
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "",
    price: 1,
    title: "",
    description: "",
  });

  // reset state and step
  const handleReset = () => {
    setStep(0);
    setData({
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    axios
      .post("/api/listings", data)
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

  return (
    <AirBnbMyHomeModalContainer handleReset={handleReset}>
      {step === STEPS.CATEGORY ? (
        <Categories handleData={setData} handleStep={setStep} data={data} />
      ) : null}
      {step === STEPS.LOCATION ? (
        <Locations handleData={setData} handleStep={setStep} data={data} />
      ) : null}
      {step === STEPS.INFO ? (
        <Info handleData={setData} handleStep={setStep} data={data} />
      ) : null}
      {step === STEPS.IMAGES ? (
        <PropertyImage handleData={setData} handleStep={setStep} data={data} />
      ) : null}
      {step === STEPS.DESCRIPTION ? (
        <Description handleData={setData} handleStep={setStep} data={data} />
      ) : null}
      {step === STEPS.PRICE ? (
        <Price
          handleSubmit={handleSubmit}
          handleData={setData}
          handleStep={setStep}
          data={data}
          reset={handleReset}
          price={true}
        />
      ) : null}
    </AirBnbMyHomeModalContainer>
  );
};

export default AirbnbYourHomeModal;
