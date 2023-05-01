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
  price?: number;
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
      price,
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
    price ? (query.price = { lte: +price }) : null;

    locationValue ? (query.locationValue = { contains: locationValue }) : null;
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
      include: {
        reviews: true,
        reservations: true,
      },
    });

    // date serialization problem
    const safePropertyList = propertyList.map((property) => ({
      ...property,
      createdAt: property.createdAt.toISOString(),
    }));

    return safePropertyList;
  } catch (error: any) {
    // throw new Error(error);
  }
}
