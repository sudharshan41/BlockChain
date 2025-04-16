'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLandlord, setIsLandlord] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted', {email, password, isLandlord});
    // Redirect to home page after successful registration
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Register for TerraLease
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <Input
              id="isLandlord"
              name="isLandlord"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={isLandlord}
              onChange={e => setIsLandlord(e.target.checked)}
            />
            <label
              htmlFor="isLandlord"
              className="ml-2 block text-sm text-gray-900"
            >
              Register as Landlord
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already have an account? Login
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

    