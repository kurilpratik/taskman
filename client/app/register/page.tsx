import React from 'react';
import Image from 'next/image';
import Register from '@/components/Register';

const RegisterPage = () => {
  return (
    <div className="flex h-auto flex-col-reverse items-center px-4 pb-10 pt-6 sm:h-[85vh] sm:flex-row sm:px-6">
      <Image
        src="/hero.png"
        alt="Landing Illustration"
        width={250}
        height={300}
        className="mx-auto mt-8 flex-1 max-w-xs sm:max-w-sm"
      />
      <section className="flex-1 w-full max-w-md sm:max-w-lg sm:px-4">
        <h1 className="text-center text-2xl font-bold">Create an Account</h1>
        <div className="mt-2 w-full">
          <Register />
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
