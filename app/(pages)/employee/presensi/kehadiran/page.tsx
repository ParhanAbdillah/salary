"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, Info, Calendar, FileEdit } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type AttendanceStatus = "hadir" | "izin" | "sakit";

interface AttendanceRecord {
  tanggal: string;
  masuk: string;
  pulang: string;
  status: AttendanceStatus;
  keterangan: string;
}

export default function PresensiKehadiran() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>("hadir");
  const [keterangan, setKeterangan] = useState("");
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([
    {
      tanggal: "1 Mar 2024",
      masuk: "08:00",
      pulang: "17:00",
      status: "hadir",
      keterangan: "-",
    },
    {
      tanggal: "28 Feb 2024",
      masuk: "08:15",
      pulang: "17:05",
      status: "hadir",
      keterangan: "-",
    },
    {
      tanggal: "27 Feb 2024",
      masuk: "-",
      pulang: "-",
      status: "izin",
      keterangan: "Urusan Keluarga",
    },
    {
      tanggal: "26 Feb 2024",
      masuk: "07:55",
      pulang: "17:00",
      status: "hadir",
      keterangan: "-",
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    const newRecord: AttendanceRecord = {
      tanggal: format(currentTime, "d MMM yyyy", { locale: id }),
      masuk: selectedStatus === "hadir" ? format(currentTime, "HH:mm") : "-",
      pulang: selectedStatus === "hadir" ? "-" : "-",
      status: selectedStatus,
      keterangan: keterangan || "-",
    };

    setAttendanceHistory([newRecord, ...attendanceHistory]);
    setKeterangan("");
    alert("Presensi berhasil disimpan!");
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "hadir":
        return "bg-emerald-100 text-emerald-700";
      case "izin":
        return "bg-amber-100 text-amber-600";
      case "sakit":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusText = (status: AttendanceStatus) => {
    return status.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Presensi Kehadiran</h1>
            <p className="text-slate-500 mt-1 text-base">Silahkan lakukan presensi harian Anda.</p>
          </div>
          
          {/* Clock */}
          <div className="bg-white rounded-2xl shadow-sm px-6 py-4 flex items-center gap-4">
            <div className="bg-slate-100 p-2.5 rounded-xl">
              <Clock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 font-mono">
                {format(currentTime, "HH.mm.ss")}
              </div>
              <div className="text-xs text-slate-400 font-semibold">
                {format(currentTime, "EEEE, d MMMM yyyy", { locale: id }).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-50 p-2.5 rounded-xl">
                <FileEdit className="w-5 h-5 text-cyan-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Form Presensi</h2>
            </div>

            {/* Status Selection */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 mb-3 uppercase">
                STATUS KEHADIRAN
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["hadir", "izin", "sakit"] as AttendanceStatus[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                      selectedStatus === status
                        ? "bg-blue-900 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Keterangan */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase text-right">
                KETERANGAN (OPSIONAL)
              </label>
              <textarea
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                placeholder="Contoh: Sakit flu, izin urusan keluarga..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 resize-none h-28 text-sm text-slate-600 placeholder:text-slate-400"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Kehadiran
            </button>
          </div>

          {/* Info Penting */}
          <div className="mt-6 bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-start gap-3">
              <div className="bg-white/20 p-2 rounded-full flex-shrink-0 backdrop-blur-sm">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-base">Info Penting</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Batas waktu presensi masuk adalah pukul 08:30 WIB.<br />
                  Keterlambatan akan dicatat secara otomatis oleh sistem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-900">Riwayat Kehadiran</h2>
              </div>
              <button className="text-blue-900 font-bold text-sm hover:text-blue-700 transition-colors">
                Lihat Semua
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="text-left py-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Masuk
                    </th>
                    <th className="text-left py-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Pulang
                    </th>
                    <th className="text-left py-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-4 px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Ket
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {attendanceHistory.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-3">
                        <span className="font-semibold text-slate-700">
                          {record.tanggal}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-600">
                        {record.masuk}
                      </td>
                      <td className="py-4 px-3 text-slate-600">
                        {record.pulang}
                      </td>
                      <td className="py-4 px-3">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {getStatusText(record.status)}
                        </span>
                      </td>
                      <td className="py-4 px-3 text-slate-400 text-sm italic">
                        {record.keterangan}
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
  );
}