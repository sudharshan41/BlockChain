'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { connectToMetaMask } from "@/services/metamask";
import { useEffect, useState } from "react";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    // Check if MetaMask is already connected on page load
    const checkMetaMaskConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking MetaMask connection:", error);
        }
      }
    };

    checkMetaMaskConnection();
  }, []);


  const connectWallet = async () => {
    const accountData = await connectToMetaMask();
    if (accountData) {
      setAccount(accountData.address);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">TerraLease</h1>
        {account ? (
          <p>Connected Account: {account}</p>
        ) : (
          <Button onClick={connectWallet}>Connect MetaMask</Button>
        )}
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Land Listing Card */}
        <LandListingCard
          title="Prime Farmland"
          description="10 acres of fertile land, perfect for agriculture."
          price="5 ETH / month"
          imageUrl="https://picsum.photos/400/300"
        />
        <LandListingCard
          title="Scenic Mountain View"
          description="5 acres with breathtaking views, ideal for a retreat."
          price="3 ETH / month"
          imageUrl="https://picsum.photos/401/300"
        />
        <LandListingCard
          title="Waterfront Property"
          description="2 acres on a serene lake, great for recreation."
          price="7 ETH / month"
          imageUrl="https://picsum.photos/402/300"
        />
      </section>
    </div>
  );
}

interface LandListingCardProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

const LandListingCard: React.FC<LandListingCardProps> = ({ title, description, price, imageUrl }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt="Land" className="rounded-md mb-4" />
        <p className="text-lg font-semibold">{price}</p>
        <Button className="mt-2 w-full">Show Interest</Button>
      </CardContent>
    </Card>
  );
};

    