// import getCurrentUser from "@/app/actions/getCurrentUser";
import { NoResult } from "../components/ui";
import getCurrentUser from "../helpers/getCurrentUser";
import getFavoriteProperties from "../helpers/getFavoriteProperties";
import FavoritesWrapper from "./FavoritesWrapper";

const FavoritesPage = async () => {
  const properties = await getFavoriteProperties();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoResult title="Unauthorized" subtitle="Please login" />;
  }

  if (properties.length === 0) {
    return (
      <NoResult
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoritesWrapper
      properties={properties as any}
      currentUser={currentUser}
    />
  );
};

export default FavoritesPage;
