"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useToggle from "@/app/hooks/useToggle";
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

const UserMenu = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useToggle(false);
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
          <MenuItem label="Login" onClick={() => {}} />
          <MenuItem label="Sign up" onClick={registerModal.onOpen} />
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
