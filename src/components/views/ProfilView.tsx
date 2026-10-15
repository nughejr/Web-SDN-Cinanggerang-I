import React from 'react';
import {
  GraduationCap,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Award,
  BookOpen,
  Monitor,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { SchoolProfile } from '../../types';

interface ProfilViewProps {
  profile: SchoolProfile;
}

export const ProfilView: React.FC<ProfilViewProps> = ({ profile }) => {
  return (
    <div className="space-y-12 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase tracking-wider">
            Profil Resmi Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl font-black">
            {profile.nama}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Lembaga pendidikan dasar negeri di Kecamatan Pamulihan, Kabupaten Sumedang, Jawa Barat, yang bertekad melahirkan tunas bangsa berkarakter cerdas, edukatif, religius, berwawasan IPTEK, dan agamis.
          </p>
        </div>
      </div>

      {/* Grid: Identitas & Visi Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Identitas Sekolah */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Identitas Sekolah</h2>
              <p className="text-xs text-slate-500">Data resmi Kemendikbudristek & Dapodik</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Nama Sekolah</span>
              <span className="font-bold text-slate-900">{profile.nama}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">NPSN</span>
              <span className="font-bold text-emerald-700">{profile.npsn}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Bentuk Pendidikan</span>
              <span className="font-bold text-slate-900">Sekolah Dasar Negeri (SDN)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Status Akreditasi</span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                {profile.akreditasi}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Kepala Sekolah</span>
              <span className="font-bold text-slate-900">{profile.kepalaSekolah}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Desa / Kelurahan</span>
              <span className="font-bold text-slate-900">{profile.desa}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Kecamatan</span>
              <span className="font-bold text-slate-900">{profile.kecamatan}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Kabupaten</span>
              <span className="font-bold text-slate-900">{profile.kabupaten}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Kode Pos</span>
              <span className="font-bold text-slate-900">{profile.kodePos}</span>
            </div>
          </div>
        </div>

        {/* Visi, Misi & Filosofi CERIA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Visi & Misi "CERIA"</h2>
                <p className="text-xs text-slate-500">Landasan filosofis pembinaan peserta didik</p>
              </div>
            </div>

            <div className="my-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                Visi Sekolah:
              </span>
              <p className="text-sm sm:text-base font-extrabold text-emerald-950 italic">
                "{profile.visi}"
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                Misi Sekolah:
              </span>
              {profile.misi.map((m, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">{m}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Motto: CERIA - Cerdas, Edukatif, Religius, IPTEK, Agamis</span>
          </div>
        </div>
      </div>

      {/* Fasilitas & Sarana Prasarana */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Fasilitas & Sarana Prasarana</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Mendukung kegiatan belajar mengajar yang kondusif, nyaman, dan berwawasan teknologi
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Pojok IPTEK & Laboratorium Komputer</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Perangkat komputer untuk simulasi ANBK dan pelatihan literasi digital dasar bagi siswa.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Perpustakaan & Pojok Baca Digital</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Koleksi buku Kurikulum Merdeka, fiksi, dongeng Sunda, dan katalog digital yang terhubung online.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-300 transition">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm mb-1">Lapangan Upacara & Olahraga</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Area terbuka serbaguna untuk upacara bendera, senam bersama, latihan Pramuka, dan bola voli.
            </p>
          </div>
        </div>
      </div>

      {/* Peta Lokasi & Kontak */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Lokasi & Kontak Sekolah</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Kunjungi SDN Cinanggerang I di Kecamatan Pamulihan, Kabupaten Sumedang
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Alamat Lengkap:</div>
                  <div className="text-slate-600">{profile.alamat}, Kode Pos {profile.kodePos}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">WhatsApp / Telepon:</div>
                  <div className="text-slate-600">{profile.telepon}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">Surat Elektronik (Email):</div>
                  <div className="text-slate-600">{profile.email}</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
                Instagram: {profile.instagram}
              </div>
              <div className="flex-1 p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold">
                Facebook: {profile.facebook}
              </div>
            </div>
          </div>

          {/* Map Simulation Card */}
          <div className="bg-slate-100 rounded-2xl p-6 text-center border border-slate-200 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Peta Wilayah Pamulihan, Sumedang</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Berada di lingkungan pedesaan yang sejuk dan ramah anak, mudah dijangkau dari pusat kecamatan Pamulihan.
            </p>
            <a
              href="https://maps.google.com/?q=Cinanggerang+Pamulihan+Sumedang"
              target="_blank"
              rel="noreferrer"
              className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
            >
              Buka di Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
