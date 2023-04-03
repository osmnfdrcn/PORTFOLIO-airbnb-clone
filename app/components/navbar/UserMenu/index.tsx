"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useToggle from "@/app/hooks/useToggle";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { AiOutlineMenu } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";

import Avatar from "../../common/Avatar";

import style from "./UserMenu.module.css";
const {
  container,
  flexWrapper,
  airBnbYourHome,
  languageIcon,
  userMenuIcons,
  userMenuWrapper,
  userMenuItem,
} = style;

interface UserMenuProps {
  currentUser: User | null;
}
const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useToggle(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className={container}>
      <div className={flexWrapper}>
        <div className={airBnbYourHome} onClick={() => {}}>
          Airbnb your home
        </div>
        <div className={languageIcon}>
          <TbWorld size={16} />
        </div>
        <div className={userMenuIcons} onClick={setIsUserMenuOpen}>
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isUserMenuOpen && (
        <div className={userMenuWrapper}>
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
    <div className={userMenuItem} onClick={onClick}>
      {label}
    </div>
  );
};
