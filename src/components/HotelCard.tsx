'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export function HotelCard({ hotel }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;

    try {
      const response = await fetch(`/api/hotels/${hotel.id}`, { method: "DELETE" });

      if (!response.ok) throw new Error("Failed to delete hotel");

      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border rounded-lg shadow p-4">
      <Link href={`/hotels/${hotel.id}`} className="block">
        <Image 
          src={hotel.imageUrl?.startsWith("http") ? hotel.imageUrl : "/images/default.jpg"} 
          alt={hotel.name} 
          width={300} 
          height={200} 
          className="rounded-md w-full object-cover" 
        />
        <h2 className="text-lg font-bold mt-2">{hotel.name}</h2>
        <p className="text-gray-600">{hotel.address}</p>
        <p className="text-gray-800 font-semibold">${hotel.costPerNight} / night</p>
        <p className="text-sm text-gray-500">{hotel.availableRooms} rooms available</p>
        <p className="text-yellow-500">⭐ {hotel.rating}</p>
      </Link>
      <div className="flex justify-between mt-4">
        <Link href={`/hotels/edit/${hotel.id}`} className="bg-sky-500/50 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}