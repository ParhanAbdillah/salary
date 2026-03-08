'use client';

import { 
  Bell, 
  Search, 
  Menu,
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onMenuClick?: () => void;
  role?: 'admin' | 'employee';
}

export default function Navbar({ onMenuClick, role = 'admin' }: NavbarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@mail.com');
  const [userRole, setUserRole] = useState<'admin' | 'employee'>('admin');

  // 🔥 Ambil data user dari localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserName(parsedUser.name || parsedUser.nama || 'User');
        setUserEmail(parsedUser.email || 'user@mail.com');
        setUserRole(parsedUser.role || 'employee');
      } catch (error) {
        console.error('Error parsing user ', error);
      }
    }
  }, []);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/sign-in';
  };

  // Tentukan prefix URL berdasarkan role
  const urlPrefix = userRole === 'admin' ? '/admin' : '/employee';

  return (
    <nav className="h-16 bg-white flex items-center justify-between px-10 shadow-lg fixed w-[calc(100%-16rem)] z-10">
      {/* Left Section - Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari sesuatu..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Notification Dropdown */}
          {showNotification && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifikasi</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                  <p className="text-sm text-gray-700">
                    {userRole === 'admin' ? 'Presensi berhasil disimpan' : 'Pengajuan cuti disetujui'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">5 menit yang lalu</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings (Hanya untuk Admin) */}
        {userRole === 'admin' && (
          <button className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        )}

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {userName?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">
                {userRole === 'admin' ? 'Administrator' : 'Employee'}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <p className="font-medium text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
              <div className="py-2">
                <a 
                  href={`${urlPrefix}/profil`} 
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Profil Saya
                </a>
                
                {/* Settings hanya untuk admin */}
                {userRole === 'admin' && (
                  <a 
                    href={`${urlPrefix}/pengaturan`} 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Pengaturan
                  </a>
                )}
              </div>
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}