import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { IUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  propertyId: string;
  currentUser?: IUser | null;
}

const useFavorites = ({ propertyId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorited = useMemo(() => {
    const userFavoriteProperties = currentUser?.favoriteIds || [];

    return userFavoriteProperties.includes(propertyId);
  }, [currentUser, propertyId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${propertyId}`);
        } else {
          request = () => axios.post(`/api/favorites/${propertyId}`);
        }

        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, propertyId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorites;
