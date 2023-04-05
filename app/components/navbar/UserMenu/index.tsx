"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useToggle from "@/app/hooks/useToggle";
import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";

import Avatar from "../../common/Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useToggle(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  console.log(currentUser?.image);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="
            hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </div>
        <div
          className="
            py-3 px-3 
            rounded-full 
            hover:bg-neutral-100 
            transition cursor-pointer"
        >
          <TbWorld size={20} />
        </div>
        <div
          className="
            p-4 md:py-1 md:px-2
            border-[1px] rounded-full  border-neutral-200 
            flex flex-row items-center gap-3 
            cursor-pointer hover:shadow-md transition"
          onClick={setIsUserMenuOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar image={currentUser?.image as string} />
          </div>
        </div>
      </div>
      {isUserMenuOpen && (
        <div
          className="
            absolute right-0 top-12
            w-[40vw] md:w-3/4 bg-white text-sm
            rounded-xl shadow-md
            overflow-hidden"
        >
          {currentUser ? (
            <>
              <MenuItem label="My trips" onClick={loginModal.onOpen} />
              <MenuItem label="My favourites" onClick={loginModal.onOpen} />
              <MenuItem label="My reservations" onClick={loginModal.onOpen} />
              <MenuItem label="My properties" onClick={loginModal.onOpen} />
              <MenuItem label="Airbnb my home" onClick={loginModal.onOpen} />
              <MenuItem label="Logout" onClick={() => signOut()} />
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
      className="px-4 py-3 
      hover:bg-neutral-100 
      transition
      font-semibold"
      onClick={onClick}
    >
      {label}
    </div>
  );
};
