import prisma from "@/app/libs/prismadb";

interface IParams {
  propertyId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { propertyId, userId, authorId } = params;

    const query: any = {};

    if (propertyId) {
      query.propertyId = propertyId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.property = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations?.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      property: {
        ...reservation.property,
        createdAt: reservation.property.createdAt.toISOString(),
      },
    }));
    console.log(safeReservations);

    return safeReservations;
  } catch (error: any) {
    // throw new Error(error);
  }
}
