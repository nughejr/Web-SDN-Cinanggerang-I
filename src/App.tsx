/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { ProfilView } from './components/views/ProfilView';
import { GuruView } from './components/views/GuruView';
import { SiswaView } from './components/views/SiswaView';
import { KegiatanView } from './components/views/KegiatanView';
import { PengumumanView } from './components/views/PengumumanView';
import { PPDBView } from './components/views/PPDBView';
import { AbsensiView } from './components/views/AbsensiView';
import { ELearningView } from './components/views/ELearningView';
import { PerpustakaanView } from './components/views/PerpustakaanView';
import { GaleriView } from './components/views/GaleriView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { GasHubView } from './components/views/GasHubView';
import { LoginModal } from './components/views/LoginModal';

import {
  initialProfile,
  initialGuru,
  initialSiswa,
  initialKegiatan,
  initialPengumuman,
  initialPPDB,
  initialAbsensi,
  initialBuku,
  initialELearning,
  initialGaleri,
} from './data/initialData';

import {
  PendaftaranPPDB,
  AbsensiRecord,
  Pengumuman,
  UserAuth,
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');

  // School data states
  const [profile] = useState(initialProfile);
  const [guruList] = useState(initialGuru);
  const [siswaList] = useState(initialSiswa);
  const [kegiatanList] = useState(initialKegiatan);
  const [pengumumanList, setPengumumanList] = useState<Pengumuman[]>(initialPengumuman);
  const [ppdbList, setPpdbList] = useState<PendaftaranPPDB[]>(initialPPDB);
  const [absensiList, setAbsensiList] = useState<AbsensiRecord[]>(initialAbsensi);
  const [bukuList] = useState(initialBuku);
  const [materiList] = useState(initialELearning);
  const [galeriList] = useState(initialGaleri);

  // Authentication state
  const [currentUser, setCurrentUser] = useState<UserAuth | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Google Apps Script Live Webhook URL configuration
  const [gasUrl, setGasUrl] = useState<string>(() => {
    return localStorage.getItem('sdn_gas_url') || '';
  });
  const [isTestingGas, setIsTestingGas] = useState(false);
  const [gasTestResult, setGasTestResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    if (gasUrl) {
      localStorage.setItem('sdn_gas_url', gasUrl);
    }
  }, [gasUrl]);

  // Auth handler
  const handleLoginRequest = async (username: string, password: string): Promise<UserAuth> => {
    // If gasUrl is provided, attempt live authentication
    if (gasUrl.trim()) {
      try {
        const response = await fetch(gasUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'login',
            username,
            password,
          }),
        });
        const result = await response.json();
        if (result.status === 'success' && result.user) {
          return result.user;
        }
      } catch (e) {
        console.warn('GAS live auth fallback to local credentials', e);
      }
    }

    // Default credential validation
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      return {
        username: 'admin',
        role: 'admin',
        namaLengkap: 'Administrator SDN Cinanggerang I',
        email: 'admin@sdncinanggerang1.sch.id',
      };
    } else if (username.toLowerCase() === 'guru' && password === 'guru123') {
      return {
        username: 'guru',
        role: 'guru',
        namaLengkap: 'Ai Kurniasih, S.Pd.SD.',
        email: 'ai.kurniasih@sdncinanggerang1.sch.id',
      };
    } else if (username.toLowerCase() === 'kepsek' && password === 'kepsek123') {
      return {
        username: 'kepsek',
        role: 'admin',
        namaLengkap: 'H. Asep Supriatna, S.Pd., M.M.Pd.',
        email: 'kepala@sdncinanggerang1.sch.id',
      };
    } else {
      throw new Error('Username atau password tidak cocok dengan data Sheet "Users". Gunakan admin/admin123 atau guru/guru123.');
    }
  };

  const handleLoginSuccess = (user: UserAuth) => {
    setCurrentUser(user);
    setActiveTab('admin-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (activeTab === 'admin-dashboard') {
      setActiveTab('beranda');
    }
  };

  // PPDB Submit Handler
  const handleSubmitPPDB = async (
    data: Omit<PendaftaranPPDB, 'id' | 'tanggalDaftar' | 'status'>
  ): Promise<string> => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newId = `PPDB-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Math.floor(1000 + Math.random() * 9000))}`;

    const newEntry: PendaftaranPPDB = {
      ...data,
      id: newId,
      tanggalDaftar: timestamp,
      status: 'Menunggu',
    };

    if (gasUrl.trim()) {
      try {
        const res = await fetch(gasUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'submitPPDB',
            ...data,
          }),
        });
        const json = await res.json();
        if (json.status === 'success' && json.idPendaftaran) {
          newEntry.id = json.idPendaftaran;
        }
      } catch (err) {
        console.warn('Could not post to GAS live, saved locally', err);
      }
    }

    setPpdbList((prev) => [newEntry, ...prev]);
    return newEntry.id;
  };

  // Absensi Submit Handler
  const handleSubmitAbsen = async (
    data: Omit<AbsensiRecord, 'id' | 'tanggal' | 'waktu'>
  ): Promise<string> => {
    const now = new Date();
    const tgl = now.toISOString().split('T')[0];
    const waktu = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    const newId = `ABS-${Date.now().toString().slice(-6)}`;

    const newRecord: AbsensiRecord = {
      ...data,
      id: newId,
      tanggal: tgl,
      waktu,
    };

    if (gasUrl.trim()) {
      try {
        await fetch(gasUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'submitAbsen',
            ...data,
          }),
        });
      } catch (err) {
        console.warn('Could not post to GAS live, saved locally', err);
      }
    }

    setAbsensiList((prev) => [newRecord, ...prev]);
    return newId;
  };

  // Update PPDB status handler
  const handleUpdatePPDBStatus = async (
    id: string,
    newStatus: 'Diterima' | 'Ditolak' | 'Menunggu',
    catatan?: string
  ): Promise<void> => {
    if (gasUrl.trim()) {
      try {
        await fetch(gasUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'updateStatusPPDB',
            id,
            newStatus,
            catatan,
          }),
        });
      } catch (err) {
        console.warn('Live GAS update failed, continuing locally', err);
      }
    }

    setPpdbList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, catatan: catatan || item.catatan } : item
      )
    );
  };

  // Add announcement handler
  const handleAddPengumuman = (item: Omit<Pengumuman, 'id' | 'tanggal'>) => {
    const tgl = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const newId = `PENG-${String(pengumumanList.length + 1).padStart(3, '0')}`;
    setPengumumanList((prev) => [{ ...item, id: newId, tanggal: tgl }, ...prev]);
  };

  // Test GAS ping handler
  const handleTestGasConnection = async () => {
    if (!gasUrl.trim()) return;
    setIsTestingGas(true);
    setGasTestResult(null);

    try {
      const url = new URL(gasUrl.trim());
      url.searchParams.set('action', 'ping');

      const response = await fetch(url.toString(), { method: 'GET' });
      const result = await response.json();

      if (result.status === 'success') {
        setGasTestResult({
          success: true,
          message: 'Sukses! Server Google Apps Script merespons aktif & siap menerima data.',
        });
      } else {
        setGasTestResult({
          success: false,
          message: 'Server merespons, namun pesan error: ' + (result.message || 'Unknown'),
        });
      }
    } catch (err: any) {
      setGasTestResult({
        success: false,
        message: 'Gagal terhubung: Pastikan Anda telah menerapkan (deploy) sebagai Web App dengan akses "Siapa saja (Anyone)".',
      });
    } finally {
      setIsTestingGas(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        {activeTab === 'beranda' && (
          <HomeView
            profile={profile}
            pengumumanList={pengumumanList}
            kegiatanList={kegiatanList}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'profil' && <ProfilView profile={profile} />}

        {activeTab === 'guru' && (
          <GuruView
            guruList={guruList}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'siswa' && (
          <SiswaView
            siswaList={siswaList}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'kegiatan' && <KegiatanView kegiatanList={kegiatanList} />}

        {activeTab === 'pengumuman' && <PengumumanView pengumumanList={pengumumanList} />}

        {activeTab === 'ppdb' && (
          <PPDBView
            ppdbList={ppdbList}
            onSubmitPPDB={handleSubmitPPDB}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'absen' && (
          <AbsensiView
            absensiList={absensiList}
            onSubmitAbsen={handleSubmitAbsen}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'elearning' && <ELearningView materiList={materiList} />}

        {activeTab === 'perpustakaan' && (
          <PerpustakaanView
            bukuList={bukuList}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'galeri' && <GaleriView galeriList={galeriList} />}

        {activeTab === 'admin-dashboard' && currentUser && (
          <AdminDashboardView
            currentUser={currentUser}
            onLogout={handleLogout}
            ppdbList={ppdbList}
            onUpdatePPDBStatus={handleUpdatePPDBStatus}
            absensiList={absensiList}
            pengumumanList={pengumumanList}
            onAddPengumuman={handleAddPengumuman}
            onOpenGasHub={() => setActiveTab('gas-hub')}
          />
        )}

        {activeTab === 'gas-hub' && (
          <GasHubView
            gasUrl={gasUrl}
            setGasUrl={setGasUrl}
            onTestGasConnection={handleTestGasConnection}
            isTestingGas={isTestingGas}
            testResult={gasTestResult}
          />
        )}
      </main>

      {/* Global Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onLoginRequest={handleLoginRequest}
      />

      {/* Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
