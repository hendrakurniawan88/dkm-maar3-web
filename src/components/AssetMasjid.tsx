import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  PhoneCall, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink,
  Calendar,
  Layers,
  MapPin,
  ClipboardList,
  CheckSquare
} from 'lucide-react';

export interface MasjidAsset {
  id: string;
  name: string;
  category: 'Sarana Ibadah' | 'Inventaris Acara' | 'Layanan Sosial' | 'Elektronik & Dokumentasi';
  description: string;
  qty: number;
  unit: string;
  status: 'Tersedia' | 'Dipinjam' | 'Perawatan';
  location: string;
  canBorrow: boolean;
  pj: string;
  phonePj: string;
}

export interface PeminjamanRequest {
  id: string;
  assetId: string;
  assetName: string;
  borrowerName: string;
  whatsapp: string;
  houseBlock: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'Menunggu Persetujuan' | 'Disetujui' | 'Selesai' | 'Ditolak';
  requestDate: string;
}

const DEFAULT_ASSETS: MasjidAsset[] = [
  {
    id: 'asset-1',
    name: 'Mobil Ambulans Masjid & Sosial (Toyota Avanza)',
    category: 'Layanan Sosial',
    description: 'Digunakan gratis tanpa biaya sewa untuk layanan medis darurat, pengantaran orang sakit, atau rujukan jenazah warga komplek Orchid Green Park dan warga Sawangan sekitarnya.',
    qty: 1,
    unit: 'Unit',
    status: 'Tersedia',
    location: 'Garasi Samping Masjid',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  },
  {
    id: 'asset-2',
    name: 'Tenda Kerucut Sarnafil (Ukuran 4x4 Meter)',
    category: 'Inventaris Acara',
    description: 'Dua set tenda kerucut (sarnafil) premium dengan tiang baja kokoh, cocok untuk mendukung acara walimah nikah, khitanan warga, bazar UMKM, kajian luar ruangan, maupun rapat akbar RT/komplek.',
    qty: 2,
    unit: 'Set',
    status: 'Tersedia',
    location: 'Gudang Inventaris Lantai 2',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  },
  {
    id: 'asset-3',
    name: 'Kursi Lipat Futura Premium (Hitam Carbon)',
    category: 'Inventaris Acara',
    description: 'Kursi lipat besi berlapis jok busa tebal hitam, praktis dan tampak elegan digunakan untuk kebutuhan konsumsi jamuan warga, pengajian akbar, santunan yayasan, atau kedukaan.',
    qty: 100,
    unit: 'Pcs',
    status: 'Tersedia',
    location: 'Gudang Inventaris Balai Warga',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  },
  {
    id: 'asset-4',
    name: 'Sound System Portable Wireless (Speaker Aktif 15 Inch)',
    category: 'Elektronik & Dokumentasi',
    description: 'Dilengkapi 2 unit microphone wireless berkualitas tinggi, konektivitas lengkap (Bluetooth, USB, Jack Guitar). Cocok untuk sambutan luar ruangan, olahraga pagi, majelis ta’lim RT, atau tahlilan.',
    qty: 1,
    unit: 'Set',
    status: 'Tersedia',
    location: 'Kantor DKM MAAR 3',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  },
  {
    id: 'asset-5',
    name: 'Mesin Steam High Pressure / Jet Cleaner (Lakoni)',
    category: 'Inventaris Acara',
    description: 'Mesin steam bertenaga tinggi untuk mempermudah kegiatan gotong royong warga, membersihkan kerak lumut jalan komplek, drainase parit perumahan, atau cuci massal karpet masjid.',
    qty: 1,
    unit: 'Unit',
    status: 'Tersedia',
    location: 'Gudang Kebersihan Samping Tempat Wudhu',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  },
  {
    id: 'asset-6',
    name: 'Kursi Roda Medis Lipat (GEA Medical)',
    category: 'Sarana Ibadah',
    description: 'Kursi roda ergonomis ringan guna memfasilitasi jamaah sepuh (lansia), difabel, atau warga cedera agar tetap dapat mendatangi masjid, melaksanakan shalat jamaah dan menghadiri taklim utama.',
    qty: 2,
    unit: 'Unit',
    status: 'Tersedia',
    location: 'Selasar Utama Masjid MAAR 3',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  }
];

