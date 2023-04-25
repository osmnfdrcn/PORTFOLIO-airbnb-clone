import Categories from "./Categories";
import Container from "../../layout/Container";
import Logo from "./Logo";
import SearchArea from "./SearchArea";
import UserMenu from "./UserMenu";
import { IUser } from "@/app/types";

interface NavbarProps {
  currentUser?: IUser | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed z-20 w-full bg-white shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
              flex flex-row items-center justify-between 
              gap-3 md:gap-0"
          >
            <Logo />
            <SearchArea />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
