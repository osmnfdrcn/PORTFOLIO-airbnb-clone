"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import useToggle from "@/app/hooks/useToggle";
import { IUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Avatar from "../../../base/Avatar";

interface UserMenuProps {
  currentUser?: IUser | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useToggle(false);
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-1">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold p-3 rounded-full hover:bg-neutral-100 transition cursor-pointer border items-end"
        >
          Airbnb your home
        </div>

        <div
          className="p-2 border-[1px] rounded-full  border-neutral-200 flex flex-row items-center gap-3             cursor-pointer hover:shadow-md transition"
          onClick={setIsUserMenuOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image as string} />
          </div>
        </div>
      </div>
      {isUserMenuOpen && (
        <div className="absolute z-10 right-0 top-12 w-[40vw] md:w-3/4 bg-white text-sm rounded-xl shadow-md overflow-hidden">
          {currentUser ? (
            <>
              <MenuItem
                label="My trips"
                onClick={() => router.push("/trips")}
              />
              <MenuItem
                label="My favorites"
                onClick={() => router.push("/favorites")}
              />
              <MenuItem
                label="My reservations"
                onClick={() => router.push("/reservations")}
              />
              <MenuItem
                label="My properties"
                onClick={() => router.push("/myproperties")}
              />
              <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
              <MenuItem
                label="Logout"
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}` })
                }
              />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={loginModal.onOpen} />
              <MenuItem label="Sign up" onClick={registerModal.onOpen} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      className="px-4 py-3 hover:bg-neutral-100 cursor-pointer
      transition font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};
