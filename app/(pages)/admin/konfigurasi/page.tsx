'use client';

import React, { useState } from 'react';
import { Plus, Info, Pencil } from 'lucide-react';

const YearConfiguration = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    tahun: '2024',
    jatahCuti: '12',
    nilaiUang: '0',
    status: 'Aktif'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (id: number, tahun: string) => {
    console.log('Edit konfigurasi tahun:', id, tahun);
    // Logic edit konfigurasi di sini
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans text-slate-800">
      
      {/* --- HEADER UTAMA --- */}
      <div className="mb-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900">Konfigurasi Tahun</h1>
        <p className="text-slate-500 text-sm mt-1">Setup annual leave and compensation parameters.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
        
        {/* --- KOLOM KIRI: FORM KONFIGURASI --- */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            
            {/* Header Form */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                <Plus size={20} strokeWidth={3} />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Tambah Konfigurasi</h2>
            </div>

            {/* Alert Box */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Info size={18} className="text-blue-500 mt-0.5" />
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Jika sudah terdapat satu data maka tidak dapat menambah data lagi.
                </p>
              </div>
            </div>

            <form className="space-y-4">
              {/* Input Tahun */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Tahun</label>
                <input 
                  type="text" 
                  name="tahun"
                  value={formData.tahun}
                  onChange={handleChange}
                  placeholder="2024" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              {/* Input Jatah Cuti Tahunan */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Jatah Cuti Tahunan</label>
                <div className="relative">
                  <input 
                    type="number" 
                    name="jatahCuti"
                    value={formData.jatahCuti}
                    onChange={handleChange}
                    placeholder="12" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all pr-16"
                  />
                  <span className="absolute right-4 top-3 text-xs font-semibold text-slate-400">
                    HARI
                  </span>
                </div>
              </div>

              {/* Input Nilai Uang Per Cuti */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Nilai Uang Per Cuti</label>
                <input 
                  type="text" 
                  name="nilaiUang"
                  value={formData.nilaiUang}
                  onChange={handleChange}
                  placeholder="Rp 0" 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all"
                />
              </div>

              {/* Select Status */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-100 transition-all cursor-pointer text-slate-600"
                >
                  <option>Aktif</option>
                  <option>Non-Aktif</option>
                </select>
              </div>

              {/* Button Simpan */}
              <button className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 mt-6">
                Simpan
              </button>
            </form>
          </div>
        </div>

        {/* --- KOLOM KANAN: DATA TABLE --- */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full">
            
            {/* Header Table */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-900">Data Konfigurasi</h2>
              <div className="bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                1 Items Total
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-gray-50">
                    <th className="pb-4 pl-2 w-12">No</th>
                    <th className="pb-4">Tahun</th>
                    <th className="pb-4">Jatah Cuti</th>
                    <th className="pb-4">Nilai Uang</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 pr-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  
                  {/* Row 1 */}
                  <tr 
                    className="hover:bg-gray-50 transition-colors"
                    onMouseEnter={() => setHoveredRow(1)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="py-5 pl-2 font-medium text-slate-400">1</td>
                    <td className="py-5 font-bold text-slate-800">2024</td>
                    <td className="py-5 text-slate-600">12 Hari</td>
                    <td className="py-5 font-bold text-teal-600">Rp 150.000</td>
                    <td className="py-5">
                      <span className="bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                        Aktif
                      </span>
                    </td>
                    <td className="py-5 pr-2 text-right">
                      <div className={`flex justify-end gap-2 transition-all duration-200 ${hoveredRow === 1 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                        <button 
                          onClick={() => handleEdit(1, '2024')}
                          className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                          title="Edit"
                        >
                          <Pencil size={14} strokeWidth={2} />
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

export default YearConfiguration; 