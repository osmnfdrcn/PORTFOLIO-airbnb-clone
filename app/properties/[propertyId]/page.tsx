import { getCurrentUser } from "@/app/utils/getCurrentUser";

import getReservations from "@/app/utils/getReservations";

import EmptyState from "@/app/components/ui/property/EmptyState";
import PropertyClient from "./PropertyClient";
import getPropertiesById from "@/app/utils/getPropertyById";

interface IParams {
  propertyId?: string;
}

const PropertyPage = async ({ params }: { params: IParams }) => {
  const property = await getPropertiesById(params);
  const reservations = await getReservations(params as any);
  const currentUser = await getCurrentUser();

  if (!property) {
    return <EmptyState />;
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