const DEFAULT_PEMINJAMAN: PeminjamanRequest[] = [
  {
    id: 'pjm-1',
    assetId: 'asset-3',
    assetName: 'Kursi Lipat Futura Premium (Hitam Carbon)',
    borrowerName: 'Pak Wahyu Widodo',
    whatsapp: '081987654321',
    houseBlock: 'Blok A2 No. 12',
    startDate: '2026-06-15',
    endDate: '2026-06-17',
    purpose: 'Acara syukuran aqiqah anak di rumah.',
    status: 'Disetujui',
    requestDate: '2026-06-10'
  }
];

export default function AssetMasjid() {
  const [assets, setAssets] = useState<MasjidAsset[]>([]);
  const [peminjaman, setPeminjaman] = useState<PeminjamanRequest[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Modals state
  const [selectedAsset, setSelectedAsset] = useState<MasjidAsset | null>(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState<boolean>(false);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState<boolean>(false);
  const [borrowForm, setBorrowForm] = useState({
    borrowerName: '',
    whatsapp: '',
    houseBlock: '',
    startDate: '',
    endDate: '',
    purpose: '',
    agreed: false
  });
  
  const [newAssetForm, setNewAssetForm] = useState({
    name: '',
    category: 'Sarana Ibadah' as MasjidAsset['category'],
    description: '',
    qty: 1,
    unit: 'Unit',
    status: 'Tersedia' as MasjidAsset['status'],
    location: '',
    canBorrow: true,
    pj: 'Mas Heri Prasetyo',
    phonePj: '081234567890'
  });

  const [notification, setNotification] = useState<{
    text: string;
    type: 'success' | 'error';
    link?: string;
  } | null>(null);

  // Load and save data from localStorage
  useEffect(() => {
    const cachedAssets = localStorage.getItem('maar3_masjid_assets');
    const cachedPeminjaman = localStorage.getItem('maar3_assets_peminjaman');
    
    if (cachedAssets) {
      setAssets(JSON.parse(cachedAssets));
    } else {
      setAssets(DEFAULT_ASSETS);
      localStorage.setItem('maar3_masjid_assets', JSON.stringify(DEFAULT_ASSETS));
    }

    if (cachedPeminjaman) {
      setPeminjaman(JSON.parse(cachedPeminjaman));
    } else {
      setPeminjaman(DEFAULT_PEMINJAMAN);
      localStorage.setItem('maar3_assets_peminjaman', JSON.stringify(DEFAULT_PEMINJAMAN));
    }
  }, []);

  const saveAssetsToCache = (newAssets: MasjidAsset[]) => {
    setAssets(newAssets);
    localStorage.setItem('maar3_masjid_assets', JSON.stringify(newAssets));
  };

  const savePeminjamanToCache = (newPjm: PeminjamanRequest[]) => {
    setPeminjaman(newPjm);
    localStorage.setItem('maar3_assets_peminjaman', JSON.stringify(newPjm));
  };

  const handleOpenBorrowModal = (asset: MasjidAsset) => {
    setSelectedAsset(asset);
    setIsBorrowModalOpen(true);
    setBorrowForm({
      borrowerName: '',
      whatsapp: '',
      houseBlock: '',
      startDate: '',
      endDate: '',
      purpose: '',
      agreed: false
    });
  };

  const handleSubmitBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;

    if (!borrowForm.agreed) {
      alert('Anda harus menyetujui syarat & ketentuan peminjaman.');
      return;
    }

    const newRequest: PeminjamanRequest = {
      id: `pjm-${Date.now()}`,
      assetId: selectedAsset.id,
      assetName: selectedAsset.name,
      borrowerName: borrowForm.borrowerName,
      whatsapp: borrowForm.whatsapp,
      houseBlock: borrowForm.houseBlock,
      startDate: borrowForm.startDate,
      endDate: borrowForm.endDate,
      purpose: borrowForm.purpose,
      status: 'Menunggu Persetujuan',
      requestDate: new Date().toISOString().split('T')[0]
    };

    const updatedPeminjaman = [newRequest, ...peminjaman];
    savePeminjamanToCache(updatedPeminjaman);

    // Dynamic Whatsapp message construction
    const message = `Bismillah Pak *${selectedAsset.pj}*,\n\nSaya *${borrowForm.borrowerName}* (${borrowForm.houseBlock}) ingin mengonfirmasi permohonan peminjaman aset masjid berikut:\n\n- *Nama Aset*: ${selectedAsset.name}\n- *Tanggal Mulai*: ${borrowForm.startDate}\n- *Tanggal Keluar/Selesai*: ${borrowForm.endDate}\n- *Keperluan*: ${borrowForm.purpose}\n\nMohon dukungannya untuk diverifikasi dan disetujui. Syukron katsiran.`;
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${selectedAsset.phonePj.replace(/^0/, '62')}?text=${encodedMessage}`;

    setIsBorrowModalOpen(false);
    showNotice(
      `Permohonan peminjaman aset "${selectedAsset.name}" berhasil dikirim! Silakan klik tombol di bawah untuk langsung menghubungi PJ via WhatsApp.`,
      'success',
      waLink
    );
  };

  const showNotice = (text: string, type: 'success' | 'error', link?: string) => {
    setNotification({ text, type, link });
    setTimeout(() => {
      // Auto close after 12 seconds if they don't dismiss
    }, 12000);
  };

  const handleAddNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset: MasjidAsset = {
      id: `asset-${Date.now()}`,
      ...newAssetForm
    };
    const updatedAssets = [...assets, newAsset];
    saveAssetsToCache(updatedAssets);
    setIsNewAssetModalOpen(false);
    showNotice(`Aset "${newAsset.name}" berhasil ditambahkan ke inventaris!`, 'success');
    setNewAssetForm({
      name: '',
      category: 'Sarana Ibadah',
      description: '',
      qty: 1,
      unit: 'Unit',
      status: 'Tersedia',
      location: '',
      canBorrow: true,
      pj: 'Mas Heri Prasetyo',
      phonePj: '081234567890'
    });
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm('Apakah Anda amat sangat yakin ingin menghapus aset masjid ini dari daftar inventaris?')) {
      const updatedAssets = assets.filter(item => item.id !== id);
      saveAssetsToCache(updatedAssets);
      showNotice('Aset berhasil dihapus dari sistem.', 'success');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: MasjidAsset['status']) => {
    const updatedAssets = assets.map(item => {
      if (item.id === id) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    saveAssetsToCache(updatedAssets);
    showNotice('Status ketersediaan aset berhasil disesuaikan.', 'success');
  };

  const handleUpdatePeminjamanStatus = (id: string, newStatus: PeminjamanRequest['status']) => {
    const updatedPjm = peminjaman.map(item => {
      if (item.id === id) {
        // If approved, optionally we can temporarily update asset status
        if (newStatus === 'Disetujui') {
          const updatedAssetsStatus = assets.map(asset => {
            if (asset.id === item.assetId) {
              return { ...asset, status: 'Dipinjam' as MasjidAsset['status'] };
            }
            return asset;
          });
          saveAssetsToCache(updatedAssetsStatus);
        } else if (newStatus === 'Selesai') {
          const updatedAssetsStatus = assets.map(asset => {
            if (asset.id === item.assetId) {
              return { ...asset, status: 'Tersedia' as MasjidAsset['status'] };
            }
            return asset;
          });
          saveAssetsToCache(updatedAssetsStatus);
        }
        return { ...item, status: newStatus };
      }
      return item;
    });
    savePeminjamanToCache(updatedPjm);
    showNotice(`Status permohonan peminjaman diupdate menjadi: "${newStatus}"`, 'success');
  };

  // Logic filter & search
  const filteredAssets = assets.filter(item => {
    const categoryMatch = filterCategory === 'Semua' || item.category === filterCategory;
    const searchMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const categories = ['Semua', 'Sarana Ibadah', 'Inventaris Acara', 'Layanan Sosial', 'Elektronik & Dokumentasi'];

  return (
    <section id="asset-masjid-section" className="relative py-20 bg-gradient-to-br from-[#05261d] via-slate-950 to-[#021f17] overflow-hidden border-t border-emerald-900/40">
      
      {/* Decorative Golden Ambient Lights & Fog Effect (Matching Beranda Hero/Visitor style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#063326]/40 via-slate-950/95 to-[#021f17]/40 z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none z-0" />

      {/* Arabesque Geometric Overlay */}
      <div className="absolute right-[-10%] top-[-5%] w-[450px] h-[450px] opacity-[0.03] pointer-events-none animate-[spin_150s_linear_infinite] z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500" fill="currentColor">
          <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center justify-center text-center w-full">
          <span className="text-[11px] uppercase font-extrabold text-amber-300 tracking-[0.15em] bg-emerald-900/50 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-lg backdrop-blur-md mb-4">
            <Building2 className="w-4 h-4 text-amber-400" />
            Manajemen Logistik & Syiar
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-white leading-tight mb-4 text-center w-full">
            Inventaris & Aset Masjid MAAR 3
          </h2>
          <p className="text-sm text-emerald-100/70 font-sans leading-relaxed text-center max-w-2xl mx-auto">
            Daftar sarana ibadah, layanan sosial kemasyarakatan, serta kelengkapan acara milik Masjid Muslim Al-Ashr RT 03 OGP yang dikelola secara transparan dan amanah untuk kemaslahatan seluruh jamaah serta warga Orchid Green Park.
          </p>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Dynamic Notification Panel */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-5 rounded-2xl border text-left max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl transition-all ${
                notification.type === 'success' 
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-white' 
                  : 'bg-red-950/80 border-red-500/30 text-white'
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-xl mt-0.5 ${
                  notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Informasi Sistem</h4>
                  <p className="text-emerald-100/80 text-xs mt-1 leading-relaxed font-sans">{notification.text}</p>
                </div>
              </div>
              <div className="flex gap-3 w-full sm:w-auto shrink-0 justify-end">
                {notification.link && (
                  <a
                    href={notification.link}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center gap-1.5 py-2 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                    Kirim Konfirmasi WA &rarr;
                  </a>
                )}
                <button
                  onClick={() => setNotification(null)}
                  className="py-2 px-3 text-xs bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-100 rounded-xl transition-all font-semibold border border-emerald-800/50"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toolbar & Filters Column */}
        <div className="bg-emerald-950/40 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-emerald-900/40 mb-8">
          <div className="flex flex-col lg:flex-row gap-5 items-center justify-center">
            
            {/* Left: Input Search */}
            <div className="relative w-full lg:max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-emerald-300/70">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari nama aset, lokasi simpan, atau deskripsi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950/80 text-white border border-emerald-900/60 rounded-2xl text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none placeholder-emerald-100/30 transition-all font-sans"
              />
            </div>

            {/* Middle: Tab Category Filters */}
            <div className="flex flex-wrap gap-1.5 justify-center w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`py-1.5 px-3 rounded-full text-xs font-semibold select-none cursor-pointer duration-200 font-sans border transition-all ${
                    filterCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-md shadow-amber-400/20'
                      : 'bg-emerald-950/50 text-emerald-100/70 hover:bg-emerald-900/30 hover:text-white border-emerald-900/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right: Mode Toggle Authorized/Resident */}
            <div className="flex items-center gap-2 border-t lg:border-t-0 pt-3 lg:pt-0 border-emerald-905/30 w-full lg:w-auto justify-end">
              <span className="text-[11px] font-mono text-emerald-350 uppercase tracking-widest mr-1">
                Akses Panel:
              </span>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className={`flex items-center gap-1.5 py-1.5 px-4 rounded-xl text-xs font-bold font-sans transition-all cursor-pointer ${
                  isAdmin 
                    ? 'bg-amber-400 hover:bg-amber-500 text-emerald-950 border border-amber-300'
                    : 'bg-emerald-900/40 border border-emerald-500/20 text-emerald-100 hover:bg-emerald-900/60'
                }`}
              >
                {isAdmin ? (
                  <>
                    <Users className="w-3.5 h-3.5" />
                    Mode Admin (Aktif)
                  </>
                ) : (
                  <>
                    <CheckSquare className="w-3.5 h-3.5" />
                    Mode Warga Jemaah
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* ADMIN MODE DASHBOARD SUBSECTION */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-amber-100/30 dark:bg-amber-950/10 border-2 border-dashed border-amber-500/20 rounded-3xl p-6 mb-8 text-left"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-amber-400 flex items-center gap-2">
                  🛡️ Konsol Manajemen Aset Masjid (Staf DKM RT-03)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-450 mt-1">
                  Gunakan panel pengurus ini untuk meregistrasi inventaris baru, memonitor reservasi warga, atau memperbarui status perbaikan peralatan.
                </p>
              </div>
              <button
                onClick={() => setIsNewAssetModalOpen(true)}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md self-start md:self-center cursor-pointer transition-all shrink-0"
              >
                <Plus className="w-4 h-4" />
                Registrasi Aset Baru
              </button>
            </div>

            {/* List Borrow requests for Admin */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-amber-250 p-5 shadow-sm">
              <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-300 tracking-wider mb-4 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-600" />
                Daftar Permohonan Peminjaman Aset Yang Terdaftar
              </h4>

              {peminjaman.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-500 py-6 text-center font-sans">
                  Belum ada permohonan peminjaman aset yang masuk.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-sans text-xs">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 text-slate-500 font-mono">
                        <th className="p-3">Pemohon</th>
                        <th className="p-3">Aset Diminta</th>
                        <th className="p-3">Masa Pinjam</th>
                        <th className="p-3">Keperluan</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                      {peminjaman.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                          <td className="p-3">
                            <span className="font-bold text-slate-905 dark:text-white block">{item.borrowerName}</span>
                            <span className="text-[10px] text-slate-500 block font-mono bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded w-max mt-1">{item.houseBlock} · WA: {item.whatsapp}</span>
                          </td>
                          <td className="p-3 font-semibold text-emerald-700 dark:text-amber-400">
                            {item.assetName}
                          </td>
                          <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                            <div>Mulai: {item.startDate}</div>
                            <div className="mt-0.5">Selesai: {item.endDate}</div>
                          </td>
                          <td className="p-3 text-slate-500 max-w-xs truncate" title={item.purpose}>
                            {item.purpose}
                          </td>
                          <td className="p-3">
                            <span className={`inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${
                              item.status === 'Disetujui' 
                                ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-450'
                                : item.status === 'Menunggu Persetujuan'
                                ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-450 animate-pulse'
                                : item.status === 'Selesai'
                                ? 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                                : 'bg-red-100 dark:bg-red-950/50 text-red-600'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex gap-1.5 justify-end">
                              {item.status === 'Menunggu Persetujuan' && (
                                <>
                                  <button
                                    onClick={() => handleUpdatePeminjamanStatus(item.id, 'Disetujui')}
                                    className="p-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                                  >
                                    Setujui
                                  </button>
                                  <button
                                    onClick={() => handleUpdatePeminjamanStatus(item.id, 'Ditolak')}
                                    className="p-1 px-2.5 bg-red-650 hover:bg-red-500 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                                  >
                                    Tolak
                                  </button>
                                </>
                              )}
                              {item.status === 'Disetujui' && (
                                <button
                                  onClick={() => handleUpdatePeminjamanStatus(item.id, 'Selesai')}
                                  className="p-1 px-2.5 bg-slate-600 hover:bg-slate-500 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                                >
                                  Tandai Selesai / Kembali
                                </button>
                              )}
                              <a
                                href={`https://wa.me/${item.whatsapp.replace(/^0/, '62')}`}
                                target="_blank"
                                referrerPolicy="no-referrer"
                                className="p-1 px-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold text-[10px] rounded-lg flex items-center gap-1 cursor-pointer"
                              >
                                Hubungi WA
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Assets Main Grid List */}
        {filteredAssets.length === 0 ? (
          <div className="bg-emerald-950/40 backdrop-blur-md rounded-3xl p-16 text-center shadow-2xl border border-emerald-900/40 font-sans max-w-md mx-auto">
            <span className="text-4xl block mb-3">🔍</span>
            <h4 className="font-bold text-white">Aset Tidak Ditemukan</h4>
            <p className="text-emerald-100/60 text-xs mt-2 leading-relaxed">
              Kami tidak dapat menemukan kecocokan aset dengan kata kunci "{searchQuery}" atau filter kategori yang dipilih. Silakan coba kembali dengan istilah penelusuran lainnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {filteredAssets.map((asset) => {
              const themeColor = 
                asset.category === 'Layanan Sosial' ? 'from-cyan-500 to-indigo-500' :
                asset.category === 'Inventaris Acara' ? 'from-amber-500 to-orange-500' :
                asset.category === 'Sarana Ibadah' ? 'from-emerald-400 to-teal-500' :
                'from-teal-400 to-cyan-500';

              return (
                <div 
                  key={asset.id}
                  className="bg-gradient-to-br from-emerald-950/80 via-emerald-900/20 to-slate-950/80 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all duration-350 border border-emerald-500/20 flex flex-col group relative animate-fade-in"
                >
                  {/* Category Pill header */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="bg-slate-950/90 backdrop-blur-sm text-amber-300 border border-amber-400/25 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full">
                      {asset.category}
                    </span>
                  </div>

                  {/* Top Color Accent */}
                  <div className={`h-2 w-full bg-gradient-to-r ${themeColor}`} />

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3 mt-1 gap-2">
                      <h3 className="font-serif font-extrabold text-base text-white group-hover:text-amber-300 transition-colors leading-tight">
                        {asset.name}
                      </h3>
                    </div>

                    <p className="text-emerald-100/70 text-xs leading-relaxed font-sans mt-1 mb-4 flex-grow line-clamp-3" title={asset.description}>
                      {asset.description}
                    </p>

                    {/* Metadata Specs Grid */}
                    <div className="grid grid-cols-2 gap-2.5 bg-slate-950/60 p-3 rounded-2xl border border-emerald-900/40 font-sans text-[11px] mb-4">
                      
                      <div className="space-y-0.5">
                        <span className="text-amber-300 block tracking-wide uppercase text-[9px] font-bold">Kuantitas</span>
                        <span className="font-mono font-bold text-white">
                          {asset.qty} {asset.unit}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-amber-300 block tracking-wide uppercase text-[9px] font-bold">Penyimpanan</span>
                        <span className="font-bold text-white block truncate" title={asset.location}>
                          {asset.location}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-amber-300 block tracking-wide uppercase text-[9px] font-bold">Status</span>
                        <span className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            asset.status === 'Tersedia' ? 'bg-emerald-400 animate-pulse' :
                            asset.status === 'Dipinjam' ? 'bg-amber-400' : 'bg-red-400'
                          }`} />
                          <span className={`font-bold ${
                            asset.status === 'Tersedia' ? 'text-emerald-300' :
                            asset.status === 'Dipinjam' ? 'text-amber-300' : 'text-red-300'
                          }`}>
                            {asset.status}
                          </span>
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="text-amber-300 block tracking-wide uppercase text-[9px] font-bold">Pengadaan</span>
                        <span className="font-bold text-emerald-100">
                          Milik Masjid/Warga
                        </span>
                      </div>

                    </div>

                    {/* PIC Contact Box */}
                    <div className="flex items-center justify-between border-t border-emerald-900/40 pt-4 mt-auto">
                      <div className="text-left">
                        <span className="block text-[8px] uppercase tracking-wider font-extrabold text-emerald-300/60 font-sans">Penanggung Jawab Aset</span>
                        <span className="block text-xs font-serif font-black text-white mt-0.5">{asset.pj}</span>
                      </div>

                      <div className="flex gap-2">
                        {isAdmin ? (
                          <div className="flex gap-1.5">
                            {/* Update states fast for admin inline */}
                            <select
                              value={asset.status}
                              onChange={(e) => handleUpdateStatus(asset.id, e.target.value as MasjidAsset['status'])}
                              className="text-[10px] border border-emerald-800 bg-slate-950 text-white p-1.5 rounded-lg font-bold"
                            >
                              <option value="Tersedia">Tersedia</option>
                              <option value="Dipinjam">Dipinjam</option>
                              <option value="Perawatan">Perawatan</option>
                            </select>
                            <button
                              onClick={() => handleDeleteAsset(asset.id)}
                              className="p-1.5 text-red-450 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer border border-emerald-800"
                              title="Hapus aset"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          asset.canBorrow && asset.status === 'Tersedia' ? (
                            <button
                              onClick={() => handleOpenBorrowModal(asset)}
                              className="py-1.5 px-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] uppercase rounded-xl shadow-md cursor-pointer transition-colors"
                            >
                              Ajukan Pinjam
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold bg-emerald-950/70 border border-emerald-900/40 text-emerald-300 px-2.5 py-1.5 rounded-xl block text-center uppercase tracking-wider">
                              {asset.status === 'Tersedia' ? 'Internal DKM' : asset.status}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* MODAL 1: RESERVASI / PEMINJAMAN FORM */}
      {isBorrowModalOpen && selectedAsset && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full text-left border border-slate-200 dark:border-slate-800 relative"
          >
            <div className="bg-emerald-950 py-5 px-6 text-white text-left relative">
              <span className="text-[10px] uppercase font-bold text-amber-300 block mb-1">Permohonan Penggunaan Logistik</span>
              <h3 className="font-serif font-black text-lg text-white">
                Reservasi Aset: {selectedAsset.name}
              </h3>
              <p className="text-emerald-200/80 text-[11px] mt-1 pr-4 leading-relaxed font-sans">
                Aset ini dipinjamkan gratis sebagai khidmat jemaah. Harap isi form dengan jujur, amanah, dan kembalikan dalam kondisi baik.
              </p>
            </div>

            <form onSubmit={handleSubmitBorrow} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 font-sans">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Nama Lengkap Pemohon</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pak Supriyadi"
                    value={borrowForm.borrowerName}
                    onChange={(e) => setBorrowForm({ ...borrowForm, borrowerName: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Nomor WhatsApp Aktif</label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 0812XXXXXXXX"
                    value={borrowForm.whatsapp}
                    onChange={(e) => setBorrowForm({ ...borrowForm, whatsapp: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-sans">
                <div className="col-span-1 space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Blok Rumah (OGP)</label>
                  <input
                    type="text"
                    required
                    placeholder="Blok C5 No 1"
                    value={borrowForm.houseBlock}
                    onChange={(e) => setBorrowForm({ ...borrowForm, houseBlock: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-1 space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Tgl Pengambilan</label>
                  <input
                    type="date"
                    required
                    value={borrowForm.startDate}
                    onChange={(e) => setBorrowForm({ ...borrowForm, startDate: e.target.value })}
                    className="w-full p-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="col-span-1 space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350 block">Tgl Pengembalian</label>
                  <input
                    type="date"
                    required
                    value={borrowForm.endDate}
                    onChange={(e) => setBorrowForm({ ...borrowForm, endDate: e.target.value })}
                    className="w-full p-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 font-sans">
                <label className="font-bold text-slate-700 dark:text-slate-350 block">Deskripsi Tujuan Penggunaan</label>
                <textarea
                  required
                  rows={2}
                  maxLength={250}
                  placeholder="Terangkan kepentingan contoh: 'Hajatan tasyakuran keluarga dan butuh berteduh di halaman depan rumah'"
                  value={borrowForm.purpose}
                  onChange={(e) => setBorrowForm({ ...borrowForm, purpose: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 rounded-2xl flex items-start gap-2 text-[10px] leading-relaxed text-slate-650 dark:text-slate-350 font-sans">
                <input
                  type="checkbox"
                  id="agree-checking"
                  required
                  checked={borrowForm.agreed}
                  onChange={(e) => setBorrowForm({ ...borrowForm, agreed: e.target.checked })}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 cursor-pointer"
                />
                <label htmlFor="agree-checking" className="cursor-pointer select-none">
                  Saya berkomitmen menjaga integritas aset dengan membersihkan kotoran sesudah pemakaian, menanggung risiko perbaikan secara patungan/mandiri jika terjadi kelalaian fisik, serta mengembalikannya tepat waktu.
                </label>
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-850 font-sans">
                <button
                  type="button"
                  onClick={() => setIsBorrowModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-750 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all uppercase tracking-wider text-[11px]"
                >
                  Ajukan &amp; Kontak PJ &rarr;
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: NEW ASSET FORM FOR ADMIN */}
      {isNewAssetModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full text-left border border-slate-200 dark:border-slate-800"
          >
            <div className="bg-amber-400 py-4 px-6 text-emerald-950 text-left">
              <span className="text-[10px] uppercase font-extrabold tracking-wider block">Registrasi Inventaris Baru</span>
              <h3 className="font-serif font-black text-base mt-0.5">
                Formulir Pendaftaran Aset Masjid MAAR 3
              </h3>
            </div>

            <form onSubmit={handleAddNewAsset} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Nama Aset / Inventaris</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Genset Silent 3000 Watt"
                  value={newAssetForm.name}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, name: e.target.value })}
                  className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Kategori Aset</label>
                  <select
                    value={newAssetForm.category}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, category: e.target.value as MasjidAsset['category'] })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl"
                  >
                    <option value="Sarana Ibadah">Sarana Ibadah</option>
                    <option value="Inventaris Acara">Inventaris Acara</option>
                    <option value="Layanan Sosial">Layanan Sosial</option>
                    <option value="Elektronik & Dokumentasi">Elektronik & Dokumentasi</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Penyimpanan / Lokasi</label>
                  <input
                    type="text"
                    required
                    placeholder="Gudang Samping, Kantor DKM, dll"
                    value={newAssetForm.location}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, location: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Kuantitas</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newAssetForm.qty}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, qty: parseInt(e.target.value) || 1 })}
                    className="w-full p-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Satuan</label>
                  <input
                    type="text"
                    required
                    placeholder="Unit, Pcs, Set, Gulung"
                    value={newAssetForm.unit}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, unit: e.target.value })}
                    className="w-full p-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Dapat Dipinjam?</label>
                  <select
                    value={newAssetForm.canBorrow ? 'true' : 'false'}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, canBorrow: e.target.value === 'true' })}
                    className="w-full p-2 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl"
                  >
                    <option value="true">Dapat Dipinjam Warga</option>
                    <option value="false">Hanya Internal DKM</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300 block">Catatan & Deskripsi Aset</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan singkat spesifikasi barang, cara perawatan, atau fungsi utamanya..."
                  value={newAssetForm.description}
                  onChange={(e) => setNewAssetForm({ ...newAssetForm, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 dark:bg-slate-900 border border-slate-202 dark:border-slate-800 rounded-xl resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">Nama PJ (Penanggung Jawab)</label>
                  <input
                    type="text"
                    required
                    value={newAssetForm.pj}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, pj: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-202 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300 block">No WhatsApp PJ</label>
                  <input
                    type="tel"
                    required
                    value={newAssetForm.phonePj}
                    onChange={(e) => setNewAssetForm({ ...newAssetForm, phonePj: e.target.value })}
                    className="w-full p-2 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-202 dark:border-slate-800 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsNewAssetModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
                >
                  Simpan Aset Baru
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
