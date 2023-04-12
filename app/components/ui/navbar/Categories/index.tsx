"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/config/categoryList";
import CategoryBox from "../../modals/AirbnbYourHomeModal/Categories/CategoryBox";
import Container from "../../../layout/Container";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div
        className="
          flex flex-row items-center justify-between
          pt-4
          overflow-x-auto"
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
