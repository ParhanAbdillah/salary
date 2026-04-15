"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Users, Loader2, X } from "lucide-react";

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
  status_aktif: boolean;
  jabatan?: Jabatan;
}

const EmployeeManagement = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [karyawanList, setKaryawanList] = useState<Karyawan[]>([]);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    email: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    id_jabatan: "",
    status_aktif: "true" 
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const headers = { 
        Authorization: `Bearer ${token}`, 
        Accept: "application/json" 
      };
      const [resKaryawan, resJabatan] = await Promise.all([
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan", { headers }),
        fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", { headers })
      ]);

      const dataK = await resKaryawan.json();
      const dataJ = await resJabatan.json();

      setKaryawanList(Array.isArray(dataK) ? dataK : (dataK.data || []));
      setJabatanList(Array.isArray(dataJ) ? dataJ : (dataJ.data || []));
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getNamaJabatan = (item: Karyawan) => {
    if (item.jabatan?.jabatan) return item.jabatan.jabatan;
    const found = jabatanList.find((j) => Number(j.id) === Number(item.id_jabatan));
    return found ? found.jabatan : "Unassigned";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // URL untuk Tambah atau Edit
    const url = editingId 
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan";

    // Gunakan FormData atau Object JSON
    // Jika API kamu menggunakan standar Laravel, gunakan trik _method untuk PATCH
    const payload: any = {
      nik: formData.nik,
      nama: formData.nama,
      email: formData.email,
      tempat_lahir: formData.tempat_lahir,
      tanggal_lahir: formData.tanggal_lahir,
      alamat: formData.alamat,
      id_jabatan: Number(formData.id_jabatan),
      status_aktif: formData.status_aktif === "true"
    };

    if (editingId) {
      // Laravel seringkali membutuhkan ini agar PATCH dikenali melalui request POST
      payload["_method"] = "PATCH";
    }

    try {
      const response = await fetch(url, {
        method: "POST", // Tetap gunakan POST untuk stabilitas pengiriman data
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert(editingId ? "Data berhasil diupdate!" : "Data berhasil disimpan!");
        resetForm();
        fetchData();
      } else {
        // Jika status bukan 2xx, tampilkan pesan dari server
        alert(`Gagal: ${result.message || "Terjadi kesalahan pada data."}`);
      }
    } catch (err) {
      // Ini yang memicu pesan "Terjadi kesalahan koneksi"
      console.error("Error detail:", err);
      alert("Terjadi kesalahan koneksi ke server.");
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
      tempat_lahir: item.tempat_lahir || "",
      tanggal_lahir: item.tanggal_lahir || "",
      alamat: item.alamat || "",
      id_jabatan: item.id_jabatan.toString(),
      status_aktif: item.status_aktif ? "true" : "false"
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Hapus permanen karyawan ${name}?`)) return;
    
    setLoading(true);
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/karyawan/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      });

      if (res.ok) {
        alert("Data dihapus.");
        fetchData();
      } else {
        alert("Gagal menghapus.");
      }
    } catch (err) {
      alert("Masalah koneksi.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ 
      nik: "", nama: "", email: "", tempat_lahir: "", 
      tanggal_lahir: "", alamat: "", id_jabatan: "", status_aktif: "true" 
    });
  };

  return (
    <div className="min-h-screen p-6 font-sans text-slate-800 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">Master Karyawan</h1>
          <p className="text-slate-500 text-sm">Input dan monitoring data karyawan perusahaan.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* FORM PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    {editingId ? <Pencil size={20} /> : <UserPlus size={20} />}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{editingId ? "Edit" : "Baru"}</h2>
                </div>
                {editingId && (
                  <button onClick={resetForm} className="text-gray-400 hover:text-red-500"><X size={20} /></button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">NIK</label>
                  <input type="text" value={formData.nik} onChange={(e) => setFormData({...formData, nik: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Nomor Induk Karyawan" required />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Lengkap</label>
                  <input type="text" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Nama" required />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100" placeholder="Email" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tempat Lahir</label>
                    <input type="text" value={formData.tempat_lahir} onChange={(e) => setFormData({...formData, tempat_lahir: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal Lahir</label>
                    <input type="date" value={formData.tanggal_lahir} onChange={(e) => setFormData({...formData, tanggal_lahir: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Alamat</label>
                  <textarea rows={2} value={formData.alamat} onChange={(e) => setFormData({...formData, alamat: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none resize-none" placeholder="Alamat"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Jabatan</label>
                    <select value={formData.id_jabatan} onChange={(e) => setFormData({...formData, id_jabatan: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none" required>
                      <option value="">Pilih</option>
                      {jabatanList.map(j => <option key={j.id} value={j.id}>{j.jabatan}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                    <select value={formData.status_aktif} onChange={(e) => setFormData({...formData, status_aktif: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm outline-none">
                      <option value="true">Aktif</option>
                      <option value="false">Non-Aktif</option>
                    </select>
                  </div>
                </div>

                <button disabled={loading} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 mt-4 flex justify-center gap-2 shadow-xl shadow-slate-200">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : editingId ? "Perbarui" : "Simpan"}
                </button>
              </form>
            </div>
          </div>

          {/* TABLE PANEL */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Users size={20} className="text-indigo-500" />
                  <h2 className="text-xl font-bold text-slate-900">List Karyawan</h2>
                </div>
                <div className="bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-[10px] font-bold">
                  {karyawanList.length} Orang
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-gray-50/50">
                      <th className="px-8 py-4">Karyawan</th>
                      <th className="px-8 py-4">Jabatan</th>
                      <th className="px-8 py-4 text-center">Status</th>
                      <th className="px-8 py-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {karyawanList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group" onMouseEnter={() => setHoveredRow(item.id)} onMouseLeave={() => setHoveredRow(null)}>
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-800 leading-tight">{item.nama}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-1 uppercase">NIK: {item.nik}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="bg-white text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold border border-indigo-100">
                            {getNamaJabatan(item)}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            String(item.status_aktif) === "true" || item.status_aktif === true ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}>
                            {String(item.status_aktif) === "true" || item.status_aktif === true ? "Aktif" : "Non-Aktif"}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className={`flex justify-end gap-2 transition-opacity ${hoveredRow === item.id ? 'opacity-100' : 'opacity-0'}`}>
                            <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Pencil size={15} /></button>
                            <button onClick={() => handleDelete(item.id, item.nama)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
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