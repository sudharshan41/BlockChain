'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast"
import {connectToMetaMask, sendTransaction} from '@/services/metamask';
import {useState, useEffect} from 'react';

// Dummy data for property listings
const properties = [
  {
    id: 1,
    location: 'Nairobi',
    area: '2000 sq ft',
    measurement: 'Acres',
    price: 5, // Price in ETH
    description: 'Beautiful farmland for rent',
    imageUrl: 'https://picsum.photos/400/300',
    landlordId: '0xf39Fd6e51B749D6156e541f86E93BCB58736a950', // Add landlordId, replace with actual addresses
  },
  {
    id: 2,
    location: 'Mombasa',
    area: '1500 sq ft',
    measurement: 'Hectares',
    price: 3, // Price in ETH
    description: 'Prime plot near the beach',
    imageUrl: 'https://picsum.photos/400/301',
    landlordId: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8', // Add landlordId, replace with actual addresses
  },
  {
    id: 3,
    location: 'Kisumu',
    area: '1800 sq ft',
    measurement: 'Acres',
    price: 4, // Price in ETH
    description: 'Fertile land near Lake Victoria',
    imageUrl: 'https://picsum.photos/400/302',
    landlordId: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', // Add landlordId, replace with actual addresses
  },
];

const PropertiesPage = () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    async function getAccount() {
      const connectedAccount = await connectToMetaMask();
      if (connectedAccount) {
        setAccount(connectedAccount.address);
      }
    }
    getAccount();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      {account ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              userAccount={account}
            />
          ))}
        </section>
      ) : (
        <p>Please connect to MetaMask to view properties.</p>
      )}
    </div>
  );
};

interface Property {
  id: number;
  location: string;
  area: string;
  measurement: string;
  price: number;
  description: string;
  imageUrl: string;
  landlordId: string;
}

const PropertyCard = ({property, userAccount}: {property: Property, userAccount: string}) => {
  const { toast } = useToast();

  const handleRentProperty = async () => {
    if (!userAccount) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your MetaMask wallet to rent this property.",
      });
      return;
    }

    try {
      const transaction = await sendTransaction(property.landlordId, property.price);
      if (transaction) {
        console.log('Transaction successful:', transaction.hash);
        toast({
          title: "Rent Request Sent",
          description: `Your rent request for the property at ${property.location} has been sent. Transaction Hash: ${transaction.hash}`,
        });
      } else {
        toast({
          title: "Transaction Failed",
          description: "There was an error processing your transaction. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Error sending transaction:", error);
      toast({
        title: "Transaction Error",
        description: `An error occurred: ${error.message}`,
      });
    }
  };

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
        <p className="text-lg font-semibold">{property.price} ETH / month</p>
        <p>Area: {property.area}</p>
        <p>Measurement: {property.measurement}</p>
        <Button className="mt-2 w-full" onClick={handleShowInterest}>Show Interest</Button>
        <Button className="mt-2 w-full" onClick={handleRentProperty}>Rent with Ethereum</Button>
      </CardContent>
    </Card>
  );
};

export default PropertiesPage;
