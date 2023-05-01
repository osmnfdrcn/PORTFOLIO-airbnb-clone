"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { IReservation, IUser } from "@/app/types";
import { Heading } from "@/app/components/base";
import { ReservationCard } from "@/app/components/ui";
import { Container } from "@/app/components/layout";

interface ReservationWrapperProps {
  reservations: IReservation[];
  currentUser?: IUser | null;
}

const ReservationWrapper = ({
  reservations,
  currentUser,
}: ReservationWrapperProps) => {
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
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container noCategories>
      <Heading title="Reservations" subTitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {reservations.map((reservation: any) => (
          <ReservationCard
            key={uuidv4()}
            data={reservation.property}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel"
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationWrapper;
