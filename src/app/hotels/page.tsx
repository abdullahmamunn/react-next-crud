import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { HotelCard } from '../../components/HotelCard';

const HotelsPage = async ({ searchParams }) => {
  const unwrappedSearchParams = await searchParams;
  const page = Number(unwrappedSearchParams?.page) || 1;
  const limit = 8;
  const offset = (page - 1) * limit;

  let hotels = [];
  let total = 0;

try {
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://react-next-crud.vercel.app";

    console.log(API_URL)

  console.log("Fetching hotels from:", `${API_URL}/api/hotels?limit=${limit}&offset=${offset}`);

  const response = await fetch(`${API_URL}/api/hotels?limit=${limit}&offset=${offset}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch hotels. Status: ${response.status}`);
  }

  const data = await response.json();

  hotels = Array.isArray(data.hotels) ? data.hotels : [];
  total = typeof data.total === "number" ? data.total : 0;
} catch (error) {
  console.error("Error fetching hotels:", error.message);
  hotels = [];
  total = 0;
}

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Hotels</h1>

      <div className="mb-4">
        <Link href="/hotels/new" className="bg-blue-500 text-white px-4 py-2 rounded">Add Hotel</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        {page > 1 && (
          <a href={`/hotels?page=${page - 1}`} className="px-4 py-2 bg-gray-300 rounded">Previous</a>
        )}
        <span className="font-bold text-lg">{page} / {totalPages}</span>
        {page < totalPages && (
          <a href={`/hotels?page=${page + 1}`} className="px-4 py-2 bg-gray-300 rounded">Next</a>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;
