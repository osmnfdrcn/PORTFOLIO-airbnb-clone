import { Heading } from "@/app/components/base";
import { Container } from "@/app/components/layout";
import { PropertyCard } from "@/app/components/ui";
import { IProperty, IUser } from "@/app/types";
import { v4 as uuidv4 } from "uuid";

interface FavoritesWrapperProps {
  properties: IProperty[];
  currentUser?: IUser | null;
}

const FavoritesWrapper = ({
  properties,
  currentUser,
}: FavoritesWrapperProps) => {
  return (
    <Container noCategories>
      <Heading title="Favorites" subTitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {properties.map((property: any) => (
          <PropertyCard
            currentUser={currentUser}
            key={uuidv4()}
            data={property}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesWrapper;
