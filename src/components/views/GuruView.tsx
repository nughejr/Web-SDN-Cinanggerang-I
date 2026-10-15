import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Mail,
  Award,
  BookOpen,
  FileSpreadsheet,
  CheckCircle2,
} from 'lucide-react';
import { Guru } from '../../types';
import { filterGuru } from '../../utils/gasHelpers';

interface GuruViewProps {
  guruList: Guru[];
  onOpenGasHub: () => void;
}

export const GuruView: React.FC<GuruViewProps> = ({ guruList, onOpenGasHub }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const filtered = filterGuru(guruList, search, statusFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Sumber Data: Sheet "Guru" di Google Sheets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Dewan Guru & Tenaga Kependidikan
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Tenaga pendidik profesional, berdedikasi tinggi, dan berkomitmen membina generasi CERIA di SDN Cinanggerang I.
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

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama guru, NIP, mapel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Status:
          </span>
          {['Semua', 'PNS', 'PPPK', 'Honorer'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                statusFilter === s
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <p className="text-sm text-slate-500">Tidak ada data guru yang cocok dengan pencarian.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guru) => (
            <div
              key={guru.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
            >
              <div className="p-6 flex items-start gap-4 border-b border-slate-100">
                <img
                  src={guru.foto}
                  alt={guru.nama}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow border-2 border-emerald-500/20 shrink-0"
                />
                <div className="space-y-1 overflow-hidden">
                  <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    guru.status === 'PNS'
                      ? 'bg-emerald-100 text-emerald-800'
                      : guru.status === 'PPPK'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {guru.status}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {guru.nama}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {guru.jabatan}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-2.5 text-xs text-slate-600 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>NIP: <strong className="text-slate-800">{guru.nip}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Mapel: <strong className="text-slate-800">{guru.mapel}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Pendidikan: <strong className="text-slate-800">{guru.pendidikan}</strong></span>
                  </div>
                </div>

                {guru.email && (
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-slate-400 text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{guru.email}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
