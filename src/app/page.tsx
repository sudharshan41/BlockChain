'use client';

import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">TerraLease</h1>
      <nav className="space-y-4">
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/register">
          <Button variant="secondary">Register</Button>
        </Link>
        <Link href="/add-property">
          <Button>Add Property (Landlord)</Button>
        </Link>
        <Link href="/properties">
          <Button>View Properties</Button>
        </Link>
      </nav>
    </div>
  );
}
