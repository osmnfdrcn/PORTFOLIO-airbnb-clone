import prisma from "@/app/libs/prismadb";

export interface IPropertiesParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getProperties(params: IPropertiesParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;

    let query: any = {};

    userId ? (query.userId = userId) : null;
    category ? (query.category = category) : null;
    roomCount ? (query.roomCount = { gte: +roomCount }) : null;
    guestCount ? (query.guestCount = { gte: +guestCount }) : null;
    bathroomCount ? (query.bathroomCount = { gte: +bathroomCount }) : null;
    locationValue ? (query.locationValue = locationValue) : null;
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                startDate: { lte: startDate },
                endDate: { gte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const propertyList = await prisma.properties.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    // date serialization problem
    const safePropertyList = propertyList.map((property) => ({
      ...property,
      createdAt: property.createdAt.toISOString(),
    }));

    return safePropertyList;
  } catch (error: any) {
    throw new Error(error);
  }
}
