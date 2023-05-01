"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { IReservation, IUser } from "@/app/types";
import { Heading } from "@/app/components/base";
import { Container } from "@/app/components/layout/";
import { ReservationCard } from "@/app/components/ui";

interface TripsWrapperProps {
  reservations: IReservation[];
  currentUser?: IUser | null;
}

const TripsWrapper = ({ reservations, currentUser }: TripsWrapperProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

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
    <Container noCategories>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {reservations?.map((reservation: any) => (
          <ReservationCard
            key={uuidv4()}
            data={reservation.property}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUserId={currentUser?.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsWrapper;
