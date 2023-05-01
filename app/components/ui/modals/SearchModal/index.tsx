"use client";

import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import { Calendar, Counter, Heading, TextInput } from "@/app/components/base";
import { capitalizeFirstLetter } from "@/app/helpers/capitilizeFirstLetter";
import useSearchModal from "@/app/hooks/useSearchModal";
import ModalContainer from "../ModalContainer";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
  PRICE = 3,
}

type FILTERS_PROPS = {
  location: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  dateRange: Range;
  price: number;
};

const INITIAL_VALUES = {
  location: "",
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
  price: 0,
};

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [filterValues, setFilterValues] =
    useState<FILTERS_PROPS>(INITIAL_VALUES);

  const { location, guestCount, roomCount, bathroomCount, dateRange, price } =
    filterValues;
  const [step, setStep] = useState(STEPS.LOCATION);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const handleClose = () => {
    setStep(STEPS.LOCATION);
    setFilterValues(INITIAL_VALUES);
    searchModal.onClose();
  };

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location,
      guestCount,
      roomCount,
      bathroomCount,
      price: price > 0 && price,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    handleClose();
    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    searchModal,
    location,
    router,
    guestCount,
    roomCount,
    dateRange,
    price,
    onNext,
    bathroomCount,
    params,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" />
      <div className="flex gap-1">
        <div className="w-full ">
          <TextInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              // design mistake : in DB, location value is kept in first capital
              setFilterValues({
                ...filterValues,
                location: capitalizeFirstLetter(event.target.value),
              });
            }}
            placeholder="Location"
          />
        </div>
      </div>
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8 items-center">
        <Heading title="When do you plan to go?" />
        <Calendar
          onChange={(value) =>
            setFilterValues({
              ...filterValues,
              dateRange: value.selection,
            })
          }
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" />
        <Counter
          onChange={(value) =>
            setFilterValues({
              ...filterValues,
              guestCount: value,
            })
          }
          value={guestCount}
          title="Guests"
          subtitle=""
        />
        <hr />
        <Counter
          onChange={(value) =>
            setFilterValues({
              ...filterValues,
              roomCount: value,
            })
          }
          value={roomCount}
          title="Rooms"
          subtitle=""
        />
        <hr />
        <Counter
          onChange={(value) => {
            setFilterValues({
              ...filterValues,
              bathroomCount: value,
            });
          }}
          value={bathroomCount}
          title="Bathrooms"
          subtitle=""
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Maximum price per night?" />
        <div className="flex gap-1">
          <div className="w-full">
            <TextInput
              type="number"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFilterValues({
                  ...filterValues,
                  price: +event.target.value,
                });
              }}
              placeholder="Maximum price"
              price={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModalContainer
      isOpen={searchModal.isOpen}
      title="Filters"
      actionText={actionLabel}
      onSubmit={onSubmit}
      secondaryActionText={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={handleClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
