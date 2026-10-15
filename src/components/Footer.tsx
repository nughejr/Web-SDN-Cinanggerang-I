import React from 'react';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  FileCode2,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { initialProfile } from '../data/initialData';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Identity & Motto */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-emerald-500/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">
                  {initialProfile.nama}
                </h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  NPSN: {initialProfile.npsn}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {initialProfile.visi}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500 transition"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('profil')}
                  className="hover:text-emerald-400 transition"
                >
                  Profil & Visi Misi CERIA
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guru')}
                  className="hover:text-emerald-400 transition"
                >
                  Daftar Guru & Tenaga Kependidikan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('siswa')}
                  className="hover:text-emerald-400 transition"
                >
                  Data Siswa Kelas 1 s/d 6
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('kegiatan')}
                  className="hover:text-emerald-400 transition"
                >
                  Kegiatan & Ekstrakurikuler
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pengumuman')}
                  className="hover:text-emerald-400 transition"
                >
                  Pengumuman Sekolah Terkini
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('galeri')}
                  className="hover:text-emerald-400 transition"
                >
                  Galeri Foto & Dokumentasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Digital & GAS */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Layanan Terintegrasi Sheets
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('ppdb')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Formulir PPDB Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('absen')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Absen Online Guru & Siswa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('elearning')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  E-Learning & Modul Ajar
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('perpustakaan')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Perpustakaan Digital
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('gas-hub')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition text-[11px] font-bold flex items-center gap-1"
                >
                  <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Panduan Deployment Apps Script</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Alamat Lengkap */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Kontak Sekolah
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {initialProfile.alamat}, Kode Pos {initialProfile.kodePos}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{initialProfile.telepon}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{initialProfile.email}</span>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Akreditasi: {initialProfile.akreditasi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SDN Cinanggerang I Pamulihan-Sumedang. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Google Apps Script & Google Sheets</span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">CERIA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
