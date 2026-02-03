import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  return (
    <section className="px-4 pb-10 pt-6 sm:px-6">
      <Image
        src="/hero-half.png"
        alt="Landing Illustration"
        width={300}
        height={300}
        className="mx-auto mt-4 max-w-xs sm:mt-8 sm:max-w-sm"
      />
      <h1 className="mx-auto -mt-2 py-6 text-center text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:py-8 sm:text-4xl md:text-5xl dark:text-white">
        Manage tasks. Stay focused.
        <br />
        Get things done.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl px-1 text-center text-base text-gray-600 sm:mt-6 sm:text-lg dark:text-gray-300">
        Effortless task management for teams and individuals - streamline
        workflows, meet deadlines, and achieve more with ease.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/login">
          <Button className="rounded-full" size={'lg'}>
            Get Started
          </Button>
        </Link>
        <Link href="/register">
          <Button variant={'outline'} className="rounded-full" size={'lg'}>
            Create Account
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
