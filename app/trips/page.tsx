import getCurrentUser from "@/app/helpers/getCurrentUser";
import getReservations from "@/app/helpers/getReservations";
import NoResult from "../components/ui/property/NoResult";
import TripsWrapper from "./TripsWrapper";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoResult title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations?.length === 0) {
    return (
      <NoResult
        title="No trips found"
        subtitle="Looks like you havent reserved any trips."
      />
    );
  }

  return (
    <TripsWrapper
      reservations={reservations as any}
      currentUser={currentUser}
    />
  );
};

export default TripsPage;
