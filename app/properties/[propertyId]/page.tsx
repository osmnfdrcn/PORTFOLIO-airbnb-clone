import { NoResult } from "@/app/components/ui";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import getPropertiesById from "@/app/helpers/getPropertyById";
import getReservations from "@/app/helpers/getReservations";
import PropertyWrapper from "../PropertyWrapper";

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
  // FIX ANY : SERIALIZATION
  return (
    <PropertyWrapper
      property={property as any}
      reservations={reservations as any}
      currentUser={currentUser}
    />
  );
};

export default PropertyPage;
