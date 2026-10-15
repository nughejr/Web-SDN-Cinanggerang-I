import React, { useState } from 'react';
import {
  GraduationCap,
  Menu,
  X,
  FileCode2,
  Lock,
  UserCheck,
  LogOut,
  MapPin,
  Phone,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { UserAuth } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAuth | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenLogin,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'guru', label: 'Guru' },
    { id: 'siswa', label: 'Siswa' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'pengumuman', label: 'Pengumuman' },
    { id: 'ppdb', label: 'PPDB Online', highlight: true },
    { id: 'absen', label: 'Absen Online', highlight: true },
    { id: 'elearning', label: 'E-Learning' },
    { id: 'perpustakaan', label: 'Perpustakaan' },
    { id: 'galeri', label: 'Galeri' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1.5 text-emerald-200">
              <MapPin className="w-3.5 h-3.5 text-yellow-300" />
              Jln. Desa Cinanggerang, Pamulihan-Sumedang
            </span>
            <span className="hidden md:inline text-emerald-400">•</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-200">
              <Phone className="w-3.5 h-3.5 text-yellow-300" />
              082118449525
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-700/60 text-yellow-300 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide border border-emerald-600/40">
              NPSN: 20208801
            </span>
            <span className="text-emerald-300 hidden lg:inline">Database: Google Sheets (GAS)</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight group-hover:text-emerald-700 transition">
                  SDN CINANGGERANG I
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                  Sumedang
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Kecamatan Pamulihan • CERIA (Cerdas, Edukatif, Religius, IPTEK, Agamis)
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold">
            {navLinks.slice(0, 6).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-lg transition ${
                  activeTab === link.id
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Dropdown Menu Akademik / Layanan */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition ${
                  ['ppdb', 'absen', 'elearning', 'perpustakaan', 'galeri'].includes(activeTab)
                    ? 'text-emerald-700 bg-emerald-50 font-bold'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                }`}
              >
                <span>Layanan & Fasilitas</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                  {navLinks.slice(6).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center justify-between hover:bg-emerald-50 transition ${
                        activeTab === item.id ? 'text-emerald-700 bg-emerald-50 font-bold' : 'text-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.highlight && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                          Sheets
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Distinct Button for GAS Guide & Code Hub */}
            <button
              onClick={() => handleNavClick('gas-hub')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold transition ml-1 ${
                activeTab === 'gas-hub'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                  : 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
              }`}
            >
              <FileCode2 className="w-4 h-4 text-amber-600" />
              <span>Panduan & Kode GAS</span>
            </button>
          </nav>

          {/* User Auth & Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === 'admin-dashboard'
                      ? 'bg-emerald-800 text-white'
                      : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Panel {currentUser.role === 'admin' ? 'Admin' : 'Guru'}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Login Pegawai</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('gas-hub')}
              className="p-2 text-amber-700 bg-amber-50 rounded-lg border border-amber-200 text-xs font-bold flex items-center gap-1"
              title="Panduan GAS"
            >
              <FileCode2 className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Panduan GAS</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-2.5 text-left rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{link.label}</span>
                {link.highlight && (
                  <span className={`text-[10px] px-1 py-0.5 rounded ${
                    activeTab === link.id ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    Sheets
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('gas-hub')}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs flex items-center justify-center gap-2"
            >
              <FileCode2 className="w-4 h-4 text-amber-600" />
              <span>Panduan Lengkap & Kode Google Apps Script (.gs)</span>
            </button>

            {currentUser ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <div>
                  <div className="text-xs font-bold text-emerald-950">{currentUser.namaLengkap}</div>
                  <div className="text-[10px] text-emerald-700 uppercase font-semibold">
                    Role: {currentUser.role}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNavClick('admin-dashboard')}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg text-xs"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Login Admin & Guru</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
