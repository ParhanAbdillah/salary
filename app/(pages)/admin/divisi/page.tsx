"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit, List, Save, X, Building, Building2 } from "lucide-react";
import { log } from "node:console";


interface Divisi {
  id: number;
  divisi: string;
}


export default function DivisiPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [namaDivisi, setNamaDivisi] = useState("");
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");
  const [divisiList, setDivisiList] = useState<Divisi[]>([]);

   // SIMPAN DATA / UPDATE DIVISI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = editingId
      ? `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${editingId}`
      : "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi";
    
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
          nama_divisi: namaDivisi,
          divisi: namaDivisi,
        }),
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}). Check console for details.`);
      }

      if (!res.ok) {
        throw new Error(data.message || `Gagal ${editingId ? 'mengupdate' : 'menambahkan'} divisi`);
      }

      setNamaDivisi("");
      setEditingId(null);
      fetchDivisi(); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDivisi = async () => {
    try {
      const res = await fetch(
        "https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log('Divisi:', data);
          

      if (!res.ok) {
        throw new Error(data.message || "Gagal mengambil data");
      }

      setDivisiList(data.data || data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  //EDIT DEVISI
    const handleEdit = (divisi: Divisi) => {
    setEditingId(divisi.id);
    setNamaDivisi(divisi.divisi);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //DELETE DIVISI
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus divisi ini?")) return;

    try {
      const res = await fetch(
        `https://payroll.politekniklp3i-tasikmalaya.ac.id/api/divisi/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Gagal menghapus divisi");
      }

      fetchDivisi();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNamaDivisi("");
  };

  useEffect(() => {
  fetchDivisi();
}, []);

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Divisi</h1>
          <p className="text-gray-500 text-sm">Kelola daftar divisi perusahaan Anda</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            showForm 
              ? "bg-gray-100 text-gray-600 hover:bg-gray-200" 
              : "bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/30"
          }`}
        >
          {showForm ? <><X size={18} /> Batal</> : <><Plus size={18} /> Tambah Divisi</>}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* FORM TAMBAH DATA (Muncul jika showForm true) */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-teal-200 animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Building2 className="text-teal-500" size={20} /> Tambah Divisi Baru
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Masukkan nama divisi (contoh: Pemasaran)"
                value={namaDivisi}
                onChange={(e) => setNamaDivisi(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-teal-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-zinc-800 flex items-center justify-center gap-2"
              >
                <Save size={18} /> Simpan Data
              </button>
            </form>
          </div>
        )}

        {/* VIEW DATA (Tabel) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <List size={18} className="text-gray-400" />
            <span className="text-sm font-semibold text-gray-600">Daftar Divisi</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">No</th>
                <th className="px-6 py-4 font-medium">Nama Divisi</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {divisiList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray-400">
                    No department found.
                  </td>
                </tr>
              ) : (
                divisiList.map((data, index) => (
                  <tr key={data.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{data.divisi}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                      <button 
                      onClick={()=>handleEdit(data)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                      <button 
                      onClick={() => handleDelete(data.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}