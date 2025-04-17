'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

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
    <div className="min-h-screen bg-light-beige relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{backgroundImage: `url('https://images.unsplash.com/photo-1484154236609-456f87c5d165?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`}}
      />

      <header className="bg-earthy-green text-white py-4 shadow-md relative">
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

      <main className="container mx-auto py-12 relative">
        <section className="text-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-earthy-green mb-4">Find Your Perfect Land with Blockchain Rental System</h1>
            <p className="text-gray-700 mb-8">
              Explore a wide selection of land properties available for rent. Secure transactions, transparent agreements.
            </p>
            <Link href="/properties">
              <Button className="bg-golden-yellow text-earthy-green hover:bg-light-beige hover:text-earthy-green text-lg px-8 py-3">
                Explore Properties
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-earthy-green text-white text-center py-4 mt-16 relative">
        <p>&copy; {new Date().getFullYear()} BlockChain Rental System. All rights reserved.</p>
      </footer>
    </div>
  );
}
