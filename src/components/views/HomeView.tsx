import React from 'react';
import {
  Sparkles,
  ArrowRight,
  UserPlus,
  ClipboardCheck,
  BookOpen,
  Library,
  Users,
  Award,
  Bell,
  Calendar,
  ChevronRight,
  ShieldCheck,
  MapPin,
  HeartHandshake,
  Lightbulb,
} from 'lucide-react';
import { SchoolProfile, Pengumuman, Kegiatan } from '../../types';

interface HomeViewProps {
  profile: SchoolProfile;
  pengumumanList: Pengumuman[];
  kegiatanList: Kegiatan[];
  onNavigate: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  pengumumanList,
  kegiatanList,
  onNavigate,
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl p-6 sm:p-12 lg:p-16 shadow-2xl border border-emerald-700/40">
        {/* Subtle Decorative Background Rings */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-400/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-yellow-300 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Portal Resmi Pendidikan Dasar Terintegrasi Google Sheets</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Selamat Datang di <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-emerald-200">
              {profile.nama}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Menumbuhkan tunas bangsa yang <strong className="text-white font-semibold">Cerdas, Edukatif, Religius, IPTEK, dan Agamis (CERIA)</strong> di lingkungan asri Desa Cinanggerang, Kecamatan Pamulihan, Kabupaten Sumedang.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('ppdb')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 hover:from-yellow-300 hover:to-amber-400 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar PPDB Online</span>
            </button>

            <button
              onClick={() => onNavigate('absen')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm hover:bg-white/20 transition flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4 text-emerald-300" />
              <span>Absen Online Harian</span>
            </button>

            <button
              onClick={() => onNavigate('gas-hub')}
              className="px-5 py-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 font-bold text-sm hover:bg-emerald-900 transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-yellow-300" />
              <span>Panduan & Script GAS</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 border-t border-emerald-700/50 text-left">
            <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-yellow-300">20208801</div>
              <div className="text-xs text-emerald-200 font-medium">NPSN Sekolah</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white">A</div>
              <div className="text-xs text-emerald-200 font-medium">Akreditasi Sekolah</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-yellow-300">10</div>
              <div className="text-xs text-emerald-200 font-medium">Guru & Tenaga Kependidikan</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10">
              <div className="text-2xl sm:text-3xl font-black text-white">6</div>
              <div className="text-xs text-emerald-200 font-medium">Rombongan Belajar (Kelas 1-6)</div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FEATURE TILES */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('ppdb')}
          className="cursor-pointer group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-300 transition transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition">
            <UserPlus className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-emerald-700 transition">
            PPDB Online
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Pendaftaran peserta didik baru mudah, cepat, dan data langsung tersimpan ke Google Sheets panitia.
          </p>
          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Buka Pendaftaran <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate('absen')}
          className="cursor-pointer group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-300 transition transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-teal-700 transition">
            Absen Online
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Pencatatan presensi digital harian untuk dewan guru dan seluruh siswa kelas 1 s/d 6 secara transparan.
          </p>
          <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Isi Presensi <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate('elearning')}
          className="cursor-pointer group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-300 transition transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-700 transition">
            E-Learning Siswa
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Akses materi ajar, modul calistung, video pembelajaran kreatif, serta bank latihan soal Kurikulum Merdeka.
          </p>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Belajar Sekarang <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onNavigate('perpustakaan')}
          className="cursor-pointer group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-emerald-300 transition transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition">
            <Library className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-purple-700 transition">
            Perpustakaan Digital
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Koleksi buku tematik, ensiklopedia IPTEK anak, dan kumpulan dongeng kearifan lokal Parahyangan.
          </p>
          <span className="text-xs font-bold text-purple-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            Jelajah Koleksi <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </section>

      {/* SAMBUTAN KEPALA SEKOLAH & VISI CERIA */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sambutan Kepala Sekolah */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Sambutan Pimpinan
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Kepala Sekolah SDN Cinanggerang I
                </h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start mb-6">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80"
                alt="Kepala Sekolah"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-2 border-emerald-500/30 shrink-0"
              />
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  <em>Sampurasun, Assalamu'alaikum Warahmatullahi Wabarakatuh.</em>
                </p>
                <p>
                  Puji syukur kita panjatkan ke hadirat Allah SWT. Selamat datang di portal resmi <strong>SDN Cinanggerang I Pamulihan-Sumedang</strong>. Website ini kami dedikasikan sebagai jembatan informasi, sarana transparansi administrasi sekolah melalui pemanfaatan teknologi Google Workspace & Google Apps Script, serta media silaturahmi antara sekolah, siswa, orang tua, dan masyarakat.
                </p>
                <p>
                  Dengan semangat <strong>"CERIA"</strong> (Cerdas, Edukatif, Religius, IPTEK, Agamis), mari bersama-sama mencerdaskan tunas-tunas muda bangsa dengan kearifan lokal Sumedang dan wawasan global.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="font-extrabold text-slate-900 text-sm">{profile.kepalaSekolah}</div>
              <div className="text-xs text-slate-500">Kepala Sekolah SDN Cinanggerang I</div>
            </div>
            <button
              onClick={() => onNavigate('profil')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Lihat Profil Lengkap <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visi Misi "CERIA" Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 text-yellow-300 flex items-center justify-center mb-4">
              <Lightbulb className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              Visi & Misi Sekolah
            </span>
            <h3 className="text-xl font-black mt-1 mb-4 text-white">
              SDN Cinanggerang I "CERIA"
            </h3>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-5">
              <p className="text-xs text-yellow-200 italic font-medium leading-relaxed">
                "{profile.visi}"
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-bold text-emerald-200 uppercase">5 Misi Utama:</div>
              {profile.misi.map((m, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-emerald-50">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10">
            <span className="text-[11px] text-emerald-200">
              Desa Cinanggerang, Kec. Pamulihan, Kab. Sumedang (45362)
            </span>
          </div>
        </div>
      </section>

      {/* PENGUMUMAN & KEGIATAN TERBARU */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kolom Pengumuman */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Pengumuman Sekolah</h3>
                <p className="text-xs text-slate-500">Informasi resmi terkini untuk warga sekolah</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('pengumuman')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {pengumumanList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-emerald-50/50 transition cursor-pointer"
                onClick={() => onNavigate('pengumuman')}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.kategori === 'Penting'
                      ? 'bg-rose-100 text-rose-700'
                      : item.kategori === 'PPDB'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {item.kategori}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">{item.tanggal}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{item.judul}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{item.isi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Kegiatan Sekolah */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Kegiatan & Ekstrakurikuler</h3>
                <p className="text-xs text-slate-500">Dokumentasi kesiswaan & pembiasaan karakter</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('kegiatan')}
              className="text-xs font-bold text-emerald-700 hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="space-y-4">
            {kegiatanList.slice(0, 2).map((k) => (
              <div
                key={k.id}
                className="flex gap-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-amber-50/50 transition cursor-pointer"
                onClick={() => onNavigate('kegiatan')}
              >
                <img
                  src={k.foto}
                  alt={k.judul}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                    {k.kategori} • {k.tanggal}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{k.judul}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{k.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: GOOGLE APPS SCRIPT BANNER */}
      <section className="bg-gradient-to-r from-amber-50 via-amber-100 to-yellow-50 rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-xs">
            Untuk Developer / Operator Sekolah
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            Ingin Menerapkan Sistem Ini di Spreadsheet Anda?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Dapatkan kode lengkap backend <code>Code.gs</code>, struktur kolom 8 Sheet otomatis, serta panduan langkah deployment Google Apps Script step-by-step tanpa biaya server (100% Gratis di Google Workspace).
          </p>
        </div>
        <button
          onClick={() => onNavigate('gas-hub')}
          className="shrink-0 px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition shadow-lg flex items-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-yellow-400" />
          <span>Buka Panduan & Kode GAS</span>
        </button>
      </section>
    </div>
  );
};
