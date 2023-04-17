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
      category: categoryParameter,
    } = params;
    // console.log({ params });
    // { params: { category: 'Beach' } }

    let query: any = {};
    userId ? (query.userId = userId) : null;
    categoryParameter ? (query.categories = { has: categoryParameter }) : null;
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
    console.log(propertyList);

    // date serialization problem
    const safePropertyList = propertyList.map((property) => ({
      ...property,
      createdAt: property.createdAt.toISOString(),
    }));
    console.log({ safePropertyList });

    return safePropertyList;
  } catch (error: any) {
    // throw new Error(error);
  }
}
