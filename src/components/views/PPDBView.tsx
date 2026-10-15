import React, { useState } from 'react';
import {
  UserPlus,
  Send,
  CheckCircle,
  AlertCircle,
  Search,
  FileSpreadsheet,
  Clock,
  Sparkles,
  Phone,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { PendaftaranPPDB } from '../../types';
import { validatePPDBInput } from '../../utils/gasHelpers';

interface PPDBViewProps {
  ppdbList: PendaftaranPPDB[];
  onSubmitPPDB: (data: Omit<PendaftaranPPDB, 'id' | 'tanggalDaftar' | 'status'>) => Promise<string>;
  onOpenGasHub: () => void;
}

export const PPDBView: React.FC<PPDBViewProps> = ({
  ppdbList,
  onSubmitPPDB,
  onOpenGasHub,
}) => {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    nik: '',
    nisn: '',
    jenisKelamin: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    tempatLahir: '',
    tanggalLahir: '',
    namaOrtu: '',
    noHpOrtu: '',
    alamat: '',
    asalTK: '',
    jalur: 'Zonasi' as 'Zonasi' | 'Afirmasi' | 'Perpindahan Orang Tua' | 'Prestasi',
    catatan: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; message: string } | null>(null);

  // Status Check feature
  const [searchNik, setSearchNik] = useState('');
  const [searchResult, setSearchResult] = useState<PendaftaranPPDB | null | 'NOT_FOUND'>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validatePPDBInput(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSuccessInfo(null);

    try {
      const generatedId = await onSubmitPPDB(formData);
      setSuccessInfo({
        id: generatedId,
        message: 'Formulir berhasil dikirim dan tersimpan di Google Sheets "PPDB"!',
      });
      setFormData({
        namaLengkap: '',
        nik: '',
        nisn: '',
        jenisKelamin: 'Laki-laki',
        tempatLahir: '',
        tanggalLahir: '',
        namaOrtu: '',
        noHpOrtu: '',
        alamat: '',
        asalTK: '',
        jalur: 'Zonasi',
        catatan: '',
      });
    } catch (err: any) {
      setErrors({ form: err.message || 'Gagal mengirim data ke Google Sheets.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckStatus = () => {
    if (!searchNik.trim()) return;
    const clean = searchNik.trim();
    const found = ppdbList.find(
      (item) => item.nik === clean || item.nisn === clean || item.id === clean
    );
    setSearchResult(found || 'NOT_FOUND');
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-700/60 text-yellow-300 font-bold text-xs uppercase mb-2">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Database Google Sheets: Sheet "PPDB"</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              Penerimaan Peserta Didik Baru (PPDB) Online
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-2 max-w-2xl">
              Daftarkan putra-putri Anda secara online di SDN Cinanggerang I Pamulihan-Sumedang. Seluruh data yang diisi otomatis tercatat langsung ke Google Sheets panitia.
            </p>
          </div>

          <button
            onClick={onOpenGasHub}
            className="px-4 py-2.5 bg-yellow-400 text-slate-950 rounded-xl text-xs font-bold hover:bg-yellow-300 transition shadow"
          >
            Pelajari Integrasi Apps Script
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulir Pendaftaran */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Formulir Biodata Calon Siswa Baru</h2>
              <p className="text-xs text-slate-500">Lengkapi data dengan benar sesuai Kartu Keluarga (KK)</p>
            </div>
          </div>

          {/* Alert Success */}
          {successInfo && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-emerald-950">Pendaftaran Berhasil!</div>
                <p className="mt-0.5">{successInfo.message}</p>
                <div className="mt-2 font-mono font-bold text-xs bg-white px-2.5 py-1 rounded-lg inline-block border border-emerald-200">
                  ID Registrasi: {successInfo.id}
                </div>
              </div>
            </div>
          )}

          {errors.form && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 flex items-center gap-3 text-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nama Lengkap Calon Siswa <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.namaLengkap}
                onChange={(e) => setFormData({ ...formData, namaLengkap: e.target.value })}
                placeholder="Contoh: Muhammad Rizki Pratama"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                  errors.namaLengkap ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                }`}
              />
              {errors.namaLengkap && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.namaLengkap}</p>
              )}
            </div>

            {/* NIK & NISN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  NIK Calon Siswa (16 Digit) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={formData.nik}
                  onChange={(e) => setFormData({ ...formData, nik: e.target.value.replace(/\D/g, '') })}
                  placeholder="321105..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.nik ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.nik && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.nik}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  NISN (10 Digit, opsional)
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={formData.nisn}
                  onChange={(e) => setFormData({ ...formData, nisn: e.target.value.replace(/\D/g, '') })}
                  placeholder="01928374..."
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.nisn ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.nisn && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.nisn}</p>
                )}
              </div>
            </div>

            {/* Jenis Kelamin & Jalur */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jenis Kelamin <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.jenisKelamin}
                  onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Jalur Pendaftaran
                </label>
                <select
                  value={formData.jalur}
                  onChange={(e) => setFormData({ ...formData, jalur: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Zonasi">Zonasi (Domisili Desa Cinanggerang & Sekitarnya)</option>
                  <option value="Afirmasi">Afirmasi (KIP / PKH / Prasejahtera)</option>
                  <option value="Perpindahan Orang Tua">Perpindahan Tugas Orang Tua</option>
                  <option value="Prestasi">Prestasi (Bakat / Olahraga / Seni)</option>
                </select>
              </div>
            </div>

            {/* Tempat & Tanggal Lahir */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tempat Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.tempatLahir}
                  onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                  placeholder="Contoh: Sumedang"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.tempatLahir ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.tempatLahir && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.tempatLahir}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Tanggal Lahir <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.tanggalLahir ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.tanggalLahir && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.tanggalLahir}</p>
                )}
              </div>
            </div>

            {/* Nama Ortu & No HP Ortu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Nama Orang Tua / Wali <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.namaOrtu}
                  onChange={(e) => setFormData({ ...formData, namaOrtu: e.target.value })}
                  placeholder="Nama Ayah / Ibu"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.namaOrtu ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.namaOrtu && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.namaOrtu}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  No. WhatsApp / HP Orang Tua <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.noHpOrtu}
                  onChange={(e) => setFormData({ ...formData, noHpOrtu: e.target.value })}
                  placeholder="082118449525"
                  className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                    errors.noHpOrtu ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                  }`}
                />
                {errors.noHpOrtu && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.noHpOrtu}</p>
                )}
              </div>
            </div>

            {/* Asal Sekolah TK/PAUD */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Asal Sekolah (TK / RA / PAUD)
              </label>
              <input
                type="text"
                value={formData.asalTK}
                onChange={(e) => setFormData({ ...formData, asalTK: e.target.value })}
                placeholder="Contoh: RA Al-Falah Pamulihan"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Alamat Lengkap */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Alamat Tempat Tinggal Lengkap <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                placeholder="Dusun Cinanggerang RT ... RW ..., Desa Cinanggerang, Pamulihan"
                className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 ${
                  errors.alamat ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-emerald-500'
                }`}
              />
              {errors.alamat && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">{errors.alamat}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  <span>Mencatat ke Google Sheets...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Kirim Formulir Pendaftaran PPDB</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Sidebar: Cek Status Pendaftaran & Syarat */}
        <div className="space-y-6">
          {/* Cek Status Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Cek Status Pendaftaran</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Masukkan NIK, NISN, atau ID Registrasi Anda:
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="NIK / NISN / ID..."
                value={searchNik}
                onChange={(e) => setSearchNik(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleCheckStatus}
                className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Cari
              </button>
            </div>

            {searchResult === 'NOT_FOUND' && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                Data tidak ditemukan. Pastikan nomor identitas yang Anda masukkan benar.
              </div>
            )}

            {searchResult && searchResult !== 'NOT_FOUND' && (
              <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="font-bold text-slate-900">{searchResult.namaLengkap}</div>
                <div className="text-slate-500">ID: {searchResult.id}</div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">Status:</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-xs ${
                    searchResult.status === 'Diterima'
                      ? 'bg-emerald-100 text-emerald-800'
                      : searchResult.status === 'Ditolak'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {searchResult.status}
                  </span>
                </div>
                {searchResult.catatan && (
                  <p className="text-[11px] text-slate-600 italic">"{searchResult.catatan}"</p>
                )}
              </div>
            )}
          </div>

          {/* Persyaratan Pendaftaran */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Persyaratan Berkas</span>
            </h4>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>Berusia 7 tahun (atau minimal 6 tahun pada 1 Juli tahun ajaran baru).</li>
              <li>Fotokopi Akta Kelahiran calon siswa (1 lembar).</li>
              <li>Fotokopi Kartu Keluarga (KK) orang tua / wali.</li>
              <li>Fotokopi KTP kedua orang tua.</li>
              <li>Ijazah / Surat Keterangan Lulus TK / PAUD (jika ada).</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabel Data Pendaftar Masuk */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Rekap Data Pendaftar Masuk</h3>
            <p className="text-xs text-slate-500">
              Data sinkron dari Google Sheets "PPDB" secara berkala
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Total {ppdbList.length} Pendaftar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">ID PPDB</th>
                <th className="py-3 px-4">Tanggal Masuk</th>
                <th className="py-3 px-4">Nama Lengkap</th>
                <th className="py-3 px-4">Jalur</th>
                <th className="py-3 px-4">Nama Ortu</th>
                <th className="py-3 px-4">No. HP</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ppdbList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{item.id}</td>
                  <td className="py-3 px-4 text-slate-500">{item.tanggalDaftar}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{item.namaLengkap}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs">
                      {item.jalur}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{item.namaOrtu}</td>
                  <td className="py-3 px-4 text-slate-700">{item.noHpOrtu}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.status === 'Diterima'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'Ditolak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
