import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Eye, X, Calendar, Tag, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Galeri } from '../types';

interface GaleriProps {
  galeriList: Galeri[];
}

export default function GaleriComponent({ galeriList }: GaleriProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

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

  // Filter photos
  const filteredGaleri = galeriList.filter((item) => {
    return selectedCategory === 'Semua' || item.category === selectedCategory;
  });

  const openLightbox = (id: string) => {
    // Find index of photo in the FILTERED list to allow easy left-right navigation inside the same category!
    const index = filteredGaleri.findIndex((p) => p.id === id);
    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const nextIdx = activePhotoIndex === 0 ? filteredGaleri.length - 1 : activePhotoIndex - 1;
    setActivePhotoIndex(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const nextIdx = activePhotoIndex === filteredGaleri.length - 1 ? 0 : activePhotoIndex + 1;
    setActivePhotoIndex(nextIdx);
  };

  const currentPhoto = activePhotoIndex !== null ? filteredGaleri[activePhotoIndex] : null;

  return (
    <div id="galeri-section" className="bg-slate-50 dark:bg-slate-900 transition-colors">
      
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
            <Camera className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Dokumentasi Syiar Visual</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Galeri Kegiatan
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Merekam dokumentasi penuh keceriaan, ukhuwah, kepedulian sosial, dan gotong royong warga Orchid Green Park.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter categories tabs inline scrollable */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-12 py-2">
          {categories.map((cat) => (
            <button
              id={`galeri-tab-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20'
                  : 'bg-emerald-50 dark:bg-slate-800 border border-emerald-100/30 dark:border-slate-800 text-gray-600 dark:text-gray-300 hover:text-emerald-800 dark:hover:text-amber-400 hover:bg-emerald-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Grid of images */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGaleri.length > 0 ? (
              filteredGaleri.map((photo) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -6, 
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)" 
                  }}
                  transition={{ 
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  id={`photo-card-${photo.id}`}
                  key={photo.id}
                  onClick={() => openLightbox(photo.id)}
                  className="group relative bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow border border-gray-100 dark:border-slate-800 cursor-pointer text-left"
                >
                  {/* Photo content container */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-800">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-112 duration-700 ease-out transition-all filter brightness-[0.95] group-hover:brightness-[0.8]"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient blur over image hover */}
                    <div className="absolute inset-0 bg-emerald-950/65 opacity-0 group-hover:opacity-100 duration-300 transition-all flex flex-col items-center justify-center text-white p-4">
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 duration-300 transition-all shadow shadow-amber-500/20">
                        <Eye className="w-5 h-5 font-black" />
                      </div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-amber-300 mt-3 flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {photo.category}
                      </p>
                    </div>
                  </div>

                  {/* Thumbnail footer descriptor */}
                  <div className="p-4 border-t border-gray-50 dark:border-slate-800/80">
                    <span className="text-[9px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      {photo.category}
                    </span>
                    <h4 className="text-xs font-serif font-semibold text-gray-950 dark:text-gray-200 mt-1 line-clamp-1">
                      {photo.title}
                    </h4>
                    <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {photo.date}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  Belum ada dokumentasi terunggah untuk kategori ini.
                </p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CUSTOM LIGHTBOX COMPONENT POPUP OVERLAY */}
        <AnimatePresence>
          {activePhotoIndex !== null && currentPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="lightbox-overlay"
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between items-center py-6 px-4 md:px-12 select-none"
              onClick={closeLightbox}
            >
              {/* Lightbox Status bar */}
              <div className="w-full max-w-5xl flex justify-between items-center text-white z-10">
                <div>
                  <span className="text-[10px] uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded-full font-bold inline-flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{currentPhoto.category}</span>
                  </span>
                  <p className="text-xs text-stone-400 mt-1">
                    Foto {activePhotoIndex + 1} dari {filteredGaleri.length} foto terpilih
                  </p>
                </div>
                
                {/* Close Button Trigger */}
                <button
                  id="lightbox-close-btn"
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-rose-600 hover:text-white text-gray-300 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Main Interaction Carousel Frame */}
              <div className="relative w-full max-w-4xl max-h-[62vh] md:max-h-[70vh] flex items-center justify-center my-auto">
                
                {/* Previous Swiper */}
                <button
                  id="lightbox-prev-btn"
                  onClick={handlePrev}
                  className="absolute left-0 md:-left-16 p-3 rounded-full bg-white/5 hover:bg-amber-400 hover:text-emerald-950 text-white transition-all z-20 focus:outline-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Large Img */}
                <motion.img
                  key={currentPhoto.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  className="max-w-full max-h-[62vh] md:max-h-[70vh] object-contain rounded-xl border border-white/10 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Next Swiper */}
                <button
                  id="lightbox-next-btn"
                  onClick={handleNext}
                  className="absolute right-0 md:-right-16 p-3 rounded-full bg-white/5 hover:bg-amber-400 hover:text-emerald-950 text-white transition-all z-20 focus:outline-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

              </div>

              {/* Caption and meta footer */}
              <div 
                className="w-full max-w-3xl text-center text-white bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10 z-10 mb-4"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-serif font-bold text-lg md:text-xl text-amber-300">
                  {currentPhoto.title}
                </h3>
                <div className="flex items-center justify-center space-x-1.5 mt-2.5 text-xs text-stone-300">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tanggal Ambil: {currentPhoto.date}</span>
                  <span>•</span>
                  <span>Masjid MAAR3 Sawangan Depok</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
