import React from 'react';
import Image from 'next/image';
import Register from '@/components/Register';

const RegisterPage = () => {
  return (
    <div className="flex h-auto flex-col-reverse items-center sm:h-[85vh] sm:flex-row">
      <Image
        src="/hero.png"
        alt="Landing Illustration"
        width={250}
        height={300}
        className="mx-auto mt-8 flex-1"
      />
      <section className="flex-1 p-8">
        <h1 className="text-center text-2xl font-bold">Create an Account</h1>
        <Register />
      </section>
    </div>
  );
};

export default RegisterPage;
