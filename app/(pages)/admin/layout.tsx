'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      // Jika tidak ada token atau user data
      if (!token || !userData) {
        router.push('/sign-in');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        
        // Jika bukan admin, redirect ke employee
        if (parsedUser.role !== 'admin') {
          router.push('/employee');
          return;
        }

        // Jika semua valid
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user ', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/sign-in');
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking auth
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  // Jika tidak authenticated, return null (akan redirect)
  if (!isAuthenticated) {
    return null;
  }

  // ✅ Render layout dengan styling Anda (TIDAK DIUBAH)
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Navbar />
        <main className="flex-1 p-8 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}