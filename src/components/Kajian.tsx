import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, MapPin, Clock, MessageSquare, Share2, Eye, X } from 'lucide-react';
import { Kajian } from '../types';

interface KajianProps {
  kajianList: Kajian[];
}

export default function KajianComponent({ kajianList }: KajianProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  const handleRemindMe = (kajian: Kajian) => {
    const textBase = `Bismillah, saya ingin berpartisipasi dalam Kajian Rutin Masjid MAAR 3:\n\n*Ustadz:* ${kajian.ustadz}\n*Tema:* ${kajian.theme}\n*Waktu:* ${kajian.day} - ${kajian.time}\n*Lokasi:* ${kajian.location}\n\nSemoga Allah memudahkan langkah kita menuju majelis ilmu. Aamiin.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(textBase)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="kajian-section" className="bg-slate-50 dark:bg-slate-950 transition-colors">
      
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
            <BookOpen className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Kuliah Subuh & Kajian Kitab</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Kajian Rutin Akhir Pekan
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Hadirilah taman-taman surga setiap Sabtu/Ahad Ba'da Subuh di Masjid MAAR 3 bersama asatidzah mutabar.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Premium Event Card Exhibition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {kajianList.map((kajian, index) => {
            return (
              <motion.div
                id={`kajian-card-${kajian.id}`}
                key={kajian.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800/80 hover:border-amber-400/40 hover:dark:border-amber-400/30 flex flex-col justify-between"
              >
                {/* Visual Header Grid resembling premium pass banner */}
                <div 
                  className="relative h-48 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-5 text-white flex flex-col justify-between overflow-hidden group cursor-pointer"
                  onClick={() => setActiveImage(kajian.image)}
                  title="Klik untuk memperbesar brosur kajian"
                >
                  {/* Arabesque subtle glowing pattern background containing real item image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${kajian.image}')` }}
                  />
                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent" />
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full blur-xl animate-pulse" />

                  {/* Hover action banner overlay */}
                  <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <span className="bg-white/95 text-emerald-950 font-bold text-xs uppercase tracking-wider py-1.5 px-3.5 rounded-full flex items-center space-x-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Lihat Brosur</span>
                    </span>
                  </div>

                  {/* Floating YouTube Play Button */}
                  {kajian.youtubeUrl && (
                    <a
                      href={kajian.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute right-4 top-4 z-30 flex items-center justify-center w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-650/40 border border-white/10 transition-all duration-300 hover:scale-110 active:scale-95"
                      title="Tonton Live / Dokumentasi YouTube"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </a>
                  )}

                  {/* Top line banner ticket info */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] uppercase tracking-widest bg-amber-400 text-emerald-950 px-2.5 py-1 rounded-md font-extrabold shadow">
                      {kajian.day}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 font-mono tracking-wider">
                      Masjid MAAR3 • OGP
                    </span>
                  </div>

                  {/* Lecture Theme */}
                  <div className="z-10 mt-4">
                    <p className="text-amber-300 text-xs font-semibold tracking-wider uppercase mb-1">
                      Kajian Utama Kitab
                    </p>
                    <h3 className="text-lg md:text-xl font-serif font-bold text-white tracking-wide leading-snug line-clamp-2">
                      {kajian.theme}
                    </h3>
                  </div>
                </div>

                {/* Event Body context */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Speaker name styling as Premium guest */}
                    <div>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold tracking-wide uppercase">
                        Narasumber Al-Ustadz
                      </p>
                      <h4 className="text-base md:text-lg font-serif font-bold text-emerald-800 dark:text-amber-400 mt-0.5">
                        {kajian.ustadz}
                      </h4>
                    </div>

                    {/* Metadata lines */}
                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium">
                        <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2 shrink-0" />
                        <span>{kajian.time}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 font-medium">
                        <MapPin className="w-4 h-4 text-rose-500 mr-2 shrink-0" />
                        <span>{kajian.location} - Perumahan OGP, Sawangan</span>
                      </div>

                      {kajian.youtubeUrl && (
                        <div className="pt-3">
                          <a
                            href={kajian.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100/90 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-700 dark:text-red-400 text-[11px] font-bold tracking-wide border border-red-150/50 dark:border-red-500/10 transition-all duration-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-3.5 h-3.5 fill-current mr-2 text-red-650 dark:text-red-500 shrink-0" viewBox="0 0 24 24">
                              <path d="M23.498 6.163c-.272-.997-1.055-1.78-2.052-2.052C19.64 3.75 12 3.75 12 3.75s-7.64 0-9.446.361c-.997.272-1.78 1.055-2.052 2.052C.14 7.969.14 12 .14 12s0 4.03.361 5.837c.272.997 1.055 1.78 2.052 2.052C4.36 20.25 12 20.25 12 20.25s7.64 0 9.446-.361c.997-.272 1.78-1.055 2.052-2.052C23.86 16.03 23.86 12 23.86 12s0-4.03-.362-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                            </svg>
                            <span>Tonton Live / Dokumentasi</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Share and remind action triggers */}
                  <div className="mt-8 pt-4 border-t border-gray-100 dark:border-slate-800/80 flex space-x-2">
                    <button
                      id={`remind-btn-${kajian.id}`}
                      onClick={() => handleRemindMe(kajian)}
                      className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <svg
                        className="w-3.5 h-3.5 fill-current shrink-0" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>Sebarkan ke WhatsApp</span>
                    </button>
                    <button
                      id={`share-btn-${kajian.id}`}
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `Kajian ${kajian.theme}`,
                            text: `Hadirilah Kajian ${kajian.theme} bersama ${kajian.ustadz} di ${kajian.location}.`,
                            url: window.location.href,
                          });
                        } else {
                          // Copy link popup
                          navigator.clipboard.writeText(`Kajian ${kajian.theme} bersama ${kajian.ustadz} - ${kajian.day} Ba'da Subuh di Masjid MAAR 3 Orchid Green Park.`);
                          alert('Informasi kajian berhasil disalin ke clipboard!');
                        }
                      }}
                      className="px-3 py-2.5 rounded-lg border border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                      title="Salin Rincian Kajian"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Golden quote banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-400/5 via-amber-400/10 to-amber-400/5 dark:from-slate-900 dark:via-emerald-950/20 dark:to-slate-900 border border-amber-400/20 rounded-3xl p-6 md:p-8 text-center max-w-4xl mx-auto">
          <p className="text-emerald-950 dark:text-emerald-100 font-serif italic text-base md:text-lg leading-relaxed font-semibold">
            "Barangsiapa menempuh suatu jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan menuju surga."
          </p>
          <span className="block mt-2.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest font-sans">
            — Hadits Riwayat Muslim
          </span>
        </div>

      </div>

      {/* Lightbox Modal Overlay for view brochure */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full bg-slate-900/90 rounded-3xl overflow-hidden shadow-2xl border border-white/10 p-2 z-10"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black text-white hover:text-amber-400 p-2.5 rounded-full transition-colors z-20 cursor-pointer shadow-lg"
                title="Tutup Brosur"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden flex items-center justify-center bg-black/40">
                <img
                  src={activeImage}
                  alt="Brosur Kajian DKM"
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] max-w-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
