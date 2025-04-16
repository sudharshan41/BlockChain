'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast"
import {connectToMetaMask, sendTransaction} from '@/services/metamask';
import {useState, useEffect} from 'react';

interface Property {
  location: string;
  area: string;
  measurement: string;
  price: string;
  description: string;
  imageUrl: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [rentedProperties, setRentedProperties] = useState<string[]>([]);

  useEffect(() => {
    async function getAccount() {
      const connectedAccount = await connectToMetaMask();
      if (connectedAccount) {
        setAccount(connectedAccount.address);
      }
    }
    getAccount();

    // Get properties from local storage
    let storedProperties = localStorage.getItem('properties');
    let initialProperties = storedProperties ? JSON.parse(storedProperties) : [];
    setProperties(initialProperties);

    // Load rented properties from local storage
    const storedRentedProperties = localStorage.getItem('rentedProperties');
    if (storedRentedProperties) {
      setRentedProperties(JSON.parse(storedRentedProperties));
    }
  }, []);

  useEffect(() => {
    // Save rented properties to local storage whenever it changes
    localStorage.setItem('rentedProperties', JSON.stringify(rentedProperties));
  }, [rentedProperties]);

  const handleRentProperty = async (property: Property) => {

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Properties</h1>
      {account ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property, index) => (
            <PropertyCard
              key={index}
              property={property}
              userAccount={account}
              onRentSuccess={() => {
                setRentedProperties([...rentedProperties, property.location]);
              }}
              disabled={rentedProperties.includes(property.location)}
            />
          ))}
        </section>
      ) : (
        <p>Please connect to MetaMask to view properties.</p>
      )}
    </div>
  );
};

const PropertyCard = ({
  property,
  userAccount,
  onRentSuccess,
  disabled,
}: {
  property: Property;
  userAccount: string;
  onRentSuccess: () => void;
  disabled: boolean;
}) => {
  const { toast } = useToast();
  const [soldOut, setSoldOut] = useState(disabled);

  useEffect(() => {
    setSoldOut(disabled);
  }, [disabled]);


  const handleRentProperty = async () => {
    if (!userAccount) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your MetaMask wallet to rent this property.",
      });
      return;
    }

    try {
      const transaction = await sendTransaction('0x44c24fA45877aA9bc9A782b1B4962ACF4d89Ec4C', parseFloat(property.price));
      if (transaction) {
        console.log('Transaction successful:', transaction.hash);
        toast({
          title: "Rent Request Sent",
          description: `Your rent request for the property at ${property.location} has been sent. Transaction Hash: ${transaction.hash}`,
        });
        onRentSuccess();
        setSoldOut(true);
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
    toast({
      title: "Interest Sent!",
      description: `Your interest in the property at ${property.location} has been sent to the landlord.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.location}</CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {property.imageUrl ? (
          <div className="relative">
            <img src={property.imageUrl} alt="Property" className="rounded-md mb-4" />
            {soldOut && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <span className="text-2xl font-bold text-white">Sold Out</span>
              </div>
            )}
          </div>
        ) : null}
        <p className="text-lg font-semibold">{property.price} ETH / month</p>
        <p>Area: {property.area}</p>
        <p>Measurement: {property.measurement}</p>
        <Button className="mt-2 w-full" onClick={handleShowInterest} disabled={soldOut}>Show Interest</Button>
        <Button className="mt-2 w-full" onClick={handleRentProperty} disabled={soldOut}>
          {soldOut ? 'Sold Out' : 'Rent with Ethereum'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PropertiesPage;
