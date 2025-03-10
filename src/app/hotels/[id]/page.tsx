import React from 'react';
import Image from "next/image";
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const HotelDetailsPage = async ({ params }) => {
  const unwrappedParams = await params;
  const { id } = unwrappedParams;

  // Fetch hotel details
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`, { cache: 'no-store' });
  const hotel = await response.json();

  if (!hotel) {
    return <div className="text-center mt-10 text-red-500">Hotel not found</div>;
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/hotels/${id}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this hotel!`;
  const whatsappShare = `https://api.whatsapp.com/send?text=Check out this hotel: ${encodeURIComponent(shareUrl)}`;

  return (
    <div className="max-w-4xl mx-auto p-6">
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