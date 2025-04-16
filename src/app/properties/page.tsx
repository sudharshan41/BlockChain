'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast"

// Dummy data for property listings
const properties = [
  {
    id: 1,
    location: 'Nairobi',
    area: '2000 sq ft',
    measurement: 'Acres',
    price: '5 ETH',
    description: 'Beautiful farmland for rent',
    imageUrl: 'https://picsum.photos/400/300',
    landlordId: 'landlord1', // Add landlordId
  },
  {
    id: 2,
    location: 'Mombasa',
    area: '1500 sq ft',
    measurement: 'Hectares',
    price: '3 ETH',
    description: 'Prime plot near the beach',
    imageUrl: 'https://picsum.photos/400/301',
    landlordId: 'landlord2', // Add landlordId
  },
  {
    id: 3,
    location: 'Kisumu',
    area: '1800 sq ft',
    measurement: 'Acres',
    price: '4 ETH',
    description: 'Fertile land near Lake Victoria',
    imageUrl: 'https://picsum.photos/400/302',
    landlordId: 'landlord1', // Add landlordId
  },
];

const PropertiesPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </section>
    </div>
  );
};

interface Property {
  id: number;
  location: string;
  area: string;
  measurement: string;
  price: string;
  description: string;
  imageUrl: string;
  landlordId: string; // Add landlordId to the Property interface
}

const PropertyCard = ({property}: {property: Property}) => {
  const { toast } = useToast()

  const handleShowInterest = () => {
    // In a real application, you would:
    // 1. Send a notification to the landlord (property.landlordId)
    // 2. Store the user's interest in the property (property.id)
    console.log(`Interest shown for property ${property.id} (Landlord: ${property.landlordId})`);

    toast({
      title: "Interest Sent!",
      description: `Your interest in the property at ${property.location} has been sent to the landlord.`,
    })
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.location}</CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={property.imageUrl} alt="Property" className="rounded-md mb-4" />
        <p className="text-lg font-semibold">{property.price} / month</p>
        <p>Area: {property.area}</p>
        <p>Measurement: {property.measurement}</p>
        <Button className="mt-2 w-full" onClick={handleShowInterest}>Show Interest</Button>
      </CardContent>
    </Card>
  );
};

export default PropertiesPage;
