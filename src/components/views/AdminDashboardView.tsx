import React, { useState } from 'react';
import {
  UserCheck,
  ShieldCheck,
  Users,
  ClipboardCheck,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Plus,
  RefreshCw,
  LogOut,
  Send,
  FileSpreadsheet,
} from 'lucide-react';
import { UserAuth, PendaftaranPPDB, AbsensiRecord, Pengumuman } from '../../types';

interface AdminDashboardViewProps {
  currentUser: UserAuth;
  onLogout: () => void;
  ppdbList: PendaftaranPPDB[];
  onUpdatePPDBStatus: (id: string, newStatus: 'Diterima' | 'Ditolak' | 'Menunggu', catatan?: string) => Promise<void>;
  absensiList: AbsensiRecord[];
  pengumumanList: Pengumuman[];
  onAddPengumuman: (item: Omit<Pengumuman, 'id' | 'tanggal'>) => void;
  onOpenGasHub: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  currentUser,
  onLogout,
  ppdbList,
  onUpdatePPDBStatus,
  absensiList,
  pengumumanList,
  onAddPengumuman,
  onOpenGasHub,
}) => {
  const [activeTab, setActiveTab] = useState<'ppdb' | 'absen' | 'pengumuman'>('ppdb');

  // New announcement form state
  const [showAddPengumuman, setShowAddPengumuman] = useState(false);
  const [judulPengumuman, setJudulPengumuman] = useState('');
  const [kategoriPengumuman, setKategoriPengumuman] = useState<'Penting' | 'Akademik' | 'PPDB' | 'Umum'>('Umum');
  const [isiPengumuman, setIsiPengumuman] = useState('');

  // Status update message
  const [statusActionMsg, setStatusActionMsg] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, newStatus: 'Diterima' | 'Ditolak' | 'Menunggu') => {
    try {
      await onUpdatePPDBStatus(id, newStatus, `Diperbarui oleh ${currentUser.namaLengkap}`);
      setStatusActionMsg(`Status ID ${id} berhasil diubah menjadi: ${newStatus}`);
      setTimeout(() => setStatusActionMsg(null), 3000);
    } catch (e: any) {
      alert('Gagal mengupdate status: ' + e.message);
    }
  };

  const handleCreatePengumuman = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judulPengumuman.trim() || !isiPengumuman.trim()) return;

    onAddPengumuman({
      judul: judulPengumuman,
      kategori: kategoriPengumuman,
      penulis: currentUser.namaLengkap,
      isi: isiPengumuman,
    });

    setJudulPengumuman('');
    setIsiPengumuman('');
    setShowAddPengumuman(false);
    setStatusActionMsg('Pengumuman baru berhasil diterbitkan!');
    setTimeout(() => setStatusActionMsg(null), 3000);
  };

  const handleExportAbsensiCSV = () => {
    const headers = 'ID,Tanggal,Waktu,Tipe,Nama,NomorIdentitas,KelasOrJabatan,Status,Keterangan\n';
    const rows = absensiList
      .map(
        (a) =>
          `"${a.id}","${a.tanggal}","${a.waktu}","${a.tipe}","${a.nama}","${a.nomorIdentitas}","${a.kelasOrJabatan}","${a.status}","${a.keterangan}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `rekap-absensi-sdn-cinanggerang-1.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center font-bold text-2xl shadow-lg shadow-emerald-500/20 shrink-0">
            <UserCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 uppercase tracking-wide border border-emerald-500/30">
                Akses: {currentUser.role === 'admin' ? 'Administrator Sekolah' : 'Dewan Guru'}
              </span>
              <span className="text-xs text-slate-400">• SDN Cinanggerang I</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black mt-1 text-white">
              {currentUser.namaLengkap}
            </h1>
            <p className="text-xs text-slate-300">
              Username: <strong className="text-emerald-300">{currentUser.username}</strong> | Database Google Sheets Aktif
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenGasHub}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Format & Script GAS</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      {statusActionMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{statusActionMsg}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('ppdb')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'ppdb'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Verifikasi PPDB Online ({ppdbList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('absen')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'absen'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <ClipboardCheck className="w-4 h-4" />
          <span>Rekap Absensi Harian ({absensiList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pengumuman')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
            activeTab === 'pengumuman'
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Kelola Pengumuman ({pengumumanList.length})</span>
        </button>
      </div>

      {/* TAB 1: PPDB MANAGEMENT */}
      {activeTab === 'ppdb' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Persetujuan & Verifikasi Calon Siswa Baru
              </h2>
              <p className="text-xs text-slate-500">
                Ubah status pendaftar: aksi ini mengupdate nilai kolom Status di Sheet <strong>"PPDB"</strong>
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
              Menunggu: {ppdbList.filter((p) => p.status === 'Menunggu').length} | Diterima: {ppdbList.filter((p) => p.status === 'Diterima').length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">ID PPDB</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">NIK / NISN</th>
                  <th className="py-3 px-4">Ortu / HP</th>
                  <th className="py-3 px-4">Jalur</th>
                  <th className="py-3 px-4">Status Sekarang</th>
                  <th className="py-3 px-4 text-center">Tindakan Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ppdbList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700 text-xs">
                      {item.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {item.namaLengkap}
                      <span className="block text-[11px] text-slate-400 font-normal">
                        Asal: {item.asalTK || 'Tidak ada data'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>NIK: {item.nik}</div>
                      {item.nisn && <div className="text-[11px] text-slate-400">NISN: {item.nisn}</div>}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <div>{item.namaOrtu}</div>
                      <div className="text-emerald-700 font-medium">{item.noHpOrtu}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                        {item.jalur}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'Diterima'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Ditolak'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'Diterima')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                          title="Terima Siswa"
                        >
                          <CheckCircle className="w-3 h-3" /> Terima
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'Ditolak')}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-sm"
                          title="Tolak Pendaftaran"
                        >
                          <XCircle className="w-3 h-3" /> Tolak
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, 'Menunggu')}
                          className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition"
                          title="Kembalikan Menunggu"
                        >
                          Reset
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REKAP ABSENSI */}
      {activeTab === 'absen' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Rekapitulasi Kehadiran Siswa & Tenaga Pendidik
              </h2>
              <p className="text-xs text-slate-500">
                Pencatatan real-time yang tersimpan pada Sheet <strong>"Absensi"</strong>
              </p>
            </div>
            <button
              onClick={handleExportAbsensiCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Rekap CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Tanggal / Waktu</th>
                  <th className="py-3 px-4">Tipe</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">Identitas (NISN/NIP)</th>
                  <th className="py-3 px-4">Kelas / Jabatan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {absensiList.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-600 text-xs">
                      {a.tanggal} {a.waktu}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        a.tipe === 'Guru' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {a.tipe}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{a.nama}</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{a.nomorIdentitas}</td>
                    <td className="py-3 px-4 text-slate-600">{a.kelasOrJabatan}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        a.status === 'Hadir'
                          ? 'bg-emerald-100 text-emerald-800'
                          : a.status === 'Sakit'
                          ? 'bg-amber-100 text-amber-800'
                          : a.status === 'Izin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{a.keterangan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PENGUMUMAN MANAGEMENT */}
      {activeTab === 'pengumuman' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Penerbitan Pengumuman Sekolah
              </h2>
              <p className="text-xs text-slate-500">
                Publikasikan agenda dan informasi penting untuk warga sekolah
              </p>
            </div>
            <button
              onClick={() => setShowAddPengumuman(!showAddPengumuman)}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddPengumuman ? 'Tutup Formulir' : 'Buat Pengumuman Baru'}</span>
            </button>
          </div>

          {showAddPengumuman && (
            <form onSubmit={handleCreatePengumuman} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Formulir Pengumuman Baru</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Judul Pengumuman
                  </label>
                  <input
                    type="text"
                    required
                    value={judulPengumuman}
                    onChange={(e) => setJudulPengumuman(e.target.value)}
                    placeholder="Contoh: Jadwal Libur Awal Ramadhan..."
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Kategori Pengumuman
                  </label>
                  <select
                    value={kategoriPengumuman}
                    onChange={(e) => setKategoriPengumuman(e.target.value as any)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="Umum">Umum</option>
                    <option value="Penting">Penting</option>
                    <option value="Akademik">Akademik</option>
                    <option value="PPDB">PPDB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Isi Pemberitahuan
                </label>
                <textarea
                  rows={3}
                  required
                  value={isiPengumuman}
                  onChange={(e) => setIsiPengumuman(e.target.value)}
                  placeholder="Tuliskan detail pengumuman secara jelas..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Terbitkan Pengumuman</span>
              </button>
            </form>
          )}

          <div className="space-y-3">
            {pengumumanList.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {p.kategori}
                    </span>
                    <span className="text-xs text-slate-400">{p.tanggal} • Oleh {p.penulis}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.judul}</h4>
                  <p className="text-xs text-slate-600 mt-1">{p.isi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
