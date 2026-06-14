import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Youtube, ExternalLink, RefreshCw, Volume2, Info } from 'lucide-react';

interface VideoProfilProps {
  videoUrl?: string;
  onUpdateVideoUrl?: (url: string) => void;
  isAdmin?: boolean;
}

export default function VideoProfil({ 
  videoUrl = 'https://www.youtube.com/watch?v=6NLwziTHHy4&list=PLLrzrdSGtEBben3b7-LIzvaqjY60XFM8S', // Beautiful serene mosque drone video as elegant default
  onUpdateVideoUrl,
  isAdmin = false 
}: VideoProfilProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>(videoUrl);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Helper to extract YouTube video ID
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeId(videoUrl) || '6NLwziTHHy4';
  const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  const handleSaveUrl = () => {
    if (onUpdateVideoUrl) {
      onUpdateVideoUrl(inputUrl);
    }
    setIsEditing(false);
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
            Dokumentasi & Media
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
            Video Profil Masjid Muniroh Ar-Rukban 3
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mb-4" />
          <p className="text-sm text-gray-650 dark:text-gray-400 font-sans leading-relaxed">
            Saksikan keindahan arsitektur, kegiatan ibadah, kajian, dan syiar dakwah di Masjid Muniroh Ar-Rukban 3 (MAAR 3) Orchid Green Park, Depok.
          </p>
        </div>

        {/* Video Card Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Islamic Frame Accents */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/40 rounded-tl-2xl hidden md:block" />
          <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/40 rounded-tr-2xl hidden md:block" />
          <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500/40 rounded-bl-2xl hidden md:block" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/40 rounded-br-2xl hidden md:block" />

          {/* Main Card with shadow & rounded borders */}
          <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl shadow-xl dark:shadow-emerald-950/10 border border-emerald-950/5 dark:border-slate-800">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 group">
              
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  /* Video Poster Frame with Play Button */
                  <motion.div 
                    key="poster"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden"
                    onClick={() => setIsPlaying(true)}
                  >
                    {/* Background thumbnail image of serene mosque */}
                    <img 
                      src="https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=1250" 
                      alt="Masjid Muniroh Ar-Rukban 3 Video Thumbnail"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay for high-end aesthetic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85" />

                    {/* Islamic geometry motif outline (purely decorative) */}
                    <div className="absolute inset-6 border border-white/10 rounded-xl pointer-events-none flex items-center justify-center">
                      <div className="w-full h-full opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                    </div>

                    {/* Glowing Breathing Play Button */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      
                      {/* Pulse Ring */}
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="relative z-10 w-20 h-20 md:w-24 md:h-24 bg-emerald-600/90 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-700/35 border border-emerald-400 hover:bg-emerald-500 duration-300 transition-colors"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 ml-1 fill-current" />
                      </motion.div>

                      {/* Video Title Overlaid */}
                      <div className="mt-6 text-center z-10 max-w-lg px-2">
                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide drop-shadow-md">
                          Putar Video Profil Masjid
                        </h3>
                        <p className="text-xs md:text-sm text-gray-200 mt-1 font-sans drop-shadow-sm flex items-center justify-center gap-1.5 shadow-emerald-950">
                          <Volume2 className="w-4 h-4 animate-pulse text-amber-400" /> Ketuk untuk memutar & mendengarkan
                        </p>
                      </div>

                    </div>

                    {/* Channel name badge in corner */}
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 z-15">
                      <Youtube className="w-4 h-4 text-rose-500 fill-rose-500" />
                      <span className="text-[10px] md:text-xs font-mono font-semibold text-white">
                        YouTube @masjidogp1617
                      </span>
                    </div>

                  </motion.div>
                ) : (
                  /* Active Embedded YouTube Player */
                  <motion.div
                    key="player"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <iframe
                      title="Video Profil Masjid Muniroh Ar-Rukban 3"
                      src={iframeSrc}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

          {/* Bottom Control Actions (Subscription / External Link / Admin Controls) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/40 border border-gray-200/50 dark:border-slate-850">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 dark:bg-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                <Youtube className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                  Kunjungi Channel YouTube Resmi
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Streaming kajian, khutbah Jumat, dan berita kemakmuran masjid harian.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setInputUrl(videoUrl);
                  }}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs font-bold uppercase transition-all border border-gray-300 dark:border-slate-750 text-gray-750 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  {isEditing ? 'Batal' : 'Ganti Link Video'}
                </button>
              )}

              <a
                href="https://youtube.com/@masjidogp1617?si=XX1SwfnM32nI5-C-"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs uppercase cursor-pointer transition-colors shadow-md shadow-rose-600/15 flex items-center justify-center gap-1.5"
              >
                Langganan / Subscribe <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Dynamic Link Editor (collapsible admin UI) */}
          <AnimatePresence>
            {isAdmin && isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20 text-left">
                  <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Info className="w-4 h-4" /> Admin Media: Perbarui Link Video Profil
                  </h5>
                  <div className="flex flex-col sm:flex-row gap-2 mt-1">
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="Contoh: https://www.youtube.com/watch?v=VIDEO_ID"
                      className="flex-grow bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:text-white"
                    />
                    <button
                      onClick={handleSaveUrl}
                      className="py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase cursor-pointer"
                    >
                      Simpan Link
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-2">
                    Sistem akan mengekstrak Video ID secara otomatis dari tautan YouTube yang Anda masukkan.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
