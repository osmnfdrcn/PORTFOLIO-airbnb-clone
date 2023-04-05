"use client";
import Image from "next/image";

interface AvatarProps {
  image?: string;
}

const Avatar = ({ image }: AvatarProps) => {
  console.log(image);

  return (
    <Image
      src={image || "/images/avatar.jpg"}
      className="rounded-full"
      width="30"
      height="30"
      alt="avatar"
    />
  );
};

export default Avatar;
