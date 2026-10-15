import React, { useState } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Filter,
  GraduationCap,
  Download,
  PlayCircle,
  ExternalLink,
} from 'lucide-react';
import { MateriELearning } from '../../types';

interface ELearningViewProps {
  materiList: MateriELearning[];
}

export const ELearningView: React.FC<ELearningViewProps> = ({ materiList }) => {
  const [kelasFilter, setKelasFilter] = useState('Semua');
  const [activeMateri, setActiveMateri] = useState<MateriELearning | null>(null);

  const filtered = materiList.filter((m) => {
    if (kelasFilter === 'Semua') return true;
    return m.kelas === kelasFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase">
            Ruang Belajar Digital
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            E-Learning & Bahan Ajar SDN Cinanggerang I
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Materi tematik interaktif, video pembelajaran calistung, dan modul rangkuman Kurikulum Merdeka untuk siswa kelas 1 s/d 6.
          </p>
        </div>
      </div>

      {/* Class Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Pilih Rombel:
        </span>
        {['Semua', 'Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'].map((k) => (
          <button
            key={k}
            onClick={() => setKelasFilter(k)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              kelasFilter === k
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {m.kelas}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 ${
                  m.tipe === 'Video'
                    ? 'bg-rose-100 text-rose-700'
                    : m.tipe === 'Kuis'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {m.tipe === 'Video' ? <Video className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                  {m.tipe} ({m.durasiOrHalaman})
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {m.judul}
              </h3>

              <div className="text-xs text-slate-500 flex items-center gap-2">
                <span>Mapel: <strong className="text-slate-800">{m.mapel}</strong></span>
                <span>•</span>
                <span>Pengampu: <strong className="text-slate-800">{m.guruPengampu}</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {m.deskripsi}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Kurikulum Merdeka</span>
              <button
                onClick={() => setActiveMateri(m)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                {m.tipe === 'Video' ? <PlayCircle className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
                <span>Buka Pembelajaran</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Preview Pembelajaran */}
      {activeMateri && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-700">{activeMateri.kelas} • {activeMateri.mapel}</span>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">{activeMateri.tipe}</span>
            </div>

            <h2 className="text-lg font-bold text-slate-900">{activeMateri.judul}</h2>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <div><strong>Guru Pengampu:</strong> {activeMateri.guruPengampu}</div>
              <div><strong>Format Materi:</strong> {activeMateri.durasiOrHalaman}</div>
              <div><strong>Deskripsi:</strong> {activeMateri.deskripsi}</div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-100 text-center space-y-2 border border-slate-200">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-600 font-semibold">
                Simulasi Materi E-Learning SDN Cinanggerang I
              </p>
              <p className="text-[11px] text-slate-500">
                Pada integrasi nyata, tautan ini terhubung ke Google Drive sekolah atau YouTube Channel resmi: "SDN Cinanggerang I".
              </p>
            </div>

            <button
              onClick={() => setActiveMateri(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Kembali ke Daftar Materi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
