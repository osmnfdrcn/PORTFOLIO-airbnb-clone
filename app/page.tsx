import NoResult from "./components/ui/property/NoResult";
import Container from "./components/layout/Container";
import getProperties, { IPropertiesParams } from "@/app/helpers/getProperties";
import getCurrentUser from "@/app/helpers/getCurrentUser";
import PropertyCard from "./components/ui/property/PropertyCard";
import MapWrapper from "./components/ui/MainMap/MapWrapper";
import { IProperties } from "./types";

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
          className="w-1/2 bg-gray grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2
      lg:grid-cols-3 xl:grid-cols- gap-2"
        >
          {properties.map((property: any) => (
            <PropertyCard
              currentUser={currentUser}
              key={property.id}
              data={property}
            />
          ))}
        </div>

        {/* fix any */}

        <div className="w-1/2 bg-slate-200 h-[75vh] ">
          <MapWrapper properties={properties as any} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
