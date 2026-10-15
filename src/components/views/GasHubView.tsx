import React, { useState } from 'react';
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Terminal,
  Layers,
  Database,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Play,
  ExternalLink,
  BookOpen,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { generateCodeGs, generateStandaloneHtml } from '../../utils/gasHelpers';

interface GasHubViewProps {
  gasUrl: string;
  setGasUrl: (url: string) => void;
  onTestGasConnection: () => Promise<void>;
  isTestingGas: boolean;
  testResult: { success: boolean; message: string } | null;
}

export const GasHubView: React.FC<GasHubViewProps> = ({
  gasUrl,
  setGasUrl,
  onTestGasConnection,
  isTestingGas,
  testResult,
}) => {
  const [activeTab, setActiveTab] = useState<'arsitektur' | 'backend' | 'database' | 'frontend' | 'deployment'>('backend');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const codeGsContent = generateCodeGs();
  const htmlContent = generateStandaloneHtml();

  const handleCopyCodeGs = () => {
    navigator.clipboard.writeText(codeGsContent);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadCodeGs = () => {
    const blob = new Blob([codeGsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Code.gs';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-500/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/20 backdrop-blur-md text-amber-200 text-xs font-bold uppercase tracking-wider border border-white/20">
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Dokumentasi Arsitektur & Generator Kode Otomatis</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black leading-tight">
            Panduan Lengkap, Struktur Kode & Deployment Google Apps Script
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
            Panduan teknis resmi tingkat lanjut untuk membangun website <strong>SDN Cinanggerang I</strong> menggunakan <strong>Google Sheets</strong> sebagai database nir-biaya (zero-cost) yang aman, cepat, dan mudah dikelola oleh dewan guru.
          </p>
        </div>
      </div>

      {/* LIVE WEBHOOK CONNECTOR PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/30 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Konektor Langsung Web App Google Apps Script
              </h3>
              <p className="text-xs text-slate-500">
                Hubungkan website ini langsung dengan URL Web App Anda (<code>/exec</code>)
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
            Opsional / Live Sync
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={gasUrl}
            onChange={(e) => setGasUrl(e.target.value)}
            placeholder="https://script.google.com/macros/s/AKfycb.../exec"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
          />
          <button
            onClick={onTestGasConnection}
            disabled={isTestingGas || !gasUrl.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow disabled:opacity-50"
          >
            {isTestingGas ? (
              <span>Menguji Koneksi...</span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Uji Koneksi Server (Ping)</span>
              </>
            )}
          </button>
        </div>

        {testResult && (
          <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
            testResult.success
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
              : 'bg-rose-50 text-rose-900 border border-rose-300'
          }`}>
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{testResult.message}</span>
          </div>
        )}
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('backend')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'backend'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileCode2 className="w-4 h-4" />
          <span>1. Kode Backend (Code.gs)</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'database'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>2. Struktur 8 Sheet Database</span>
        </button>

        <button
          onClick={() => setActiveTab('frontend')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'frontend'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>3. Kode Frontend (index.html)</span>
        </button>

        <button
          onClick={() => setActiveTab('deployment')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'deployment'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>4. Panduan Deployment (Step by Step)</span>
        </button>

        <button
          onClick={() => setActiveTab('arsitektur')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'arsitektur'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>5. Penjelasan Arsitektur Sistem</span>
        </button>
      </div>

      {/* TAB 1: KODE BACKEND CODE.GS */}
      {activeTab === 'backend' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Kode Backend Lengkap (Code.gs)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Salin dan tempelkan seluruh kode ini ke dalam editor Google Apps Script di Spreadsheet Anda.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCodeGs}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCode ? 'Tersalin!' : 'Salin Code.gs'}</span>
                </button>

                <button
                  onClick={handleDownloadCodeGs}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh .gs</span>
                </button>
              </div>
            </div>

            {/* Highlights of Functions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 font-mono">doGet(e)</div>
                <div className="text-slate-500 mt-0.5">Render Web App & JSON GET API (Guru, Siswa, Profil)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 font-mono">doPost(e)</div>
                <div className="text-slate-500 mt-0.5">Input Absen, Submit PPDB, Login Admin/Guru, LockService</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 font-mono">inisialisasiDatabase()</div>
                <div className="text-slate-500 mt-0.5">Membuat 8 sheet & header warna secara otomatis</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="font-bold text-slate-900 font-mono">jsonResponse()</div>
                <div className="text-slate-500 mt-0.5">Mengembalikan data format JSON dengan header CORS</div>
              </div>
            </div>

            {/* Code View Block */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>Code.gs • Google Apps Script</span>
                <span>JavaScript / ECMAScript 6</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[550px] leading-relaxed text-emerald-300">
                <code>{codeGsContent}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRUKTUR DATABASE GOOGLE SHEETS */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Struktur 8 Tab Sheet Database Google Sheets
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Anda tidak perlu membuat tabel-tabel ini satu per satu secara manual! Cukup jalankan fungsi <code>inisialisasiDatabase()</code> di Apps Script, maka seluruh 8 sheet dan header di bawah ini akan otomatis terbuat lengkap dengan warna hijau emerald.
              </p>
            </div>

            <div className="space-y-4">
              {/* Sheet 1: Profil */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 1: <code>Profil</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    11 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menyimpan identitas, visi misi CERIA, kontak, dan logo sekolah.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  Visi | Misi | Logo Sekolah | NPSN | Alamat | Kode Pos | Alamat Email | IG | FB | Youtube | HP
                </div>
              </div>

              {/* Sheet 2: Users */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 2: <code>Users</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    5 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menyimpan akun login Admin dan Guru untuk autentikasi sistem.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  username | password | role | namaLengkap | email
                </div>
              </div>

              {/* Sheet 3: Guru */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 3: <code>Guru</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    7 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menyimpan direktori dewan guru dan tenaga kependidikan.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  nip | nama | jabatan | mapel | pendidikan | status | email
                </div>
              </div>

              {/* Sheet 4: Siswa */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 4: <code>Siswa</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    7 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Data siswa aktif kelas 1 sampai 6 beserta NISN dan jenis kelamin.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  nisn | nama | kelas | jenisKelamin | tempatLahir | tanggalLahir | status
                </div>
              </div>

              {/* Sheet 5: PPDB */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 5: <code>PPDB</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    15 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menampung formulir pendaftaran calon siswa baru dari website.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  id | tanggalDaftar | namaLengkap | nik | nisn | jenisKelamin | tempatLahir | tanggalLahir | namaOrtu | noHpOrtu | alamat | asalTK | jalur | status | catatan
                </div>
              </div>

              {/* Sheet 6: Absensi */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 6: <code>Absensi</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    9 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menampung presensi kehadiran harian siswa dan guru.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  id | tanggal | waktu | tipe | nama | nomorIdentitas | kelasOrJabatan | status | keterangan
                </div>
              </div>

              {/* Sheet 7: Pengumuman */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 7: <code>Pengumuman</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    6 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Menyimpan judul, isi, tanggal, dan pengirim pengumuman resmi.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  id | judul | tanggal | kategori | penulis | isi
                </div>
              </div>

              {/* Sheet 8: Perpustakaan */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Sheet 8: <code>Perpustakaan</code>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    9 Kolom
                  </span>
                </div>
                <p className="text-xs text-slate-600">Daftar buku tematik, ensiklopedia IPTEK, dan dongeng Sunda.</p>
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-xs font-mono text-slate-700 overflow-x-auto">
                  id | judul | penulis | kategori | kelas | penerbit | tahun | tersedia | sinopsis
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: KODE FRONTEND INDEX.HTML */}
      {activeTab === 'frontend' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Kode Frontend Standalone (index.html)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Jika Anda ingin menghosting website langsung di dalam Google Apps Script (HTML Service), buat file bernama <code>index.html</code> di editor Apps Script dan tempelkan kode ini.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyHtml}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  {copiedHtml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedHtml ? 'Tersalin!' : 'Salin index.html'}</span>
                </button>

                <button
                  onClick={handleDownloadHtml}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh .html</span>
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-slate-200 border border-slate-800">
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <span>index.html • Apps Script HTML Service</span>
                <span>Tailwind CSS + google.script.run Client</span>
              </div>
              <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[550px] leading-relaxed text-teal-300">
                <code>{htmlContent}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PANDUAN DEPLOYMENT LANGKAH DEMI LANGKAH */}
      {activeTab === 'deployment' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Panduan Langkah-demi-Langkah Deployment Web App
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Ikuti 8 langkah mudah berikut ini mulai dari Spreadsheet kosong hingga mendapatkan link website yang aktif dan dapat diakses siapa saja di internet:
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Buka Google Spreadsheet Baru atau yang Sudah Ada
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Buka peramban Anda dan kunjungi <a href="https://sheets.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">sheets.google.com</a>. Buat spreadsheet baru dan beri nama, misalnya: <strong>"Database SDN Cinanggerang I"</strong>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Buka Editor Google Apps Script
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pada menu bilah atas Spreadsheet, klik menu <strong>Ekstensi (Extensions)</strong> &gt; pilih <strong>Apps Script</strong>. Tab baru editor skrip akan terbuka secara otomatis.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Salin Kode Backend ke File <code>Code.gs</code>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hapus fungsi bawaan <code>function myFunction() &#123;&#125;</code> di editor. Buka Tab <strong>"1. Kode Backend (Code.gs)"</strong> pada halaman ini, klik tombol <strong>"Salin Code.gs"</strong>, dan tempelkan ke editor. Simpan perubahan dengan menekan ikon Disket (Save) atau tombol <kbd className="px-1.5 py-0.5 bg-slate-200 rounded font-mono">Ctrl + S</kbd>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                4
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Buat File HTML: <code>index.html</code> (Jika ingin Zero-Cost Hosting di Google)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Di sebelah kiri editor Apps Script, klik tombol <strong>+ (Tambah file)</strong> &gt; pilih <strong>HTML</strong> &gt; beri nama file persis: <code>index</code> (tanpa .html). Salin isi dari tab <strong>"3. Kode Frontend (index.html)"</strong> dan simpan.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                5
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Jalankan Fungsi Inisialisasi Database (Wajib)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Di bagian atas editor Apps Script, pilih fungsi <code>inisialisasiDatabase</code> dari menu dropdown, lalu klik tombol <strong>Jalankan (Run)</strong>.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-900 font-medium">
                  <strong>Penting:</strong> Google akan memunculkan jendela <em>"Authorization Required"</em>. Klik <strong>Tinjau Izin (Review Permissions)</strong> &gt; Pilih akun Google Anda &gt; Klik <strong>Lanjutan (Advanced)</strong> &gt; Klik <strong>Buka Project (tidak aman) / Go to project (unsafe)</strong> &gt; Klik <strong>Izinkan (Allow)</strong>.
                  Setelah itu, periksa kembali spreadsheet Anda, seluruh 8 tab sheet telah terbuat dengan rapi!
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                6
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Lakukan Deployment Web App
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Di pojok kanan atas editor Apps Script, klik tombol biru <strong>Terapkan (Deploy)</strong> &gt; pilih <strong>Penerapan baru (New deployment)</strong>.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="font-bold w-36">Jenis Penerapan:</span>
                    <span className="bg-slate-200 px-2 py-0.5 rounded font-mono">Aplikasi Web (Web App)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold w-36">Jalankan sebagai:</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Saya (User akun Google Anda)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold w-36">Siapa yang mengakses:</span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">Siapa saja (Anyone)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                7
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm">
                  Salin URL Aplikasi Web (Web App URL)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Setelah menekan tombol <strong>Terapkan (Deploy)</strong>, Google akan memberikan URL yang berakhiran <code>/exec</code>, contohnya:
                  <br />
                  <code className="text-emerald-700 font-bold bg-white p-1 rounded inline-block mt-1 border border-slate-200">
                    https://script.google.com/macros/s/AKfycbx.../exec
                  </code>
                </p>
                <p className="text-xs text-slate-600">
                  Website Anda kini sudah aktif 100% dan dapat dibuka langsung melalui URL tersebut! Anda juga dapat menempelkan URL tersebut pada kotak <strong>"Konektor Langsung"</strong> di atas untuk menguji sinkronisasi secara instan.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ARSITEKTUR SISTEM & BEST PRACTICES */}
      {activeTab === 'arsitektur' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Arsitektur & Praktik Terbaik (Best Practices)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Memahami alur komunikasi antara antarmuka pengguna (Frontend), Google Apps Script (Backend), dan Google Sheets (Database).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>Model 1: All-In-One GAS HTML Service</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Seluruh file HTML, CSS, JavaScript dan kode backend berada di dalam project Google Apps Script.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li><strong>Kelebihan:</strong> 100% gratis selamanya, tanpa perlu sewa domain atau web hosting.</li>
                <li><strong>Komunikasi:</strong> Menggunakan <code>google.script.run.withSuccessHandler(...)</code> yang dieksekusi secara asinkron tanpa masalah CORS.</li>
                <li><strong>Sangat Cocok:</strong> Untuk portal internal sekolah dasar dan formulir PPDB online sederhana.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Model 2: Decoupled Web App (Frontend Eksternal)</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Frontend dibangun menggunakan React / Vite / HTML modern di hosting seperti Cloud Run / Vercel, sedangkan Google Apps Script bertindak sebagai REST API murni.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                <li><strong>Kelebihan:</strong> Tampilan sangat cepat, dapat menggunakan domain sekolah sendiri (misal: <code>sdncinanggerang1.sch.id</code>).</li>
                <li><strong>Komunikasi:</strong> Menggunakan <code>fetch(GAS_URL, &#123; method: 'POST', body: ... &#125;)</code> dengan output <code>ContentService.MimeType.JSON</code>.</li>
              </ul>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h3 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Praktik Terbaik Keamanan & Keandalan (Security Best Practices)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-emerald-900">
              <div>
                <strong>1. LockService untuk Mencegah Race Condition:</strong>
                <p className="mt-1">
                  Saat banyak wali murid mengirim form PPDB bersamaan, <code>LockService.getScriptLock().waitLock(10000)</code> memastikan baris ditulis berurutan tanpa saling menimpa.
                </p>
              </div>
              <div>
                <strong>2. Validasi Ganda (Client & Server):</strong>
                <p className="mt-1">
                  Validasi NIK 16 digit dan nomor HP dilakukan di sisi browser sebelum dikirim, serta dicek ulang di backend Apps Script.
                </p>
              </div>
              <div>
                <strong>3. Pemisahan Hak Akses Role:</strong>
                <p className="mt-1">
                  Sheet <code>Users</code> menyimpan kredensial admin dan guru. Aksi sensitif seperti mengubah status verifikasi PPDB diproteksi verifikasi role.
                </p>
              </div>
              <div>
                <strong>4. Output MimeType JSON & CORS Friendly:</strong>
                <p className="mt-1">
                  Fungsi <code>jsonResponse()</code> menggunakan <code>ContentService.createTextOutput()</code> sehingga aman dikonsumsi oleh peramban manapun.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
