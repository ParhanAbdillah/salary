'use client';

import { useState } from 'react';
import { Plus, ChevronDown, Pencil, Trash2 } from 'lucide-react';

const UserManagement = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleEdit = (id: number, name: string) => {
    console.log('Edit user:', id, name);
    // Logic edit user di sini
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus user ${name}?`)) {
      console.log('Delete user:', id);
      // Logic delete user di sini
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-slate-800">
      
      {/* --- HEADER UTAMA --- */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Management User</h1>
        <p className="text-slate-500 text-sm mt-1">Control system access and user permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* --- KOLOM KIRI: FORM TAMBAH USER --- */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            
            {/* Header Form */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Plus size={20} strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Tambah User</h2>
            </div>

            <form className="space-y-4">
              {/* Input Nama */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nama</label>
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              {/* Input Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              {/* Select Role */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Role</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer text-slate-600">
                    <option>User / Karyawan</option>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Button Simpan */}
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-6">
                Simpan
              </button>
            </form>
          </div>
        </div>

        {/* --- KOLOM KANAN: DATA USER TABLE --- */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
            
            {/* Header Table */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Data User</h2>
              <div className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                3 Items Total
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4 pl-2 w-12">No</th>
                    <th className="pb-4">Nama</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Role</th>
                    <th className="pb-4 pr-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  
                  {/* Row 1: Admin */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredRow(1)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-2 font-medium text-slate-400">1</td>
                    <td className="py-5 font-bold text-slate-800">Admin HRD</td>
                    <td className="py-5 text-slate-500">hrd@mail.com</td>
                    <td className="py-5">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-orange-200/50">
                        Admin
                      </span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 1 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(1, 'Admin HRD')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => handleDelete(1, 'Admin HRD')}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2: User */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors border-t border-gray-50/50"
                    onMouseEnter={() => setHoveredRow(2)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-2 font-medium text-slate-400">2</td>
                    <td className="py-5 font-bold text-slate-800">John Doe</td>
                    <td className="py-5 text-slate-500">john@mail.com</td>
                    <td className="py-5">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
                        User
                      </span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 2 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(2, 'John Doe')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => handleDelete(2, 'John Doe')}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 3: User */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors border-t border-gray-50/50"
                    onMouseEnter={() => setHoveredRow(3)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-2 font-medium text-slate-400">3</td>
                    <td className="py-5 font-bold text-slate-800">Jane Smith</td>
                    <td className="py-5 text-slate-500">jane@mail.com</td>
                    <td className="py-5">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
                        User
                      </span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 3 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(3, 'Jane Smith')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => handleDelete(3, 'Jane Smith')}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagement;