"use client";

import { 
  Calendar, 
  Plane, 
  Wallet, 
  FileText, 
  CreditCard,
  Megaphone
} from "lucide-react";

export default function Dashboard() {
  const recentHistory = [
    {
      id: 1,
      title: "Gaji Bulan Januari Telah Dibayar",
      time: "2 hours ago",
      icon: CreditCard,
    },
    {
      id: 2,
      title: "Gaji Bulan Januari Telah Dibayar",
      time: "4 hours ago",
      icon: CreditCard,
    },
  ];

  const statCards = [
    {
      title: "Kehadiran Bulan Ini",
      value: "22/24",
      badge: "On Track",
      badgeColor: "bg-blue-50 text-blue-700",
      icon: Calendar,
      iconBg: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      title: "Sisa Cuti",
      value: "8 Hari",
      badge: "Stable",
      badgeColor: "bg-slate-50 text-slate-700",
      icon: Plane,
      iconBg: "bg-gradient-to-br from-slate-400 to-slate-600",
    },
    {
      title: "Gaji Terakhir",
      value: "Rp 5.5M",
      badge: "Paid",
      badgeColor: "bg-blue-50 text-blue-700",
      icon: Wallet,
      iconBg: "bg-gradient-to-br from-amber-400 to-amber-600",
    },
    {
      title: "Tugas Pending",
      value: "3",
      badge: "Action Required",
      badgeColor: "bg-slate-50 text-slate-700",
      icon: FileText,
      iconBg: "bg-gradient-to-br from-slate-400 to-slate-600",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, user!</h1>
        <p className="text-gray-500 mt-1">
          Here&apos;s your overview for this month.
        </p>
      </div>

      {/* Stat Cards - FORCE HORIZONTAL with flex */}
      <div className="flex flex-wrap gap-6 mb-8 justify-between">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="flex-[1_1_calc(25%-18px)] bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer min-w-[200px]"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.iconBg} flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${card.badgeColor} whitespace-nowrap`}>
                  {card.badge}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent History */}
        <div className="bg-white rounded-2xl shadow-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
            <h2 className="text-lg font-bold text-gray-900">Your Recent History</h2>
          </div>

          <div className="space-y-4">
            {recentHistory.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                >
                  <div className="bg-blue-50 p-2.5 rounded-xl flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Announcement */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full py-8">
            <div className="bg-rose-50 p-4 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
              <Megaphone className="w-8 h-8 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Pengumuman Kantor
            </h3>
            <p className="text-sm text-gray-400 text-center max-w-md">
              Libur nasional jatuh pada tanggal 25 Maret.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}