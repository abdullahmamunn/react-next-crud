import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get a single hotel
export async function GET(request: Request,
   { params }: { params: Promise < { id: string }> }) {
     const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
  }

  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id: Number(id) },
    });

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json(hotel, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Update hotel details
export async function PUT(request: Request, { params }: { params: Promise<{id: string }> }) {
  const {id} = await params;

  if (!params || !id) {
    return NextResponse.json({ error: "Hotel ID is required" }, { status: 400 });
  }

  try {
    const { name, address, costPerNight, availableRooms, imageUrl, rating } = await request.json();

    const updatedHotel = await prisma.hotel.update({
      where: { id: Number(id) },
      data: { name, address, costPerNight, availableRooms, imageUrl, rating },
    });

    return NextResponse.json(updatedHotel, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
// Delete a hotel
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params; 
  await prisma.hotel.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ message: "Hotel deleted successfully" }, { status: 200 });
}

