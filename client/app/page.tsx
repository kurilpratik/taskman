import dynamic from 'next/dynamic';
import React from 'react';

const Landing = dynamic(() => import('@/components/Landing'));

export default function Home() {
  return <Landing />;
}
