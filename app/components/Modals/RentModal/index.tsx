"use client";
import { categories } from "@/app/constants/categoryList";
import useRentModal from "@/app/hooks/useRentModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../common/Button";
import Heading from "../../common/Heading";
import CategoryInput from "../../inputs/CategoryInput";
import Counter from "../../inputs/Counter";
import FormInput from "../../inputs/FormInput";
import ImageUpload from "../../inputs/ImageUpload";
import Modal from "../Modal";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const RentModal = () => {
  const rentModal = useRentModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [selectPosition, setSelectPosition] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  console.log({ selectPosition });

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
      location: null,
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
  const location = watch("location");
  const guestCount = watch("guestCount");
  const bathroomCount = watch("bathroomCount");
  const roomCount = watch("roomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../../Map"), {
        ssr: false,
      }),
    [location]
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
    console.log({ data });

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

  const actionLabel = useMemo(
    () => (step === STEPS.PRICE ? "Create" : "Next"),
    [step]
  );

  const secondaryActionLabel = useMemo(
    () => (step === STEPS.CATEGORY ? undefined : "Back"),
    [step]
  );

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
    const params: {
      q: string;
      format: string;
      addressdetails: string;
      polygon_geojson: string;
    } = {
      q: searchText,
      format: "json",
      addressdetails: "1",
      polygon_geojson: "0",
    };

    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subTitle="Help us to find your place!"
        />
        <Map center={[location?.lat || 39.91987, location?.lon || 32.85427]} />
        <p>{location?.display_name}</p>
        <div className="flex gap-1">
          <div className="w-4/5 ">
            <input
              className="
              w-full p-2.5 
              bg-white  font-light 
              border-2 rounded-md outline-none"
              value={searchText}
              placeholder="enter your city or streetname"
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
          </div>
          <div className="w-1/5">
            <Button
              text="Search"
              onClick={() => {
                const queryString = new URLSearchParams(params).toString();
                const requestOptions: { method: string; redirect: string } = {
                  method: "GET",
                  redirect: "follow",
                };
                axios(
                  `${NOMINATIM_BASE_URL}${queryString}`,
                  requestOptions
                ).then((response) => setListPlace(response.data));
              }}
            />
          </div>
        </div>

        <div
          className={`
          absolute top-0 left-0 right-0 z-10 
          flex flex-col gap-4  
          bg-white p-4 text-sm text-neutral-400 
          ${listPlace.length ? "h-full " : null} `}
        >
          {listPlace.map((item: any) => {
            return (
              <p
                key={item?.place_id}
                className="hover:text-black cursor-pointer"
                onClick={() => {
                  setCustomValue("location", item);
                  setSelectPosition(item);
                  setListPlace([]);
                  setSearchText("");
                }}
              >
                {item?.display_name}
              </p>
            );
          })}
        </div>
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
      onClose={() => {
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      }}
      body={body}
    />
  );
};

export default RentModal;
