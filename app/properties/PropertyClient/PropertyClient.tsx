"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { IProperties, IReservation, IUser } from "@/app/types";
import Container from "@/app/components/layout/Container";
import { categoryList } from "@/app/config/categoryList";
import PropertyHead from "../PropertyHead";
import PropertyInfo from "../PropertyInfo";
import PropertyReservation from "../PropertyReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface PropertyClientProps {
  reservations?: IReservation[];
  property: IProperties & {
    user: IUser;
  };
  currentUser?: IUser | null;
}

const PropertyClient = ({
  property,
  reservations = [],
  currentUser,
}: PropertyClientProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const categories = useMemo(() => {
    return categoryList.filter((items) =>
      property.categories.includes(items.label)
    );
  }, [property.categories]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(property.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const isYourProperty = property.userId === currentUser?.id;

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: property?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, property?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && property.price) {
        setTotalPrice(dayCount * property.price);
      } else {
        setTotalPrice(property.price);
      }
    }
  }, [dateRange, property.price]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6 relative -top-24">
          <PropertyHead
            title={property.title}
            imageSrc={property.imageSrc}
            locationValue={property.locationValue}
            id={property.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <PropertyInfo
              isYourProperty={isYourProperty}
              user={property.user}
              categories={categories as any}
              description={property.description}
              roomCount={property.roomCount}
              guestCount={property.guestCount}
              bathroomCount={property.bathroomCount}
              locationValue={property.locationValue}
              coordinates={property.coordinates}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              {!isYourProperty ? (
                <PropertyReservation
                  price={property.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value: any) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PropertyClient;
