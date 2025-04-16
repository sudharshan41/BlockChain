'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {connectToMetaMask} from '@/services/metamask';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', {email, password});

    // Placeholder logic: Assume login is successful and user is a tenant.
    // In a real application, you would authenticate against a backend.
    router.push('/properties'); // Redirect to properties page after login
  };

  const handleConnectWallet = async () => {
    const account = await connectToMetaMask();
    if (account) {
      console.log('Connected to MetaMask with account:', account.address);
      // Optionally store the account in local storage or state for later use.
    } else {
      console.log('Could not connect to MetaMask.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">
          Welcome to TerraLease
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account? Register
              </Link>
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <Button variant="secondary" className="w-full" onClick={handleConnectWallet}>
            Connect MetaMask
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

    