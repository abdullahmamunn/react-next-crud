"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; 
import Image from "next/image";
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const HotelDetailsPage = () => {
  const router = useRouter();
  const params = useParams(); // ✅ Unwrap params properly
  const { id } = params; // ✅ Now it's safe to access

  // State to store hotel data
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotel data
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`);
        if (!response.ok) throw new Error("Failed to fetch hotel details");
        const data = await response.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHotel(); // ✅ Prevent fetching if id is undefined
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!hotel) return <div className="text-center mt-10 text-red-500">Hotel not found</div>;

  // Social media share links
  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/hotels/${id}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this hotel!`;
  const whatsappShare = `https://api.whatsapp.com/send?text=Check out this hotel: ${encodeURIComponent(shareUrl)}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-gray-700"
      >
        ← Back
      </button>

      <Image 
        src={hotel.imageUrl?.startsWith("http") ? hotel.imageUrl : "/images/default.jpg"} 
        alt={hotel.name} 
        width={300} 
        height={200} 
        className="rounded-md w-full object-cover" 
      />
      <h1 className="text-3xl font-bold mt-4">{hotel.name}</h1>
      <p className="text-gray-600">{hotel.address}</p>
      <p className="text-sm text-gray-500">{hotel.availableRooms} rooms available</p>
      <p className="text-gray-700 mt-2">💲 {hotel.costPerNight} / night</p>
      <p className="text-yellow-500 mt-1">⭐ {hotel.rating}</p>

      {/* Social Media Sharing */}
      <div className="mt-6 flex gap-4">
        <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl">
          <FaFacebook />
        </a>
        <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl">
          <FaTwitter />
        </a>
        <a href={whatsappShare} target="_blank" rel="noopener noreferrer" className="text-green-500 text-2xl">
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default HotelDetailsPage;
