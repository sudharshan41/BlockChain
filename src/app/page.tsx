'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Icons} from "@/components/icons";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {ethers} from 'ethers';

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (e.g., token in localStorage)
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // Example: Check for a token
    if (isLoggedIn) {
      router.push('/properties'); // Redirect to properties page if logged in
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-light-beige">
      <header className="bg-earthy-green text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
         <nav className="space-x-4">
            <Link href="/login">
              <Button variant="secondary" className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green">Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center">
          
          <Link href="/properties">
            <Button className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green text-lg px-8 py-3">Explore Properties</Button>
          </Link>
        </section>

      </main>

      <footer className="bg-earthy-green text-white text-center py-4 mt-16">
        <p>&copy; {new Date().getFullYear()} BlockChain Rental System. All rights reserved.</p>
      </footer>
    </div>
  );
}

