'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HotelForm from '../../../../components/HotelForm';

const EditHotelPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string | null>(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unwrapParams = async () => {
      const unwrappedParams = await params;
      setId(unwrappedParams.id);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`/api/hotels/${id}`);
        if (!response.ok) throw new Error('Failed to fetch hotel details');
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!hotel) return <div>Hotel not found</div>;

  return (
    <div>
      <HotelForm hotel={hotel} />
    </div>
  );
};

export default EditHotelPage;