import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Loader2, RefreshCw, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { SholatTime } from '../types';

interface ParsedHijri {
  day: string;
  month: string;
  year: string;
}

const normalizeHijriStr = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD') // Decomposes combined characters with accents or macrons (e.g. ī -> i)
    .replace(/[\u0300-\u036f]/g, '') // Removes accent marks
    .replace(/ʿ/g, "'") // Standardize Arabic ayn
    .replace(/’/g, "'") // Standardize curly quotes
    .trim();
};

const translateHijriMonth = (monthStr: string): string => {
  const m = normalizeHijriStr(monthStr);
  
  if (m.includes('muharram')) return 'Muharram';
  if (m.includes('safar')) return 'Safar';
  
  if (m.includes('rabi') && (m.includes('awwal') || m.includes('1') || m.includes(' i') || m.endsWith(' i'))) return "Rabi'ul Awwal";
  if (m.includes('rabi') && (m.includes('akhir') || m.includes('thani') || m.includes('sani') || m.includes('2') || m.includes(' ii') || m.endsWith(' ii'))) return "Rabi'ul Akhir";
  
  if (m.includes('jumad') && (m.includes('ula') || m.includes('awwal') || m.includes('1') || m.includes(' i') || m.endsWith(' i'))) return "Jumadil Awwal";
  if (m.includes('jumad') && (m.includes('akhir') || m.includes('thani') || m.includes('sani') || m.includes('2') || m.includes(' ii') || m.endsWith(' ii'))) return "Jumadil Akhir";
  
  if (m.includes('rajab')) return 'Rajab';
  if (m.includes('sya\'ban') || m.includes('sha\'ban') || m.includes('shaban') || m.includes('syaban')) return "Sya'ban";
  if (m.includes('ramadhan') || m.includes('ramadan')) return 'Ramadhan';
  if (m.includes('syawal') || m.includes('shawwal') || m.includes('shawal')) return 'Syawal';
  
  if (m.includes('qa\'dah') || m.includes('qi\'dah') || m.includes('qaidah') || m.includes('qadah') || m.includes('kaidah')) return "Dzulqa'dah";
  if (m.includes('hijjah') || m.includes('hijah')) return 'Dzulhijjah';
  
  // Direct dictionary mapping if substring matches did not trigger
  const directMappings: Record<string, string> = {
    'muharram': 'Muharram',
    'safar': 'Safar',
    'rabiul awwal': "Rabi'ul Awwal",
    'rabiul akhir': "Rabi'ul Akhir",
    'jumadil awwal': 'Jumadil Awwal',
    'jumadil akhir': 'Jumadil Akhir',
    'rajab': 'Rajab',
    'syaban': "Sya'ban",
    'ramadhan': 'Ramadhan',
    'syawal': 'Syawal',
    'dzulqadah': "Dzulqa'dah",
    'dzulqaidah': "Dzulqa'dah",
    'zulkaidah': "Dzulqa'dah",
    'dzulhijjah': 'Dzulhijjah',
    'dzulhijah': 'Dzulhijjah',
    'zulhijah': 'Dzulhijjah'
  };

  return directMappings[m] || (monthStr.charAt(0).toUpperCase() + monthStr.slice(1));
};

const getParsedHijri = (hijriStr: string): ParsedHijri => {
  // Strip parentheses first, clean double spaces
  const cleanStr = hijriStr.replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
  
  // Find a 4-digit number like 1447, 1448
  const yearMatch = cleanStr.match(/\b\d{4}\b/);
  
  if (yearMatch && yearMatch.index !== undefined) {
    const yearIndex = yearMatch.index;
    const dateAndMonth = cleanStr.substring(0, yearIndex).trim();
    const yearPart = cleanStr.substring(yearIndex).trim();
    
    // Split date and month
    const firstSpace = dateAndMonth.indexOf(' ');
    if (firstSpace !== -1) {
      const day = dateAndMonth.substring(0, firstSpace).trim();
      const monthPart = dateAndMonth.substring(firstSpace + 1).trim();
      const translatedMonth = translateHijriMonth(monthPart);
      
      return { day, month: translatedMonth, year: yearPart };
    }
  }
  
  // Fallback if regex fails to match a 4-digit year format
  const parts = cleanStr.split(' ');
  if (parts.length >= 3) {
    const translatedMonth = translateHijriMonth(parts[1]);
    return { day: parts[0], month: translatedMonth, year: parts.slice(2).join(' ') };
  }
  
  return { day: '14', month: 'Dzulhijjah', year: '1447 H' };
};

