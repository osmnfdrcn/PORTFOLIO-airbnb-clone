import getCurrentUser from "@/app/helpers/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

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

// console.log("props", property);
// {
//   id: '643dc46d93c300051649deb8',
//   title: 'HBO ADANA',
//   description: 'HBO ADANA',
//   imageSrc: 'https://res.cloudinary.com/dx9edul8i/image/upload/v1681769561/b1bdzrfedgjfrtossmsi.webp',
//   createdAt: 2023-04-17T22:13:01.048Z,
//   categories: [ 'Windmills', 'Pools' ],
//   roomCount: 1,
//   bathroomCount: 1,
//   guestCount: 1,
//   locationValue: 'Ankara, Hipodrom Caddesi, Hacı Bayram Mahallesi, Altındağ, Ankara, Central Anatolia Region, 06630, Turkey',
//   coordinates: [ 39.9357254, 32.8434356 ],
//   userId: '642b7f3e48d4cbdccb82d563',
//   price: 100
// }
