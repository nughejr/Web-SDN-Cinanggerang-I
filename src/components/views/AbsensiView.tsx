import React, { useState } from 'react';
import {
  ClipboardCheck,
  Send,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet,
  Clock,
  User,
  Users,
  Filter,
} from 'lucide-react';
import { AbsensiRecord } from '../../types';
import { validateAbsensiInput } from '../../utils/gasHelpers';

interface AbsensiViewProps {
  absensiList: AbsensiRecord[];
  onSubmitAbsen: (data: Omit<AbsensiRecord, 'id' | 'tanggal' | 'waktu'>) => Promise<string>;
  onOpenGasHub: () => void;
}

export const AbsensiView: React.FC<AbsensiViewProps> = ({
  absensiList,
  onSubmitAbsen,
  onOpenGasHub,
}) => {
  const [formData, setFormData] = useState({
    tipe: 'Siswa' as 'Siswa' | 'Guru',
    nama: '',
    nomorIdentitas: '',
    kelasOrJabatan: 'Kelas 1',
    status: 'Hadir' as 'Hadir' | 'Sakit' | 'Izin' | 'Alpa',
    keterangan: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [filterTipe, setFilterTipe] = useState<'Semua' | 'Siswa' | 'Guru'>('Semua');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAbsensiInput(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSuccessMsg(null);

    try {
      await onSubmitAbsen(formData);
      setSuccessMsg(`Presensi ${formData.tipe} atas nama "${formData.nama}" berhasil disimpan ke Google Sheets!`);
      setFormData({
        tipe: formData.tipe,
        nama: '',
        nomorIdentitas: '',
        kelasOrJabatan: formData.tipe === 'Siswa' ? 'Kelas 1' : 'Guru Kelas 1',
        status: 'Hadir',
        keterangan: '',
      });
    } catch (err: any) {
      setErrors({ form: err.message || 'Gagal menyimpan absensi.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredRecords = absensiList.filter((item) => {
    if (filterTipe === 'Semua') return true;
    return item.tipe === filterTipe;
  });

  const hadirCount = absensiList.filter((a) => a.status === 'Hadir').length;
  const sakitCount = absensiList.filter((a) => a.status === 'Sakit').length;
  const izinCount = absensiList.filter((a) => a.status === 'Izin').length;
  const alpaCount = absensiList.filter((a) => a.status === 'Alpa').length;

  return (
    <div className="space-y-12 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Database Google Sheets: Sheet "Absensi"</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Absen Online Harian SDN Cinanggerang I
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Presensi digital terintegrasi untuk pendidik, tenaga kependidikan, serta peserta didik. Waktu dan tanggal otomatis dicatat oleh server Google Apps Script.
            </p>
          </div>

          <button
            onClick={onOpenGasHub}
            className="px-4 py-2 bg-yellow-400 text-slate-950 rounded-xl text-xs font-bold hover:bg-yellow-300 transition shadow"
          >
            Pelajari Format Sheet Absensi
          </button>
        </div>
      </div>

      {/* Recap Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">Hadir</div>
          <div className="text-2xl font-black text-emerald-600">{hadirCount} Orang</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">Sakit</div>
          <div className="text-2xl font-black text-amber-600">{sakitCount} Orang</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">Izin</div>
          <div className="text-2xl font-black text-blue-600">{izinCount} Orang</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-bold uppercase">Alpa</div>
          <div className="text-2xl font-black text-rose-600">{alpaCount} Orang</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulir Presensi */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Formulir Presensi Online</h2>
              <p className="text-xs text-slate-500">Isi data kehadiran Anda hari ini</p>
            </div>
          </div>

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {errors.form && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Tipe: Siswa atau Guru */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Kategori Presensi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipe: 'Siswa', kelasOrJabatan: 'Kelas 1' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    formData.tipe === 'Siswa'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Siswa
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, tipe: 'Guru', kelasOrJabatan: 'Guru Kelas 1' })}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    formData.tipe === 'Guru'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Guru / Tendik
                </button>
              </div>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder={formData.tipe === 'Siswa' ? 'Nama siswa...' : 'Nama lengkap & gelar...'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.nama && <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.nama}</p>}
            </div>

            {/* Nomor Identitas */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {formData.tipe === 'Siswa' ? 'NISN Siswa' : 'NIP / NUPTK / No. Pegawai'} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nomorIdentitas}
                onChange={(e) => setFormData({ ...formData, nomorIdentitas: e.target.value })}
                placeholder={formData.tipe === 'Siswa' ? 'Contoh: 0142839101' : 'Contoh: 19820315...'}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {errors.nomorIdentitas && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.nomorIdentitas}</p>
              )}
            </div>

            {/* Kelas atau Jabatan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {formData.tipe === 'Siswa' ? 'Pilih Rombel / Kelas' : 'Jabatan Pegawai'}
              </label>
              {formData.tipe === 'Siswa' ? (
                <select
                  value={formData.kelasOrJabatan}
                  onChange={(e) => setFormData({ ...formData, kelasOrJabatan: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Kelas 1">Kelas 1</option>
                  <option value="Kelas 2">Kelas 2</option>
                  <option value="Kelas 3">Kelas 3</option>
                  <option value="Kelas 4">Kelas 4</option>
                  <option value="Kelas 5">Kelas 5</option>
                  <option value="Kelas 6">Kelas 6</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.kelasOrJabatan}
                  onChange={(e) => setFormData({ ...formData, kelasOrJabatan: e.target.value })}
                  placeholder="Contoh: Guru Kelas 1, Guru PAI"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            {/* Status Kehadiran */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Status Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Hadir', 'Sakit', 'Izin', 'Alpa'] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setFormData({ ...formData, status: st })}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                      formData.status === st
                        ? st === 'Hadir'
                          ? 'bg-emerald-600 text-white'
                          : st === 'Sakit'
                          ? 'bg-amber-600 text-white'
                          : st === 'Izin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Keterangan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Keterangan Tambahan
              </label>
              <input
                type="text"
                value={formData.keterangan}
                onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                placeholder="Contoh: Tepat waktu / Sakit batuk flu"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Menyimpan Presensi...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Presensi Sekarang</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tabel Rekap Harian */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Riwayat Presensi Masuk</h3>
              <p className="text-xs text-slate-500">Data live dari Google Sheets "Absensi"</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {(['Semua', 'Siswa', 'Guru'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterTipe(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    filterTipe === t
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Waktu</th>
                  <th className="py-3 px-4">Tipe</th>
                  <th className="py-3 px-4">Nama Lengkap</th>
                  <th className="py-3 px-4">Rombel/Jabatan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">{item.waktu}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.tipe === 'Guru' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {item.tipe}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{item.nama}</td>
                    <td className="py-3 px-4 text-slate-600">{item.kelasOrJabatan}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'Hadir'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'Sakit'
                          ? 'bg-amber-100 text-amber-800'
                          : item.status === 'Izin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs">{item.keterangan || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
