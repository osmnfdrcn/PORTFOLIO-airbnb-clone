"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval, isPast } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { IProperties, IReservation, IReview, IUser } from "@/app/types";
import { categoryList } from "@/app/config/categoryList";
import PropertyHead from "../PropertyHead";
import PropertyInfo from "../PropertyInfo";
import PropertyReservation from "../PropertyReservation";
import useReviewModal from "@/app/hooks/useReviewModal";
import Reviews from "../Reviews";
import ReviewModal from "../ReviewModal";
import { Container } from "@/app/components/layout";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface PropertyWrapperProps {
  reservations?: IReservation[];
  property: IProperties & {
    user: IUser;
    reviews: IReview[];
  };
  currentUser?: IUser | null;
}

const PropertyWrapper = ({
  property,
  reservations = [],
  currentUser,
}: PropertyWrapperProps) => {
  const loginModal = useLoginModal();
  const reviewModal = useReviewModal();

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

  const isUsersOwnProperty = property.userId === currentUser?.id;

  const usersAllReservationsOnProperty = reservations?.filter(
    (r) => r.userId === currentUser?.id
  );

  const reservationsCanBeLeftReview = usersAllReservationsOnProperty.filter(
    (r) => !r.review && isPast(new Date(r.startDate))
  );

  {
    /* USER CANNOT LEAVE A REVIEW IN CASE OF 
            the property is user's own or
            user has a reservation but already left a review
    */
  }
  const userCanLeaveReview =
    !isUsersOwnProperty && reservationsCanBeLeftReview.length;

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
        propertyId: property?.id,
      })
      .then(() => {
        toast.success("Property reserved!");
        setDateRange(initialDateRange);
        router.refresh();
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

  //----STICKY COMPONENT-RESERVATIONS-----
  const reviewComponentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          // reservation component is not in view => sticky
          return;
        }
        // reservation component is in view,  => remove sticky behavior
        const reservationComponent = document.getElementById(
          "reservation-component"
        ) as HTMLDivElement | null;
        if (reservationComponent) {
          reservationComponent.classList.remove("sticky");
        }
      },
      { rootMargin: "-200px 0px" }
    );
    if (reviewComponentRef.current) {
      observer.observe(reviewComponentRef.current);
    }
    return () => observer.disconnect();
  }, []);
  //----STICKY COMPONENT-RESERVATIONS-----

  return (
    <Container noCategories>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6 relative">
          <PropertyHead
            title={property.title}
            imageSrc={property.imageSrc}
            locationValue={property.locationValue}
            id={property.id}
            propertyOwnerId={property.userId}
            currentUser={currentUser}
          />
          {/* PROPERTY INFO SECTION */}
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
              propertyId={property.id}
              isYourProperty={isUsersOwnProperty}
              user={property.user}
              categories={categories as any}
              description={property.description}
              roomCount={property.roomCount}
              guestCount={property.guestCount}
              bathroomCount={property.bathroomCount}
              locationValue={property.locationValue}
              coordinates={property.coordinates}
              reviews={property.reviews}
            />

            {/* RESERVATION SECTION */}
            <div
              id="reservation-component"
              className="sticky order-first mb-10 md:order-last               md:col-span-3"
            >
              <PropertyReservation
                price={property.price}
                totalPrice={totalPrice}
                onChangeDate={(value: any) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading || isUsersOwnProperty}
                disabledDates={disabledDates}
              />
            </div>
          </div>

          {/* REVIEW SECTION */}
          <div
            ref={reviewComponentRef}
            className="bg-white border rounded-lg p-5  w-full relative"
          >
            <Reviews
              propertyId={property.id}
              reviews={property.reviews}
              userCanLeaveReview={!!userCanLeaveReview}
              showLeaveReviewButton={!!currentUser}
            />
          </div>
        </div>
      </div>

      {/* REVIEW MODAL */}
      {reviewModal.isOpen ? (
        <ReviewModal
          propertyId={property.id}
          reservations={reservationsCanBeLeftReview}
        />
      ) : null}
    </Container>
  );
};

export default PropertyWrapper;
