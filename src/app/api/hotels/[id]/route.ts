import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: Number(context.params.id) }, // Ensure ID is converted to a number if needed
    });

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json({ error: 'Failed to fetch hotel' }, { status: 500 });
  }
}

// Update hotel details
export async function PUT(req: Request, context: { params: { id: string } }) {
  const params = await context.params;

  if (!params || !params.id) {
    return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
  }

  try {
    const { name, address, costPerNight, availableRooms, imageUrl, rating } = await req.json();

    const updatedHotel = await prisma.hotel.update({
      where: { id: Number(params.id) },
      data: { name, address, costPerNight, availableRooms, imageUrl, rating },
    });

    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Delete a hotel
export async function DELETE(req: Request, context: { params: { id: string } }) {
  const params = await context.params; 
  await prisma.hotel.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Hotel deleted successfully" }, { status: 200 });
}
