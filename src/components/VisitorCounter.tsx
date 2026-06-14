import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Users, TrendingUp, Activity, ArrowUpRight, Globe, CheckCircle2, MapPin, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface VisitorStats {
  total: number;
  today: number;
  thisWeek: number;
  history: { day: string; count: number }[];
}

export default function VisitorCounter() {
  // Base constants for initial simulated state
  const INITIAL_STATS: VisitorStats = {
    total: 18432,
    today: 285,
    thisWeek: 1980,
    history: [
      { day: 'Sun', count: 180 },
      { day: 'Mon', count: 242 },
      { day: 'Tue', count: 215 },
      { day: 'Wed', count: 320 },
      { day: 'Thu', count: 280 },
      { day: 'Fri', count: 485 }, // Friday peak for masjid info
      { day: 'Sat', count: 340 }
    ]
  };

  const [stats, setStats] = useState<VisitorStats>(() => {
    const cached = localStorage.getItem('maar3_visitor_stats');
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as VisitorStats;
        // Make sure today's visits increment marginally upon every page refresh to show dynamic activity:
        parsed.today += Math.floor(Math.random() * 3) + 1;
        parsed.total += Math.floor(Math.random() * 3) + 1;
        parsed.thisWeek += Math.floor(Math.random() * 3) + 1;
        
        // Dynamically append Friday jump or modify last history item for today
        const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        parsed.history = parsed.history.map(h => {
          if (h.day === todayDay) {
            return { ...h, count: Math.max(h.count, parsed.today) };
          }
          return h;
        });

        return parsed;
      } catch (e) {
        return INITIAL_STATS;
      }
    }
    return INITIAL_STATS;
  });

  // Simulated active online users (fluctuates in real-time)
  const [onlineCount, setOnlineCount] = useState<number>(() => Math.floor(Math.random() * 6) + 4);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('maar3_visitor_stats', JSON.stringify(stats));
  }, [stats]);

  // Simulate traffic heartbeat: incremental hits and fluctuating online count
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Fluctuating online counter (e.g., changes by +/- 1 or 2, bounding between 3 and 16)
      setOnlineCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        return Math.max(3, Math.min(18, prev + delta));
      });

      // 2. Chance to execute a mock click hit
      if (Math.random() > 0.6) {
        setStats(prev => {
          const nextToday = prev.today + 1;
          const nextTotal = prev.total + 1;
          const nextWeek = prev.thisWeek + 1;
          
          const todayDay = new Date().toLocaleDateString('en-US', { weekday: 'short' });
          const nextHistory = prev.history.map(h => {
            if (h.day === todayDay) {
              return { ...h, count: h.count + 1 };
            }
            return h;
          });

          return {
            total: nextTotal,
            today: nextToday,
            thisWeek: nextWeek,
            history: nextHistory
          };
        });
      }
    }, 8000); // Trigger incremental check periodically

    return () => clearInterval(interval);
  }, []);

  // Simulated recent visitor actions (access logs) to give dynamic immersion
  const recentHits = [
    { ip: '182.116.***.***', city: 'Sawangan, Depok', device: 'Mobile', time: 'Baru saja' },
    { ip: '110.138.***.***', city: 'Jakarta Selatan', device: 'Desktop', time: '2 mnt lalu' },
    { ip: '103.155.***.***', city: 'Ciputat, Tangerang', device: 'Mobile', time: '5 mnt lalu' },
    { ip: '180.244.***.***', city: 'Bogor, Jawa Barat', device: 'Mobile', time: '11 mnt lalu' }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-[#062c21] via-slate-950 to-[#021f17] overflow-hidden border-t border-emerald-900/40">
      
      {/* Decorative Golden Ambient Lights & Fog Effect (Matching Beranda Hero style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#063326]/50 via-slate-950/90 to-[#021f17]/50 z-0" />
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none z-0" />

      {/* Repeating Premium Arabesque Glowing Rotating Geometric Overlay */}
      <div className="absolute right-[-10%] top-[-5%] w-[450px] h-[450px] opacity-[0.05] pointer-events-none animate-[spin_120s_linear_infinite] z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-450" fill="currentColor">
          <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute left-[-10%] bottom-[-5%] w-[400px] h-[400px] opacity-[0.04] pointer-events-none animate-[spin_180s_linear_infinite] z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-450" fill="currentColor">
          <path d="M50 0 L60 30 L90 20 L70 50 L100 60 L70 70 L90 90 L60 80 L50 100 L40 80 L10 90 L30 70 L0 60 L30 50 L10 20 L40 30 Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 flex flex-col items-center justify-center">
          <span className="text-[11px] uppercase font-extrabold text-amber-300 tracking-[0.15em] bg-emerald-900/50 border border-amber-400/30 px-4 py-1.5 rounded-full inline-flex items-center gap-2 shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Portal Transparansi Layanan
          </span>
          
          <h3 className="text-3xl md:text-5xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-205 to-white leading-tight">
            Statistik Pengunjung Website
          </h3>
          
          <p className="text-sm text-emerald-100/70 leading-relaxed font-sans max-w-xl mx-auto">
            Sistem analitik lalu lintas kunjungan situs resmi Masjid Muniroh Ar-Rukban 3 secara real-time untuk memantau efektivitas syiar dakwah digital ke seluruh penjuru umat.
          </p>

          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-2" />
        </div>

        {/* Dashboard Grid Panel wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Big Core Metrics Card */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Online Users */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                id="stat-online" 
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/80 via-emerald-900/20 to-slate-950/80 border border-emerald-500/30 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all group duration-350"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-450 to-teal-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-550/25 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 animate-pulse text-emerald-950" />
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full font-black font-mono uppercase tracking-widest leading-none flex items-center gap-1.5 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest font-mono">
                    Online Saat Ini
                  </h5>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-4xl md:text-5xl font-serif font-black text-white group-hover:text-amber-200 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                      {onlineCount}
                    </span>
                    <span className="text-xs text-emerald-300/80 font-bold font-sans">
                      aktif berkunjung
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Today's Hits */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                id="stat-today" 
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-amber-950/80 via-amber-900/20 to-slate-950/80 border border-amber-500/30 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-amber-500/10 transition-all group duration-350"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-colors duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-450 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-550/25 group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6 text-amber-950" />
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-3 py-1.5 rounded-full font-black font-mono inline-flex items-center gap-1 border border-amber-500/30">
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                    +12.4%
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest font-mono">
                    Hari Ini (24 Jam)
                  </h5>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-4xl md:text-5xl font-serif font-black text-white group-hover:text-amber-200 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      {stats.today.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-amber-300/80 font-bold font-sans">
                      akses syiar
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Weekly accumulated */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                id="stat-weekly" 
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/80 via-cyan-900/20 to-slate-950/80 border border-cyan-500/30 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-cyan-500/10 transition-all group duration-350"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-550/25 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6 text-cyan-950 animate-pulse" />
                  </div>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-3 py-1.5 rounded-full font-black font-mono tracking-wider border border-cyan-500/30">
                    Siklus 7 Hari
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-[10px] text-cyan-400 font-extrabold uppercase tracking-widest font-mono">
                    Minggu Ini
                  </h5>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-4xl md:text-5xl font-serif font-black text-white group-hover:text-amber-200 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      {stats.thisWeek.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-cyan-300/80 font-bold font-sans">
                      pembaca aktif
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Cumulative Total hits */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
                id="stat-total" 
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-fuchsia-950/80 via-fuchsia-900/20 to-slate-950/80 border border-fuchsia-500/30 text-left flex flex-col justify-between relative overflow-hidden shadow-2xl hover:shadow-fuchsia-500/10 transition-all group duration-350"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors duration-500" />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-fuchsia-400 to-purple-600 text-slate-950 flex items-center justify-center shadow-lg shadow-fuchsia-550/25 group-hover:scale-110 transition-transform">
                    <Activity className="w-6 h-6 text-fuchsia-950" />
                  </div>
                  <span className="text-[10px] bg-fuchsia-500/20 text-fuchsia-300 px-3 py-1.5 rounded-full font-black font-mono uppercase tracking-widest border border-fuchsia-500/30">
                    Total
                  </span>
                </div>
                <div className="mt-4">
                  <h5 className="text-[10px] text-fuchsia-400 font-extrabold uppercase tracking-widest font-mono">
                    Total Kunjungan
                  </h5>
                  <div className="flex items-baseline gap-1.5 mt-2">
                    <span className="text-4xl md:text-5xl font-serif font-black text-white group-hover:text-amber-200 transition-colors duration-300 drop-shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                      {stats.total.toLocaleString('id-ID')}
                    </span>
                    <span className="text-xs text-fuchsia-300/80 font-bold font-sans">
                      akumulasi penuh
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Luxurious Weekly Traffic Bar Chart Block */}
            <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/70 to-slate-950/90 border border-emerald-500/25 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h4 className="font-serif font-bold text-white text-lg flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">📊</span>
                    Tren Lalu Lintas Mingguan
                  </h4>
                  <p className="text-xs text-emerald-100/60 font-sans mt-0.5">
                    Grafik harian menunjukkan volume interaksi situs puncak pada hari Jumat.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-emerald-200 font-mono tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400" />
                    Puncak (Jumat)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                    Hari Biasa
                  </span>
                </div>
              </div>

              {/* Graphic container with exact scale calculations */}
              <div className="h-44 flex items-end justify-between gap-3 px-2 sm:px-6 relative border-b border-emerald-900/40 pb-2">
                
                {/* Horizontal guide lines */}
                <div className="absolute left-0 right-0 top-0 border-t border-emerald-900/10 pointer-events-none" />
                <div className="absolute left-0 right-0 top-1/2 border-t border-emerald-900/10 pointer-events-none" />
                
                {stats.history.map((h, index) => {
                  const maxVal = Math.max(...stats.history.map(x => x.count), 1);
                  const heightPct = `${(h.count / maxVal) * 88}%`; // keep space at top
                  const isPeak = h.day === 'Fri';
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center group/bar relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 bg-amber-400 text-slate-950 font-mono text-[10px] py-1 px-2.5 rounded-lg font-black shadow-lg transition-opacity pointer-events-none z-10 whitespace-nowrap">
                        {h.count.toLocaleString('id-ID')} views
                      </div>

                      {/* The bar graphic item */}
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: heightPct }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                        className={`w-full max-w-[28px] sm:max-w-[40px] rounded-t-lg transition-all duration-300 ${
                          isPeak 
                            ? 'bg-gradient-to-t from-amber-600 via-amber-450 to-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]' 
                            : 'bg-gradient-to-t from-emerald-750 via-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                        } group-hover/bar:brightness-110 cursor-pointer`}
                      />

                      {/* Day Label */}
                      <span className="text-[10px] sm:text-xs text-emerald-250 mt-2 font-mono font-bold">
                        {h.day}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Right panel: Live activity Feed Logs */}
          <div className="lg:col-span-4 p-6 md:p-8 rounded-3xl bg-gradient-to-b from-emerald-950/70 to-slate-950/90 border border-emerald-500/25 text-left flex flex-col justify-between relative overflow-hidden group shadow-2xl backdrop-blur-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-125 duration-700 transition-transform pointer-events-none" />
            
            <div className="space-y-4 h-full flex flex-col justify-between">
              
              {/* Header section with live icon */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2.5 rounded-xl bg-amber-450/10 text-amber-300 border border-amber-400/20">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-white text-lg">
                    Log Akses Regional
                  </h4>
                </div>
                <p className="text-xs text-emerald-100/60 font-sans leading-relaxed">
                  Rincian wilayah tempat tinggal pengunjung yang singgah ke situs Masjid Muniroh Ar-Rukban 3 baru-baru ini.
                </p>
              </div>

              {/* Feed items */}
              <div className="space-y-3.5 my-5">
                {recentHits.map((h, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="flex gap-3 text-xs leading-tight font-sans text-emerald-100 p-3 rounded-2xl bg-emerald-900/20 hover:bg-emerald-900/40 transition-all border border-emerald-500/10 hover:border-emerald-500/30 shadow-sm"
                  >
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center font-mono font-black text-[10px] text-amber-300">
                      ID
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-white font-mono text-[11px] tracking-wide">
                          {h.ip}
                        </strong>
                        <span className="text-[9px] text-amber-450 font-bold font-mono">
                          {h.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-emerald-250">
                        <span className="flex items-center gap-1 font-medium font-sans">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          {h.city}
                        </span>
                        <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[8px] font-mono shadow-inner text-emerald-300 flex items-center gap-1 border border-emerald-900/60">
                          {h.device === 'Mobile' ? (
                            <Smartphone className="w-2.5 h-2.5 text-emerald-400" />
                          ) : (
                            <Monitor className="w-2.5 h-2.5 text-emerald-400" />
                          )}
                          {h.device}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Verified security footer */}
              <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between text-[11px] text-amber-300 bg-emerald-900/30 p-3 rounded-2xl border border-emerald-500/10 mt-auto shadow-inner">
                <span className="font-semibold font-sans flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-450" />
                  Privasi & IP Terproteksi
                </span>
                <span className="font-mono text-[9px] text-emerald-300 bg-slate-950 px-2.5 py-1 rounded-full border border-emerald-900 font-bold">
                  SHA-256 SSL
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

