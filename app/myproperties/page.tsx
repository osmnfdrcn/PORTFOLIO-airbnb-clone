import getCurrentUser from "@/app/helpers/getCurrentUser";
import getProperties from "@/app/helpers/getProperties";
import NoResult from "../components/ui/property/NoResult";

import MyPropertiesWrapper from "./MyPropertiesWrapper";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NoResult title="Unauthorized" subtitle="Please login" />;
  }

  const properties = await getProperties({ userId: currentUser.id });

  if (properties?.length === 0) {
    return (
      <NoResult
        title="No properties found"
        subtitle="Looks like you have no properties."
      />
    );
  }

  return (
    <MyPropertiesWrapper
      properties={properties as any}
      currentUser={currentUser}
    />
  );
};

export default PropertiesPage;
