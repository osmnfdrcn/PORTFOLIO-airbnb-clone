"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

import { IReservation, IUser } from "@/app/types";

import { Heading } from "@/app/components/base";
import PropertyCard from "@/app/components/ui/property/PropertyCard";
import Container from "@/app/components/layout/Container";

interface TripsWrapperProps {
  reservations: IReservation[];
  currentUser?: IUser | null;
}

const TripsWrapper = ({ reservations, currentUser }: TripsWrapperProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  // const date = new Date();
  // const dayCount2 = differenceInDays(dateRange.endDate!, date);
  // console.log({ dayCount2 });

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {reservations?.map((reservation: any) => (
          //  cancel islemi yapilabilir mi burada kontrol edileck
          <PropertyCard
            key={uuidv4()}
            data={reservation.property}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsWrapper;
