import prisma from "@/app/libs/prismadb";

interface IParams {
  propertyId?: string;
}

export default async function getPropertiesById(params: IParams) {
  try {
    const { propertyId } = params;

    const properties = await prisma.properties.findUnique({
      where: {
        id: propertyId,
      },
      include: {
        user: true,
      },
    });

    if (!properties) {
      return null;
    }

    return {
      ...properties,
      createdAt: properties.createdAt.toString(),
      user: {
        ...properties.user,
        createdAt: properties.user.createdAt.toString(),
        updatedAt: properties.user.updatedAt.toString(),
        emailVerified: properties.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
