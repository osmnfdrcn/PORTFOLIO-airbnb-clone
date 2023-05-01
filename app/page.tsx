import getCurrentUser from "@/app/helpers/getCurrentUser";
import getProperties, { IPropertiesParams } from "@/app/helpers/getProperties";
import Container from "./components/layout/Container";
import { MapWrapper, NoResult, PropertyCard } from "@/app/components/ui";

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
      <div className="flex flex-col gap-4">
        <div className="w-full bg-slate-200 h-[50vh] sticky -mt-6">
          <MapWrapper properties={properties as any} />
        </div>

        <div
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 xl:grid-cols-5 gap-2 h-[300px]"
        >
          {" "}
          {/* fix any */}
          {properties.map((property: any) => (
            <PropertyCard
              currentUser={currentUser}
              key={property.id}
              data={property}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;
