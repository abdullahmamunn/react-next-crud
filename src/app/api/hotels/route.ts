import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all hotels
// export async function GET() {
//   const hotels = await prisma.hotel.findMany();
//   return NextResponse.json(hotels, { status: 200 });
// }

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 8;
  const offset = Number(searchParams.get('offset')) || 0;

  try {
    const hotels = await prisma.hotel.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' }, // Show latest hotels first
    });

    const total = await prisma.hotel.count();

    return NextResponse.json({ hotels, total }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
  }
}

// Create a new hotel
export async function POST(req: Request) {
  const body = await req.json();
  const { name, address, costPerNight, availableRooms, imageUrl, rating } = body;

  // Validation
  if (!name || !address || !costPerNight || !availableRooms || !imageUrl || !rating) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newHotel = await prisma.hotel.create({
    data: { name, address, costPerNight, availableRooms, imageUrl, rating },
  });

  return NextResponse.json(newHotel, { status: 201 });
}
