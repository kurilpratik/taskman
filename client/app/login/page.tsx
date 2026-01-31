import Login from '@/components/Login';
import React from 'react';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="m-8 text-center text-xl font-bold">
        Log in to your account
      </h1>
      <Login />
    </div>
  );
};

export default LoginPage;
