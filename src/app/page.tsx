'use client';

import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {connectToMetaMask} from '@/services/metamask';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

// Replace with your contract address and ABI
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace with the deployed contract address
const contractABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_imageUrl',
        type: 'string',
      },
    ],
    name: 'listLand',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_landId',
        type: 'uint256',
      },
    ],
    name: 'getLandDetails',
    outputs: [
      {
        internalType: 'address',
        name: 'landlord',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'imageUrl',
        type: 'string',
      },
      {
        internalType: 'bool',
        name: 'isRented',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [landListings, setLandListings] = useState<any[]>([]);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      // Check if MetaMask is already connected on page load
      const checkMetaMaskConnection = async () => {
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({
              method: 'eth_accounts',
            });
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              // Initialize provider and contract
              const newProvider = new ethers.providers.Web3Provider(
                window.ethereum
              );
              setProvider(newProvider);
              const signer = newProvider.getSigner();
              const newContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
              );
              setContract(newContract);
            }
          } catch (error) {
            console.error('Error checking MetaMask connection:', error);
          }
        }
      };

      await checkMetaMaskConnection();
    };
    init();
  }, []);

  useEffect(() => {
    const loadLandListings = async () => {
      if (contract) {
        try {
          // Fetch land count from the contract (assuming you have a landCount variable)
          const landCount = 3; //await contract.landCount();
          const listings = [];

          for (let i = 1; i <= landCount; i++) {
            const landDetails = await contract.getLandDetails(i);
            listings.push({
              id: i,
              landlord: landDetails[0],
              price: ethers.utils.formatEther(landDetails[1]), // Convert from wei to ether
              description: landDetails[2],
              imageUrl: landDetails[3],
              isRented: landDetails[4],
            });
          }
          setLandListings(listings);
        } catch (error) {
          console.error('Error loading land listings:', error);
        }
      }
    };

    loadLandListings();
  }, [contract]);

  const connectWallet = async () => {
    const accountData = await connectToMetaMask();
    if (accountData) {
      setAccount(accountData.address);
      // Initialize provider and contract
      const newProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(newProvider);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(newContract);
    }
  };

  const handleListLand = async () => {
    if (!contract) {
      console.error('Contract not initialized!');
      return;
    }

    try {
      // Example values for listing land
      const price = ethers.utils.parseEther('5'); // 5 ETH
      const description = 'Beautiful farmland for rent';
      const imageUrl = 'https://picsum.photos/400/300';

      // Call the listLand function from the contract
      const transaction = await contract.listLand(price, description, imageUrl);
      await transaction.wait(); // Wait for the transaction to be mined

      console.log('Land listed successfully!');
      // Refresh land listings
      loadLandListings();
    } catch (error) {
      console.error('Error listing land:', error);
    }
  };

  const loadLandListings = async () => {
    if (contract) {
      try {
        // Fetch land count from the contract (assuming you have a landCount variable)
        const landCount = 3; //await contract.landCount();
        const listings = [];

        for (let i = 1; i <= landCount; i++) {
          const landDetails = await contract.getLandDetails(i);
          listings.push({
            id: i,
            landlord: landDetails[0],
            price: ethers.utils.formatEther(landDetails[1]), // Convert from wei to ether
            description: landDetails[2],
            imageUrl: landDetails[3],
            isRented: landDetails[4],
          });
        }
        setLandListings(listings);
      } catch (error) {
        console.error('Error loading land listings:', error);
      }
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
      {account && (
        <Button onClick={handleListLand}>List Land</Button>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landListings.map(land => (
          <LandListingCard
            key={land.id}
            title={`Land ID: ${land.id}`}
            description={land.description}
            price={`${land.price} ETH / month`}
            imageUrl={land.imageUrl}
          />
        ))}
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

const LandListingCard: React.FC<LandListingCardProps> = ({
  title,
  description,
  price,
  imageUrl,
}) => {
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
