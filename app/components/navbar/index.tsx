"use client";
import NavbarContainer from "./NavbarContainer";
import Logo from "./Logo";
import SearchArea from "./SearchArea";
import UserMenu from "./UserMenu";
import style from "./index.module.css";
import { User } from "@prisma/client";
const { wrapper } = style;

interface NavbarProps {
  currentUser: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className={wrapper}>
      <NavbarContainer>
        <Logo />
        <SearchArea />
        <UserMenu currentUser={currentUser} />
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
