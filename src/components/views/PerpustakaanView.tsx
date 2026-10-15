import React, { useState } from 'react';
import {
  Library,
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  FileSpreadsheet,
} from 'lucide-react';
import { BukuPerpustakaan } from '../../types';
import { filterBuku } from '../../utils/gasHelpers';

interface PerpustakaanViewProps {
  bukuList: BukuPerpustakaan[];
  onOpenGasHub: () => void;
}

export const PerpustakaanView: React.FC<PerpustakaanViewProps> = ({
  bukuList,
  onOpenGasHub,
}) => {
  const [search, setSearch] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('Semua');
  const [selectedBuku, setSelectedBuku] = useState<BukuPerpustakaan | null>(null);

  const filtered = filterBuku(bukuList, search, kategoriFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Sumber Data: Sheet "Perpustakaan" Google Sheets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Perpustakaan Digital SDN Cinanggerang I
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Koleksi buku tematik, ensiklopedia IPTEK anak, cerita dongeng Sunda, dan buku bacaan bermutu untuk meningkatkan minat literasi anak.
            </p>
          </div>

          <button
            onClick={onOpenGasHub}
            className="px-4 py-2 bg-yellow-400 text-slate-950 rounded-xl text-xs font-bold hover:bg-yellow-300 transition shadow"
          >
            Lihat Struktur Sheet Buku
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari judul buku, penulis, dongeng..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {['Semua', 'Tematik', 'Cerita Rakyat & Dongeng', 'Sains & Teknologi', 'Agama'].map((k) => (
            <button
              key={k}
              onClick={() => setKategoriFilter(k)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                kategoriFilter === k
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((buku) => (
          <div
            key={buku.id}
            onClick={() => setSelectedBuku(buku)}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:border-emerald-300 transition cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={buku.coverUrl}
                alt={buku.judul}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                {buku.kategori}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">
                  {buku.kelas}
                </span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 mt-1">
                  {buku.judul}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Penulis: <strong>{buku.penulis}</strong>
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {buku.sinopsis}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Tersedia
                </span>
                <span className="font-bold text-emerald-700 hover:underline">
                  Lihat Detail
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detail Buku */}
      {selectedBuku && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex gap-4">
              <img
                src={selectedBuku.coverUrl}
                alt={selectedBuku.judul}
                className="w-24 h-32 object-cover rounded-xl shadow shrink-0"
              />
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {selectedBuku.kategori}
                </span>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {selectedBuku.judul}
                </h2>
                <div className="text-xs text-slate-600">Penulis: {selectedBuku.penulis}</div>
                <div className="text-xs text-slate-600">Penerbit: {selectedBuku.penerbit} ({selectedBuku.tahun})</div>
                <div className="text-xs text-slate-600">Tingkat: {selectedBuku.kelas}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-1">Sinopsis Buku:</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedBuku.sinopsis}
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setSelectedBuku(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
