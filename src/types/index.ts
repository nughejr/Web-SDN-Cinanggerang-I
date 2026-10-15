export interface SchoolProfile {
  nama: string;
  npsn: string;
  visi: string;
  misi: string[];
  logo: string;
  alamat: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  kodePos: string;
  email: string;
  telepon: string;
  instagram: string;
  facebook: string;
  youtube: string;
  akreditasi: string;
  kepalaSekolah: string;
}

export interface Guru {
  id: string;
  nip: string;
  nama: string;
  jabatan: string;
  mapel: string;
  pendidikan: string;
  foto: string;
  status: 'PNS' | 'PPPK' | 'Honorer';
  email?: string;
}

export interface Siswa {
  id: string;
  nisn: string;
  nama: string;
  kelas: 'Kelas 1' | 'Kelas 2' | 'Kelas 3' | 'Kelas 4' | 'Kelas 5' | 'Kelas 6';
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  status: 'Aktif' | 'Alumni' | 'Pindah';
}

export interface Kegiatan {
  id: string;
  judul: string;
  kategori: 'Ekstrakurikuler' | 'Akademik' | 'Keagamaan' | 'Seni Budaya' | 'Olahraga';
  tanggal: string;
  deskripsi: string;
  foto: string;
  lokasi: string;
}

export interface Pengumuman {
  id: string;
  judul: string;
  tanggal: string;
  kategori: 'Penting' | 'Akademik' | 'PPDB' | 'Umum';
  penulis: string;
  isi: string;
  lampiran?: string;
}

export interface PendaftaranPPDB {
  id: string;
  tanggalDaftar: string;
  namaLengkap: string;
  nik: string;
  nisn: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  tempatLahir: string;
  tanggalLahir: string;
  namaOrtu: string;
  noHpOrtu: string;
  alamat: string;
  asalTK: string;
  jalur: 'Zonasi' | 'Afirmasi' | 'Perpindahan Orang Tua' | 'Prestasi';
  status: 'Menunggu' | 'Diterima' | 'Ditolak';
  catatan?: string;
}

export interface AbsensiRecord {
  id: string;
  tanggal: string;
  waktu: string;
  tipe: 'Siswa' | 'Guru';
  nama: string;
  nomorIdentitas: string; // NISN atau NIP
  kelasOrJabatan: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  keterangan: string;
}

export interface BukuPerpustakaan {
  id: string;
  judul: string;
  penulis: string;
  kategori: 'Tematik' | 'Cerita Rakyat & Dongeng' | 'Sains & Teknologi' | 'Agama' | 'Kamus & Ensiklopedia';
  kelas: string;
  penerbit: string;
  tahun: number;
  tersedia: boolean;
  coverUrl: string;
  sinopsis: string;
  linkBaca?: string;
}

export interface MateriELearning {
  id: string;
  judul: string;
  kelas: string;
  mapel: string;
  guruPengampu: string;
  tipe: 'Video' | 'PDF Rangkuman' | 'Kuis' | 'Latihan';
  deskripsi: string;
  fileUrl?: string;
  durasiOrHalaman?: string;
}

export interface GaleriItem {
  id: string;
  judul: string;
  kategori: 'Kegiatan' | 'Fasilitas' | 'Prestasi' | 'Upacara';
  foto: string;
  tanggal: string;
  deskripsi: string;
}

export interface UserAuth {
  username: string;
  role: 'admin' | 'guru';
  namaLengkap: string;
  email: string;
}
