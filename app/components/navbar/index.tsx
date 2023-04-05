import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import Container from "../Container";
import Logo from "./Logo";
import SearchArea from "./SearchArea";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full bg-white shadow-sm">
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