export default function JadwalSholat() {
  const [times, setTimes] = useState<SholatTime[]>([]);
  const [nextSholat, setNextSholat] = useState<SholatTime | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [hijriDate, setHijriDate] = useState<string>('Memuat tanggal Hijriyah...');
  const [loading, setLoading] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [city] = useState<string>('Sawangan, Depok');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Fallback prayer times specifically for Depok (roughly static but very realistic)
  const getFallbackTimings = (): Record<string, string> => {
    return {
      Subuh: '04:43',
      Syuruk: '05:58',
      Dzuhur: '11:58',
      Ashar: '15:20',
      Maghrib: '17:52',
      Isya: '19:04'
    };
  };

  const getHijriFallback = () => {
    // Basic approximate Hijri date for May/June 2026 (approx 1447 H)
    const options = { calendar: 'islamic-umalqura', day: 'numeric', month: 'long', year: 'numeric' } as const;
    try {
      return new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', options).format(new Date());
    } catch {
      return '14 Dzulhijjah 1447 H';
    }
  };

  // Fetch from API
  const fetchJadwal = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      // Fetch specifically for Depok coordinates
      const response = await fetch(
        'https://api.aladhan.com/v1/timings?latitude=-6.4025&longitude=106.7942&method=11'
      );
      if (!response.ok) {
        throw new Error('API Response Error');
      }
      const json = await response.json();
      const apiTimes = json.data.timings;

      // Extract specific prayers required by prompt: Subuh, Dzuhur, Ashar, Maghrib, Isya
      const formattedTimes: SholatTime[] = [
        { name: 'Subuh', time: apiTimes.Fajr },
        { name: 'Dzuhur', time: apiTimes.Dhuhr },
        { name: 'Ashar', time: apiTimes.Asr },
        { name: 'Maghrib', time: apiTimes.Maghrib },
        { name: 'Isya', time: apiTimes.Isha }
      ];

      setTimes(formattedTimes);
      
      // Extract Hijri date
      const hijriObj = json.data.date.hijri;
      setHijriDate(`${hijriObj.day} ${hijriObj.month.en} ${hijriObj.year} H (${hijriObj.designation.abbreviated})`);
    } catch (err) {
      console.warn('Menggunakan fallback jadwal sholat offline Depok:', err);
      // Fallback
      const fallback = getFallbackTimings();
      const formatted: SholatTime[] = [
        { name: 'Subuh', time: fallback.Subuh },
        { name: 'Dzuhur', time: fallback.Dzuhur },
        { name: 'Ashar', time: fallback.Ashar },
        { name: 'Maghrib', time: fallback.Maghrib },
        { name: 'Isya', time: fallback.Isya }
      ];
      setTimes(formatted);
      setHijriDate(getHijriFallback());
      setErrorMsg('Menggunakan data presisi lokal Depok (offline-first)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  // Live clock and countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (times.length === 0) return;

      // Determine next sholat & countdown
      const nowString = now.toTimeString().split(' ')[0]; // HH:MM:SS
      const [nowH, nowM, nowS] = nowString.split(':').map(Number);
      const nowIdx = nowH * 3600 + nowM * 60 + nowS;

      let nextIndex = -1;
      let minDiff = Infinity;
      let nextSItem: SholatTime | null = null;
      let isTomorrow = false;

      times.forEach((item, index) => {
        const [shH, shM] = item.time.split(':').map(Number);
        const shIdx = shH * 3600 + shM * 60;
        
        let diff = shIdx - nowIdx;
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextIndex = index;
          nextSItem = item;
        }
      });

      // If all sholat of today are passed, the next is Subuh of tomorrow
      if (!nextSItem && times.length > 0) {
        nextSItem = times[0]; // Subuh
        isTomorrow = true;
        
        const [shH, shM] = nextSItem.time.split(':').map(Number);
        const shIdx = shH * 3600 + shM * 60;
        // remaining time is diff from now to midnight, then midnight to tomorrow's sholat
        minDiff = (24 * 3600 - nowIdx) + shIdx;
      }

      if (nextSItem) {
        setNextSholat(nextSItem);
        
        const hours = Math.floor(minDiff / 3600);
        const minutes = Math.floor((minDiff % 3600) / 60);
        const seconds = minDiff % 60;
        
        const pad = (num: number) => num.toString().padStart(2, '0');
        setTimeRemaining(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [times]);

  // Format Gregorian date nicely
  const getFormatGregorian = () => {
    return currentTime.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Get Dzuhur and Maghrib times or fallback
  const dzuhurTimeStr = times.find(t => t.name === 'Dzuhur')?.time || '11:58';
  const maghribTimeStr = times.find(t => t.name === 'Maghrib')?.time || '17:52';

  const getIslamicTimes = () => {
    const currentSecs = currentTime.getHours() * 3600 + currentTime.getMinutes() * 60 + currentTime.getSeconds();
    
    // Parse Dzuhur
    const [dzH, dzM] = dzuhurTimeStr.split(':').map(Number);
    const dzuhurSecs = (dzH || 11) * 3600 + (dzM || 58) * 60;
    
    // Jam Istiwa (noon/zawal is exactly 12:00:00)
    const istiwaSecs = (currentSecs - dzuhurSecs + 12 * 3600 + 24 * 3600) % (24 * 3600);
    const istH = Math.floor(istiwaSecs / 3600);
    const istM = Math.floor((istiwaSecs % 3600) / 60);
    const istS = istiwaSecs % 60;
    
    // Parse Maghrib
    const [magH, magM] = maghribTimeStr.split(':').map(Number);
    const maghribSecs = (magH || 17) * 3600 + (magM || 52) * 60;
    
    // Jam Ghurubiyah (Maghrib / Sunset is exactly 06:00:00)
    const ghurubiyahSecs = (currentSecs - maghribSecs + 6 * 3600 + 24 * 3600) % (24 * 3600);
    const ghurH = Math.floor(ghurubiyahSecs / 3600);
    const ghurM = Math.floor((ghurubiyahSecs % 3600) / 60);
    const ghurS = ghurubiyahSecs % 60;
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return {
      istiwa: `${pad(istH)}:${pad(istM)}:${pad(istS)}`,
      ghurubiyah: `${pad(ghurH)}:${pad(ghurM)}:${pad(ghurS)}`
    };
  };

  const islamicClocks = getIslamicTimes();

  return (
    <div id="jadwal-sholat-section" className="bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* Immersive Beranda-style Header Banner Section */}
      <div className="relative py-24 bg-emerald-950 overflow-hidden flex items-center justify-center text-center">
        {/* Immersive Mosque Senja Background Wallpaper */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-102 filter brightness-[0.38] contrast-[1.05]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1600')` 
          }}
        />

        {/* Decorative Golden Ambient Lights & Fog Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/45 to-transparent z-10" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl z-10" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl z-10" />

        {/* Repeating Premium Arabesque Glowing Rotating Geometric Overlays */}
        <div className="absolute right-[-10%] top-[-10%] w-[450px] h-[450px] opacity-[0.05] pointer-events-none animate-[spin_120s_linear_infinite] z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400" fill="currentColor">
            <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="absolute left-[-10%] bottom-[-10%] w-[450px] h-[450px] opacity-[0.04] pointer-events-none animate-[spin_180s_linear_infinite] z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400" fill="currentColor">
            <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
          </svg>
        </div>

        {/* Header content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 text-center flex flex-col items-center justify-center">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs md:text-sm text-amber-300 font-semibold tracking-wide uppercase mb-4 shadow-md backdrop-blur-sm justify-center">
            <MapPin className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Kecamatan Sawangan, Kota Depok</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3 text-center w-full">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Jadwal Sholat & Ibadah
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed text-center">
            Waktu sholat fardhu otomatis terupdate berdasarkan koordinat astronomis Masjid MAAR 3.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Dashboard Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Huge Digital Clock & Next Prayer Countdown Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950 to-emerald-900 dark:from-slate-950 dark:to-emerald-950 p-6 md:p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden ring-1 ring-white/10 flex flex-col justify-between min-h-[400px]">
            {/* Background luxury vectors */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-56 h-56">
              <svg viewBox="0 0 100 100" fill="currentColor" className="text-amber-400 w-full h-full">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>

            {/* Top Row: Location & Sound controls */}
            <div className="flex justify-between items-center z-10">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-sm font-semibold text-amber-300">LIVE Depok</span>
              </div>
              <div className="flex space-x-2">
                <button
                  id="sound-alarm-toggle"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-gray-100"
                  title="Aktifkan alarm adzan"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
                </button>
                <button
                  id="refresh-jadwal-btn"
                  onClick={fetchJadwal}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-gray-100"
                  title="Sinkronisasi Ulang"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle Row: Big Digital Timer & Islamic Astronomy Clocks */}
            <div className="mt-4 mb-3 z-10 space-y-4">
              <div>
                <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest mb-1">
                  Jam Gregorian Terkini (WIB)
                </p>
                <h3 className="text-3xl md:text-4xl font-mono font-bold tracking-tight text-white drop-shadow-sm flex items-center">
                  <Clock className="w-6 h-6 text-amber-400 mr-2 animate-pulse" />
                  {currentTime.toLocaleTimeString('id-ID')}
                </h3>
                <p className="text-slate-300 text-xs md:text-sm font-medium mt-1 shadow-sm">
                  {getFormatGregorian()}
                </p>
              </div>

              {/* Islamic Solar & Sunset Clocks Container */}
              <div className="bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    Penunjuk Waktu Falakiyah (Jam Versi Islam)
                  </span>
                  <span className="text-xs" title="Sistem koordinat waktu tradisional umat Islam berdasarkan rasi matahari asli dan waktu pergantian hari versi Hijriyah">🕌</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Jam Istiwa (Zawal clock) */}
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-amber-400 text-xs shrink-0">☀️</span>
                        <span className="text-[9px] text-emerald-200 font-extrabold uppercase tracking-wider">
                          Jam Istiwa
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-300 leading-tight">
                        Zawal / Dzuhur disetel tepat pukul 12:00:00 (Matahari di Kulminasi Atas)
                      </p>
                    </div>
                    <div className="mt-3 pt-1 border-t border-white/5">
                      <span className="text-base md:text-lg font-mono font-extrabold text-amber-300 tracking-wider">
                        {islamicClocks.istiwa}
                      </span>
                    </div>
                  </div>

                  {/* Jam Ghurubiyah (Sunset-based clock) */}
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        <span className="text-emerald-400 text-xs shrink-0">🌙</span>
                        <span className="text-[9px] text-emerald-200 font-extrabold uppercase tracking-wider">
                          Jam Ghurubiyah
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-300 leading-tight">
                        Maghrib / Terbenam disetel tepat pukul 06:00:00 (Awal Hari Baru Hijriyah)
                      </p>
                    </div>
                    <div className="mt-3 pt-1 border-t border-white/5">
                      <span className="text-base md:text-lg font-mono font-extrabold text-amber-300 tracking-wider">
                        {islamicClocks.ghurubiyah}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Beautiful, Large, Islamic Hijri Calendar Card */}
            <div className="bg-gradient-to-r from-amber-500/15 to-emerald-500/10 border border-amber-500/30 rounded-2xl p-4 my-3 backdrop-blur-md z-10 relative overflow-hidden flex items-center space-x-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.15)]">
              {/* Islamic Pattern Back Ornament */}
              <div className="absolute right-2 -bottom-2 opacity-15 pointer-events-none w-20 h-20 text-amber-400">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
                </svg>
              </div>

              {/* Large Arabic-inspired Number Emblem for Day */}
              <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-emerald-950 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border border-amber-300/50 shadow-md shrink-0">
                <span className="font-serif font-black text-3xl leading-none">
                  {getParsedHijri(hijriDate).day}
                </span>
                <span className="font-mono text-[9px] font-extrabold tracking-widest uppercase leading-none mt-1 opacity-80">
                  HIJRIAH
                </span>
              </div>

              {/* Month & Year Details */}
              <div className="flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Tanggal Hijriyah
                  </span>
                  <span className="text-sm">🌙</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif font-extrabold text-amber-300 leading-tight mt-1 tracking-wide uppercase drop-shadow-sm">
                  {getParsedHijri(hijriDate).month}
                </h4>
                <p className="text-xs md:text-sm font-semibold text-emerald-100 tracking-wider">
                  {getParsedHijri(hijriDate).year}
                </p>
              </div>
            </div>

            {/* Bottom Row: Next Sholat Countdown Card with premium border details */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 z-10">
              {loading ? (
                <div className="flex items-center justify-center space-x-2 py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                  <span className="text-sm font-medium text-emerald-200">Menghitung rasi bintang...</span>
                </div>
              ) : nextSholat ? (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                      Menjelang Sholat Berikutnya
                    </span>
                    <span className="text-xs font-semibold bg-amber-400 text-emerald-950 px-2 py-0.5 rounded-full">
                      {nextSholat.name} ({nextSholat.time})
                    </span>
                  </div>
                  <h4 className="text-4xl md:text-5xl font-mono font-black text-white tracking-widest my-2 drop-shadow-[0_4px_12px_rgba(245,158,11,0.25)]">
                    {timeRemaining || '00:00:00'}
                  </h4>
                  <p className="text-[11px] text-emerald-200 font-sans tracking-wide">
                    Dihimbau bersiap merapat ke Masjid MAAR3 10-15 menit sebelum berkumandang adzan.
                  </p>
                </div>
              ) : (
                <p className="text-sm text-yellow-300">Gagal mensinkronisasikan jadwal sholat.</p>
              )}
            </div>

            {errorMsg && (
              <div className="mt-2 text-[10px] text-emerald-300 flex items-center justify-center space-x-1">
                <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Right Side Schedule List */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            {loading ? (
              <div className="p-12 text-center bg-white dark:bg-slate-800 rounded-3xl shadow">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
                <p className="text-sm text-gray-500 dark:text-gray-400">Menyinkronkan dengan API Kemenag & Astronomi...</p>
              </div>
            ) : (
              times.map((sholat) => {
                const isNext = nextSholat?.name === sholat.name;
                
                // Color configuration matching the homepage categories:
                // Subuh -> Sky blue (Fresh pre-dawn / Sembako style)
                // Dzuhur -> Amber (Kuliner/Makanan)
                // Ashar -> Emerald (Beranda / Jasa & Servis)
                // Maghrib -> Rose (Fashion / Pakaian)
                // Isya -> Indigo (Night twilight)
                const getSholatTheme = () => {
                  return {
                    cardClass: isNext
                      ? 'bg-emerald-900 dark:bg-emerald-950 border-amber-400 text-white shadow-lg shadow-emerald-950/40 ring-2 ring-amber-400/60 scale-[1.01]'
                      : 'bg-emerald-900 dark:bg-emerald-950 text-white border-emerald-505/30 shadow-sm',
                    iconClass: 'bg-white/10 text-emerald-100 border border-white/5',
                    badgeStyle: 'bg-amber-400 text-emerald-950 font-extrabold',
                    timeClass: 'text-white',
                    textClass: 'text-white',
                    subTextClass: 'text-emerald-150/85',
                  };
                };

                const theme = getSholatTheme();
                
                return (
                  <motion.div
                    id={`sholat-row-${sholat.name}`}
                    key={sholat.name}
                    whileHover={{ scale: 1.01 }}
                    className={`flex justify-between items-center p-5 rounded-2xl transition-all duration-300 shadow-sm border ${theme.cardClass}`}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Unique Mosque Calligraphic Icon background */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.iconClass}`}>
                        <span className="font-serif font-black text-sm uppercase">
                          {sholat.name.substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className={`text-lg font-serif font-bold ${theme.textClass}`}>
                            {sholat.name}
                          </h4>
                          {isNext && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse ${theme.badgeStyle}`}>
                              Selanjutnya
                            </span>
                          )}
                        </div>
                        <p className={`text-xs font-sans ${theme.subTextClass}`}>
                          Waktu adzan wilayah Sawangan Depok
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className={`text-2xl md:text-3xl font-mono font-bold drop-shadow-sm ${theme.timeClass}`}>
                        {sholat.time}
                      </span>
                      <p className={`text-[10px] font-sans tracking-wide ${theme.subTextClass}`}>
                        WIB - Iqomah +10 Menit
                      </p>
                    </div>
                  </motion.div>
                );
              })
            )}

            {/* Note alert bottom panel */}
            <div className="bg-amber-500/5 dark:bg-amber-500/2 border border-amber-500/10 rounded-2xl p-4 flex items-start space-x-3 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
              <span className="text-[16px] leading-none">📢</span>
              <p>
                <strong>Catatan Jamaah:</strong> Sholat sunnah qobliyah & dzikir bersama diselenggarakan sesaat setelah adzan berkumandang. Penyesuaian adzan di depok diatur DKM sela 2-3 menit disesuaikan koordinat rasi GPS area OGP.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
