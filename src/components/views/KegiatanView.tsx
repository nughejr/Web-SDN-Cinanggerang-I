import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Tag,
  Sparkles,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Kegiatan } from '../../types';

interface KegiatanViewProps {
  kegiatanList: Kegiatan[];
}

export const KegiatanView: React.FC<KegiatanViewProps> = ({ kegiatanList }) => {
  const [filterKategori, setFilterKategori] = useState<string>('Semua');

  const filtered = kegiatanList.filter((k) => {
    if (filterKategori === 'Semua') return true;
    return k.kategori === filterKategori;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase">
            Aktivitas & Kesiswaan
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Kegiatan & Ekstrakurikuler Sekolah
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Menumbuhkembangkan bakat, minat, kedisiplinan, kearifan lokal Sunda, dan jiwa religius siswa SDN Cinanggerang I.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Kategori:
        </span>
        {['Semua', 'Ekstrakurikuler', 'Akademik', 'Keagamaan', 'Seni Budaya'].map((kat) => (
          <button
            key={kat}
            onClick={() => setFilterKategori(kat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              filterKategori === kat
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {kat}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition"
          >
            <div className="relative h-48 sm:h-56 overflow-hidden">
              <img
                src={item.foto}
                alt={item.judul}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                {item.kategori}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <Calendar className="w-3.5 h-3.5" /> {item.tanggal}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.lokasi}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.judul}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.deskripsi}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Dokumentasi SDN Cinanggerang I</span>
                <span className="flex items-center gap-1">
                  Info Detail <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
