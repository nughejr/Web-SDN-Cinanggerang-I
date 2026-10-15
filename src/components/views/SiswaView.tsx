import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Siswa } from '../../types';
import { filterSiswa } from '../../utils/gasHelpers';

interface SiswaViewProps {
  siswaList: Siswa[];
  onOpenGasHub: () => void;
}

export const SiswaView: React.FC<SiswaViewProps> = ({ siswaList, onOpenGasHub }) => {
  const [search, setSearch] = useState('');
  const [kelasFilter, setKelasFilter] = useState('Semua');

  const filtered = filterSiswa(siswaList, search, kelasFilter);

  const totalSiswa = siswaList.length;
  const totalLaki = siswaList.filter((s) => s.jenisKelamin === 'Laki-laki').length;
  const totalPerempuan = siswaList.filter((s) => s.jenisKelamin === 'Perempuan').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Sumber Data: Sheet "Siswa" di Google Sheets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Data Peserta Didik SDN Cinanggerang I
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Informasi peserta didik aktif mulai dari Kelas 1 hingga Kelas 6 yang terdaftar resmi pada database sekolah.
            </p>
          </div>

          <button
            onClick={onOpenGasHub}
            className="px-4 py-2 bg-yellow-400 text-slate-950 rounded-xl text-xs font-bold hover:bg-yellow-300 transition shadow"
          >
            Lihat Struktur Sheet
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Total Siswa Terdaftar</div>
            <div className="text-2xl font-black text-slate-900">{totalSiswa} Siswa</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Siswa Laki-laki</div>
            <div className="text-2xl font-black text-blue-700">{totalLaki} Orang</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            👦
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-semibold">Siswa Perempuan</div>
            <div className="text-2xl font-black text-rose-700">{totalPerempuan} Orang</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            👧
          </div>
        </div>
      </div>

      {/* Search and Class Selector */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama siswa, NISN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Menampilkan <strong className="text-slate-800">{filtered.length}</strong> data siswa
          </div>
        </div>

        {/* Filter per kelas */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 font-bold shrink-0">Filter Rombel:</span>
          {['Semua', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map((k) => (
            <button
              key={k}
              onClick={() => setKelasFilter(k)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                kelasFilter === k
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Table Display */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">No</th>
                <th className="py-3.5 px-4">NISN</th>
                <th className="py-3.5 px-4">Nama Lengkap Siswa</th>
                <th className="py-3.5 px-4">Rombel</th>
                <th className="py-3.5 px-4">L/P</th>
                <th className="py-3.5 px-4">Tempat, Tgl Lahir</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ditemukan data siswa untuk kriteria ini.
                  </td>
                </tr>
              ) : (
                filtered.map((siswa, idx) => (
                  <tr key={siswa.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 sm:px-6 text-slate-400 font-medium">{idx + 1}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">{siswa.nisn}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{siswa.nama}</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                        {siswa.kelas}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        siswa.jenisKelamin === 'Laki-laki'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {siswa.jenisKelamin === 'Laki-laki' ? 'L' : 'P'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {siswa.tempatLahir}, {siswa.tanggalLahir}
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {siswa.status}
                      </span>
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
};
