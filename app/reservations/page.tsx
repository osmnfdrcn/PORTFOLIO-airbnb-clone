import { NoResult } from "@/app/components/ui";
import getCurrentUser from "../helpers/getCurrentUser";
import getReservations from "../helpers/getReservations";
import ReservationWrapper from "./ReservationWrapper";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoResult title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations?.length === 0) {
    return (
      <NoResult
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <ReservationWrapper
      reservations={reservations as any}
      currentUser={currentUser}
    />
  );
};

export default ReservationsPage;
