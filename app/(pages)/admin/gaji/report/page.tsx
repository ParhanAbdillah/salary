'use client';

import { useState } from 'react';
import { 
  Download, 
  Search, 
  Calendar, 
  X,
  FileText,
  Wallet,
  Edit
} from 'lucide-react';

interface EmployeeSalary {
  id: number;
  name: string;
  nik: string;
  position: string;
  division: string;
  basicSalary: number;
  leaveAllowance: number;
  deductions: number;
  totalSalary: number;
  avatar: string;
}

export default function ProsesGajiBulanan() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeSalary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employees: EmployeeSalary[] = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      nik: 'EMP001',
      position: 'Manager IT',
      division: 'IT',
      basicSalary: 15000000,
      leaveAllowance: 500000,
      deductions: 200000,
      totalSalary: 15300000,
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Siti Aminah',
      nik: 'EMP002',
      position: 'HR Specialist',
      division: 'HR',
      basicSalary: 8000000,
      leaveAllowance: 0,
      deductions: 100000,
      totalSalary: 7900000,
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      nik: 'EMP003',
      position: 'Frontend Developer',
      division: 'IT',
      basicSalary: 10000000,
      leaveAllowance: 200000,
      deductions: 0,
      totalSalary: 10200000,
      avatar: 'B'
    },
    {
      id: 4,
      name: 'Rina Wijaya',
      nik: 'EMP004',
      position: 'Marketing Manager',
      division: 'Marketing',
      basicSalary: 12000000,
      leaveAllowance: 300000,
      deductions: 150000,
      totalSalary: 12150000,
      avatar: 'R'
    },
    {
      id: 5,
      name: 'Dedi Pratama',
      nik: 'EMP005',
      position: 'Backend Developer',
      division: 'IT',
      basicSalary: 11000000,
      leaveAllowance: 250000,
      deductions: 100000,
      totalSalary: 11150000,
      avatar: 'D'
    }
  ];

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.nik.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPengeluaran = employees.reduce((sum, emp) => sum + emp.totalSalary, 0);
  const totalKaryawan = employees.length;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleOpenModal = (employee: EmployeeSalary) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEmployee(null), 300);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Proses Gaji Bulanan</h1>
          <p className="text-gray-500">Generate dan hitung gaji seluruh karyawan dalam satu klik.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="month"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent bg-white text-gray-700"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-sm font-medium">
            <Wallet size={18} />
            <span>Proses Gaji</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            TOTAL PENGELUARAN GAJI
          </p>
          <p className="text-3xl font-bold text-gray-900">{formatRupiah(totalPengeluaran)}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            TOTAL KARYAWAN
          </p>
          <p className="text-3xl font-bold text-gray-900">{totalKaryawan} Orang</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            STATUS PERIODE
          </p>
          <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
            DRAFT
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama karyawan atau NIK..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">KARYAWAN</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">GAJI POKOK</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">UANG CUTI</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">POTONGAN</th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">TOTAL DITERIMA</th>
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
                        <p className="text-sm text-gray-500">{employee.nik} • {employee.position}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">{formatRupiah(employee.basicSalary)}</td>
                  <td className="py-4 px-4">
                    <span className="text-emerald-600 font-semibold">
                      +{formatRupiah(employee.leaveAllowance)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-rose-600 font-semibold">
                      -{formatRupiah(employee.deductions)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-gray-900">{formatRupiah(employee.totalSalary)}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={() => handleOpenModal(employee)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Edit size={18} className="text-gray-500" />
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

      {/* Modal - Medium Size Balanced */}
      {isModalOpen && selectedEmployee && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-300">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="pr-8">
                    <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Calculation Breakdown
                    </p>
                    <h2 className="text-xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {selectedEmployee.nik} • {selectedEmployee.position}
                    </p>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <X size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gaji Pokok</span>
                  <span className="font-semibold text-gray-900">{formatRupiah(selectedEmployee.basicSalary)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Uang Cuti (Tambahan)</span>
                  <span className="font-semibold text-emerald-600">+{formatRupiah(selectedEmployee.leaveAllowance)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Potongan</span>
                  <span className="font-semibold text-rose-600">-{formatRupiah(selectedEmployee.deductions)}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mt-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-900">TOTAL GAJI NETTO</span>
                    <span className="text-xl font-bold text-slate-800">{formatRupiah(selectedEmployee.totalSalary)}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="flex gap-3">
                  <button 
                    className="flex-1 px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium"
                  >
                    Simpan Perubahan
                  </button>
                  <button 
                    onClick={handleCloseModal}
                    className="flex-1 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Tutup
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