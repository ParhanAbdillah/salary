"use client";

import { useState } from "react";
import { Calendar, CalendarDays, Clock, CheckCircle, XCircle, FileText } from "lucide-react";

type StatusFilter = "semua" | "pending" | "approved" | "rejected";

type LeaveStatus = "approved" | "pending" | "rejected";

interface LeaveRecord {
  id: number;
  jenisCuti: string;
  tanggal: string;
  durasi: string;
  alasan: string;
  status: LeaveStatus;
}

export default function DataSaldoCuti() {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("semua");

  const leaveData: LeaveRecord[] = [
    {
      id: 1,
      jenisCuti: "Tahunan",
      tanggal: "15 Feb - 17 Feb 2024",
      durasi: "3 Hari",
      alasan: "Acara Keluarga",
      status: "approved",
    },
    {
      id: 2,
      jenisCuti: "Sakit",
      tanggal: "10 Jan - 11 Jan 2024",
      durasi: "1 Hari",
      alasan: "Flu & Demam",
      status: "approved",
    },
    {
      id: 3,
      jenisCuti: "Tahunan",
      tanggal: "10 Mar - 12 Mar 2024",
      durasi: "3 Hari",
      alasan: "Liburan Akhir Pekan",
      status: "pending",
    },
  ];

  const filteredData = activeFilter === "semua" 
    ? leaveData 
    : leaveData.filter(item => item.status === activeFilter);

  const getStatusBadge = (status: LeaveStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
            APPROVED
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
            PENDING
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            REJECTED
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Data & Saldo Cuti</h1>
          <p className="text-gray-500 mt-1">
            Informasi kuota dan riwayat pengajuan cuti Anda.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Cuti */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                TOTAL CUTI
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">12</span>
                <span className="text-sm text-gray-500">Hari / Tahun</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>

          {/* Cuti Diambil */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                CUTI DIAMBIL
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">4</span>
                <span className="text-sm text-gray-500">Hari</span>
              </div>
            </div>
            <div className="bg-rose-50 p-3 rounded-xl">
              <CalendarDays className="w-6 h-6 text-rose-600" />
            </div>
          </div>

          {/* Sisa Cuti */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                SISA CUTI
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">8</span>
                <span className="text-sm text-gray-500">Hari Tersisa</span>
              </div>
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Riwayat Pengajuan</h2>
            
            {/* Filter Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {(["semua", "pending", "approved", "rejected"] as StatusFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Jenis Cuti
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Durasi
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Alasan
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredData.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-semibold">
                        {record.jenisCuti}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-gray-700 font-semibold">
                        {record.tanggal}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-gray-700 font-semibold">
                        {record.durasi}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-gray-500 italic">
                        {record.alasan}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      {getStatusBadge(record.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-semibold">Tidak ada data pengajuan cuti</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}