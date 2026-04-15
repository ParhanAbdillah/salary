"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Briefcase, Search } from "lucide-react";

interface Jabatan {
  id: number;
  jabatan: string;
  id_divisi: number;
  gaji_pokok: number;
  divisi?: {
    id: number;
    divisi: string;
  };
}

interface Divisi {
  id: number;
  divisi: string;
}

export default function JabatanPage() {
  const [showForm, setShowForm] = useState(false);
  const [jabatanList, setJabatanList] = useState<Jabatan[]>([]);
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form States
  const [namaJabatan, setNamaJabatan] = useState("");
  const [idDivisi, setIdDivisi] = useState<number | "">("");
  const [gajiPokok, setGajiPokok] = useState("");

  // Searchable Select States
  const [searchDivisi, setSearchDivisi] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  // Ambil token (Gunakan "token" agar sama dengan halaman Divisi)
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // --- API FUNCTIONS ---

  const fetchJabatan = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan", {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json" 
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal mengambil data jabatan");
      setJabatanList(data.data || data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisi = async () => {
    try {
      const res = await fetch("https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi", {
        headers: { 
          Authorization: `Bearer ${token}`,
          Accept: "application/json" 
        },
      });
      const data = await res.json();
      if (res.ok) setDivisiList(data.data || data);
    } catch (err) {
      console.error("Fetch Divisi Error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDivisi();
      fetchJabatan();
    }
  }, [token]);

  // --- CRUD HANDLERS ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan";
    
    const method = editingId ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          jabatan: namaJabatan,
          id_divisi: Number(idDivisi),
          gaji_pokok: Number(gajiPokok),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan data");

      resetForm();
      fetchJabatan();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: Jabatan) => {
    setEditingId(item.id);
    setNamaJabatan(item.jabatan);
    setIdDivisi(item.id_divisi);
    setGajiPokok(item.gaji_pokok.toString());
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus jabatan ini?")) return;
    try {
      const res = await fetch(`https://payroll.politekniklp3i-tasikmalaya.ac.id/api/jabatan/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Gagal menghapus jabatan");
      fetchJabatan();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const resetForm = () => {
    setNamaJabatan("");
    setIdDivisi("");
    setGajiPokok("");
    setEditingId(null);
    setShowForm(false);
    setError("");
  };

  // --- HELPERS ---

  const filteredDivisi = divisiList.filter(d => 
    d.divisi.toLowerCase().includes(searchDivisi.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Jabatan</h1>
          <p className="text-gray-500 text-sm">Kelola tingkatan posisi dan standar gaji pokok</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Jabatan</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH/EDIT JABATAN */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Briefcase className="text-teal-500" size={20} /> 
              {editingId ? "Edit Jabatan" : "Tambah Jabatan Baru"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl text-sm">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Nama Jabatan"
                  value={namaJabatan}
                  onChange={(e) => setNamaJabatan(e.target.value)}
                  className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all"
                  required
                />
                
                {/* Searchable Divisi Select */}
                <div className="relative" ref={selectRef}>
                  <button
                    type="button"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all text-left bg-white flex justify-between items-center"
                  >
                    <span className={idDivisi ? "text-gray-900" : "text-gray-500"}>
                      {divisiList.find(d => d.id === idDivisi)?.divisi || "Pilih Divisi"}
                    </span>
                    <span className="text-gray-400">▼</span>
                  </button>
                  
                  {isSelectOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-xl z-20">
                      <div className="flex gap-2 px-4 py-2 border-b border-gray-100 items-center">
                        <Search size={14} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Cari divisi..."
                          value={searchDivisi}
                          onChange={(e) => setSearchDivisi(e.target.value)}
                          className="flex-1 outline-none text-sm py-1"
                          autoFocus
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredDivisi.length > 0 ? (
                          filteredDivisi.map((d) => (
                            <button
                              key={d.id}
                              type="button"
                              onClick={() => {
                                setIdDivisi(d.id);
                                setIsSelectOpen(false);
                                setSearchDivisi("");
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-teal-50 text-sm transition-colors ${
                                idDivisi === d.id ? "bg-teal-50 text-teal-700 font-semibold" : "text-gray-700"
                              }`}
                            >
                              {d.divisi}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-xs text-center">Data tidak ditemukan</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <input
                  type="number"
                  placeholder="Gaji Pokok"
                  value={gajiPokok}
                  onChange={(e) => setGajiPokok(e.target.value)}
                  className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-800 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-700 flex items-center justify-center gap-2 disabled:opacity-50 w-full md:w-auto"
              >
                <Save size={18} /> {loading ? "Menyimpan..." : "Simpan Jabatan"}
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA JABATAN */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-gray-800">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Daftar Posisi & Gaji</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 bg-gray-50/30">
                  <th className="px-6 py-4 font-medium">No</th>
                  <th className="px-6 py-4 font-medium">Nama Jabatan</th>
                  <th className="px-6 py-4 font-medium">Divisi</th>
                  <th className="px-6 py-4 font-medium">Gaji Pokok</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jabatanList.length > 0 ? (
                  jabatanList.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 font-semibold text-slate-700">{item.jabatan}</td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                          {item.divisi?.divisi || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-emerald-600">
                        {formatCurrency(Number(item.gaji_pokok))}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400 text-sm">
                      Belum ada data jabatan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}