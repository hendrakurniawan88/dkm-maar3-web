import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  FileText, 
  Megaphone, 
  PhoneCall, 
  Check, 
  MapPin, 
  User, 
  Clock, 
  Coins, 
  Shield, 
  Activity, 
  FileCheck2, 
  Plus, 
  Send, 
  Search, 
  Heart,
  ChevronRight,
  ClipboardList,
  Trash2,
  Filter,
  Sparkles
} from 'lucide-react';

interface WargaPanelProps {
  showFullHeader?: boolean;
}

interface WargaReport {
  id: string;
  reporter: string;
  houseNumber: string;
  title: string;
  category: 'Keamanan' | 'Infrastruktur' | 'Kebersihan' | 'Aspirasi / Sosial' | 'Lainnya';
  content: string;
  date: string;
  status: 'Diproses' | 'Selesai' | 'Baru';
}

interface JemaahAttendance {
  name: string;
  houseNumber: string;
  pax: number;
}

interface HouseholdWarga {
  id: string;
  name: string;
  rt: '08' | '07' | '06';
  houseNumber: string;
  familySize: number;
  maritalStatus: 'Menikah' | 'Belum';
  occupancyStatus: 'Pemilik' | 'Kontrak';
  occupation: string;
  phone?: string;
}

const DEFAULT_WARGA: HouseholdWarga[] = [
  {
    id: 'w-1',
    name: 'Bapak Ahmad Subagja',
    rt: '08',
    houseNumber: 'Blok B3 No. 04',
    familySize: 4,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Karyawan Swasta',
    phone: '081234567890'
  },
  {
    id: 'w-2',
    name: 'Ibu Ratna Dewi',
    rt: '08',
    houseNumber: 'Blok C1 No. 08',
    familySize: 3,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Wiraswasta Kuliner',
    phone: '085712123434'
  },
  {
    id: 'w-3',
    name: 'Bapak Rudi Hartono',
    rt: '08',
    houseNumber: 'Blok A2 No. 15',
    familySize: 5,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Kontrak',
    occupation: 'Karyawan Swasta',
    phone: '088822221111'
  },
  {
    id: 'w-4',
    name: 'Bapak Gunawan',
    rt: '08',
    houseNumber: 'Blok A3 No. 02',
    familySize: 4,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Pegawai Sipil (PNS)',
    phone: '081299998888'
  },
  {
    id: 'w-5',
    name: 'Bapak Ahmad Fauzi',
    rt: '07',
    houseNumber: 'Blok C2 No. 10',
    familySize: 2,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Karyawan BUMN',
    phone: '081344445555'
  },
  {
    id: 'w-6',
    name: 'Mas Heri Prasetyo',
    rt: '07',
    houseNumber: 'Blok D3 No. 01',
    familySize: 2,
    maritalStatus: 'Belum',
    occupancyStatus: 'Pemilik',
    occupation: 'Wiraswasta / Dagang',
    phone: '089677771234'
  },
  {
    id: 'w-7',
    name: 'Bapak Rudi Setiawan',
    rt: '08',
    houseNumber: 'Blok B1 No. 05',
    familySize: 1,
    maritalStatus: 'Belum',
    occupancyStatus: 'Kontrak',
    occupation: 'IT Consultant',
    phone: '081288889999'
  },
  {
    id: 'w-8',
    name: 'Hj. Muthiah Yusuf',
    rt: '07',
    houseNumber: 'Blok F2 No. 11',
    familySize: 4,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Dosen / Pengajar',
    phone: '081398765432'
  },
  {
    id: 'w-9',
    name: 'Bapak Roni (Ketua RT 07)',
    rt: '07',
    houseNumber: 'Blok D1 No. 09',
    familySize: 5,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Karyawan Swasta',
    phone: '085711112222'
  },
  {
    id: 'w-10',
    name: 'Bapak Hermawan (Ketua RT 08)',
    rt: '08',
    houseNumber: 'Blok B2 No. 12',
    familySize: 4,
    maritalStatus: 'Menikah',
    occupancyStatus: 'Pemilik',
    occupation: 'Wiraswasta / Pengusaha',
    phone: '081312345678'
  }
];

const DEFAULT_REPORTS: WargaReport[] = [
  {
    id: 'rep-1',
    reporter: 'Bapak Ahmad Subagja',
    houseNumber: 'Blok B3 No. 04',
    title: 'Perbaikan Lampu Jalan Taman Blok B',
    category: 'Infrastruktur',
    content: 'Lampu jalan dekat taman bermain anak Blok B sudah mati selama 3 hari. Mohon dibantu perbaikannya agar anak-anak aman saat pulang mengaji ba’da Maghrib.',
    date: '2026-06-08',
    status: 'Diproses'
  },
  {
    id: 'rep-2',
    reporter: 'Ibu Ratna Dewi',
    houseNumber: 'Blok C1 No. 08',
    title: 'Fogging Nyamuk DBD Menjelang Musim Hujan',
    category: 'Aspirasi / Sosial',
    content: 'Mengingat musim hujan mulai sering, kami mengusulkan adanya program fogging berkala bekerjasama dengan Puskesmas Sawangan guna mencegah wabah demam berdarah.',
    date: '2026-06-07',
    status: 'Selesai'
  },
  {
    id: 'rep-3',
    reporter: 'Bapak Rudi Hartono',
    houseNumber: 'Blok A2 No. 15',
    title: 'Pembersihan Saluran Air Depan Gerbang Utama',
    category: 'Kebersihan',
    content: 'Penyumbatan ranting kering di got depan ruko sering menyebabkan air tergenang saat hujan lebat tiba. Usul dimasukkan ke agenda utama kerja bakti.',
    date: '2026-06-05',
    status: 'Selesai'
  }
];

const EMERGENCY_CONTACTS = [
  { name: 'POS Satpam Utama OGP (24 Jam)', phone: '081298765432', role: 'Security & Tamu' },
  { name: 'Ketua RT 08 (Blok A s/d C) - Pak Hermawan', phone: '081312345678', role: 'Administrasi RT 08' },
  { name: 'Ketua RT 07 (Blok D s/d G) - Pak Roni', phone: '085711112222', role: 'Administrasi RT 07' },
  { name: 'Ketua RT 06 (Blok H s/d K) - Pak Budi', phone: '081299998888', role: 'Administrasi RT 06' },
  { name: 'Ambulans DKM MAAR3 (Siaga Umat)', phone: '089988877777', role: 'Kesehatan & Darurat' },
  { name: 'Pemadam Kebakaran Depok (Upt Sawangan)', phone: '0217520113', role: 'Kebakaran/Penyelamatan' }
];

