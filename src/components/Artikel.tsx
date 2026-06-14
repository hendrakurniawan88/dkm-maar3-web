import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Calendar, User, Clock, Heart, ArrowUpRight, ChevronLeft, Bookmark, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { Artikel } from '../types';

interface ArtikelProps {
  artikelList: Artikel[];
  onLike: (id: string) => void;
}

export default function ArtikelComponent({ artikelList, onLike }: ArtikelProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Artikel | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const categories = ['Semua', 'Aqidah', 'Fiqih', 'Akhlak', 'Keluarga Islami', 'Dakwah'];

  // Filtering Logic
  const filteredArtikel = artikelList.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLikeClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!likedArticles[id]) {
      onLike(id);
      setLikedArticles({ ...likedArticles, [id]: true });
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pt-8">
          <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs md:text-sm text-amber-300 font-semibold tracking-wide uppercase mb-4 shadow-md backdrop-blur-sm">
            <BookOpen className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Khasanah & Perpustakaan Digital</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Artikel & Untaian Dakwah
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Perluas wawasan keislaman Anda seputar akidah, fikih ibadah harian, adab keluarga, dan dakwah aktual.
          </p>
        </div>
      </div>

      <section id="artikel-section" className="py-12 md:py-20 animate-fade-in max-w-7xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">

        {/* Filter bar search tools */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-12 max-w-4xl mx-auto">
          {/* Search box */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari tema, penulis atau materi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-full border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs md:text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium animate-pulse-once"
            />
          </div>

          {/* Scollable Category Selector Wrapper */}
          <div className="md:col-span-7 flex flex-wrap gap-2 justify-start md:justify-end py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-emerald-50 dark:bg-slate-900 border border-emerald-100/30 dark:border-slate-800/80 text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Article Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredArtikel.length > 0 ? (
              filteredArtikel.map((art) => {
                const isLiked = likedArticles[art.id];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    id={`artikel-card-${art.id}`}
                    key={art.id}
                    onClick={() => setActiveArticle(art)}
                    className="group bg-white dark:bg-slate-900 overflow-hidden rounded-3xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-amber-400/30 transition-all flex flex-col justify-between cursor-pointer text-left"
                  >
                    {/* Header Image */}
                    <div className="relative h-44 overflow-hidden bg-emerald-900">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-all filter brightness-[0.88] saturate-[1.05]"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-700/90 text-white px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                          {art.category}
                        </span>
                      </div>
                    </div>

                    {/* Text copy */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 text-[10px] text-gray-400 dark:text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {art.readTime}
                          </span>
                          <span>•</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {art.date}
                          </span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-gray-950 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 duration-300 transition-colors leading-snug line-clamp-2">
                          {art.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans line-clamp-3">
                          {art.snippet}
                        </p>
                      </div>

                      {/* Card meta row */}
                      <div className="mt-6 pt-4 border-t border-gray-50 dark:border-slate-800/80 flex justify-between items-center z-10">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center font-bold text-[9px] text-emerald-800 dark:text-amber-400">
                            U
                          </div>
                          <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 font-serif">
                            {art.author.replace('Ustadz ', '')}
                          </span>
                        </div>

                        {/* Likes counter indicator button clickable */}
                        <div className="flex items-center space-x-3">
                          <button
                            id={`like-counter-btn-${art.id}`}
                            onClick={(e) => handleLikeClick(e, art.id)}
                            className={`flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full border transition-all ${
                              isLiked
                                ? 'bg-rose-50 border-rose-200 text-rose-500 font-bold dark:bg-rose-950/20 dark:border-rose-900/40'
                                : 'bg-transparent border-gray-100 hover:border-rose-300 text-gray-500 hover:text-rose-500 dark:border-slate-800'
                            }`}
                            title="Sukai Artikel Ini"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                            <span>{art.likes}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
                  Tidak ada artikel yang cocok dengan pencarian Anda.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* FULL ARTICLE PREMIUM READING WORKSPACE DRAW/MODAL */}
        <AnimatePresence>
          {activeArticle && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              id="article-reader-modal"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center p-3 md:p-6 select-text"
              onClick={() => setActiveArticle(null)}
            >
              <motion.div
                initial={{ y: 50, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.98 }}
                transition={{ type: 'spring', damping: 25 }}
                className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[85vh] md:max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header title navigation overlay */}
                <div className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center z-10">
                  <button
                    id="reader-back-btn"
                    onClick={() => setActiveArticle(null)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-gray-500 dark:text-gray-300 hover:text-emerald-700 hover:dark:text-amber-400 focus:outline-none"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-400 text-emerald-950 px-2.5 py-0.5 rounded-full shadow-sm">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>

                {/* Reader body scroll wrapper */}
                <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6 text-left selection:bg-amber-300 selection:text-emerald-950">
                  
                  {/* Article main titles */}
                  <div className="space-y-3.5">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-black text-gray-950 dark:text-white leading-tight">
                      {activeArticle.title}
                    </h3>
                    
                    {/* Authors and metadata column */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800 pb-5">
                      <div className="flex items-center space-x-2 font-serif font-bold text-emerald-800 dark:text-amber-400">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center font-extrabold text-[10px]">
                          P
                        </div>
                        <span>{activeArticle.author}</span>
                      </div>
                      <span className="hidden sm:inline-block text-gray-300 dark:text-slate-700">|</span>
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        <span>{activeArticle.date}</span>
                      </div>
                      <span className="hidden sm:inline-block text-gray-300 dark:text-slate-700">|</span>
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        <span>{activeArticle.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Feature Main Illustration banner inside reader */}
                  <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-800">
                    <img
                      src={activeArticle.image}
                      alt={activeArticle.title}
                      className="w-full h-full object-cover filter brightness-[0.9]"
                    />
                  </div>

                  {/* Rich Formatted Article Content */}
                  <div className="prose prose-emerald dark:prose-invert max-w-full font-sans text-sm md:text-base leading-relaxed text-gray-800 dark:text-gray-300 whitespace-pre-wrap space-y-4">
                    {activeArticle.content}
                  </div>

                  {/* Reader actions bottom like / share */}
                  <div className="pt-8 border-t border-gray-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    {/* Interactive like button */}
                    <div className="flex items-center space-x-2">
                      <p className="text-xs text-gray-400 font-sans">Kajian ini bernilai luas bagi umat?</p>
                      <button
                        id={`reader-like-btn-${activeArticle.id}`}
                        onClick={(e) => handleLikeClick(e, activeArticle.id)}
                        className={`flex items-center space-x-2 text-xs px-4 py-2 rounded-full border transition-all ${
                          likedArticles[activeArticle.id]
                            ? 'bg-rose-50 border-rose-200 text-rose-500 font-bold dark:bg-rose-950/25 dark:border-rose-900/60'
                            : 'bg-transparent border-gray-200 text-gray-600 hover:text-rose-500 hover:border-rose-300 dark:border-slate-800'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                        <span>Sukai Artikel ({activeArticle.likes})</span>
                      </button>
                    </div>

                    {/* Social sharing links mockup */}
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400 font-sans">Bagikan:</span>
                      <button
                        onClick={() => {
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                        }}
                        className="p-1.5 rounded-full bg-slate-50 border border-gray-100 text-blue-600 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700"
                        title="Bagikan ke Facebook"
                      >
                        <Facebook className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(activeArticle.title)}`, '_blank');
                        }}
                        className="p-1.5 rounded-full bg-slate-50 border border-gray-100 text-sky-500 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700"
                        title="Bagikan ke Twitter"
                      >
                        <Twitter className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${activeArticle.title} - ${activeArticle.snippet}\nBaca selengkapnya di: ${window.location.href}`)}`, '_blank');
                        }}
                        className="p-1.5 rounded-full bg-slate-50 border border-gray-100 text-[#25D366] hover:bg-[#25D366] hover:text-white dark:bg-slate-800 dark:border-slate-700 transition-colors"
                        title="Bagikan ke WhatsApp"
                      >
                        <svg
                          className="w-4 h-4 fill-current shrink-0" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </button>
                    </div>

                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
    </div>
  );
}
