"use client";
import { categories } from "@/app/constants/categoryList";
import useRentModal from "@/app/hooks/useRentModal";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Heading from "../../common/Heading";
import CategoryInput from "../../inputs/CategoryInput";
import Counter from "../../inputs/Counter";
import FormInput from "../../inputs/FormInput";
import ImageUpload from "../../inputs/ImageUpload";
import CitySelect, {
  CitySelectValue,
} from "../../inputs/LocationSelect/CitySelect";
import CountrySelect from "../../inputs/LocationSelect/CountrySelect";
import StateSelect from "../../inputs/LocationSelect/StateSelect.";
import Modal from "../Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      country: null,
      state: null,
      city: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const country = watch("country");
  const state = watch("state");
  const city = watch("city");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount ");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../../Map"), {
        ssr: false,
      }),
    [city]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => setStep((prev) => prev - 1);
  const onNext = () => setStep((prev) => prev + 1);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subTitle="Pick a category"
      />
      <div
        className="
          grid grid-cols-1 md:grid-cols-2 gap-3  
          max-h-[50vh] overflow-y-auto"
      >
        {categories.map((c) => (
          <div key={c.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === c.label}
              label={c.label}
              icon={c.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help us to find your place!"
        />
        <CountrySelect
          countryValue={country}
          onChange={(countryValue) => {
            setCustomValue("country", countryValue);
            setCustomValue("state", null);
            setCustomValue("city", null);
          }}
        />
        {country ? (
          <StateSelect
            country={country?.value}
            stateValue={state}
            onChange={(value: CitySelectValue) => {
              setCustomValue("state", value);
              setCustomValue("city", null);
            }}
          />
        ) : null}
        {state ? (
          <CitySelect
            countryCode={country?.value}
            stateCode={state?.isoCode}
            cityValue={city}
            onChange={(value: CitySelectValue) => setCustomValue("city", value)}
          />
        ) : null}
        {city ? (
          <Map
            center={[parseFloat(city?.latitude), parseFloat(city?.longitude)]}
          />
        ) : null}
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subTitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show guests what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Short and sweet works best!"
        />
        <FormInput
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <FormInput
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subTitle="How much do you charge per night?"
        />
        <FormInput
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Airbnb your home!"
      actionText={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionText={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      body={body}
    />
  );
};

export default RentModal;
