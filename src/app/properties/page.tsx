'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {useToast} from "@/hooks/use-toast"
import {connectToMetaMask, sendTransaction} from '@/services/metamask';
import {useState, useEffect} from 'react';
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog";

interface Property {
  location: string;
  area: string;
  measurement: string;
  price: string;
  description: string;
  imageUrl: string;
  walletAddress: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [account, setAccount] = useState<string | null>(null);
  const [rentedProperties, setRentedProperties] = useState<string[]>([]);
  const [isLandlord, setIsLandlord] = useState(false);

  useEffect(() => {
    async function getAccount() {
      const connectedAccount = await connectToMetaMask();
      if (connectedAccount) {
        setAccount(connectedAccount.address);
      }
    }
    getAccount();

    let storedProperties = localStorage.getItem('properties');
    let initialProperties = storedProperties ? JSON.parse(storedProperties) : [];
    setProperties(initialProperties);

    const storedRentedProperties = localStorage.getItem('rentedProperties');
    if (storedRentedProperties) {
      setRentedProperties(JSON.parse(storedRentedProperties));
    }

    // Check if the user is a landlord (e.g., based on localStorage or some other state)
    const landlordStatus = localStorage.getItem('isLandlord');
    setIsLandlord(landlordStatus === 'true'); // Convert string to boolean
  }, []);

  useEffect(() => {
    localStorage.setItem('rentedProperties', JSON.stringify(rentedProperties));
  }, [rentedProperties]);


  const deleteProperty = (propertyToDelete: Property) => {
    const updatedProperties = properties.filter(property => property.location !== propertyToDelete.location);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
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
              isLandlord={isLandlord}
              onRentSuccess={() => {
                setRentedProperties([...rentedProperties, property.location]);
              }}
              onDelete={() => deleteProperty(property)}
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
  isLandlord,
  onRentSuccess,
  onDelete,
  disabled,
}: {
  property: Property;
  userAccount: string;
  isLandlord: boolean;
  onRentSuccess: () => void;
  onDelete: () => void;
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
      const transaction = await sendTransaction(property.walletAddress, parseFloat(property.price));
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{property.location}</CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {property.imageUrl ? (
          <div className="relative">
            <img src={property.imageUrl} alt="Property" className="rounded-md mb-4" onError={(e: any) => {
              e.target.onerror = null; // Prevents infinite loop
              e.target.src="https://picsum.photos/500/300";
            }}/>
            {soldOut && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                <span className="text-2xl font-bold text-white">Sold Out</span>
              </div>
            )}
          </div>
        ) :  <img src="https://picsum.photos/500/300" alt="Placeholder" className="rounded-md mb-4"/>}
        <p className="text-lg font-semibold">{property.price} ETH / month</p>
        <p>Area: {property.area}</p>
        <p>Measurement: {property.measurement}</p>
        <Button className="mt-2 w-full" onClick={handleRentProperty} disabled={soldOut}>
          {soldOut ? 'Sold Out' : 'Rent with Ethereum'}
        </Button>
        {isLandlord && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="mt-2 w-full">Delete Property</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this property from the available listings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertiesPage;

