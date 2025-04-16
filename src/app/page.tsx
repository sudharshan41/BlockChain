'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Icons} from "@/components/icons";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

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
          <Link href="/" className="text-2xl font-bold">BlockChain Rental System</Link>
          <nav className="space-x-4">
            <Link href="/login">
              <Button variant="outline" className="text-white hover:text-golden-yellow">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="secondary" className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green">Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="text-center">
          <h1 className="text-4xl font-extrabold text-earthy-green mb-6">Find Your Perfect Land</h1>
          <p className="text-gray-700 text-lg mb-8">Browse, connect, and lease land properties with ease.</p>
          <Link href="/properties">
            <Button className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green text-lg px-8 py-3">Explore Properties</Button>
          </Link>
        </section>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder property cards */}
          <Card className="rounded-lg shadow-md overflow-hidden">
            <img src="https://picsum.photos/400/300" alt="Property" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold text-earthy-green mb-2">Serene Acres</CardTitle>
              <CardDescription className="text-gray-600">A peaceful land with great potential.</CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-md overflow-hidden">
            <img src="https://picsum.photos/401/300" alt="Property" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold text-earthy-green mb-2">Rolling Hills</CardTitle>
              <CardDescription className="text-gray-600">Expansive land with scenic views.</CardDescription>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-md overflow-hidden">
            <img src="https://picsum.photos/400/301" alt="Property" className="w-full h-48 object-cover" />
            <CardContent className="p-4">
              <CardTitle className="text-xl font-semibold text-earthy-green mb-2">Green Valley</CardTitle>
              <CardDescription className="text-gray-600">Lush green land perfect for agriculture.</CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-earthy-green text-white text-center py-4 mt-16">
        <p>&copy; {new Date().getFullYear()} BlockChain Rental System. All rights reserved.</p>
      </footer>
    </div>
  );
}
