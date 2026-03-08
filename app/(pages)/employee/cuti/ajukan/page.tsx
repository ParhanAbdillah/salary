"use client";

import { useState } from "react";
import { 
  Calendar, 
  Heart, 
  AlertCircle, 
  Users, 
  Send, 
  Upload, 
  Info,
  Mail
} from "lucide-react";

// ✅ Perbaikan: tambahkan | antara "sakit" dan "penting"
type LeaveType = "tahunan" | "sakit" | "penting" | "bersama";

export default function FormPengajuanCuti() {
  const [selectedLeave, setSelectedLeave] = useState<LeaveType | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const leaveTypes = [
    {
      id: "tahunan" as LeaveType,
      label: "Cuti Tahunan",
      icon: Calendar,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      id: "sakit" as LeaveType,
      label: "Cuti Sakit",
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      id: "penting" as LeaveType,
      label: "Alasan Penting",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      id: "bersama" as LeaveType,
      label: "Cuti Bersama",
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pengajuan cuti berhasil dikirim!");
  };

  return (
    <div className="min-h-screen  p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Form Pengajuan Cuti</h1>
          <p className="text-gray-500 mt-1">
            Silahkan lengkapi data di bawah ini untuk mengajukan cuti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              {/* Leave Type Selection */}
              <div className="mb-8">
                <label className="block text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                  Pilih Jenis Cuti
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {leaveTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = selectedLeave === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedLeave(type.id)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                          isSelected
                            ? `${type.bgColor} ${type.borderColor} ring-2 ring-offset-2 ring-${type.color.split('-')[1]}-500`
                            : "border-gray-100 hover:border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className={`p-3 rounded-full mb-3 ${type.bgColor}`}>
                          <Icon className={`w-6 h-6 ${type.color}`} />
                        </div>
                        <span className={`text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tanggal Mulai
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Tanggal Berakhir
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Reason Field */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Alasan Cuti
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Berikan alasan yang jelas untuk pengajuan cuti Anda..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Upload Section */}
              <div className="mb-8">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Upload Dokumen Pendukung (Opsional)
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, JPG, atau PNG (Maks 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
              >
                <Send className="w-5 h-5" />
                Kirim Pengajuan
              </button>
            </form>
          </div>

          {/* Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900 rounded-2xl shadow-lg p-6 text-white h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-2 rounded-full">
                  <Info className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-lg font-bold">Ketentuan Cuti</h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Pengajuan cuti dilakukan minimal 3 hari sebelum tanggal mulai.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Cuti sakit wajib melampirkan surat keterangan dokter.
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Persetujuan cuti bergantung pada kebijakan manajer divisi.
                  </p>
                </div>
              </div>

              {/* Help Section */}
              <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Butuh Bantuan?
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  Hubungi HRD melalui email
                </p>
                <a 
                  href="mailto:hrd@company.com" 
                  className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  hrd@company.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}