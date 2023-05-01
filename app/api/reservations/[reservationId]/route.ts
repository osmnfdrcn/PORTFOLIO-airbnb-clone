import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/helpers/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
      throw new Error("Invalid ID");
    }

    const reservation = await prisma.reservation.findUnique({
      where: {
        id: reservationId,
      },
      include: {
        review: true,
      },
    });
    if (!reservation) {
      throw new Error("Reservation couldn't be found!");
    }
    if (reservation?.review) {
      await prisma.review.delete({
        where: {
          id: reservation.review.id,
        },
      });
    }

    const deletedReservation = await prisma.reservation.delete({
      where: {
        id: reservationId,
      },
    });

    return NextResponse.json(deletedReservation);
  } catch (error) {
    return NextResponse.error();
  }
}
