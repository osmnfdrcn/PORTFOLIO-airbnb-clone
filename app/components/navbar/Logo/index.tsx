"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <Image
      className="hidden md:block cursor-pointer"
      src={"/images/logo.png"}
      width={100}
      height={100}
      alt="airbnb logo"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
