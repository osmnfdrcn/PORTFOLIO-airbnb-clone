"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      className="hidden md:block cursor-pointer"
      src={"/images/logo.png"}
      width={250}
      height={80}
      style={{ width: "10%", height: "auto" }}
      priority
      alt="airbnb logo"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
