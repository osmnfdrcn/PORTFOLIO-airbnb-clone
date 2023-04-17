import getCurrentUser from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { propertyId, startDate, endDate, totalPrice } = body;

  if (!propertyId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const propertyAndReservation = await prisma.properties.update({
    where: {
      id: propertyId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });

  return NextResponse.json(propertyAndReservation);
}
