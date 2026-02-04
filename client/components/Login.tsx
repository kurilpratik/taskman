'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';

type FormData = {
  email: string;
  password: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Login = () => {
  const auth = useAuth();
  const login = auth?.login;
  const router = useRouter();

  const [data, setData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    setErrors({});
    setLoading(true);

    try {
      if (login) {
        await login(data.email, data.password);
        setData({ email: '', password: '' });
        setLoading(false);
        // router.push('/dashboard');
        window.location.href = '/dashboard';
        console.log('Login successful');
      } else {
        setErrors({ email: 'Login function is not available' });
        setLoading(false);
        return;
      }
    } catch (error: any) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
      alert(error.response.data.message);
    } else {
      alert('Something went wrong. Please try again.');
    }
    }
  };

  return (
    <div>
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="mt-2 flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link> */}
                </div>
                <Input
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex-col gap-3">
            <Button
              type="submit"
              className="w-full rounded-full"
              disabled={loading}
            >
              Login
            </Button>
            <Link href="/register" className="w-full">
              <Button variant="outline" className="w-full rounded-full">
                Create an account
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
