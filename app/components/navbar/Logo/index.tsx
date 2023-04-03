"use client";
import style from "./Logo.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  const router = useRouter();
  return (
    <Image
      className={style.logoImage}
      src={"/images/logo.png"}
      width={100}
      height={100}
      alt="airbnb logo"
    />
  );
};

export default Logo;
