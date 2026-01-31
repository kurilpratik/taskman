'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function DashboardBackground({ children }: Props) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  // This wraps the page content in a full-height container that applies
  // a background when we're on /dashboard. Keeps the layout a server
  // component while letting us use client hooks.
  return (
    <div
      className={` ${isDashboard ? 'bg-[#F8FAFC]' : 'container'} min-h-screen`}
    >
      {children}
    </div>
  );
}
