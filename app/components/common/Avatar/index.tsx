"use client";
import Image from "next/image";
import style from "./Avatar.module.css";

const Avatar = () => {
  const { logoImage } = style;
  return <Image src="/images/avatar.jpg" className={logoImage} width="30" height="30" alt="avatar" />;
};

export default Avatar;
