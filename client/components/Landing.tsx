import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

const Landing: React.FC = () => {
  return (
    <section>
      <Image
        src="/hero-half.png"
        alt="Landing Illustration"
        width={300}
        height={300}
        className="mx-auto mt-8"
      />
      <h1 className="mx-auto -mt-2 py-8 text-center text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-5xl dark:text-white">
        Manage tasks. Stay focused.
        <br />
        Get things done.
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-300">
        Effortless task management for teams and individuals — streamline
        workflows, meet deadlines, and achieve more with ease.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/register">
          <Button className="rounded-full" size={'lg'}>
            Get Started
          </Button>
        </Link>
        <Link href="/register">
          <Button variant={'outline'} className="rounded-full" size={'lg'}>
            Learn More
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Landing;
