import getCurrentUser from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  propertyId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { propertyId } = params;

  if (!propertyId || typeof propertyId !== "string") {
    throw new Error("Invalid ID");
  }

  const review = await prisma.review.deleteMany({
    where: {
      propertyId,
    },
  });

  const properties = await prisma.properties.deleteMany({
    where: {
      id: propertyId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(properties);
}
