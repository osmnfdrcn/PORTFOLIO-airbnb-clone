"use client";
import { v4 as uuidv4 } from "uuid";

import { usePathname, useSearchParams } from "next/navigation";
import { categoryList } from "@/app/config/categoryList";
import Container from "../../../layout/Container";
import CategoryBox from "./CategoryBox";

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
          flex flex-row items-center justify-start
          pt-4
          overflow-x-auto"
      >
        {categoryList.map((item) => (
          <CategoryBox
            key={uuidv4()}
            label={item.label}
            image={item.image}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