export default function WargaPanel({ showFullHeader = false }: WargaPanelProps) {
  const [activeSubTab, setActiveSubTab] = useState<'kependudukan' | 'data-warga' | 'layanan' | 'aspirasi' | 'gotong-royong'>('kependudukan');
  
  // States for Warga Database
  const [wargaList, setWargaList] = useState<HouseholdWarga[]>([]);
  
  // Search & Filter state
  const [searchTermWarga, setSearchTermWarga] = useState('');
  const [filterRt, setFilterRt] = useState<string>('Semua');
  const [filterOccupancy, setFilterOccupancy] = useState<string>('Semua');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');
  
  // New Warga state
  const [newWargaName, setNewWargaName] = useState('');
  const [newWargaRt, setNewWargaRt] = useState<'08' | '07' | '06'>('08');
  const [newWargaAddress, setNewWargaAddress] = useState('');
  const [newWargaFamilySize, setNewWargaFamilySize] = useState<number>(4);
  const [newWargaMarital, setNewWargaMarital] = useState<'Menikah' | 'Belum'>('Menikah');
  const [newWargaOccupancy, setNewWargaOccupancy] = useState<'Pemilik' | 'Kontrak'>('Pemilik');
  const [newWargaOccupation, setNewWargaOccupation] = useState('');
  const [newWargaPhone, setNewWargaPhone] = useState('');
  const [wargaSuccessMsg, setWargaSuccessMsg] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // States for Layanan Mandiri (Surat Pengantar RT)
  const [letterName, setLetterName] = useState('');
  const [letterNik, setLetterNik] = useState('');
  const [letterPhone, setLetterPhone] = useState('');
  const [letterAddress, setLetterAddress] = useState('');
  const [letterType, setLetterType] = useState('Surat Keterangan Domisili');
  const [letterReason, setLetterReason] = useState('');
  const [letterSuccess, setLetterSuccess] = useState<any | null>(null);

  // States for Aspirasi / Laporan warga
  const [reports, setReports] = useState<WargaReport[]>([]);
  const [repName, setRepName] = useState('');
  const [repAddress, setRepAddress] = useState('');
  const [repTitle, setRepTitle] = useState('');
  const [repCategory, setRepCategory] = useState<'Keamanan' | 'Infrastruktur' | 'Kebersihan' | 'Aspirasi / Sosial' | 'Lainnya'>('Infrastruktur');
  const [repContent, setRepContent] = useState('');
  const [repSuccessMsg, setRepSuccessMsg] = useState(false);

  // Gotong royong RSVP status
  const [attendance, setAttendance] = useState<JemaahAttendance[]>([]);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAddress, setRsvpAddress] = useState('');
  const [rsvpPax, setRsvpPax] = useState(1);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Initialize data
  useEffect(() => {
    // Warga Database
    const cachedWarga = localStorage.getItem('ogp_warga_database');
    if (cachedWarga) {
      setWargaList(JSON.parse(cachedWarga));
    } else {
      setWargaList(DEFAULT_WARGA);
      localStorage.setItem('ogp_warga_database', JSON.stringify(DEFAULT_WARGA));
    }

    // Reports
    const cachedReports = localStorage.getItem('ogp_warga_reports');
    if (cachedReports) {
      setReports(JSON.parse(cachedReports));
    } else {
      setReports(DEFAULT_REPORTS);
      localStorage.setItem('ogp_warga_reports', JSON.stringify(DEFAULT_REPORTS));
    }

    // Gotong royong attendance
    const cachedAttendance = localStorage.getItem('ogp_warga_attendance');
    if (cachedAttendance) {
      setAttendance(JSON.parse(cachedAttendance));
    } else {
      const initialAttendance: JemaahAttendance[] = [
        { name: 'Bapak Gunawan', houseNumber: 'Blok A3 No. 02', pax: 2 },
        { name: 'Bapak Ahmad Fauzi', houseNumber: 'Blok C2 No. 10', pax: 1 },
        { name: 'Bapak Rudi Setiawan', houseNumber: 'Blok B1 No. 05', pax: 1 },
        { name: 'Mas Heri Prasetyo', houseNumber: 'Blok D3 No. 01', pax: 2 }
      ];
      setAttendance(initialAttendance);
      localStorage.setItem('ogp_warga_attendance', JSON.stringify(initialAttendance));
    }
  }, []);

  // Handle Warga Database Operations
  const handleDeleteWarga = (id: string) => {
    const updated = wargaList.filter(item => item.id !== id);
    setWargaList(updated);
    localStorage.setItem('ogp_warga_database', JSON.stringify(updated));
  };

  const handleAddWarga = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWargaName || !newWargaAddress || !newWargaOccupation) {
      return;
    }
    
    const newRecord: HouseholdWarga = {
      id: `w-${Date.now()}`,
      name: newWargaName,
      rt: newWargaRt,
      houseNumber: newWargaAddress,
      familySize: Number(newWargaFamilySize),
      maritalStatus: newWargaMarital,
      occupancyStatus: newWargaOccupancy,
      occupation: newWargaOccupation,
      phone: newWargaPhone
    };
    
    const updated = [...wargaList, newRecord];
    setWargaList(updated);
    localStorage.setItem('ogp_warga_database', JSON.stringify(updated));
    
    // Clear inputs
    setNewWargaName('');
    setNewWargaAddress('');
    setNewWargaOccupation('');
    setNewWargaPhone('');
    setNewWargaFamilySize(4);
    
    setWargaSuccessMsg(true);
    setTimeout(() => {
      setWargaSuccessMsg(false);
    }, 4500);
  };

  const filteredWarga = wargaList.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTermWarga.toLowerCase()) ||
      item.houseNumber.toLowerCase().includes(searchTermWarga.toLowerCase()) ||
      item.occupation.toLowerCase().includes(searchTermWarga.toLowerCase());
      
    const matchesRt = filterRt === 'Semua' || item.rt === filterRt;
    const matchesOccupancy = filterOccupancy === 'Semua' || item.occupancyStatus === filterOccupancy;
    const matchesStatus = filterStatus === 'Semua' || item.maritalStatus === filterStatus;
    
    return matchesSearch && matchesRt && matchesOccupancy && matchesStatus;
  });

  const totalKK = wargaList.length;
  const totalJiwa = wargaList.reduce((acc, curr) => acc + curr.familySize, 0);
  const totalPemilik = wargaList.filter(item => item.occupancyStatus === 'Pemilik').length;
  const totalKontrak = wargaList.filter(item => item.occupancyStatus === 'Kontrak').length;

  // Handle Surat Pengantar Submission
  const handleSubmitLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterName || !letterNik || !letterPhone || !letterAddress || !letterReason) {
      return;
    }

    const reqId = `SP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newSubmission = {
      id: reqId,
      name: letterName,
      nik: letterNik,
      phone: letterPhone,
      address: letterAddress,
      type: letterType,
      reason: letterReason,
      date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setLetterSuccess(newSubmission);
  };

  // Handle Aspiration/Report Submission
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repName || !repAddress || !repTitle || !repContent) {
      return;
    }

    const newReport: WargaReport = {
      id: `REP-${Math.floor(100 + Math.random() * 900)}`,
      reporter: repName,
      houseNumber: repAddress,
      title: repTitle,
      category: repCategory,
      content: repContent,
      date: new Date().toISOString().split('T')[0],
      status: 'Baru'
    };

    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('ogp_warga_reports', JSON.stringify(updatedReports));

    // Reset Form
    setRepName('');
    setRepAddress('');
    setRepTitle('');
    setRepContent('');
    setRepSuccessMsg(true);
    setTimeout(() => setRepSuccessMsg(false), 4000);
  };

  // Handle Gotong Royong RSVP
  const handleRsvpGotongRoyong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName || !rsvpAddress) {
      return;
    }

    const newAttendee: JemaahAttendance = {
      name: rsvpName,
      houseNumber: rsvpAddress,
      pax: Number(rsvpPax)
    };

    const updated = [...attendance, newAttendee];
    setAttendance(updated);
    localStorage.setItem('ogp_warga_attendance', JSON.stringify(updated));

    setRsvpName('');
    setRsvpAddress('');
    setRsvpPax(1);
    setRsvpSuccess(true);
    setTimeout(() => setRsvpSuccess(false), 4000);
  };

  // Direct WhatsApp helper for Surat Pengantar
  const getWhatsAppLink = (item: any) => {
    const text = `Bismillah,%20Assalamualaikum%20Pak%20RT%20Pengurus%20OGP.%0A%0ASaya%20ingin%20mengonfirmasi%20pengajuan%20*${encodeURIComponent(item.type)}*%20dan%20memohon%20verifikasi%20selanjutnya.%0A%0A*Detail%20Pengajuan:*%0A-%20*No.%20Pengajuan:*%20${item.id}%0A-%20*Nama:*%20${encodeURIComponent(item.name)}%0A-%20*NIK:*%20${item.nik}%0A-%20*Alamat:*%20${encodeURIComponent(item.address)}%0A-%20*Keperluan:*%20${encodeURIComponent(item.reason)}%0A-%20*Tanggal%20Pengajuan:*%20${encodeURIComponent(item.date)}%0A%0ATerima%20kasih%20banyak%20atas%20bantuannya%20Pak%20RT,%20Wassalamualaikum.`;
    return `https://wa.me/6281312345678?text=${text}`;
  };

  const totalVolunteers = attendance.reduce((sum, item) => sum + item.pax, 0);

  return (
    <div id="warga-portal-section" className="bg-emerald-950 text-white transition-colors">
      
      {/* Immersive Header Banner (If navigating directly or required) */}
      {showFullHeader ? (
        <div className="relative py-20 bg-emerald-950 overflow-hidden flex items-center justify-center text-center">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center scale-102 filter brightness-[0.35] contrast-[1.05]"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1600')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent z-10" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl z-10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-20 text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/15 border border-emerald-400/30 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold tracking-wide uppercase mb-3 shadow-md backdrop-blur-sm justify-center">
              <Users className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>KERUKUNAN & LAYANAN WARGA</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-black tracking-wider text-white uppercase mb-3 leading-tight text-center">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Portal Warga OGP
              </span>
            </h2>

            <p className="text-xs md:text-sm text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed text-center">
              Pusat Integrasi Layanan Rukun Tetangga (RT), Transparansi Kas Kerukunan, Laporan Keamanan, dan Kesejahteraan Sosial Perumahan Orchid Green Park, Sawangan, Depok.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center space-y-2 mb-10 flex flex-col items-center justify-center text-center w-full">
            <div className="inline-flex items-center space-x-1.5 bg-emerald-500/15 border border-emerald-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider justify-center">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Sinergi & Guyub Rukun</span>
            </div>
            <h2 className="text-3xl md:text-4.5xl font-serif font-black tracking-tight text-white uppercase leading-none text-center">
              Portal Warga Orchid Green Park
            </h2>
            <div className="w-16 h-1 bg-amber-400 mx-auto rounded-full" />
            <p className="text-xs md:text-sm text-emerald-250/70 max-w-2xl mx-auto font-sans leading-relaxed text-center">
              Membangun kemaslahatan batiniah lewat masjid, mengokohkan kerukunan dhohiriah antar warga melalui ketertiban administrasi perumahan yang cerdas dan transparan.
            </p>
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        
        {/* Left Side: Sidebar Stats & Navigation Tabs */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Statistic Population Widget */}
          <div className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 border border-emerald-500/20 text-white shadow-lg">
            <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-amber-400" />
              Statistik Kependudukan OGP
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-800 border border-emerald-500/20 text-left shadow-lg shadow-emerald-500/10 text-white">
                <span className="text-xs text-emerald-100 font-sans font-medium">Kepala Keluarga</span>
                <p className="text-2xl font-bold font-serif mt-1">184 <span className="text-xs font-sans font-normal text-emerald-200">KK</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-600 dark:to-amber-700 border border-amber-500/20 text-left shadow-lg shadow-amber-500/10 text-white">
                <span className="text-xs text-amber-100 font-sans font-medium">Total Jiwa</span>
                <p className="text-2xl font-bold font-serif mt-1">620 <span className="text-xs font-sans font-normal text-amber-200">Jiwa</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-600 dark:to-rose-700 border border-rose-500/20 text-left shadow-lg shadow-rose-500/10 text-white">
                <span className="text-xs text-rose-100 font-sans font-medium">Balita / Anak</span>
                <p className="text-2xl font-bold font-serif mt-1">45 <span className="text-xs font-sans font-normal text-rose-200">Anak</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 dark:from-sky-700 dark:to-sky-850 border border-sky-500/20 text-left shadow-lg shadow-sky-500/10 text-white">
                <span className="text-xs text-sky-100 font-sans font-medium">Lansia / Sepuh</span>
                <p className="text-2xl font-bold font-serif mt-1">38 <span className="text-xs font-sans font-normal text-sky-200">Orang</span></p>
              </div>
            </div>
            
            <p className="text-[11px] text-emerald-200/60 text-left mt-3 leading-relaxed">
              *Data terintegrasi berkala bekerjasama dengan Kader Posyandu, Ketua RT 08, RT 07, & RT 06 Orchid Green Park Sawangan Depok.
            </p>
          </div>

          {/* Tab Selection */}
          <div className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-3 border border-emerald-500/20 flex flex-col space-y-1">
            <button
              onClick={() => setActiveSubTab('kependudukan')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all text-left ${
                activeSubTab === 'kependudukan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Heart className={`w-4.5 h-4.5 ${activeSubTab === 'kependudukan' ? 'text-white' : 'text-emerald-300'}`} />
                <span>Info &amp; Kontak Penting</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveSubTab('data-warga')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all text-left ${
                activeSubTab === 'data-warga'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-4.5 h-4.5 ${activeSubTab === 'data-warga' ? 'text-white' : 'text-emerald-300'}`} />
                <span>Database Kependudukan</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => {
                setActiveSubTab('layanan');
                setLetterSuccess(null);
              }}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all text-left ${
                activeSubTab === 'layanan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className={`w-4.5 h-4.5 ${activeSubTab === 'layanan' ? 'text-white' : 'text-emerald-300'}`} />
                <span>Layanan Surat Pengantar</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveSubTab('aspirasi')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all text-left ${
                activeSubTab === 'aspirasi'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className={`w-4.5 h-4.5 ${activeSubTab === 'aspirasi' ? 'text-white' : 'text-emerald-300'}`} />
                <span>Laporan & Aspirasi Warga</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => setActiveSubTab('gotong-royong')}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl text-sm font-medium transition-all text-left ${
                activeSubTab === 'gotong-royong'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-100 hover:text-amber-300 hover:bg-emerald-900/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <ClipboardList className={`w-4.5 h-4.5 ${activeSubTab === 'gotong-royong' ? 'text-white' : 'text-emerald-300'}`} />
                <span>Kas & Goyong Royong</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </div>

          {/* Emergency Call directory card */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 rounded-3xl p-6 text-white text-left shadow-md relative overflow-hidden mt-6">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-white">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" />
              </svg>
            </div>
            <h4 className="font-serif font-black text-lg text-amber-300 flex items-center gap-2 mb-2">
              <PhoneCall className="w-5 h-5 text-amber-400 animate-bounce" />
              Kontak Penting & Darurat
            </h4>
            <p className="text-xs text-emerald-200/90 leading-relaxed mb-4">
              Butuh pertolongan darurat atau pengaduan keamanan di wilayah perumahan Orchid Green Park? Hubungi nomor siaga di bawah.
            </p>
            
            <div className="space-y-3">
              {EMERGENCY_CONTACTS.slice(0, 3).map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-white/10 p-2.5 rounded-xl border border-white/5">
                  <div className="min-w-0 pr-2">
                    <span className="block text-[10px] uppercase font-bold text-amber-300 tracking-wider font-mono truncate">{item.role}</span>
                    <span className="block text-xs font-serif font-bold text-white leading-tight mt-0.5 truncate">{item.name}</span>
                  </div>
                  <a 
                    href={`tel:${item.phone}`}
                    className="py-1 px-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 text-[10px] font-bold rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                  >
                    Hubungi
                  </a>
                </div>
              ))}
            </div>
          </div>



        </div>

        {/* Right Side: Active Tab View Frame */}
        <div className="lg:col-span-8">
          
          <AnimatePresence mode="wait">
            {/* SUB-TAB 1: INFO KEPENDUDUKAN & KONTAK LENGKAP */}
            {activeSubTab === 'kependudukan' && (
              <motion.div
                key="info-warga"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-500/20 text-left space-y-6 text-white shadow-xl"
              >
                <div>
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wide">
                    Informasi Layanan Rukun Tetangga (RT)
                  </h3>
                  <div className="w-12 h-1 bg-amber-400 mt-2 mb-4 rounded-full" />
                  <p className="text-sm text-emerald-200/85 leading-relaxed font-sans">
                    Wilayah Perumahan Orchid Green Park (OGP) Sawangan secara administratif dibagi menjadi tiga Rukun Tetangga (RT) yang bernaung di bawah Rukun Warga (RW) setempat. Sinergitas pelayanan ini ditujukan demi keamanan, ketertiban umum, dan ukhuwah kekeluargaan tetangga yang berkah.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* RT 08 panel */}
                  <div className="p-5 rounded-2xl bg-emerald-955/40 border border-emerald-500/20 block text-left">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold uppercase tracking-widest font-mono">
                      Wilayah RT 08
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white mt-1.5 mb-1">
                      Blok A, B, dan C
                    </h4>
                    <span className="block text-xs text-emerald-300 font-sans">
                      Ketua RT: Bapak Hermawan
                    </span>
                    <p className="text-xs text-emerald-100/70 mt-3 leading-relaxed">
                      Melayani administrasi, pengantar domisili, surat nikah, surat kematian, serta pengaduan sosial kelengkapan umum untuk rumah-rumah di area depan komplek (Blok A, B, dsb).
                    </p>
                    <div className="border-t border-emerald-500/10 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-250/50 font-mono">Dikelola 24 Jam Siaga</span>
                      <a 
                        href="https://wa.me/6281312345678" 
                        target="_blank" 
                        rel="referrer" 
                        className="text-xs font-semibold text-amber-305 hover:text-amber-400 hover:underline inline-flex items-center gap-1 font-bold"
                      >
                        Tanya RT 08 &rarr;
                      </a>
                    </div>
                  </div>

                  {/* RT 07 panel */}
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 block text-left">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-bold uppercase tracking-widest font-mono">
                      Wilayah RT 07
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white mt-1.5 mb-1">
                      Blok D, E, F, dan G
                    </h4>
                    <span className="block text-xs text-emerald-300 font-sans">
                      Ketua RT: Bapak Roni
                    </span>
                    <p className="text-xs text-emerald-100/70 mt-3 leading-relaxed">
                      Melayani kebutuhan administrasi kependudukan warga di perumahan bagian tengah hingga belakang (Blok D, E, F, G). Sangat aktif menyelenggarakan gotong-royong kerja bakti dwi pekanan.
                    </p>
                    <div className="border-t border-emerald-500/10 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-250/50 font-mono">Respon Cepat Jam Kerja</span>
                      <a 
                        href="https://wa.me/6285711112222" 
                        target="_blank" 
                        rel="referrer" 
                        className="text-xs font-semibold text-amber-305 hover:text-amber-400 hover:underline inline-flex items-center gap-1 font-bold"
                      >
                        Tanya RT 07 &rarr;
                      </a>
                    </div>
                  </div>

                  {/* RT 06 panel */}
                  <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 block text-left">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-bold uppercase tracking-widest font-mono">
                      Wilayah RT 06
                    </span>
                    <h4 className="font-serif font-bold text-lg text-white mt-1.5 mb-1">
                      Blok H, I, J, dan K
                    </h4>
                    <span className="block text-xs text-emerald-300 font-sans">
                      Ketua RT: Bapak Budi
                    </span>
                    <p className="text-xs text-emerald-100/70 mt-3 leading-relaxed">
                      Melayani integrasi sosial, ketertiban lingkungan komplek baru, koordinasi jaminan sosial, serta pembangunan lanskap taman warga ramah anak di klaster bagian Blok H, I, J, K.
                    </p>
                    <div className="border-t border-emerald-500/10 pt-3 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-250/50 font-mono">Ramah & Siap Melayani</span>
                      <a 
                        href="https://wa.me/6281299998888" 
                        target="_blank" 
                        rel="referrer" 
                        className="text-xs font-semibold text-amber-305 hover:text-amber-400 hover:underline inline-flex items-center gap-1 font-bold"
                      >
                        Tanya RT 06 &rarr;
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency Directory Full */}
                <div className="bg-emerald-950/50 p-6 rounded-2xl border border-emerald-500/20">
                  <h4 className="font-serif font-bold text-base text-white mb-4 flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-amber-400" />
                    Daftar Kontak Lengkap Layanan Lingkungan
                  </h4>
                  <div className="divide-y divide-emerald-500/10 font-sans">
                    {EMERGENCY_CONTACTS.map((item, id) => (
                       <div key={id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 first:pt-0 last:pb-0">
                        <div>
                          <span className="text-xs font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-emerald-300/85 font-mono uppercase tracking-wider">{item.role}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold text-emerald-200/70">{item.phone}</span>
                          <a 
                            href={`tel:${item.phone}`} 
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg border border-emerald-500 hover:shadow-md font-bold transition-all"
                          >
                            Panggil
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


              </motion.div>
            )}

            {/* SUB-TAB: DATABASE KEPENDUDUKAN OGP */}
            {activeSubTab === 'data-warga' && (
              <motion.div
                key="database-warga"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-500/20 text-left space-y-6 text-white shadow-xl"
              >
                <div>
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wide flex items-center gap-2">
                    <Users className="w-6 h-6 text-amber-400" />
                    Database &amp; Statistik Kependudukan OGP
                  </h3>
                  <div className="w-12 h-1 bg-amber-400 mt-2 mb-4 rounded-full" />
                  <p className="text-sm text-emerald-200/85 leading-relaxed font-sans">
                    Halaman transparansi data administrasi rukun warga komplek Orchid Green Park. Dikelola bersama pengarah lingkungan, sekretaris RT 08, RT 07, dan RT 06 dalam memantau pertumbuhan statistik kemasyarakatan.
                  </p>
                </div>

                {/* Dashboard Statistik Mini */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 dark:from-emerald-700 dark:to-emerald-800 border border-emerald-500/10 text-left shadow-lg shadow-emerald-500/10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100 font-mono">KK Terdaftar</span>
                    <p className="text-2xl font-bold font-serif mt-1">{totalKK} <span className="text-xs font-sans font-normal text-emerald-250">Kel.</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-650 to-amber-500 dark:from-amber-600 dark:to-amber-700 border border-amber-500/10 text-left shadow-lg shadow-amber-500/10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-100 font-mono">Jiwa Terdata</span>
                    <p className="text-2xl font-bold font-serif mt-1">{totalJiwa} <span className="text-xs font-sans font-normal text-amber-200">Jiwa</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-500 dark:from-rose-600 dark:to-rose-700 border border-rose-500/10 text-left shadow-lg shadow-rose-500/10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-rose-100 font-mono">Rasio Pemilik</span>
                    <p className="text-2xl font-bold font-serif mt-1">{totalPemilik} / {totalKK} <span className="text-[11px] font-sans font-normal text-rose-200">Asli</span></p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-600 to-sky-500 dark:from-sky-700 dark:to-sky-850 border border-sky-500/10 text-left shadow-lg shadow-sky-500/10 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-sky-100 font-mono">Rasio Kontrak</span>
                    <p className="text-2xl font-bold font-serif mt-1">{totalKontrak} / {totalKK} <span className="text-[11px] font-sans font-normal text-sky-200">Sewa</span></p>
                  </div>
                </div>                {/* Form Toggle & Success Alert */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="text-xs font-semibold text-emerald-200/85">
                    Daftar Warga: <strong className="text-amber-305 font-mono bg-emerald-955/50 border border-emerald-500/20 px-2 py-1 rounded shadow-sm">{filteredWarga.length}</strong> KK cocok dengan filter
                  </div>
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-sans text-xs uppercase tracking-wide cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    {showAddForm ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    {showAddForm ? 'Tutup Formulir' : 'Registrasi Warga Baru'}
                  </button>
                </div>

                {/* Adding form */}
                <AnimatePresence>
                  {showAddForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddWarga}
                      className="bg-emerald-955/40 p-5 rounded-2xl border border-emerald-500/20 space-y-4 text-xs font-sans text-left overflow-hidden block text-white shadow-md"
                    >
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5 font-serif">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Tambah Data Anggota Kerukunan Baru
                      </h4>
                      {wargaSuccessMsg && (
                        <div className="p-3 bg-emerald-500/20 border border-emerald-555/20 text-emerald-300 font-bold rounded-xl mb-2">
                          Maa syaa Allah, data KK baru berhasil ditambahkan!
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Nama Kepala Keluarga (KK)</label>
                          <input
                            type="text"
                            required
                            value={newWargaName}
                            onChange={(e) => setNewWargaName(e.target.value)}
                            placeholder="Contoh: Bapak Hamdan"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Pekerjaan Utama</label>
                          <input
                            type="text"
                            required
                            value={newWargaOccupation}
                            onChange={(e) => setNewWargaOccupation(e.target.value)}
                            placeholder="Contoh: Karyawan Swasta"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Nomor WA HP</label>
                          <input
                            type="text"
                            value={newWargaPhone}
                            onChange={(e) => setNewWargaPhone(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Contoh: 0812xxxxxxxx"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Wilayah Rukun Tetangga (RT)</label>
                          <select
                            value={newWargaRt}
                            onChange={(e: any) => setNewWargaRt(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                          >
                            <option value="08" className="bg-emerald-900 text-white">RT 08 (Blok A, B, C)</option>
                            <option value="07" className="bg-emerald-900 text-white">RT 07 (Blok D, E, F, G)</option>
                            <option value="06" className="bg-emerald-900 text-white">RT 06 (Blok H, I, J, K)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">No. Rumah &amp; Blok</label>
                          <input
                            type="text"
                            required
                            value={newWargaAddress}
                            onChange={(e) => setNewWargaAddress(e.target.value)}
                            placeholder="Contoh: Blok B2 No. 04"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Jumlah Anggota Keluarga</label>
                          <input
                            type="number"
                            min={1}
                            max={12}
                            required
                            value={newWargaFamilySize}
                            onChange={(e) => setNewWargaFamilySize(Number(e.target.value))}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Status Keluarga</label>
                          <select
                            value={newWargaMarital}
                            onChange={(e: any) => setNewWargaMarital(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-500/25 bg-emerald-955/60 text-white focus:outline-none"
                          >
                            <option value="Menikah" className="bg-emerald-900 text-white">Menikah</option>
                            <option value="Belum" className="bg-emerald-900 text-white">Belum Menikah / Single</option>
                          </select>
                        </div>
                      </div>                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-emerald-200 mb-1">Status Kepemilikan Hunian</label>
                          <div className="flex gap-4 mt-1.5 pl-1">
                            <label className="flex items-center gap-2 text-emerald-200">
                              <input
                                type="radio"
                                name="occupancyStatus"
                                checked={newWargaOccupancy === 'Pemilik'}
                                onChange={() => setNewWargaOccupancy('Pemilik')}
                                className="text-amber-500 focus:ring-amber-400 bg-emerald-950/70 border-emerald-500/20"
                              />
                              Pemilik Hunian (Milik Sendiri)
                            </label>
                            <label className="flex items-center gap-2 text-emerald-200">
                              <input
                                type="radio"
                                name="occupancyStatus"
                                checked={newWargaOccupancy === 'Kontrak'}
                                onChange={() => setNewWargaOccupancy('Kontrak')}
                                className="text-amber-500 focus:ring-amber-400 bg-emerald-950/70 border-emerald-500/20"
                              />
                              Ngontrak / Sewa Rumah
                            </label>
                          </div>
                        </div>
                        <div className="flex items-end justify-end">
                          <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-555 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-all text-xs uppercase tracking-wider shadow-sm flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Simpan Data Warga
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Filter & Search Bar */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 font-sans text-xs text-slate-900 dark:text-white shadow-inner">
                  {/* Search bar */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="font-extrabold text-emerald-700 dark:text-emerald-305 mb-1 block uppercase tracking-wider text-[10px]">Pencarian Cepat</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={searchTermWarga}
                        onChange={(e) => setSearchTermWarga(e.target.value)}
                        placeholder="Nama, alamat, atau pekerjaan..."
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-505"
                      />
                    </div>
                  </div>

                  {/* Filter RT */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="font-extrabold text-emerald-700 dark:text-emerald-305 mb-1 block uppercase tracking-wider text-[10px]">Filter RT</label>
                    <select
                      value={filterRt}
                      onChange={(e) => setFilterRt(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Semua" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Semua Wilayah</option>
                      <option value="08" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">RT 08 (A, B, C)</option>
                      <option value="07" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">RT 07 (D, E, F, G)</option>
                      <option value="06" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">RT 06 (H, I, J, K)</option>
                    </select>
                  </div>

                  {/* Filter Kepemilikan */}
                  <div className="md:col-span-3 space-y-1">
                    <label className="font-extrabold text-emerald-700 dark:text-emerald-305 mb-1 block uppercase tracking-wider text-[10px]">Filter Kepemilikan</label>
                    <select
                      value={filterOccupancy}
                      onChange={(e) => setFilterOccupancy(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Semua" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Semua Kepemilikan</option>
                      <option value="Pemilik" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Milik Sendiri (Pemilik)</option>
                      <option value="Kontrak" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Ngontrak / Sewa</option>
                    </select>
                  </div>

                  {/* Filter Status */}
                  <div className="md:col-span-3 space-y-1">
                    <label className="font-extrabold text-emerald-700 dark:text-emerald-305 mb-1 block uppercase tracking-wider text-[10px]">Filter Status Keluarga</label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-2 py-2 text-xs rounded-xl border border-slate-250 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="Semua" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Semua Status</option>
                      <option value="Menikah" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Menikah</option>
                      <option value="Belum" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Belum Menikah</option>
                    </select>
                  </div>
                </div>                {/* Database Table / List container */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-950/40">
                  {/* Large screen Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs font-sans">
                      <thead>
                        <tr className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[10px]">
                          <th className="p-4">Nama KK</th>
                          <th className="p-4">RT</th>
                          <th className="p-4">No. Rumah</th>
                          <th className="p-4">Anggota Kel.</th>
                          <th className="p-4">Status Pernikahan</th>
                          <th className="p-4">Hunian</th>
                          <th className="p-4">Pekerjaan</th>
                          <th className="p-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150 dark:divide-slate-800/65">
                        {filteredWarga.length > 0 ? (
                          filteredWarga.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-900/30 text-slate-700 dark:text-slate-350 transition-colors">
                              <td className="p-4 font-bold text-slate-900 dark:text-white">{item.name}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded font-bold font-mono text-[10px] ${item.rt === '06' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-900/40' : item.rt === '07' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40' : 'bg-sky-100 dark:bg-sky-950/40 text-sky-800 dark:text-sky-305 border border-sky-200/50 dark:border-sky-900/40'}`}>
                                  RT {item.rt}
                                </span>
                              </td>
                              <td className="p-4 font-mono font-medium">{item.houseNumber}</td>
                              <td className="p-4 font-mono">{item.familySize} Jiwa</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${item.maritalStatus === 'Menikah' ? 'bg-pink-100 dark:bg-pink-950/30 text-pink-700 dark:text-pink-300' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                  {item.maritalStatus}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.occupancyStatus === 'Pemilik' ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300' : 'bg-sky-100 dark:bg-sky-950/30 text-sky-700 dark:text-sky-305'}`}>
                                  {item.occupancyStatus}
                                </span>
                              </td>
                              <td className="p-4 text-slate-600 dark:text-slate-400">{item.occupation}</td>
                              <td className="p-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteWarga(item.id)}
                                  title="Hapus data warga"
                                  className="p-2 cursor-pointer text-rose-500 hover:text-rose-600 dark:text-rose-450 hover:bg-rose-500/10 rounded-xl transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-slate-400 dark:text-slate-500 italic">
                              Tidak ada data kependudukan warga yang sesuai dengan filter pencarian tersebut.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile responsive Cards instead of tables */}
                  <div className="block md:hidden divide-y divide-slate-150 dark:divide-slate-800/60">
                    {filteredWarga.length > 0 ? (
                      filteredWarga.map((item) => (
                        <div key={item.id} className="p-4 hover:bg-slate-100/40 dark:hover:bg-slate-900/30 text-left font-sans space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white text-sm block">{item.name}</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">No. ID: {item.id}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteWarga(item.id)}
                              className="p-2 text-rose-500 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                            <div>
                              <strong className="block text-emerald-800 dark:text-emerald-305 font-bold">Alamat / RT:</strong>
                              <span>{item.houseNumber} (RT {item.rt})</span>
                            </div>
                            <div>
                              <strong className="block text-emerald-800 dark:text-emerald-305 font-bold">Anggota Keluarga:</strong>
                              <span>{item.familySize} Orang (Jiwa)</span>
                            </div>
                            <div>
                              <strong className="block text-emerald-800 dark:text-emerald-305 font-bold">Pekerjaan:</strong>
                              <span>{item.occupation}</span>
                            </div>
                            <div>
                              <strong className="block text-emerald-800 dark:text-emerald-305 font-bold">Status Hunian &amp; Sipil:</strong>
                              <span className="flex flex-wrap gap-1 mt-0.5">
                                <span className="px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-extrabold">{item.occupancyStatus}</span>
                                <span className="px-1.5 py-0.2 rounded bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-extrabold">{item.maritalStatus}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400 dark:text-slate-500 italic">
                        Tidak ada data kependudukan warga yang sesuai dengan filter pencarian tersebut.
                      </div>
                    )}
                  </div>
                </div>

                {/* Disclaimer information note at footer */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-200 leading-relaxed text-xs">
                  <strong>Pemberitahuan Keamanan Data:</strong> Database kependudukan ini disimpan secara lokal demi privasi warga komplek Orchid Green Park. Hanya dapat dilihat dan digunakan sebagai visualisasi statistik dan pencatatan kas internal rukun tetangga.
                </div>
              </motion.div>
            )}

            {/* SUB-TAB 2: LAYANAN SURAT PENGANTAR RT/RW */}
            {activeSubTab === 'layanan' && (
              <motion.div
                key="layanan-warga"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-500/20 text-left text-white shadow-xl"
              >
                <div>
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wide">
                    Layanan Surat Pengantar RT/RW Mandiri
                  </h3>
                  <div className="w-12 h-1 bg-amber-400 mt-2 mb-4 rounded-full" />
                  <p className="text-sm text-emerald-200/85 leading-relaxed mb-6 font-sans">
                    Formulir pengajuan online Surat Pengantar RT/RW untuk keperluan KTP, Kartu Keluarga, keterangan nikah, keterangan domisili, ataupun urusan lainnya. Isi form di bawah ini secara lengkap untuk pembuatan dokumen otomatis.
                  </p>
                </div>

                {!letterSuccess ? (
                  <form onSubmit={handleSubmitLetter} className="space-y-4 font-sans text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Nama Lengkap Sesuai KTP</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-350" />
                          <input
                            type="text"
                            required
                            value={letterName}
                            onChange={(e) => setLetterName(e.target.value)}
                            placeholder="Contoh: Muhammad Yusuf"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Nomor Induk Kependudukan (NIK)</label>
                        <div className="relative">
                          <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-350" />
                          <input
                            type="text"
                            required
                            pattern="[0-9]{16}"
                            maxLength={16}
                            value={letterNik}
                            onChange={(e) => setLetterNik(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="16 Digit NIK Anda"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Nomor WhatsApp HP</label>
                        <div className="relative">
                          <PhoneCall className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-350" />
                          <input
                            type="tel"
                            required
                            value={letterPhone}
                            onChange={(e) => setLetterPhone(e.target.value)}
                            placeholder="Contoh: 0812XXXXXXXX"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Alamat / Nomor Rumah & Blok</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-350" />
                          <input
                            type="text"
                            required
                            value={letterAddress}
                            onChange={(e) => setLetterAddress(e.target.value)}
                            placeholder="Contoh: Blok B3 No. 04, RT 08 OGP"
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Jenis Surat Pengantar</label>
                        <select
                          value={letterType}
                          onChange={(e) => setLetterType(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/55 text-white focus:outline-none focus:ring-1 focus:ring-amber-405"
                        >
                          <option value="Surat Keterangan Domisili" className="bg-emerald-900 text-white">Surat Keterangan Domisili</option>
                          <option value="Surat Pengantar Pembuatan KTP" className="bg-emerald-900 text-white">Surat Pengantar Pembuatan KTP / KK</option>
                          <option value="Surat Pengantar Pengurusan Surat Nikah" className="bg-emerald-900 text-white">Surat Pengantar Pengurusan Surat Nikah</option>
                          <option value="Surat Keterangan Usaha (SKU)" className="bg-emerald-900 text-white">Surat Keterangan Usaha (SKU)</option>
                          <option value="Surat Keterangan Baik / Pengantar Kepolisian" className="bg-emerald-900 text-white">Surat Pengantar SKCK / Kepolisian</option>
                          <option value="Lainnya" className="bg-emerald-900 text-white">Lainnya (Tulis di rincian keperluan)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-emerald-200/90 mb-1.5 uppercase tracking-wide">Rincian Keperluan / Alasan Pengajuan</label>
                        <textarea
                          required
                          rows={3}
                          value={letterReason}
                          onChange={(e) => setLetterReason(e.target.value)}
                          placeholder="Contoh: Mengurus perpindahan domisili dari Jakarta ke Sawangan Depok, atau Pembuatan rekening bank syariah baru."
                          className="w-full px-4 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-3 rounded-2xl cursor-pointer transition-all uppercase text-xs tracking-wider shadow-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Buat Surat &amp; Ajukan ke Pengurus RT
                    </button>
                  </form>
                ) : (
                  /* Success Print/View introduction letter component layout */
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-emerald-955/50 border border-emerald-500/35 text-white flex items-start gap-4 font-sans text-sm leading-relaxed">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shrink-0 mt-0.5 animate-bounce">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base">Pengajuan Berhasil Diproses!</h4>
                        <p className="text-xs text-emerald-200/90 mt-1">
                          Nomor Pelacakan Pengantar Anda adalah: <strong className="font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-550/20 text-yellow-300">{letterSuccess.id}</strong>. Silakan unduh dokumen sementara atau hubungi admin RT secara langsung untuk tanda tangan basah & cap resmi.
                        </p>
                      </div>
                    </div>                    {/* Simulation letter frame layout */}
                    <div className="p-8 bg-amber-50/95 rounded-2xl text-emerald-950 border border-amber-400/30 shadow-lg font-serif max-w-2xl mx-auto block">
                      {/* Letter Head Kop */}
                      <div className="text-center space-y-1 pb-4 border-b-2 border-emerald-950">
                        <h4 className="font-serif font-black text-sm uppercase tracking-wide text-emerald-900">RUKUN TETANGGA (RT) 08 / RW 12</h4>
                        <h3 className="font-serif font-black text-base uppercase tracking-wider text-emerald-955">PERUMAHAN ORCHID GREEN PARK</h3>
                        <p className="text-[10px] font-sans text-emerald-800/80">Pasir Putih, Kec. Sawangan, Depok, Jawa Barat 16519</p>
                      </div>

                      {/* Title of letter */}
                      <div className="text-center py-4 space-y-0.5 text-emerald-955">
                        <h5 className="font-bold underline text-sm uppercase">SURAT PENGANTAR WARGA</h5>
                        <p className="text-[10px] font-mono">No. Reg: {letterSuccess.id}/OGP-ADM/VI/2026</p>
                      </div>

                      {/* Content of letter body */}
                      <div className="text-xs text-left leading-relaxed space-y-3 font-sans text-emerald-900">
                        <p>Yang bertanda tangan di bawah ini Ketua RT 08/RW 12 Perumahan Orchid Green Park, menerangkan dengan sesungguhnya bahwa:</p>
                        
                        <div className="pl-6 space-y-1">
                          <p><strong className="inline-block w-28 text-emerald-955">Nama Lengkap</strong>: {letterSuccess.name}</p>
                          <p><strong className="inline-block w-28 text-emerald-955">N.I.K</strong>: {letterSuccess.nik}</p>
                          <p><strong className="inline-block w-28 text-emerald-955">Tempat Tinggal / Alamat</strong>: {letterSuccess.address}</p>
                          <p><strong className="inline-block w-28 text-emerald-955">Jenis Layanan</strong>: <span className="bg-emerald-100 font-bold px-2 py-0.5 rounded text-[10px] text-emerald-800 border border-emerald-300">{letterSuccess.type}</span></p>
                        </div>

                        <p>Orang tersebut di atas benar-benar warga domisili RT kami di Orchid Green Park. Surat pengantar ini diberikan untuk keperluan: <strong className="underline text-emerald-955">{letterSuccess.reason}</strong>.</p>
                        
                        <p>Demikian surat keterangan pengantar ini dibuat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
                      </div>

                      {/* Signature simulation */}
                      <div className="pt-8 flex justify-between text-xs font-sans text-emerald-900">
                        <div className="text-center w-40">
                          <span className="block text-emerald-700/80">Warga Pemohon</span>
                          <span className="block h-12" />
                          <strong className="block underline">{letterSuccess.name}</strong>
                        </div>
                        <div className="text-center w-44">
                          <span className="block text-emerald-700/80">Depok, {letterSuccess.date}</span>
                          <span className="block text-emerald-700/80">Ketua RT 08 OGP</span>
                          <span className="block h-4" />
                          <span className="block text-[8px] italic text-emerald-700 bg-emerald-100/90 py-0.5 px-2 rounded-full border border-emerald-300 scale-90 w-fit mx-auto font-bold">TERTANDA SECARA DIGITAL</span>
                          <span className="block h-2" />
                          <strong className="block underline">Bapak Hermawan</strong>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a 
                        href={getWhatsAppLink(letterSuccess)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-grow py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-sans text-xs uppercase cursor-pointer text-center flex items-center justify-center gap-2 shadow-sm"
                      >
                        <Send className="w-4.5 h-4.5" />
                        Konfirmasi ke WhatsApp RT &rarr;
                      </a>
                      
                      <button
                        onClick={() => {
                          setLetterName('');
                          setLetterNik('');
                          setLetterPhone('');
                          setLetterAddress('');
                          setLetterReason('');
                          setLetterSuccess(null);
                        }}
                        className="py-3 px-5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-sans text-xs font-bold uppercase transition-all"
                      >
                        Buat Pengajuan Baru
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}            {/* SUB-TAB 3: LAPORAN & ASPIRASI SALURAN ONLINE */}
            {activeSubTab === 'aspirasi' && (
              <motion.div
                key="laporan-warga"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-500/20 text-left space-y-8 text-white shadow-xl"
              >
                <div>
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wide">
                    Laporan, Aduan, &amp; Saluran Aspirasi Warga
                  </h3>
                  <div className="w-12 h-1 bg-amber-400 mt-2 mb-4 rounded-full" />
                  <p className="text-sm text-emerald-200/85 leading-relaxed font-sans">
                    Demi menjaga keasrian lingkungan, ketertiban fasilitas umum, serta penanganan masalah sosial secara responsif, warga dipersilakan mengunggah laporan rukun warga secara langsung melalui portal ini.
                  </p>
                </div>

                {/* Form to submit report */}
                <form onSubmit={handleSubmitReport} className="space-y-4 font-sans text-sm bg-emerald-950/40 p-5 rounded-2xl border border-emerald-500/20 block text-left text-white shadow-md">
                  <h4 className="font-serif font-bold text-base text-white mb-2 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-400" />
                    Buat Laporan / Aspirasi Baru
                  </h4>

                  {repSuccessMsg && (
                    <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-bold mb-3">
                      Jazaakumullahu Khayran! Laporan Anda berhasil diunggah dan terdaftar di papan aspirasi warga komplek.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-200/90 mb-1">Nama Pelapor (Warga OGP)</label>
                      <input
                        type="text"
                        required
                        value={repName}
                        onChange={(e) => setRepName(e.target.value)}
                        placeholder="Contoh: Bapak Gunawan"
                        className="w-full px-4 py-2 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-405"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200/90 mb-1">Blok & No. Rumah</label>
                      <input
                        type="text"
                        required
                        value={repAddress}
                        onChange={(e) => setRepAddress(e.target.value)}
                        placeholder="Contoh: Blok C3 No. 12"
                        className="w-full px-4 py-2 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-405"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-emerald-200/90 mb-1">Kategori Masalah</label>
                      <select
                        value={repCategory}
                        onChange={(e: any) => setRepCategory(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-emerald-500/25 bg-emerald-950/55 text-white focus:outline-none focus:ring-1 focus:ring-amber-405"
                      >
                        <option value="Infrastruktur" className="bg-emerald-900 text-white">Infrastruktur &amp; Lampu Jalan</option>
                        <option value="Keamanan" className="bg-emerald-900 text-white">Keamanan / Pos Satpam</option>
                        <option value="Kebersihan" className="bg-emerald-900 text-white">Kebersihan, Sampah &amp; Drainase</option>
                        <option value="Aspirasi / Sosial" className="bg-emerald-900 text-white">Aspirasi Sosial, Ibadah &amp; Masjid</option>
                        <option value="Lainnya" className="bg-emerald-900 text-white">Kategori Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-emerald-200/90 mb-1">Judul Singkat Laporan</label>
                      <input
                        type="text"
                        required
                        value={repTitle}
                        onChange={(e) => setRepTitle(e.target.value)}
                        placeholder="Contoh: Lampu Jalan Mati di Gang C3"
                        className="w-full px-4 py-2 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-405"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-emerald-200/90 mb-1">Deskripsi & Keluhan Detail</label>
                    <textarea
                      required
                      rows={3}
                      value={repContent}
                      onChange={(e) => setRepContent(e.target.value)}
                      placeholder="Tuliskan secara objektif dan ramah kronologi serta rincian masalah agar pengurus RT & keamanan setempat bisa sigap mengecek di lokasi."
                      className="w-full px-4 py-2 rounded-xl border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/60 focus:outline-none focus:ring-1 focus:ring-amber-405"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer transition-colors text-xs uppercase tracking-wider font-sans"
                  >
                    Kirim Laporan / Aduan Warga
                  </button>
                </form>

                {/* Dashboard table / list feed of reports in OGP */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-amber-400" />
                    Papan Laporan &amp; Aspirasi Terbaru Warga
                  </h4>
                  
                  <div className="space-y-3 font-sans">
                    {reports.map((report) => (
                      <div key={report.id} className="p-5 rounded-2xl bg-emerald-950/45 border border-emerald-500/20 hover:border-amber-400/30 transition-all text-left text-white shadow-md">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-500/10 pb-3 mb-3">
                          <div>
                            <span className="font-bold text-sm text-white block">{report.title}</span>
                            <div className="flex flex-wrap gap-2 items-center mt-1 text-[11px] text-emerald-300/70">
                              <span className="font-semibold text-emerald-305">{report.reporter}</span>
                              <span>&bull;</span>
                              <span>{report.houseNumber}</span>
                              <span>&bull;</span>
                              <span>{report.date}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 items-center">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-800/30 text-emerald-300 border border-emerald-500/15 text-[10px] font-bold font-mono">
                              {report.category}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                              report.status === 'Selesai' 
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20' 
                                : report.status === 'Diproses'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/25'
                                : 'bg-sky-500/20 text-sky-305 border border-sky-500/20'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-emerald-250 leading-relaxed font-sans mt-2">
                          {report.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}            {/* SUB-TAB 4: KAS SOSIAL & KERJA BAKTI RSVP */}
            {activeSubTab === 'gotong-royong' && (
              <motion.div
                key="social-funds-gotong-royong"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-900/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-emerald-500/20 text-left space-y-8 text-white shadow-xl"
              >
                <div>
                  <h3 className="font-serif font-black text-2xl text-white uppercase tracking-wide">
                    Kas Sosial &amp; Gotong-Royong Lingkungan
                  </h3>
                  <div className="w-12 h-1 bg-amber-400 mt-2 mb-4 rounded-full" />
                  <p className="text-sm text-emerald-200/85 leading-relaxed font-sans pb-4">
                    Keterbukaan pengelolaan kas kerukunan rukun warga dan agenda gotong-royong dalam menjaga kebersihan, sanitasi, keamanan drainase selokan komplek menghadapi cuaca ekstrem.
                  </p>
                </div>

                {/* Kas RT Statement Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-emerald-950/40 p-6 rounded-2xl border border-emerald-500/20 shadow-md">
                  <div className="md:col-span-8 space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300 font-mono flex items-center gap-1.5">
                      <Coins className="w-3.5 h-3.5" />
                      LAPORAN REKAPITULASI KAS SOSIAL WARGA OGP
                    </span>
                    <h4 className="font-serif font-black text-3xl text-yellow-405">
                      Rp 12.850.000,-
                    </h4>
                    <p className="text-xs text-emerald-300/80 font-sans leading-relaxed">
                      *Kas terus diperbaharui per tanggal 1 setiap bulan oleh Bendahara RT. Digunakan untuk santunan kematian warga, bantuan tanggap darurat, subsidi perbaikan jalan komplek, serta konsumsi kerja bakti massa.
                    </p>
                  </div>
                  <div className="md:col-span-4 flex justify-end">
                    <button 
                      onClick={() => alert('Laporan keuangan PDF lengkap sedang dipersiapkan oleh sekretaris RT.')}
                      className="py-2.5 px-4 bg-amber-500 hover:bg-amber-450 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      Unduh Laporan Kas
                    </button>
                  </div>
                </div>

                {/* Next Agenda Detail gotong royong */}
                <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/60 block text-left shadow-md">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold font-mono tracking-widest uppercase mb-3">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>AGENDA TERDEKAT</span>
                  </div>
                  
                  <h4 className="font-serif font-bold text-xl text-white">
                    Kerja Bakti Massal OGP: Pembersihan Selokan &amp; Drainase Utama
                  </h4>
                  <p className="text-xs text-emerald-200/85 font-sans mt-1.5 leading-relaxed">
                    Ajakan gotong royong massal warga komplek OGP dalam menyongsong musim hujan agar aliran air menuju muara selokan lancar, bebas DBD, dan lingkungan asri asri terjaga. Sedia cangkul, sapu lidi, dan karung sampah dari rumah.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs font-sans text-emerald-200">
                    <div className="flex items-center gap-3 bg-emerald-900/35 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="text-xl">📅</span>
                      <div>
                        <strong className="block text-emerald-100">Hari, Tanggal</strong>
                        <span>Sabtu, 13 Juni 2026</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-900/35 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="text-xl">⏰</span>
                      <div>
                        <strong className="block text-emerald-100">Waktu / Jam</strong>
                        <span>Pukul 07:00 WIB s/d Selesai</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-905/35 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="text-xl">📍</span>
                      <div>
                        <strong className="block text-emerald-100">Titik Kumpul Utama</strong>
                        <span>Halaman Utama Masjid MAAR 3</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-emerald-900/35 p-2.5 rounded-xl border border-emerald-500/10">
                      <span className="text-xl">✊</span>
                      <div>
                        <strong className="block text-emerald-100">Status Kehadiran</strong>
                        <span>{totalVolunteers} Relawan Telah Gabung</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gotong Royong RSVP form */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* RSVP form on left */}
                  <form onSubmit={handleRsvpGotongRoyong} className="md:col-span-6 border border-emerald-500/20 p-5 rounded-2xl bg-emerald-950/45 block text-left text-xs font-sans space-y-3 text-white shadow-md">
                    <h5 className="font-serif font-bold text-sm text-white mb-2 flex items-center gap-1.5">
                      📅 Konfirmasi Kehadiran Kerja Bakti
                    </h5>

                    {rsvpSuccess && (
                      <div className="p-3.5 rounded-xl bg-emerald-900/50 border border-emerald-500/30 text-emerald-200 font-bold mb-3">
                        Alhamdulillah, konfirmasi kehadiran berhasil dicatat! Terima kasih atas kontribusi aktif Anda.
                      </div>
                    )}

                    <div>
                      <label className="block text-emerald-250 font-bold mb-1">Nama Anggota Keluarga</label>
                      <input
                        type="text"
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Contoh: Bapak Ahmad"
                        className="w-full px-3.5 py-2 rounded-xl text-xs border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-amber-450"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-250 font-bold mb-1">Blok &amp; No. Rumah</label>
                      <input
                        type="text"
                        required
                        value={rsvpAddress}
                        onChange={(e) => setRsvpAddress(e.target.value)}
                        placeholder="Contoh: Blok B1 No. 04"
                        className="w-full px-3.5 py-2 rounded-xl text-xs border border-emerald-500/25 bg-emerald-950/50 text-white placeholder-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-amber-450"
                      />
                    </div>

                    <div>
                      <label className="block text-emerald-250 font-bold mb-1">Jumlah Personil Berangkat</label>
                      <select
                        value={rsvpPax}
                        onChange={(e) => setRsvpPax(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl text-xs border border-emerald-500/25 bg-emerald-950/50 text-white focus:outline-none"
                      >
                        <option value={1} className="bg-emerald-900 text-white">1 Orang (Ayah/Anak)</option>
                        <option value={2} className="bg-emerald-900 text-white">2 Orang (Ayah &amp; Anak Laki-laki)</option>
                        <option value={3} className="bg-emerald-900 text-white">3 Orang / Lebih</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer transition-colors uppercase tracking-wider font-sans text-[10px]"
                    >
                      Gabung Gotong Royong
                    </button>
                  </form>

                  {/* List of Volunteers on right */}
                  <div className="md:col-span-6 space-y-3 block text-left">
                    <h5 className="font-serif font-bold text-sm text-white flex items-center justify-between">
                      <span>Daftar Relawan Terkonfirmasi</span>
                      <span className="text-xs bg-amber-400/25 text-amber-300 border border-amber-400/35 px-2 py-0.5 rounded-full font-mono">{totalVolunteers} Relawan</span>
                    </h5>

                    <div className="max-h-56 overflow-y-auto divide-y divide-emerald-500/15 pr-2 border border-emerald-500/20 rounded-2xl p-4 font-sans text-xs bg-emerald-955/35 text-white shadow-inner">
                      {attendance.map((attend, index) => (
                        <div key={index} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                          <div>
                            <span className="font-bold text-white block">{attend.name}</span>
                            <span className="text-[10px] text-emerald-300/70 block">Alamat: {attend.houseNumber}</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-800/40 text-emerald-300 border border-emerald-500/15 font-mono font-bold text-[10px]">
                            {attend.pax} Orang
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
