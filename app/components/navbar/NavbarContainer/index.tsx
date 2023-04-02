"use client";
import style from "./NavbarContainer.module.css";

interface ContainerProps {
  children: React.ReactNode;
}
function NavbarContainer({ children }: ContainerProps) {
  const { container } = style;
  return <div className={container}>{children}</div>;
}

export default NavbarContainer;
