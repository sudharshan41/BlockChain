'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";

const AddPropertyPage = () => {
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState(''); // New state for wallet address
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty = {
      location,
      area,
      measurement,
      price,
      description,
      imageUrl,
      walletAddress, // Include wallet address in the property object
    };

    // Get existing properties from local storage or initialize an empty array
    let storedProperties = localStorage.getItem('properties');
    let properties = storedProperties ? JSON.parse(storedProperties) : [];

    // Add the new property to the array
    properties.push(newProperty);

    // Store the updated array back in local storage
    localStorage.setItem('properties', JSON.stringify(properties));

    console.log('Property added successfully:', newProperty);
    toast({
      title: "Property Added",
      description: `Your property at ${location} has been successfully added.`,
    });

    // Clear the form fields after submission
    setLocation('');
    setArea('');
    setMeasurement('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setWalletAddress(''); // Clear wallet address field
    router.push('/properties');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Add New Property
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <div className="mt-1">
              <Input
                id="location"
                name="location"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Property Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area (sq ft)
            </label>
            <div className="mt-1">
              <Input
                id="area"
                name="area"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Area in square feet"
                value={area}
                onChange={e => setArea(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="measurement"
              className="block text-sm font-medium text-gray-700"
            >
              Measurement
            </label>
            <div className="mt-1">
              <Input
                id="measurement"
                name="measurement"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="e.g., Acres, Hectares"
                value={measurement}
                onChange={e => setMeasurement(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (ETH)
            </label>
            <div className="mt-1">
              <Input
                id="price"
                name="price"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price in ETH"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1">
              <Textarea
                id="description"
                name="description"
                rows={3}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Detailed property description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <div className="mt-1">
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="URL of property image"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="walletAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Wallet Address
            </label>
            <div className="mt-1">
              <Input
                id="walletAddress"
                name="walletAddress"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your wallet address"
                value={walletAddress}
                onChange={e => setWalletAddress(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Add Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPropertyPage;
