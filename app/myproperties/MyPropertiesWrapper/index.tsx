"use client";

import { PropertyCard } from "@/app/components/ui";
import { IProperty, IUser } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "../../components/base";
import { Container } from "../../components/layout";

interface MyPropertiesWrapperProps {
  properties: IProperty[];
  currentUser?: IUser | null;
}

const MyPropertiesWrapper = ({
  properties,
  currentUser,
}: MyPropertiesWrapperProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/properties/${id}`)
        .then(() => {
          toast.success("Property deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container noCategories>
      <Heading title="Properties" subTitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2       md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6          gap-8">
        {properties?.map((property: any) => (
          <PropertyCard
            key={uuidv4()}
            data={property}
            actionId={property.id}
            onAction={onDelete}
            disabled={deletingId === property.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default MyPropertiesWrapper;
