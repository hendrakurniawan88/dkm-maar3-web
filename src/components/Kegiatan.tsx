import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, MapPin, Search, Grid, Tag, Sparkles } from 'lucide-react';
import { Kegiatan } from '../types';

interface KegiatanProps {
  kegiatanList: Kegiatan[];
}

export default function KegiatanComponent({ kegiatanList }: KegiatanProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const categories = [
    'Semua',
    'Kajian Islam',
    'Bank Sampah',
    'Posyandu',
    'SiJum',
    'Ogp Farm',
    'Ogp Sport',
    'KBMA',
    'Ramadhan',
    'Idul Adha',
    'Kopsyar OGP',
  ];

  // Filtering Logic
  const filteredKegiatan = kegiatanList.filter((keg) => {
    const matchesCategory = selectedCategory === 'Semua' || keg.category === selectedCategory;
    const matchesSearch =
      keg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      keg.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: Kegiatan['status']) => {
    switch (status) {
      case 'Sedang Berjalan':
        return 'bg-emerald-500 text-white shadow-emerald-500/20';
      case 'Mendatang':
        return 'bg-amber-400 text-emerald-950 shadow-amber-400/20';
      case 'Selesai':
        return 'bg-gray-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <div id="kegiatan-section" className="bg-white dark:bg-slate-950 transition-colors">
      
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs md:text-sm text-amber-300 font-semibold tracking-wide uppercase mb-4 shadow-md backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Katalog Agenda Komunitas</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Kegiatan & Agenda
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Jelajahi seluruh program ibadah, sosial, lingkungan, dan kemasyarakatan yang berjalan di lingkungan Masjid MAAR3.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Search, Filter Tools Row */}
        <div className="space-y-6 mb-12">
          {/* Live Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari agenda kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs md:text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
            />
          </div>

          {/* Scollable Category Selector Wrapper with luxury indicators */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto py-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/10'
                    : 'bg-emerald-50 dark:bg-slate-900 border border-emerald-100/40 dark:border-slate-800/80 text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-emerald-500-10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dedicated Panel Kopsyar OGP when selected */}
        {selectedCategory === 'Kopsyar OGP' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-950 to-teal-950 text-white border border-amber-400/25 shadow-xl relative overflow-hidden"
          >
            {/* Ambient Background Grid and Shapes */}
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Text / Context Side */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] text-amber-300 font-bold uppercase tracking-wider">
                  <span>Sinergi Ekonomi Syariah Komunitas</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-serif font-black text-white leading-tight">
                  Koperasi Syariah (Kopsyar) Orchid Green Park
                </h3>
                
                <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed font-sans">
                  Sinergitas pemberdayaan ekonomi warga perumahan Orchid Green Park berlandaskan syariat Islam yang adil dan transparan. Kopsyar OGP hadir sebagai solusi keuangan mikro tanpa riba, mendidik jiwa entrepreneurship, serta merangkul potensi UMKM lokal menuju keberkahan bersama.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-emerald-200">
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 text-sm mt-0.5">✔</span>
                    <span><strong>Transaksi Halal:</strong> Bebas dari unsur riba, maysir, dan gharar demi meraih kemurnian usaha.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 text-sm mt-0.5">✔</span>
                    <span><strong>Pemberdayaan UMKM:</strong> Akses permodalan syariah tanpa jaminan memberatkan bagi warga.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 text-sm mt-0.5">✔</span>
                    <span><strong>Bagi Hasil Adil:</strong> Sistem bagi hasil (*shirkah*) yang berkah, transparan dan berkeadilan.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 text-sm mt-0.5">✔</span>
                    <span><strong>Dana Sosial & Infaq:</strong> Sebagian keuntungan dialokasikan untuk santunan anak yatim & dhuafa.</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="https://www.youtube.com/watch?v=Kd9R_f23dH8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-red-650 hover:bg-red-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-red-650/20 transition-all space-x-1.5"
                  >
                    <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-.997-1.055-1.78-2.052-2.052C19.64 3.75 12 3.75 12 3.75s-7.64 0-9.446.361c-.997.272-1.78 1.055-2.052 2.052C.14 7.969.14 12 .14 12s0 4.03.361 5.837c.272.997 1.055 1.78 2.052 2.052C4.36 20.25 12 20.25 12 20.25s7.64 0 9.446-.361c.997-.272 1.78-1.055 2.052-2.052C23.86 16.03 23.86 12 23.86 12s0-4.03-.362-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>Buka Video di YouTube</span>
                  </a>
                  <button
                    onClick={() => {
                      const card = document.getElementById('kegiatan-card-keg-10');
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      setPlayingId('keg-10');
                    }}
                    className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-emerald-950 text-xs font-extrabold py-2.5 px-4 rounded-xl shadow-md transition-all space-x-1.5"
                  >
                    <span>Putar Video Di Bawah</span>
                  </button>
                </div>
              </div>

              {/* Video Embed Player on the Right */}
              <div className="lg:col-span-5 h-full">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
                  <iframe
                    title="Sosialisasi Kopsyar OGP"
                    src="https://www.youtube.com/embed/Kd9R_f23dH8?rel=0&modestbranding=1"
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* Dynamic Activity Card Display Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredKegiatan.length > 0 ? (
              filteredKegiatan.map((keg) => {
                const videoId = getYouTubeId(keg.youtubeUrl || '');
                const isCurrentlyPlaying = playingId === keg.id && videoId;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)" }}
                    transition={{ 
                      layout: { duration: 0.3 },
                      opacity: { duration: 0.3 },
                      scale: { type: "spring", stiffness: 400, damping: 17 }
                    }}
                    id={`kegiatan-card-${keg.id}`}
                    key={keg.id}
                    className="group bg-white dark:bg-slate-900 overflow-hidden rounded-3xl border border-gray-100 dark:border-slate-800 shadow-md transition-all flex flex-col justify-between cursor-pointer"
                  >
                    {/* Image or Video player Container */}
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      {isCurrentlyPlaying ? (
                        <div className="absolute inset-0 w-full h-full">
                          <iframe
                            title={keg.title}
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                          {/* Close Video button inside container overlay */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setPlayingId(null);
                            }}
                            className="absolute top-2 right-2 z-30 bg-black/70 hover:bg-black text-white text-[10px] font-bold px-2 py-1 rounded-md transition-colors"
                          >
                            Tutup [X]
                          </button>
                        </div>
                      ) : (
                        <>
                          <img
                            src={keg.image}
                            alt={keg.title}
                            className="w-full h-full object-cover group-hover:scale-112 duration-700 ease-out transition-all filter brightness-[0.9] group-hover:brightness-[0.8]"
                          />
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 left-4 z-10 shadow-lg">
                            <span className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full ${getStatusColor(keg.status)}`}>
                              {keg.status}
                            </span>
                          </div>

                          {/* Category Overlay tag */}
                          <div className="absolute bottom-4 left-4 z-10 flex items-center space-x-1.5 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md text-white border border-white/10">
                            <Tag className="w-3 h-3 text-amber-400" />
                            <span className="text-[10px] font-semibold tracking-wide">{keg.category}</span>
                          </div>

                          {/* Floating YouTube Play Button */}
                          {keg.youtubeUrl && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingId(keg.id);
                              }}
                              className="absolute right-4 top-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-red-650 hover:bg-red-650 text-white shadow-lg shadow-red-650/40 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                              title="Putar Video secara Langsung"
                            >
                              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" />
                              </svg>
                            </button>
                          )}
                        </>
                      )}
                    </div>

                    {/* Body textual copy */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div className="space-y-3.5">
                        <h4 className="text-lg font-serif font-bold text-gray-950 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2" id={`kegiatan-title-${keg.id}`}>
                          {keg.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans line-clamp-3">
                          {keg.description}
                        </p>
                      </div>

                      {/* Footer stats details */}
                      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800/80 space-y-2">
                        <div className="flex items-center text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-500 mr-2 shrink-0" />
                          <span>{keg.date}</span>
                        </div>
                        <div className="flex items-center text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-500 mr-2 shrink-0" />
                          <span>{keg.time}</span>
                        </div>
                        <div className="flex items-center text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-500 mr-2 shrink-0" />
                          <span>{keg.location}</span>
                        </div>

                        {keg.youtubeUrl && (
                          <div className="pt-3 space-y-2">
                            {/* Toggleable Embedded Play/Close Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPlayingId(isCurrentlyPlaying ? null : keg.id);
                              }}
                              className="w-full flex items-center justify-center py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-white text-[11px] font-bold tracking-wide border border-gray-200 dark:border-slate-750 transition-all duration-300"
                            >
                              <span className="mr-1.5">{isCurrentlyPlaying ? '⏸ Stop Video' : '▶ Putar Pemutar Panel'}</span>
                            </button>

                            {/* Direct External Link */}
                            <a
                              href={keg.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100/90 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-700 dark:text-red-400 text-[11px] font-bold tracking-wide border border-red-150/50 dark:border-red-500/10 transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="w-3.5 h-3.5 fill-current mr-2 text-red-650 dark:text-red-500 shrink-0" viewBox="0 0 24 24">
                                <path d="M23.498 6.163c-.272-.997-1.055-1.78-2.052-2.052C19.64 3.75 12 3.75 12 3.75s-7.64 0-9.446.361c-.997.272-1.78 1.055-2.052 2.052C.14 7.969.14 12 .14 12s0 4.03.361 5.837c.272.997 1.055 1.78 2.052 2.052C4.36 20.25 12 20.25 12 20.25s7.64 0 9.446-.361c.997-.272 1.78-1.055 2.052-2.052C23.86 16.03 23.86 12 23.86 12s0-4.03-.362-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                              </svg>
                              <span>Buka di YouTube &rarr;</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  Tidak ada agenda kegiatan yang cocok dengan kriteria filter/pencarian Anda.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Information badge */}
        <div className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>Butuh koordinasi/pengurusan agenda komplek? Silahkan hubungi Pengurus DKM MAAR3 Bidang Sosial/Dakwah.</p>
        </div>

      </div>
    </div>
  );
}
