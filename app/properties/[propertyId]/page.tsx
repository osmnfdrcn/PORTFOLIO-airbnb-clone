import NoResult from "@/app/components/ui/property/NoResult";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import getPropertiesById from "@/app/helpers/getPropertyById";
import getReservations from "@/app/helpers/getReservations";
import PropertyClient from "../PropertyClient/PropertyClient";

interface IParams {
  propertyId?: string;
}

const PropertyPage = async ({ params }: { params: IParams }) => {
  const property = await getPropertiesById(params);
  const reservations = await getReservations(params as any);
  const currentUser = await getCurrentUser();

  if (!property) {
    return <NoResult />;
  }

  return (
    <PropertyClient
      property={property}
      reservations={reservations}
      currentUser={currentUser}
    />
  );
};

export default PropertyPage;
