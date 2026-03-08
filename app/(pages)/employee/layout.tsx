'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EmployeeSidebar from '@/components/EmployeeSidebar';
import Navbar from '@/components/navbar';

interface EmployeeLayoutProps {
  children: React.ReactNode;
}

export default function EmployeeLayout({ children }: EmployeeLayoutProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        router.push('/sign-in');
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        
        // Jika admin, redirect ke admin
        if (parsedUser.role === 'admin') {
          router.push('/admin/dashboard');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/sign-in');
      } finally {
        setChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <EmployeeSidebar />
      <div className="flex-1 flex flex-col pl-64">
        <Navbar />
        <main className="flex-1 p-6 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}