import { Heading } from "@/app/components/base";
import Container from "@/app/components/layout/Container";
import PropertyCard from "@/app/components/ui/property/PropertyCard";
import { IProperty, IUser } from "@/app/types";

interface FavoritesWrapperProps {
  properties: IProperty[];
  currentUser?: IUser | null;
}

const FavoritesWrapper = ({
  properties,
  currentUser,
}: FavoritesWrapperProps) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div
        className="
          mt-10
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
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

export default FavoritesWrapper;
