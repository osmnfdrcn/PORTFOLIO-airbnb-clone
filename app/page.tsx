import React from "react";
import EmptyState from "./components/ui/property/EmptyState";
import Container from "./components/layout/Container";
import getProperties, { IPropertiesParams } from "@/app/utils/getProperties";
import { getCurrentUser } from "@/app/utils/getCurrentUser";
import PropertyCard from "./components/ui/property/PropertyCard";
interface HomeProps {
  searchParams: IPropertiesParams;
}
const Home = async ({ searchParams }: HomeProps) => {
  const properties = await getProperties(searchParams);
  const currentUser = await getCurrentUser();
  if (!properties.length) {
    return <EmptyState showReset />;
  }
  return (
    <Container>
      <div
        className="bg-gray grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 xl:grid-cols-5 gap-8"
      >
        {properties.map((property: any) => (
          <PropertyCard
            currentUser={currentUser}
            key={property.id}
            data={property}
          />
        ))}
      </div>
    </Container>
  );
};

export default Home;
