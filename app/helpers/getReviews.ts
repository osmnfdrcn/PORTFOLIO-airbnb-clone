import prisma from "@/app/libs/prismadb";

interface IGetReviews {
  propertyId?: string;
  // userId?: string;
}

export default async function getReviews(propertyId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        propertyId,
      },
      include: {
        property: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReviews = reviews?.map((review) => ({
      ...review,
      createdAt: review.createdAt.toISOString(),
      property: {
        ...review.property,
        createdAt: review.property.createdAt.toISOString(),
      },
      user: {
        ...review.user,
        createdAt: review.user.createdAt.toISOString(),
        updatedAt: review.user.updatedAt.toISOString(),
      },
    }));

    return safeReviews;
  } catch (error: any) {
    // throw new Error(error);
  }
}
