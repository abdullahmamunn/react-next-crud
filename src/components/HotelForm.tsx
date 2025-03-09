'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const HotelForm = ({ hotel }: { hotel?: any }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    costPerNight: '',
    availableRooms: '',
    imageUrl: '',
    rating: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hotel) {
      setFormData({
        name: hotel.name || '',
        address: hotel.address || '',
        costPerNight: hotel.costPerNight || '',
        availableRooms: hotel.availableRooms || '',
        imageUrl: hotel.imageUrl || '',
        rating: hotel.rating || '',
      });
    }
  }, [hotel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(hotel ? `/api/hotels/${hotel.id}` : '/api/hotels', {
        method: hotel ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          costPerNight: Number(formData.costPerNight),
          availableRooms: Number(formData.availableRooms),
          rating: Number(formData.rating),
        }),
      });

      if (!response.ok) throw new Error(hotel ? 'Failed to update hotel' : 'Failed to add hotel');

      router.push('/hotels');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{hotel ? 'Edit Hotel' : 'Add Hotel'}</h2>
      {error && <p className="text-red-500">{error}</p>}

      <input name="name" value={formData.name} onChange={handleChange} placeholder="Hotel Name" required className="w-full p-2 border mb-2" />
      <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="w-full p-2 border mb-2" />
      <input name="costPerNight" type="number" value={formData.costPerNight} onChange={handleChange} placeholder="Cost per Night" required className="w-full p-2 border mb-2" />
      <input name="availableRooms" type="number" value={formData.availableRooms} onChange={handleChange} placeholder="Available Rooms" required className="w-full p-2 border mb-2" />
      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" required className="w-full p-2 border mb-2" />
      <input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} placeholder="Rating" required className="w-full p-2 border mb-4" />
      
      <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded">
        {loading ? (hotel ? 'Updating...' : 'Adding...') : hotel ? 'Update Hotel' : 'Add Hotel'}
      </button>
    </form>
  );
};

export default HotelForm;
