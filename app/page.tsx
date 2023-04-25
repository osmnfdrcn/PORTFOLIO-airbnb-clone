import React from "react";
import NoResult from "./components/ui/property/NoResult";
import Container from "./components/layout/Container";
import getProperties, { IPropertiesParams } from "@/app/helpers/getProperties";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import PropertyCard from "./components/ui/property/PropertyCard";
import Loading from "./loading";
interface IHome {
  searchParams: IPropertiesParams;
}
const Home = async ({ searchParams }: IHome) => {
  const properties = await getProperties(searchParams);

  const currentUser = await getCurrentUser();
  if (!properties?.length) {
    return <NoResult showReset />;
  }
  return (
    <Container>
      <div className="flex gap-4">
        <div
          className="w-3/5 bg-gray grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-3 xl:grid-cols-3 gap-8"
        >
          {properties.map((property: any) => (
            <PropertyCard
              currentUser={currentUser}
              key={property.id}
              data={property}
            />
          ))}
        </div>
        <div className="w-2/5 bg-slate-200 h-[70vh]">MAP</div>
      </div>
    </Container>
  );
};

export default Home;
