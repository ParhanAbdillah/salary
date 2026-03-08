'use client';

import React, { useState } from 'react';
import { Plus, Calendar, ChevronDown, Pencil, Trash2 } from 'lucide-react';

const EmployeeManagement = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleEdit = (id: number, name: string) => {
    console.log('Edit karyawan:', id, name);
    // Logic edit karyawan di sini
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus data karyawan ${name}?`)) {
      console.log('Delete karyawan:', id);
      // Logic delete karyawan di sini
    }
  };

  return (
    
    <div className="min-h-screen p-6 font-sans text-slate-800">
        <h1 className="text-2xl font-bold">Management Karyawan</h1>
        <p className="text-sm text-slate-600 mb-7">Manage employee records and information.</p>
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- LEFT COLUMN: FORM INPUT --- */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            
            {/* Header Form */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Plus size={20} strokeWidth={3} />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Tambah Karyawan</h2>
            </div>

            <form className="space-y-4">
              {/* Row 1: NIK & Nama */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">NIK</label>
                  <input 
                    type="text" 
                    placeholder="NIK" 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Nama</label>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <input 
                  type="email" 
                  placeholder="email@company.com" 
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              {/* Row 3: Tempat & Tanggal Lahir */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Tempat Lahir</label>
                  <input 
                    type="text" 
                    placeholder="Kota" 
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-700">Tanggal Lahir</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="dd/mm/yyyy" 
                      className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                    />
                    <Calendar className="absolute right-3 top-3 text-slate-400" size={18} />
                  </div>
                </div>
              </div>

              {/* Row 4: Alamat */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Alamat</label>
                <textarea 
                  placeholder="Alamat Lengkap" 
                  rows={3}
                  className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Row 5: Jabatan */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Jabatan</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-slate-500 cursor-pointer">
                    <option>Pilih Jabatan</option>
                    <option>Manager IT</option>
                    <option>HR Specialist</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Row 6: Status Aktif */}
              <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Status Aktif</label>
                <div className="relative">
                  <select className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm appearance-none focus:ring-2 focus:ring-indigo-100 outline-none transition-all cursor-pointer">
                    <option>Aktif</option>
                    <option>Non-Aktif</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              {/* Button Simpan */}
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-slate-900/20 mt-4">
                Simpan
              </button>
            </form>
          </div>
        </div>

        {/* --- RIGHT COLUMN: DATA TABLE --- */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full">
            
            {/* Header Table */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Data Karyawan</h2>
              <div className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                2 Items Total
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4 pl-4 w-16">No</th>
                    <th className="pb-4">Nama</th>
                    <th className="pb-4">Jabatan</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 pr-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {/* Row 1 */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredRow(1)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-4 font-medium text-slate-500">1</td>
                    <td className="py-5 font-bold text-slate-800">Ahmad Fauzi</td>
                    <td className="py-5">
                      <span className="bg-gray-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                        Manager IT
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                        Aktif
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 1 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(1, 'Ahmad Fauzi')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => handleDelete(1, 'Ahmad Fauzi')}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Row 2 */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors border-t border-gray-50/50"
                    onMouseEnter={() => setHoveredRow(2)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-4 font-medium text-slate-500">2</td>
                    <td className="py-5 font-bold text-slate-800">Siti Aminah</td>
                    <td className="py-5">
                      <span className="bg-gray-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                        HR Specialist
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                        Aktif
                      </span>
                    </td>
                    <td className="py-5 pr-4 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 2 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(2, 'Siti Aminah')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
                        </button>
                        <button 
                          onClick={() => handleDelete(2, 'Siti Aminah')}
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

export default EmployeeManagement;