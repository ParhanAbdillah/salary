"use client";

import React, { useEffect, useState } from "react";
import { Plus, Calendar, ChevronDown, Pencil, Trash2, UserPlus, Users, Loader2, X } from "lucide-react";

interface Jabatan {
  id: number;
  jabatan: string;
}

interface Karyawan {
  id: number;
  nik: string;
  nama: string;
  email: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  alamat: string;
  id_jabatan: number;
  status_aktif: boolean | number;
  jabatan?: Jabatan;
}

const EmployeeManagement = () => {
  // UI States
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Data States
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  
  // Form States
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    id_jabatan: "",
    status_aktif: "1" // Default Aktif (String untuk select)
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // --- API FUNCTIONS ---

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}`, Accept: "application/json" };
      
      const [resKaryawan, resJabatan] = await Promise.all([
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", { headers }),
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", { headers })
      ]);

      const dataK = await resKaryawan.json();
      const dataJ = await resJabatan.json();

      if (resKaryawan.ok) setKaryawanList(dataK.data || dataK);
      if (resJabatan.ok) setJabatanList(dataJ.data || dataJ);
    } catch (err) {
      setError("Gagal memuat data server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  // --- HANDLERS ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const method = editingId ? "PATCH" : "POST";
    const url = editingId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...formData,
          id_jabatan: Number(formData.id_jabatan),
          status_aktif: formData.status_aktif === "1"
        })
      });

      if (!res.ok) throw new Error("Gagal menyimpan data.");
      
      resetForm();
      fetchData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Karyawan) => {
    setEditingId(item.id);
    setFormData({
      nik: item.nik,
      nama: item.nama,
      email: item.email,
      tempat_lahir: item.tempat_lahir,
      tanggal_lahir: item.tanggal_lahir,
      alamat: item.alamat,
      id_jabatan: item.id_jabatan.toString(),
      status_aktif: item.status_aktif ? "1" : "0"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus data karyawan ${name}?`)) return;
    try {
      await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Gagal menghapus.");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      nik: "", nama: "", email: "", tempat_lahir: "",
      tanggal_lahir: "", alamat: "", id_jabatan: "", status_aktif: "1"
    });
  };

  return (
    <div className="min-h-screen p-6 font-sans text-slate-800 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Manajemen Karyawan</h1>
          <p className="text-slate-500">Kelola data personal dan penempatan kerja karyawan.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    {editingId ? <Pencil size={20} /> : <UserPlus size={20} />}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {editingId ? "Edit Karyawan" : "Tambah Karyawan"}
                  </h2>
                </div>
                {editingId && (
                  <button onClick={resetForm} className="text-gray-400 hover:text-red-500">
                    <X size={20} />
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">NIK</label>
                    <input 
                      type="text" 
                      value={formData.nik}
                      onChange={(e) => setFormData({...formData, nik: e.target.value})}
                      placeholder="NIK" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Nama</label>
                    <input 
                      type="text" 
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      placeholder="Nama Lengkap" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@company.com" 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input 
                      type="text" 
                      value={formData.tempat_lahir}
                      onChange={(e) => setFormData({...formData, tempat_lahir: e.target.value})}
                      placeholder="Kota" 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.tanggal_lahir}
                        onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Alamat</label>
                  <textarea 
                    value={formData.alamat}
                    onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                    placeholder="Alamat Lengkap" 
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Jabatan</label>
                    <select 
                      value={formData.id_jabatan}
                      onChange={(e) => setFormData({...formData, id_jabatan: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer"
                      required
                    >
                      <option value="">Pilih</option>
                      {jabatanList.map(j => (
                        <option key={j.id} value={j.id}>{j.jabatan}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select 
                      value={formData.status_aktif}
                      onChange={(e) => setFormData({...formData, status_aktif: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Non-Aktif</option>
                    </select>
                  </div>
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-slate-900/20 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : "Simpan Data"}
                </button>
              </form>
            </div>
          </div>

          {/* --- TABLE COLUMN --- */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-900">
                  <Users size={20} className="text-indigo-500" />
                  <h2 className="text-xl font-bold">Data Karyawan</h2>
                </div>
                <div className="bg-emerald-50 text-emerald-700 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2">
                  {karyawanList.length} Total
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-gray-50/50">
                      <th className="px-6 py-4">Karyawan</th>
                      <th className="px-6 py-4">Kontak & Alamat</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {karyawanList.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-indigo-50/30 transition-colors group"
                        onMouseEnter={() => setHoveredRow(item.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <td className="px-6 py-5">
                          <div className="font-bold text-slate-800">{item.nama}</div>
                          <div className="text-xs text-indigo-600 font-medium">{item.jabatan?.jabatan || "No Jabatan"}</div>
                          <div className="text-[10px] text-slate-400 mt-1">NIK: {item.nik}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-slate-600">{item.email}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[150px]">{item.alamat}</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.status_aktif ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}>
                            {item.status_aktif ? "Aktif" : "Non-Aktif"}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className={`flex justify-end gap-1 transition-opacity ${hoveredRow === item.id ? 'opacity-100' : 'opacity-0'}`}>
                            <button 
                              onClick={() => handleEdit(item)}
                              className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Pencil size={14} />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id, item.nama)}
                              className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {karyawanList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-20 text-center text-slate-400 text-sm">
                          Belum ada data karyawan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;