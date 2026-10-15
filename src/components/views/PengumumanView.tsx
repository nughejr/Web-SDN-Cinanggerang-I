import React, { useState } from 'react';
import {
  Bell,
  Calendar,
  User,
  Paperclip,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { Pengumuman } from '../../types';

interface PengumumanViewProps {
  pengumumanList: Pengumuman[];
}

export const PengumumanView: React.FC<PengumumanViewProps> = ({ pengumumanList }) => {
  const [search, setSearch] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState<Pengumuman | null>(null);

  const filtered = pengumumanList.filter((item) => {
    const matchSearch =
      !search ||
      item.judul.toLowerCase().includes(search.toLowerCase()) ||
      item.isi.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategoriFilter === 'Semua' || item.kategori === kategoriFilter;
    return matchSearch && matchKategori;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="max-w-2xl space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase">
            Papan Informasi Resmi
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            Pengumuman & Pemberitahuan Sekolah
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Informasi akademik, jadwal asesmen, agenda kedinasan, dan berita resmi SDN Cinanggerang I Pamulihan.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari kata kunci pengumuman..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {['Semua', 'Penting', 'Akademik', 'PPDB', 'Umum'].map((k) => (
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

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  item.kategori === 'Penting'
                    ? 'bg-rose-100 text-rose-700'
                    : item.kategori === 'PPDB'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.kategori}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {item.tanggal}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {item.penulis}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base sm:text-lg hover:text-emerald-700 transition">
                {item.judul}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {item.isi}
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 text-xs font-bold transition shrink-0">
              Baca Lengkap
            </button>
          </div>
        ))}
      </div>

      {/* Modal Detail Pengumuman */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {selectedItem.kategori}
              </span>
              <span className="text-xs text-slate-400">{selectedItem.tanggal}</span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {selectedItem.judul}
            </h2>

            <div className="text-xs text-slate-500">
              Oleh: <strong className="text-slate-700">{selectedItem.penulis}</strong>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line py-2">
              {selectedItem.isi}
            </p>

            {selectedItem.lampiran && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700 font-semibold">
                  <Paperclip className="w-4 h-4 text-emerald-600" />
                  {selectedItem.lampiran}
                </span>
                <span className="text-emerald-600 font-bold">Unduh File</span>
              </div>
            )}

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Tutup Pengumuman
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
