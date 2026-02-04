'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.isLoading && !auth?.isAuthenticated) {
      router.push('/login');
    }
  }, [auth?.isLoading, auth?.isAuthenticated, router]);

  // Show loading state while checking authentication
  if (auth?.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Don't render children if not authenticated
  if (!auth?.isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
