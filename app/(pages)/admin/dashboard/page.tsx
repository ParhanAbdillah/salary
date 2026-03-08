'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Building2, 
  Wallet, 
  Hourglass, 
  FileText, 
  Rocket 
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/sign-in');
      return;
    }

    const parsedUser = JSON.parse(userData);
    
    if (parsedUser.role !== 'admin') {
      router.push('/employee');
      return;
    }

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'Admin HRD'}!
        </h1>
        <p className="text-gray-500 mt-1">
          Here's what's happening with your payroll system today.
        </p>
      </div>

      {/* Stats Grid - 4 CARDS HORIZONTAL */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Card 1: Total Karyawan */}
        <div 
          className="flex-1 min-w-[180px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                      group"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-all duration-300">
              <Users className="w-5 h-5 text-purple-700 group-hover:text-purple-800 
                               group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] 
                               transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              +12%
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">Total Karyawan</p>
          <p className="text-xl font-bold text-gray-900">124</p>
        </div>

        {/* Card 2: Divisi */}
        <div 
          className="flex-1 min-w-[180px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                      group"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-gray-200 rounded-xl group-hover:bg-gray-300 transition-all duration-300">
              <Building2 className="w-5 h-5 text-gray-600 group-hover:text-gray-800 
                                   group-hover:drop-shadow-[0_0_8px_rgba(107,114,128,0.6)] 
                                   transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">
              Stable
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">Divisi</p>
          <p className="text-xl font-bold text-gray-900">8</p>
        </div>

        {/* Card 3: Payroll Bulan Ini */}
        <div 
          className="flex-1 min-w-[180px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                      group"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-all duration-300">
              <Wallet className="w-5 h-5 text-emerald-700 group-hover:text-emerald-800 
                                group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.6)] 
                                transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              +5%
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">Payroll Bulan Ini</p>
          <p className="text-xl font-bold text-gray-900">Rp 450M</p>
        </div>

        {/* Card 4: Pending Approval */}
        <div 
          className="flex-1 min-w-[180px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer
                      group"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="p-2 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-all duration-300">
              <Hourglass className="w-5 h-5 text-amber-700 group-hover:text-amber-800 
                                   group-hover:drop-shadow-[0_0_8px_rgba(245,158,11,0.6)] 
                                   transition-all duration-300" />
            </div>
            <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full whitespace-nowrap">
              -2
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-1">Pending Approval</p>
          <p className="text-xl font-bold text-gray-900">12</p>
        </div>
      </div>

      {/* Content Grid - Recent Activities & New Reports (SIDE BY SIDE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities - LEFT COLUMN */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
            <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Updated Divisi "IT Support"</p>
                <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Updated Divisi "IT Support"</p>
                <p className="text-sm text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="p-2 bg-purple-50 rounded-lg">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Updated Divisi "IT Support"</p>
                <p className="text-sm text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* New Reports Coming Soon - RIGHT COLUMN with DASHED BORDER */}
        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300">
          <div className="h-full flex flex-col items-center justify-center text-center py-12">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <Rocket className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              New Reports Coming Soon
            </h3>
            <p className="text-gray-500 text-sm max-w-sm">
              We're building advanced analytics for your payroll.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}