import getCurrentUser from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
  propertyId: string;
}

async function updateUserFavorites(
  currentUser: any,
  propertyId: string,
  removeFavorite = false
) {
  if (!currentUser) {
    return NextResponse.error();
  }

  if (!propertyId || typeof propertyId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  if (removeFavorite) {
    favoriteIds = favoriteIds.filter((id) => id !== propertyId);
  } else if (!favoriteIds.includes(propertyId)) {
    favoriteIds.push(propertyId);
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return user;
}

export async function POST(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();
  const { propertyId } = params;

  const user = await updateUserFavorites(currentUser, propertyId);

  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const currentUser = await getCurrentUser();
  const { propertyId } = params;

  const user = await updateUserFavorites(currentUser, propertyId, true);

  return NextResponse.json(user);
}
