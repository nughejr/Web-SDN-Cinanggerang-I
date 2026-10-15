import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePPDBInput,
  validateAbsensiInput,
  filterGuru,
  filterSiswa,
  filterBuku,
  generateCodeGs,
  generateStandaloneHtml,
} from './gasHelpers.ts';
import type { Guru, Siswa } from '../types/index.ts';

test('validatePPDBInput detects invalid inputs correctly', () => {
  const invalidResult = validatePPDBInput({
    namaLengkap: 'Ab',
    nik: '12345',
    noHpOrtu: '123',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.namaLengkap);
  assert.ok(invalidResult.errors.nik);
  assert.ok(invalidResult.errors.noHpOrtu);
});

test('validatePPDBInput passes on valid input', () => {
  const validResult = validatePPDBInput({
    namaLengkap: 'Rizki Pratama',
    nik: '3211051508190001',
    nisn: '0192837411',
    tempatLahir: 'Sumedang',
    tanggalLahir: '2019-08-15',
    namaOrtu: 'Ahmad Fauzi',
    noHpOrtu: '082118449525',
    alamat: 'Jln. Desa Cinanggerang RT 02/01',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('validateAbsensiInput validates attendance fields', () => {
  const incomplete = validateAbsensiInput({
    nama: 'Ai',
    status: undefined,
  });
  assert.equal(incomplete.isValid, false);

  const complete = validateAbsensiInput({
    nama: 'Ai Kurniasih, S.Pd.',
    nomorIdentitas: '198203152006042015',
    kelasOrJabatan: 'Guru Kelas 1',
    status: 'Hadir',
  });
  assert.equal(complete.isValid, true);
});

test('filterGuru filters by query and status', () => {
  const sampleTeachers: Guru[] = [
    {
      id: '1',
      nip: '197405121998031002',
      nama: 'H. Asep Supriatna',
      jabatan: 'Kepala Sekolah',
      mapel: 'Manajerial',
      pendidikan: 'S2',
      foto: '',
      status: 'PNS',
    },
    {
      id: '2',
      nip: '-',
      nama: 'Agung Maulana',
      jabatan: 'Operator Sekolah',
      mapel: 'TIK',
      pendidikan: 'S1',
      foto: '',
      status: 'Honorer',
    },
  ];

  const searchAsep = filterGuru(sampleTeachers, 'Asep', 'Semua');
  assert.equal(searchAsep.length, 1);
  assert.equal(searchAsep[0].nama, 'H. Asep Supriatna');

  const filterHonorer = filterGuru(sampleTeachers, '', 'Honorer');
  assert.equal(filterHonorer.length, 1);
  assert.equal(filterHonorer[0].status, 'Honorer');
});

test('filterSiswa filters by class and query', () => {
  const sampleStudents: Siswa[] = [
    {
      id: '1',
      nisn: '0142839101',
      nama: 'Muhammad Rizky Pratama',
      kelas: 'Kelas 1',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Sumedang',
      tanggalLahir: '2018-04-12',
      status: 'Aktif',
    },
    {
      id: '2',
      nisn: '0139948201',
      nama: 'Aditya Bagus Saputra',
      kelas: 'Kelas 2',
      jenisKelamin: 'Laki-laki',
      tempatLahir: 'Bandung',
      tanggalLahir: '2017-02-18',
      status: 'Aktif',
    },
  ];

  const kelas1Only = filterSiswa(sampleStudents, '', 'Kelas 1');
  assert.equal(kelas1Only.length, 1);
  assert.equal(kelas1Only[0].kelas, 'Kelas 1');

  const nisnSearch = filterSiswa(sampleStudents, '01399', 'Semua');
  assert.equal(nisnSearch.length, 1);
  assert.equal(nisnSearch[0].nama, 'Aditya Bagus Saputra');
});

test('generateCodeGs contains essential Google Apps Script routines', () => {
  const code = generateCodeGs();
  assert.ok(code.includes('function doGet(e)'));
  assert.ok(code.includes('function doPost(e)'));
  assert.ok(code.includes('function inisialisasiDatabase()'));
  assert.ok(code.includes('SHEET_PROFIL'));
  assert.ok(code.includes('SHEET_PPDB'));
  assert.ok(code.includes('SHEET_ABSENSI'));
  assert.ok(code.includes('case "login":'));
  assert.ok(code.includes('20208801'));
});

test('generateStandaloneHtml generates valid HTML with school data and form', () => {
  const html = generateStandaloneHtml();
  assert.ok(html.includes('<!DOCTYPE html>'));
  assert.ok(html.includes('google.script.run'));
  assert.ok(html.includes('handlePPDBSubmit'));
});
