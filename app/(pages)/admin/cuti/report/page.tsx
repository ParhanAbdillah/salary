'use client';

import { useState } from 'react';
import { 
  Download, 
  Search, 
  Info,
  Calendar,
  X
} from 'lucide-react';

interface EmployeeLeave {
  id: number;
  name: string;
  nik: string;
  division: string;
  totalLeave: number;
  usedLeave: number;
  remainingLeave: number;
  avatar: string;
}

interface LeaveHistory {
  id: number;
  date: string;
  type: string;
  duration: number;
  reason: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export default function ReportCuti() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeLeave | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employees: EmployeeLeave[] = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      nik: 'EMP001',
      division: 'IT',
      totalLeave: 12,
      usedLeave: 4,
      remainingLeave: 8,
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      nik: 'EMP002',
      division: 'HR',
      totalLeave: 12,
      usedLeave: 2,
      remainingLeave: 10,
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      nik: 'EMP003',
      division: 'Finance',
      totalLeave: 12,
      usedLeave: 12,
      remainingLeave: 0,
      avatar: 'B'
    },
    {
      id: 4,
      name: 'Rina Wijaya',
      nik: 'EMP004',
      division: 'Marketing',
      totalLeave: 15,
      usedLeave: 5,
      remainingLeave: 10,
      avatar: 'R'
    },
    {
      id: 5,
      name: 'Dedi Pratama',
      nik: 'EMP005',
      division: 'IT',
      totalLeave: 12,
      usedLeave: 3,
      remainingLeave: 9,
      avatar: 'D'
    },
    {
      id: 6,
      name: 'Maya Sari',
      nik: 'EMP006',
      division: 'HR',
      totalLeave: 12,
      usedLeave: 6,
      remainingLeave: 6,
      avatar: 'M'
    }
  ];

  // Sample leave history data
  const leaveHistoryData: Record<number, LeaveHistory[]> = {
    1: [
      { id: 1, date: '2024-02-15', type: 'Tahunan', duration: 3, reason: 'Acara Keluarga', status: 'APPROVED' },
      { id: 2, date: '2024-01-10', type: 'Sakit', duration: 1, reason: 'Demam', status: 'APPROVED' },
      { id: 3, date: '2023-12-20', type: 'Tahunan', duration: 5, reason: 'Liburan', status: 'APPROVED' },
    ],
    2: [
      { id: 4, date: '2024-03-01', type: 'Tahunan', duration: 2, reason: 'Urusan Pribadi', status: 'APPROVED' },
    ],
    3: [
      { id: 5, date: '2024-02-28', type: 'Tahunan', duration: 12, reason: 'Liburan Panjang', status: 'APPROVED' },
    ],
    4: [
      { id: 6, date: '2024-01-15', type: 'Tahunan', duration: 3, reason: 'Pulang Kampung', status: 'APPROVED' },
      { id: 7, date: '2024-02-10', type: 'Sakit', duration: 2, reason: 'Flu', status: 'APPROVED' },
    ],
    5: [
      { id: 8, date: '2024-03-05', type: 'Tahunan', duration: 3, reason: 'Acara Keluarga', status: 'PENDING' },
    ],
    6: [
      { id: 9, date: '2024-02-20', type: 'Tahunan', duration: 4, reason: 'Liburan', status: 'APPROVED' },
      { id: 10, date: '2024-01-25', type: 'Sakit', duration: 2, reason: 'Sakit Gigi', status: 'APPROVED' },
    ]
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSaldo = employees.reduce((sum, emp) => sum + emp.totalLeave, 0);
  const totalTerpakai = employees.reduce((sum, emp) => sum + emp.usedLeave, 0);

  const getRemainingColor = (remaining: number) => {
    if (remaining === 0) return 'text-red-600';
    if (remaining <= 3) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-700';
      case 'PENDING':
        return 'bg-amber-100 text-amber-700';
      case 'REJECTED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleOpenModal = (employee: EmployeeLeave) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEmployee(null), 300);
  };

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Saldo Cuti</h1>
          <p className="text-gray-500">Monitor saldo dan penggunaan cuti seluruh karyawan.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm">
          <Download size={18} />
          <span className="font-medium">Download Report</span>
        </button>
      </div>

      {/* Search and Summary */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Cari nama karyawan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:black focus:border-transparent shadow-sm"
          />
        </div>

        {/* Summary Cards */}
        <div className="flex gap-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-6 py-3 flex items-center justify-between min-w-[200px]">
            <span className="text-emerald-800 font-semibold text-sm">TOTAL SALDO</span>
            <span className="text-emerald-700 font-bold text-lg">{totalSaldo} Hari</span>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-lg px-6 py-3 flex items-center justify-between min-w-[200px]">
            <span className="text-rose-800 font-semibold text-sm">TERPAKAI</span>
            <span className="text-rose-700 font-bold text-lg">{totalTerpakai} Hari</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">KARYAWAN</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">DIVISI</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">TOTAL</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">TERPAKAI</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">SISA SALDO</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold">
                        {employee.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-500">{employee.nik}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {employee.division}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">{employee.totalLeave}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-rose-600">{employee.usedLeave}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold ${getRemainingColor(employee.remainingLeave)}`}>
                      {employee.remainingLeave}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleOpenModal(employee)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Info size={18} className="text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500">Tidak ada data karyawan yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEmployee && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      DETAILED HISTORY
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Sisa Saldo Cuti: <span className="font-semibold text-emerald-600">{selectedEmployee.remainingLeave} Hari</span>
                    </p>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">TANGGAL</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">JENIS</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">DURASI</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">ALASAN</th>
                      <th className="text-left py-3 px-2 text-xs font-semibold text-gray-500 uppercase">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveHistoryData[selectedEmployee.id]?.map((history) => (
                      <tr key={history.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-2 text-sm font-medium text-gray-900">{history.date}</td>
                        <td className="py-4 px-2">
                          <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                            {history.type}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-sm font-semibold text-slate-800">{history.duration} Hari</td>
                        <td className="py-4 px-2 text-sm text-gray-600 italic">{history.reason}</td>
                        <td className="py-4 px-2">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(history.status)}`}>
                            {history.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!leaveHistoryData[selectedEmployee.id] || leaveHistoryData[selectedEmployee.id]?.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto text-gray-400 mb-3" size={40} />
                    <p className="text-gray-500">Belum ada riwayat pengajuan cuti</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end">
                  <button 
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Close History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}