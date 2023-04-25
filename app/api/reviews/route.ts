import getCurrentUser from "@/app/helpers/getCurrentUser";
import { ReviewValuesProps } from "@/app/properties/ReviewModal";
import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
interface PropertyData {
  reviewValues: ReviewValuesProps;
  propertyId: string;
  cumulativeRating: number;
  reservationId: string;
}

function validateRequestBody(body: any): body is PropertyData {
  const { reviewValues, cumulativeRating, propertyId, reservationId } = body;
  const {
    cleanliness,
    location,
    value,
    checkIn,
    communication,
    accuracy,
    reviewText,
  } = reviewValues;

  return (
    cleanliness &&
    reviewText &&
    location &&
    value &&
    checkIn &&
    communication &&
    accuracy &&
    propertyId &&
    cumulativeRating &&
    reservationId
  );
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  if (!validateRequestBody(body)) {
    return NextResponse.error();
  }
  const { reviewValues, cumulativeRating, propertyId, reservationId } = body;

  const {
    cleanliness,
    location,
    value,
    checkIn,
    communication,
    accuracy,
    reviewText,
  } = reviewValues;

  const res = await prisma.review.create({
    data: {
      cleanliness,
      reviewText,
      location,
      value,
      checkIn,
      communication,
      accuracy,
      propertyId,
      cumulativeRating,
      userId: currentUser.id,
      userName: currentUser.name!,
      userImage: currentUser.image!,
      reservationId,
    },
  });

  return NextResponse.json(res);
}
