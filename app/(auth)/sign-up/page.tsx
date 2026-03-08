'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Tentukan role berdasarkan email
      const userRole = formData.email.toLowerCase() === 'parhan@gmail.com' 
        ? 'admin' 
        : 'employee';

      // 🔥 API Register Call (HAPUS SPASI DI URL!)
      const response = await fetch('https://Payroll.Politekniklp3i-tasikmalaya.ac.id/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: userRole,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Registrasi gagal');
      }

      // 🔥 Auto Login setelah register berhasil
      const loginResponse = await fetch('https://Payroll.Politekniklp3i-tasikmalaya.ac.id/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        // Simpan token & user data
        if (loginData.token) {
          localStorage.setItem('token', loginData.token);
        }
        if (loginData.user) {
          localStorage.setItem('user', JSON.stringify(loginData.user));
        }

        setSuccess('Registrasi berhasil! Mengalihkan...');
        
        // Redirect berdasarkan role
        setTimeout(() => {
          if (userRole === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/employee'); // ✅ Employee langsung ke dashboard employee
          }
        }, 1000);
      } else {
        // Jika auto login gagal, redirect ke login page
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => {
          router.push('/sign-in?registered=true');
        }, 1500);
      }
      
    } catch (err: any) {
      console.error('Register error:', err);
      setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md px-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-base">
            Join SalaryApp to manage your payroll
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <p className="text-emerald-700 text-sm text-center">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="User Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Example@gmail.com"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400"
                required
              />
              {/* Hint untuk admin */}
              {formData.email.toLowerCase() === 'parhan@gmail.com' && (
                <p className="mt-1 text-xs text-blue-600 font-medium">
                  ℹ️ Admin account akan dibuat
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">
                Minimal 6 karakter
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-blue-900 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-base text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/sign-in')}
              className="font-semibold text-blue-900 hover:text-blue-800 transition-colors"
            >
              Sign in instead
            </button>
          </p>
        </div>

        {/* Demo Account Info
        <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <p className="text-sm font-semibold text-blue-900 mb-3 text-center">
            📋 Demo Accounts:
          </p>
          <div className="space-y-2 text-xs">
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-blue-700">Admin:</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">ADMIN</span>
              </div>
              <p className="text-gray-600 font-mono">parhan@gmail.com</p>
              <p className="text-gray-600 font-mono">parhan123</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-blue-700">Employee:</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">USER</span>
              </div>
              <p className="text-gray-600">Register dengan email lain</p>
              <p className="text-gray-500 italic">Otomatis jadi employee</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}