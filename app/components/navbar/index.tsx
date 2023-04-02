"use client";
import NavbarContainer from "./NavbarContainer";
import Logo from "./Logo";
import SearchArea from "./SearchArea";
import UserMenu from "./UserMenu";
import style from "./index.module.css";
const { wrapper } = style;

const Navbar = () => {
  return (
    <div className={wrapper}>
      <NavbarContainer>
        <Logo />
        <SearchArea />
        <UserMenu />
      </NavbarContainer>
    </div>
  );
};

export default Navbar;
