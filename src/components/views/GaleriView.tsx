import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Calendar,
  X,
  Sparkles,
  Filter,
} from 'lucide-react';
import { GaleriItem } from '../../types';

interface GaleriViewProps {
  galeriList: GaleriItem[];
}

export const GaleriView: React.FC<GaleriViewProps> = ({ galeriList }) => {
  const [filterKategori, setFilterKategori] = useState('Semua');
  const [activePhoto, setActivePhoto] = useState<GaleriItem | null>(null);

  const filtered = galeriList.filter((g) => {
    if (filterKategori === 'Semua') return true;
    return g.kategori === filterKategori;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase">
            Album & Dokumentasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Galeri Foto SDN Cinanggerang I
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Merekam jejak keceriaan, prestasi, sarana pembelajaran, dan pembiasaan positif di sekolah.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Kategori:
        </span>
        {['Semua', 'Kegiatan', 'Fasilitas', 'Prestasi', 'Upacara'].map((k) => (
          <button
            key={k}
            onClick={() => setFilterKategori(k)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
              filterKategori === k
                ? 'bg-emerald-600 text-white shadow'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition cursor-pointer"
          >
            <div className="h-60 overflow-hidden relative">
              <img
                src={item.foto}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2 py-0.5 rounded-md bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 inline-block">
                  {item.kategori}
                </span>
                <h3 className="font-bold text-sm leading-snug line-clamp-1">
                  {item.judul}
                </h3>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" /> {item.tanggal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition"
              aria-label="Tutup foto"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={activePhoto.foto}
              alt={activePhoto.judul}
              className="w-full max-h-[65vh] object-contain bg-black"
            />
            <div className="p-6 text-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-xs font-bold">
                  {activePhoto.kategori}
                </span>
                <span className="text-xs text-slate-400">{activePhoto.tanggal}</span>
              </div>
              <h2 className="text-lg font-bold">{activePhoto.judul}</h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activePhoto.deskripsi}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
