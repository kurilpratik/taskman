import Login from '@/components/Login';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center px-4 pb-10 pt-6 sm:px-6">
      <h1 className="mb-6 mt-4 text-center text-2xl font-bold sm:mb-8">
        Log in to your account
      </h1>
      <div className="w-full max-w-md">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
