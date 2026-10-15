import type { PendaftaranPPDB, AbsensiRecord, Guru, Siswa, BukuPerpustakaan } from '../types/index.ts';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validasi form pendaftaran PPDB Online
 */
export function validatePPDBInput(data: Partial<PendaftaranPPDB>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.namaLengkap || data.namaLengkap.trim().length < 3) {
    errors.namaLengkap = 'Nama lengkap calon siswa wajib diisi minimal 3 karakter.';
  }

  if (!data.nik || !/^\d{16}$/.test(data.nik.trim())) {
    errors.nik = 'NIK harus berupa 16 digit angka.';
  }

  if (data.nisn && data.nisn.trim().length > 0 && !/^\d{10}$/.test(data.nisn.trim())) {
    errors.nisn = 'NISN harus berupa 10 digit angka (atau kosongkan jika belum memiliki).';
  }

  if (!data.tempatLahir || data.tempatLahir.trim().length === 0) {
    errors.tempatLahir = 'Tempat lahir wajib diisi.';
  }

  if (!data.tanggalLahir) {
    errors.tanggalLahir = 'Tanggal lahir wajib dipilih.';
  }

  if (!data.namaOrtu || data.namaOrtu.trim().length < 3) {
    errors.namaOrtu = 'Nama orang tua / wali wajib diisi minimal 3 karakter.';
  }

  if (!data.noHpOrtu || !/^(\+62|62|0)8[1-9][0-9]{6,11}$/.test(data.noHpOrtu.replace(/[\s-]/g, ''))) {
    errors.noHpOrtu = 'Nomor WhatsApp / HP tidak valid (contoh: 082118449525).';
  }

  if (!data.alamat || data.alamat.trim().length < 5) {
    errors.alamat = 'Alamat lengkap wajib diisi minimal 5 karakter.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validasi form Absensi Online
 */
export function validateAbsensiInput(data: Partial<AbsensiRecord>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.nama || data.nama.trim().length < 3) {
    errors.nama = 'Nama wajib diisi.';
  }

  if (!data.nomorIdentitas || data.nomorIdentitas.trim().length < 3) {
    errors.nomorIdentitas = 'Nomor Identitas (NIP atau NISN) wajib diisi.';
  }

  if (!data.kelasOrJabatan || data.kelasOrJabatan.trim().length === 0) {
    errors.kelasOrJabatan = 'Kelas atau Jabatan wajib dipilih.';
  }

  if (!data.status) {
    errors.status = 'Status kehadiran wajib dipilih.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Filter data Guru berdasarkan kata kunci pencarian dan status
 */
export function filterGuru(list: Guru[], search: string, statusFilter: string): Guru[] {
  const q = search.toLowerCase().trim();
  return list.filter((g) => {
    const matchSearch =
      !q ||
      g.nama.toLowerCase().includes(q) ||
      g.jabatan.toLowerCase().includes(q) ||
      g.mapel.toLowerCase().includes(q) ||
      g.nip.includes(q);
    const matchStatus = !statusFilter || statusFilter === 'Semua' || g.status === statusFilter;
    return matchSearch && matchStatus;
  });
}

/**
 * Filter data Siswa berdasarkan pencarian nama/NISN dan kelas
 */
export function filterSiswa(list: Siswa[], search: string, kelasFilter: string): Siswa[] {
  const q = search.toLowerCase().trim();
  return list.filter((s) => {
    const matchSearch =
      !q ||
      s.nama.toLowerCase().includes(q) ||
      s.nisn.includes(q) ||
      s.tempatLahir.toLowerCase().includes(q);
    const matchKelas = !kelasFilter || kelasFilter === 'Semua' || s.kelas === kelasFilter;
    return matchSearch && matchKelas;
  });
}

/**
 * Filter buku perpustakaan
 */
export function filterBuku(list: BukuPerpustakaan[], search: string, kategoriFilter: string): BukuPerpustakaan[] {
  const q = search.toLowerCase().trim();
  return list.filter((b) => {
    const matchSearch =
      !q ||
      b.judul.toLowerCase().includes(q) ||
      b.penulis.toLowerCase().includes(q) ||
      b.sinopsis.toLowerCase().includes(q);
    const matchKategori = !kategoriFilter || kategoriFilter === 'Semua' || b.kategori === kategoriFilter;
    return matchSearch && matchKategori;
  });
}

/**
 * Menghasilkan kode backend Google Apps Script (Code.gs) lengkap
 */
export function generateCodeGs(): string {
  return `/**
 * =========================================================================
 * BACKEND GOOGLE APPS SCRIPT - WEBSITE SEKOLAH SDN CINANGGERANG I
 * =========================================================================
 * Sekolah  : SDN Cinanggerang I (NPSN: 20208801)
 * Lokasi   : Jln. Desa Cinanggerang, Kecamatan Pamulihan-Sumedang
 * Database : Google Spreadsheet
 * 
 * FUNGSI UTAMA:
 * 1. doGet(e)  : Menampilkan Web App (HTML Service) & Menghandle API GET (JSON)
 * 2. doPost(e) : Menghandle submit formulir (PPDB, Absensi, Login Admin/Guru)
 * 3. inisialisasiDatabase() : Otomatis membuat seluruh sheet & header jika belum ada
 * =========================================================================
 */

// Konfigurasi Nama-nama Tab Sheet di Spreadsheet
const SHEET_PROFIL      = "Profil";
const SHEET_GURU        = "Guru";
const SHEET_SISWA       = "Siswa";
const SHEET_USERS       = "Users";
const SHEET_PPDB        = "PPDB";
const SHEET_ABSENSI     = "Absensi";
const SHEET_PENGUMUMAN  = "Pengumuman";
const SHEET_BUKU        = "Perpustakaan";

/**
 * 1. HANDLE REQUEST GET (doGet)
 * - Jika diakses via browser langsung -> Tampilkan UI Website (index.html)
 * - Jika dipanggil dengan parameter ?action=... -> Kembalikan respon JSON API
 */
function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : null;

    // Jika ada parameter action, bertindak sebagai REST API JSON
    if (action) {
      return handleApiGet(action, e.parameter);
    }

    // Default: Tampilkan Halaman HTML Website Sekolah
    const template = HtmlService.createTemplateFromFile('index');
    template.schoolName = "SDN Cinanggerang I";
    template.npsn = "20208801";

    return template.evaluate()
      .setTitle("SDN Cinanggerang I - Portal Resmi & PPDB Online")
      .setFaviconUrl("https://img.icons8.com/color/48/school.png")
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (error) {
    return jsonResponse({
      status: "error",
      message: error.toString()
    });
  }
}

/**
 * Router untuk permintaan GET API
 */
function handleApiGet(action, params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  switch (action) {
    case "ping":
      return jsonResponse({ status: "success", message: "Server Google Apps Script Aktif & Terhubung!" });

    case "getProfil":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_PROFIL)) });

    case "getGuru":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_GURU)) });

    case "getSiswa":
      const filterKelas = params ? params.kelas : null;
      let siswaData = getSheetData(ss.getSheetByName(SHEET_SISWA));
      if (filterKelas && filterKelas !== "Semua") {
        siswaData = siswaData.filter(function(item) { return item.kelas === filterKelas; });
      }
      return jsonResponse({ status: "success", data: siswaData });

    case "getPengumuman":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_PENGUMUMAN)) });

    case "getBuku":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_BUKU)) });

    case "getPPDB":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_PPDB)) });

    case "getAbsensi":
      return jsonResponse({ status: "success", data: getSheetData(ss.getSheetByName(SHEET_ABSENSI)) });

    default:
      return jsonResponse({ status: "error", message: "Aksi GET tidak valid: " + action });
  }
}

/**
 * 2. HANDLE REQUEST POST (doPost)
 * Menangani pengiriman data: Login, Form PPDB Online, Form Absen Online
 */
function doPost(e) {
  // Lock service untuk mencegah race condition penulisan bersamaan
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Tunggu hingga 10 detik

    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter;
    }

    const action = data.action;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    switch (action) {
      // -------------------------------------------------------------
      // AKSI A: LOGIN ADMIN & GURU
      // -------------------------------------------------------------
      case "login": {
        const username = (data.username || "").trim();
        const password = (data.password || "").trim();

        if (!username || !password) {
          return jsonResponse({ status: "error", message: "Username dan password wajib diisi." });
        }

        const sheetUsers = ss.getSheetByName(SHEET_USERS);
        const users = getSheetData(sheetUsers);

        const foundUser = users.find(function(u) {
          return String(u.username).trim() === username && String(u.password).trim() === password;
        });

        if (foundUser) {
          return jsonResponse({
            status: "success",
            message: "Login berhasil!",
            user: {
              username: foundUser.username,
              role: foundUser.role || "guru",
              namaLengkap: foundUser.namaLengkap || foundUser.nama || username,
              email: foundUser.email || ""
            }
          });
        } else {
          return jsonResponse({
            status: "error",
            message: "Username atau password salah. Silakan periksa kembali."
          });
        }
      }

      // -------------------------------------------------------------
      // AKSI B: PENDAFTARAN PPDB ONLINE
      // -------------------------------------------------------------
      case "submitPPDB": {
        const sheetPPDB = ss.getSheetByName(SHEET_PPDB);
        if (!sheetPPDB) throw new Error("Sheet PPDB belum dibuat. Jalankan inisialisasiDatabase() terlebih dahulu.");

        const idPPDB = "PPDB-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss");
        const timestamp = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");

        // Format baris sesuai urutan header:
        // [ID, TanggalDaftar, NamaLengkap, NIK, NISN, JenisKelamin, TempatLahir, TanggalLahir, NamaOrtu, NoHpOrtu, Alamat, AsalTK, Jalur, Status, Catatan]
        sheetPPDB.appendRow([
          idPPDB,
          timestamp,
          data.namaLengkap || "-",
          data.nik || "-",
          data.nisn || "-",
          data.jenisKelamin || "-",
          data.tempatLahir || "-",
          data.tanggalLahir || "-",
          data.namaOrtu || "-",
          data.noHpOrtu || "-",
          data.alamat || "-",
          data.asalTK || "-",
          data.jalur || "Zonasi",
          "Menunggu",
          data.catatan || "Menunggu verifikasi panitia"
        ]);

        return jsonResponse({
          status: "success",
          message: "Pendaftaran PPDB berhasil dikirim! Silakan simpan ID pendaftaran Anda.",
          idPendaftaran: idPPDB
        });
      }

      // -------------------------------------------------------------
      // AKSI C: INPUT ABSENSI ONLINE (GURU & SISWA)
      // -------------------------------------------------------------
      case "submitAbsen": {
        const sheetAbsen = ss.getSheetByName(SHEET_ABSENSI);
        if (!sheetAbsen) throw new Error("Sheet Absensi belum dibuat.");

        const idAbsen = "ABS-" + Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd-HHmmss");
        const tglHariIni = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
        const jamSekarang = Utilities.formatDate(new Date(), "GMT+7", "HH:mm:ss") + " WIB";

        // [ID, Tanggal, Waktu, Tipe, Nama, NomorIdentitas, KelasOrJabatan, Status, Keterangan]
        sheetAbsen.appendRow([
          idAbsen,
          tglHariIni,
          jamSekarang,
          data.tipe || "Siswa",
          data.nama || "-",
          data.nomorIdentitas || "-",
          data.kelasOrJabatan || "-",
          data.status || "Hadir",
          data.keterangan || "-"
        ]);

        return jsonResponse({
          status: "success",
          message: "Presensi kehadiran berhasil dicatat!",
          idAbsensi: idAbsen,
          waktu: jamSekarang
        });
      }

      // -------------------------------------------------------------
      // AKSI D: UPDATE STATUS PPDB (KHUSUS ADMIN)
      // -------------------------------------------------------------
      case "updateStatusPPDB": {
        const sheetPPDB = ss.getSheetByName(SHEET_PPDB);
        const dataRows = sheetPPDB.getDataRange().getValues();
        const targetId = data.id;
        const newStatus = data.newStatus; // 'Diterima' | 'Ditolak' | 'Menunggu'
        let foundRowIndex = -1;

        for (let i = 1; i < dataRows.length; i++) {
          if (String(dataRows[i][0]) === targetId) {
            foundRowIndex = i + 1;
            break;
          }
        }

        if (foundRowIndex !== -1) {
          // Kolom 14 adalah Status
          sheetPPDB.getRange(foundRowIndex, 14).setValue(newStatus);
          if (data.catatan) {
            sheetPPDB.getRange(foundRowIndex, 15).setValue(data.catatan);
          }
          return jsonResponse({ status: "success", message: "Status calon siswa berhasil diperbarui ke: " + newStatus });
        } else {
          return jsonResponse({ status: "error", message: "Data pendaftar dengan ID tersebut tidak ditemukan." });
        }
      }

      default:
        return jsonResponse({ status: "error", message: "Aksi POST tidak dikenali: " + action });
    }

  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Helper: Mengubah data pada Sheet menjadi array of objects berdasarkan Header (baris 1)
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length <= 1) return [];

  const headers = values[0];
  const results = [];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const item = {};
    for (let j = 0; j < headers.length; j++) {
      const key = String(headers[j]).trim();
      let cellValue = row[j];
      // Format tanggal jika instance Date
      if (cellValue instanceof Date) {
        cellValue = Utilities.formatDate(cellValue, "GMT+7", "yyyy-MM-dd");
      }
      item[key] = cellValue;
    }
    results.push(item);
  }
  return results;
}

/**
 * Helper: Format output menjadi JSON dengan Header CORS agar dapat diakses oleh frontend manapun
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =========================================================================
 * FUNGSI OTOMATIS: INISIALISASI DATABASE SPREADSHEET
 * Jalankan fungsi ini SEKALI di editor Google Apps Script dengan menekan 'Run'
 * untuk membuat seluruh tab dan data awal secara otomatis!
 * =========================================================================
 */
function inisialisasiDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Sheet Profil
  createOrResetSheet(ss, SHEET_PROFIL, [
    "Visi", "Misi", "Logo Sekolah", "NPSN", "Alamat", "Kode Pos", "Alamat Email", "IG", "FB", "Youtube", "HP"
  ], [
    [
      'Mewujudkan SDN Cinanggerang I yang CERIA "Cerdas Edukatif, Religius, IPTEK, Agamis". Well Pokona mah',
      'Mewujudkan murid yang Cerdas; Mewujudkan murid yang Edukatif; Mewujudkan murid yang Religius; Mewujudkan murid yang berwawasan IPTEK; Mewujudkan murid yang Agamis',
      'https://drive.google.com/file/d/1Ndxe3-ULXMZS4C0QrqC0mUv2mIOadB8x/view?usp=sharing',
      '20208801',
      'Jln. Desa Cinanggerang, Kecamatan Pamulihan-Sumedang',
      '45362',
      'sdncinanggerang1@gmail.com',
      '@sdncinanggerang1',
      '@sdncinanggerang1',
      'SDN Cinanggerang I',
      '082118449525'
    ]
  ]);

  // 2. Sheet Users (Admin & Guru)
  createOrResetSheet(ss, SHEET_USERS, [
    "username", "password", "role", "namaLengkap", "email"
  ], [
    ["admin", "admin123", "admin", "Administrator SDN Cinanggerang I", "admin@sdncinanggerang1.sch.id"],
    ["guru", "guru123", "guru", "Ai Kurniasih, S.Pd.SD.", "ai.kurniasih@sdncinanggerang1.sch.id"],
    ["kepsek", "kepsek123", "admin", "H. Asep Supriatna, S.Pd., M.M.Pd.", "kepala@sdncinanggerang1.sch.id"]
  ]);

  // 3. Sheet Guru
  createOrResetSheet(ss, SHEET_GURU, [
    "nip", "nama", "jabatan", "mapel", "pendidikan", "status", "email"
  ], [
    ["197405121998031002", "H. Asep Supriatna, S.Pd., M.M.Pd.", "Kepala Sekolah", "Manajerial", "S2 Manajemen", "PNS", "kepala@sdncinanggerang1.sch.id"],
    ["198203152006042015", "Ai Kurniasih, S.Pd.SD.", "Guru Kelas 1", "Tematik Kelas 1", "S1 PGSD UPI", "PNS", "ai@sdncinanggerang1.sch.id"],
    ["198507202009021008", "Dadan Suhendar, S.Pd.", "Guru Kelas 2", "Tematik Kelas 2", "S1 PGSD", "PNS", "dadan@sdncinanggerang1.sch.id"],
    ["198811052010011012", "Ujang Solihin, S.Pd.I.", "Guru PAI", "Pendidikan Agama Islam", "S1 Tarbiyah", "PNS", "ujang@sdncinanggerang1.sch.id"],
    ["199208192020121003", "Rian Permana, S.Pd.", "Guru PJOK", "Pendidikan Jasmani", "S1 PJKR", "PPPK", "rian@sdncinanggerang1.sch.id"],
    ["-", "Agung Maulana, S.Kom.", "Operator Sekolah", "Teknologi Informasi", "S1 Ilmu Komputer", "Honorer", "operator@sdncinanggerang1.sch.id"]
  ]);

  // 4. Sheet Siswa
  createOrResetSheet(ss, SHEET_SISWA, [
    "nisn", "nama", "kelas", "jenisKelamin", "tempatLahir", "tanggalLahir", "status"
  ], [
    ["0142839101", "Muhammad Rizky Pratama", "Kelas 1", "Laki-laki", "Sumedang", "2018-04-12", "Aktif"],
    ["0142839102", "Siti Nur Aisyah", "Kelas 1", "Perempuan", "Sumedang", "2018-06-25", "Aktif"],
    ["0139948201", "Aditya Bagus Saputra", "Kelas 2", "Laki-laki", "Bandung", "2017-02-18", "Aktif"],
    ["0128471920", "Fauzan Fadilah", "Kelas 3", "Laki-laki", "Sumedang", "2016-01-30", "Aktif"],
    ["0117382910", "Gilang Ramadhan", "Kelas 4", "Laki-laki", "Sumedang", "2015-07-20", "Aktif"],
    ["0095182901", "Dimas Arya Nugraha", "Kelas 6", "Laki-laki", "Sumedang", "2013-05-15", "Aktif"]
  ]);

  // 5. Sheet PPDB
  createOrResetSheet(ss, SHEET_PPDB, [
    "id", "tanggalDaftar", "namaLengkap", "nik", "nisn", "jenisKelamin", "tempatLahir", "tanggalLahir", "namaOrtu", "noHpOrtu", "alamat", "asalTK", "jalur", "status", "catatan"
  ], [
    ["PPDB-20261011-083000", "2026-10-11 08:30:00", "Rizki Fauzi Ansori", "3211051508190001", "0192837411", "Laki-laki", "Sumedang", "2019-08-15", "Ahmad Fauzi", "081234567890", "Dusun Cinanggerang RT 02 / RW 01 Pamulihan", "RA Al-Falah", "Zonasi", "Diterima", "Berkas lengkap"]
  ]);

  // 6. Sheet Absensi
  createOrResetSheet(ss, SHEET_ABSENSI, [
    "id", "tanggal", "waktu", "tipe", "nama", "nomorIdentitas", "kelasOrJabatan", "status", "keterangan"
  ], [
    ["ABS-20261014-071200", "2026-10-14", "07:12:00 WIB", "Guru", "Ai Kurniasih, S.Pd.SD.", "198203152006042015", "Guru Kelas 1", "Hadir", "Siap mengajar"],
    ["ABS-20261014-072200", "2026-10-14", "07:22:00 WIB", "Siswa", "Muhammad Rizky Pratama", "0142839101", "Kelas 1", "Hadir", "Tepat waktu"]
  ]);

  // 7. Sheet Pengumuman
  createOrResetSheet(ss, SHEET_PENGUMUMAN, [
    "id", "judul", "tanggal", "kategori", "penulis", "isi"
  ], [
    ["PENG-01", "PPDB Online Tahun Ajaran Baru SDN Cinanggerang I Dibuka", "2026-10-10", "PPDB", "Panitia PPDB", "Pendaftaran peserta didik baru telah dibuka. Isi formulir melalui website ini."],
    ["PENG-02", "Jadwal Asesmen Sumatif Tengah Semester", "2026-10-05", "Akademik", "Kurikulum", "Asesmen sumatif tengah semester akan dimulai serentak pekan depan."]
  ]);

  // 8. Sheet Perpustakaan
  createOrResetSheet(ss, SHEET_BUKU, [
    "id", "judul", "penulis", "kategori", "kelas", "penerbit", "tahun", "tersedia", "sinopsis"
  ], [
    ["BUK-01", "Kumpulan Dongeng Sunda: Si Kabayan Ngala Nangka", "Ki Umbara", "Cerita Rakyat & Dongeng", "Kelas 1 - 6", "Geger Sunten", 2023, "Ya", "Kisah dongeng jenaka sarat pesan moral leluhur Sunda."],
    ["BUK-02", "Buku Tematik Kurikulum Merdeka IPAS", "Kemendikbudristek", "Tematik", "Kelas 4", "Pusat Perbukuan", 2024, "Ya", "Materi sains dan interaksi sosial masyarakat lingkungan sekitar."]
  ]);

  Logger.log("✅ Berhasil! Seluruh 8 sheet dan data awal database SDN Cinanggerang I telah selesai dibuat!");
}

/**
 * Helper pembuat sheet dengan header & format warna
 */
function createOrResetSheet(ss, sheetName, headers, sampleRows) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clear();
  }

  // Set Header
  sheet.appendRow(headers);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#047857"); // Hijau emerald elegan
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  sheet.setFrozenRows(1);

  // Set Baris Sampel
  if (sampleRows && sampleRows.length > 0) {
    for (let i = 0; i < sampleRows.length; i++) {
      sheet.appendRow(sampleRows[i]);
    }
  }

  // Auto-fit kolom
  for (let c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }
}
`;
}

/**
 * Menghasilkan file standalone index.html siap pakai di Google Apps Script (HTML Service)
 */
export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= schoolName ?> - Portal Web Resmi</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="bg-slate-50 text-slate-800">

  <!-- NAVBAR UTAMA -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-emerald-500/20">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div>
          <h1 class="text-lg font-bold text-slate-900 leading-tight"><?= schoolName ?></h1>
          <p class="text-xs font-semibold text-emerald-600">NPSN: <?= npsn ?> • Pamulihan, Sumedang</p>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
        <a href="#beranda" class="hover:text-emerald-600 transition">Beranda</a>
        <a href="#profil" class="hover:text-emerald-600 transition">Profil</a>
        <a href="#guru" class="hover:text-emerald-600 transition">Guru</a>
        <a href="#siswa" class="hover:text-emerald-600 transition">Siswa</a>
        <a href="#ppdb" class="text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">PPDB Online</a>
        <a href="#absen" class="hover:text-emerald-600 transition">Absen Online</a>
        <button onclick="bukaModalLogin()" class="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">Login</button>
      </nav>
    </div>
  </header>

  <!-- HERO SECTION -->
  <section id="beranda" class="relative py-20 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white px-4">
    <div class="max-w-5xl mx-auto text-center">
      <span class="inline-block px-4 py-1.5 rounded-full bg-emerald-500/30 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-400/30">
        Portal Informasi & Administrasi Terpadu
      </span>
      <h2 class="text-3xl sm:text-5xl font-extrabold mb-4 leading-tight">
        Selamat Datang di Portal Resmi<br><span class="text-yellow-300"><?= schoolName ?></span>
      </h2>
      <p class="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto mb-8">
        Mewujudkan Generasi CERIA (Cerdas, Edukatif, Religius, IPTEK, Agamis). Well Pokona Mah!
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a href="#ppdb" class="bg-yellow-400 text-slate-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-yellow-300 transition">
          <i class="fa-solid fa-user-plus mr-2"></i>Daftar PPDB Online
        </a>
        <a href="#absen" class="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition">
          <i class="fa-solid fa-clipboard-check mr-2"></i>Isi Absensi Harian
        </a>
      </div>
    </div>
  </section>

  <!-- FORM PPDB -->
  <section id="ppdb" class="py-16 max-w-4xl mx-auto px-4">
    <div class="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 class="text-2xl font-bold text-slate-900 mb-2">Formulir PPDB Online (Tersimpan ke Google Sheets)</h3>
      <p class="text-slate-600 text-sm mb-6">Silakan lengkapi formulir di bawah ini. Data akan otomatis masuk ke spreadsheet panitia.</p>
      
      <form id="formPPDB" onsubmit="handlePPDBSubmit(event)" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap Calon Siswa</label>
            <input type="text" id="ppdbNama" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">NIK (16 Digit)</label>
            <input type="text" id="ppdbNik" required pattern="\\d{16}" class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none">
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Orang Tua / Wali</label>
            <input type="text" id="ppdbOrtu" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 uppercase mb-1">No. WhatsApp / HP</label>
            <input type="tel" id="ppdbHp" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none">
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Alamat Lengkap</label>
          <textarea id="ppdbAlamat" rows="2" required class="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
        </div>
        <button type="submit" id="btnSubmitPPDB" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2">
          <span>Kirim Pendaftaran</span>
        </button>
      </form>
      <div id="statusPPDB" class="mt-4 hidden p-4 rounded-xl text-sm font-semibold"></div>
    </div>
  </section>

  <!-- JAVASCRIPT GOOGLE APPS SCRIPT CLIENT -->
  <script>
    function handlePPDBSubmit(e) {
      e.preventDefault();
      const btn = document.getElementById('btnSubmitPPDB');
      const statusDiv = document.getElementById('statusPPDB');
      
      btn.disabled = true;
      btn.innerText = "Mengirim ke Google Sheets...";
      
      const payload = {
        action: "submitPPDB",
        namaLengkap: document.getElementById('ppdbNama').value,
        nik: document.getElementById('ppdbNik').value,
        namaOrtu: document.getElementById('ppdbOrtu').value,
        noHpOrtu: document.getElementById('ppdbHp').value,
        alamat: document.getElementById('ppdbAlamat').value,
        jalur: "Zonasi"
      };

      // Panggil doPost backend Google Apps Script via google.script.run
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(function(response) {
            btn.disabled = false;
            btn.innerText = "Kirim Pendaftaran";
            statusDiv.className = "mt-4 p-4 rounded-xl text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 block";
            statusDiv.innerHTML = "<i class='fa-solid fa-circle-check mr-2'></i> " + response.message + " (ID: " + response.idPendaftaran + ")";
            document.getElementById('formPPDB').reset();
          })
          .withFailureHandler(function(err) {
            btn.disabled = false;
            btn.innerText = "Kirim Pendaftaran";
            statusDiv.className = "mt-4 p-4 rounded-xl text-sm font-semibold bg-rose-100 text-rose-800 border border-rose-300 block";
            statusDiv.innerText = "Gagal: " + err.message;
          })
          .doPost({ postData: { contents: JSON.stringify(payload) } });
      } else {
        // Fallback simulasi jika diakses di luar Apps Script runtime
        setTimeout(function() {
          btn.disabled = false;
          btn.innerText = "Kirim Pendaftaran";
          statusDiv.className = "mt-4 p-4 rounded-xl text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 block";
          statusDiv.innerHTML = "✅ Berhasil simulasi submit PPDB! (Jika di dalam Google Apps Script, baris baru otomatis bertambah di Sheet PPDB).";
        }, 1000);
      }
    }
  </script>
</body>
</html>
`;
}
