'use client';

import { useState } from 'react';
import { 
  Download, 
  Printer, 
  Search, 
  Calendar, 
  ChevronDown, 
  Eye,
  FileText
} from 'lucide-react';

interface Employee {
  id: number;
  name: string;
  nik: string;
  division: string;
  checkIn: string;
  status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALPHA';
  avatar: string;
}

export default function ReportPresensi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');

  const employees: Employee[] = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      nik: 'EMP001',
      division: 'IT',
      checkIn: '08:00',
      status: 'HADIR',
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      nik: 'EMP002',
      division: 'HR',
      checkIn: '08:15',
      status: 'HADIR',
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      nik: 'EMP003',
      division: 'Finance',
      checkIn: '-',
      status: 'IZIN',
      avatar: 'B'
    },
    {
      id: 4,
      name: 'Rina Wijaya',
      nik: 'EMP004',
      division: 'Marketing',
      checkIn: '-',
      status: 'SAKIT',
      avatar: 'R'
    },
    {
      id: 5,
      name: 'Dedi Pratama',
      nik: 'EMP005',
      division: 'IT',
      checkIn: '07:55',
      status: 'HADIR',
      avatar: 'D'
    }
  ];

  const divisions = ['Semua Divisi', 'IT', 'HR', 'Finance', 'Marketing', 'Operations'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HADIR':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      case 'IZIN':
        return 'bg-amber-100 text-amber-700 border border-amber-200';
      case 'SAKIT':
        return 'bg-rose-100 text-rose-700 border border-rose-200';
      case 'ALPHA':
        return 'bg-red-100 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       emp.nik.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDivision = selectedDivision === '' || selectedDivision === 'Semua Divisi' || 
                         emp.division === selectedDivision;
    return matchSearch && matchDivision;
  });

  const hadirCount = employees.filter(e => e.status === 'HADIR').length;
  const izinCount = employees.filter(e => e.status === 'IZIN').length;

  return (
    <div className="min-h-screen  p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Presensi</h1>
          <p className="text-gray-500">Monitoring kehadiran seluruh karyawan secara real-time.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={18} />
            <span className="font-medium text-gray-700">Export PDF</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm">
            <Printer size={18} />
            <span className="font-medium">Cetak Laporan</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama karyawan atau NIK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:black focus:border-transparent"
            />
          </div>

          {/* Date Picker - Native HTML5 */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:black focus:border-transparent text-gray-700"
              style={{
                colorScheme: 'light'
              }}
            />
            {/* Show formatted date when selected */}
            {selectedDate && (
              <span className="absolute right-12 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                {formatDate(selectedDate)}
              </span>
            )}
          </div>

          {/* Division Dropdown */}
          <div className="relative">
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:black focus:border-transparent appearance-none bg-white"
            >
              {divisions.map(div => (
                <option key={div} value={div === 'Semua Divisi' ? '' : div}>
                  {div}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Data Kehadiran Hari Ini</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-gray-600">HADIR: <span className="font-semibold text-gray-900">{hadirCount}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm text-gray-600">IZIN: <span className="font-semibold text-gray-900">{izinCount}</span></span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">NO</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">KARYAWAN</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">DIVISI</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">JAM MASUK</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">STATUS</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-gray-600">{index + 1}</td>
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
                  <td className="py-4 px-4 text-gray-700 font-medium">{employee.checkIn}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${getStatusColor(employee.status)}`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Eye size={18} className="text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500">Tidak ada data karyawan yang ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}