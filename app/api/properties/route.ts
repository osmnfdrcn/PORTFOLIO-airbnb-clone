import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/helpers/getCurrentUser";

interface PropertyData {
  title: string;
  description: string;
  imageSrc: string;
  categories: string[];
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  location: { display_name: string; lat: string; lon: string };
  price: string;
}

function validateRequestBody(body: any): body is PropertyData {
  const {
    title,
    description,
    imageSrc,
    categories,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  return (
    title &&
    description &&
    imageSrc &&
    categories &&
    roomCount &&
    bathroomCount &&
    guestCount &&
    location &&
    price
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

  const {
    title,
    description,
    imageSrc,
    categories,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  const property = await prisma.properties.create({
    data: {
      title,
      description,
      imageSrc,
      categories,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.display_name,
      coordinates: [parseFloat(location.lat), parseFloat(location.lon)],
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(property);
}
