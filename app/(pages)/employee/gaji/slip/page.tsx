"use client";

import { useState } from "react";
import { Eye, Download } from "lucide-react";

interface SalaryRecord {
  id: number;
  periode: string;
  totalGajiNetto: string;
  tanggalPembayaran: string;
  status: "paid" | "pending" | "processing";
}

export default function RiwayatSlipGaji() {
  const [salaryRecords] = useState<SalaryRecord[]>([
    {
      id: 1,
      periode: "Maret 2024",
      totalGajiNetto: "Rp 15.300.000",
      tanggalPembayaran: "2024-03-25",
      status: "paid",
    },
    {
      id: 2,
      periode: "Februari 2024",
      totalGajiNetto: "Rp 14.800.000",
      tanggalPembayaran: "2024-02-25",
      status: "paid",
    },
    {
      id: 3,
      periode: "Januari 2024",
      totalGajiNetto: "Rp 15.150.000",
      tanggalPembayaran: "2024-01-25",
      status: "paid",
    },
  ]);

  const handleView = (id: number) => {
    const record = salaryRecords.find(r => r.id === id);
    alert(`Melihat slip gaji: ${record?.periode}`);
  };

  const handleDownload = (id: number) => {
    const record = salaryRecords.find(r => r.id === id);
    alert(`Mengunduh slip gaji: ${record?.periode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Riwayat Slip Gaji</h1>
          <p className="text-gray-500 mt-1">
            Unduh slip gaji bulanan Anda dengan mudah.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Periode
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Total Gaji Netto
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Tanggal Pembayaran
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-4 px-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {salaryRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-3">
                      <span className="font-bold text-gray-900">
                        {record.periode}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-bold text-blue-900">
                        {record.totalGajiNetto}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-gray-600">
                        {record.tanggalPembayaran}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                        PAID
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(record.id)}
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          title="Lihat Slip"
                        >
                          <Eye className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDownload(record.id)}
                          className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          title="Unduh Slip"
                        >
                          <Download className="w-4 h-4 text-gray-400" />
                        </button>
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
  );
}