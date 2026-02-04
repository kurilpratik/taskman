'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Field, FieldContent, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/context/AuthContext';

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Register = () => {
  const router = useRouter();
  const auth = useAuth();
  const register = auth?.register;

  const [data, setData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (data.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setServerError(null);
    setLoading(true);

    try {
      if (!register) {
        setServerError('Registration is not available right now. Please try again.');
        return;
      }

      await register(data.email, data.password, data.fullName);

      setData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      // router.push('/dashboard');
      window.location.href = '/dashboard';
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mt-6 w-full max-w-md space-y-3.5"
      >
        {serverError && (
          <p className="text-sm text-red-600" role="alert">
            {serverError}
          </p>
        )}
        <Field>
          <FieldLabel>
            <Label>Full name</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              name="fullName"
              placeholder="Your full name"
              value={data.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName}</p>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            <Label>Email</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={data.email}
              onChange={handleChange}
              required
            />
            {/* {errors.email && <p>{errors.email}</p>} */}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            <Label>Password</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              type="password"
              name="password"
              placeholder="Enter a password, minimum 8 characters"
              value={data.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>
            <Label>Confirm password</Label>
          </FieldLabel>
          <FieldContent>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={data.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </FieldContent>
        </Field>

        {/* {error && (
          <p className="text-destructive mt-2 text-sm" role="alert">
            {error}
          </p>
        )} */}

        <div className="mt-6">
          <Button
            type="submit"
            className={`w-full rounded-full ${loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
