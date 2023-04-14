"use client";
import Image from "next/image";

interface AvatarProps {
  image?: string | null;
}

const Avatar = ({ image }: AvatarProps) => {
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
