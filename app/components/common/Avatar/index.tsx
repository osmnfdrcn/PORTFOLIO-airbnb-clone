"use client";
import Image from "next/image";

import style from "./Avatar.module.css";

interface AvatarProps {
  image?: string;
}

const Avatar = ({ image }: AvatarProps) => {
  console.log(image);

  const { logoImage } = style;
  return (
    <Image
      src={image || "/images/avatar.jpg"}
      className={logoImage}
      width="30"
      height="30"
      alt="avatar"
    />
  );
};

export default Avatar;
