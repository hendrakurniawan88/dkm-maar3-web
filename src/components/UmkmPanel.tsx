import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Phone, MapPin, User, Tag, Store, Sparkles, Filter, Percent } from 'lucide-react';
import { Umkm } from '../types';

interface UmkmPanelProps {
  umkmList: Umkm[];
  showFullHeader?: boolean;
}

const CATEGORIES: { value: string; label: string; icon: string }[] = [
  { value: 'Semua', label: 'Semua Usaha', icon: '🏪' },
  { value: 'Kuliner', label: 'Kuliner / Makanan', icon: '🍔' },
  { value: 'Jasa', label: 'Jasa & Servis', icon: '🛠️' },
  { value: 'Fashion', label: 'Fashion / Pakaian', icon: '👕' },
  { value: 'Sembako', label: 'Sembako & Toko', icon: '🌾' },
  { value: 'Lainnya', label: 'Lain-lain', icon: '🎁' }
];

export default function UmkmPanel({ umkmList, showFullHeader = false }: UmkmPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Filter UMKM
  const filteredUmkm = umkmList.filter((item) => {
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getWaLink = (phone: string, businessName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Assalamualaikum wr. wb., saya warga Orchid Green Park tertarik dengan produk *${businessName}* yang dipromosikan di Portal Masjid MAAR 3. Apakah bisa pesan?`
    );
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      {showFullHeader && (
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 pt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-amber-500/15 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs md:text-sm text-amber-300 font-semibold tracking-wide uppercase mb-4 shadow-md backdrop-blur-sm">
              <Store className="w-4 h-4 text-amber-400" />
              <span>Pemberdayaan Ekonomi Umat</span>
            </div>

            <h2 className="text-3xl md:text-5.5xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3 leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
                Pemberdayaan Ekonomi Kreatif Warga
              </span>
            </h2>

            <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
              Sinergi belanja dari dan untuk tetangga sendiri. Temukan produk berkualitas di lingkungan Orchid Green Park Sawangan Depok.
            </p>
          </div>
        </div>
      )}

      <section id="umkm-section" className={`py-12 md:py-20 animate-fade-in ${showFullHeader ? 'max-w-7xl mx-auto' : 'bg-slate-100/60 dark:bg-slate-950/40 border-y border-slate-200 dark:border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header (Only shown when not displaying the full page-level header to prevent redundancy) */}
          {!showFullHeader && (
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-4 flex flex-col items-center justify-center text-center w-full">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/25 text-xs font-bold tracking-wider uppercase justify-center">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                UMKM Warga Orchid Green Park
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 dark:text-white leading-tight text-center">
                Papan Pemberdayaan Ekonomi Kreatif Warga
              </h2>
              <p className="text-sm text-slate-600 dark:text-emerald-200/70 leading-relaxed font-sans text-center">
                Sinergi belanja dari dan untuk tetangga sendiri. Temukan beragam produk, makanan lezat, pakaian syar'i, dan jasa profesional dari jamaah & warga perumahan Orchid Green Park Sawangan Depok.
              </p>
            </div>
          )}

        {/* Filter & Search Bar - Centered */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800/85 p-4 md:p-6 mb-10 shadow-sm flex flex-col lg:flex-row lg:items-center gap-4 justify-center items-center">
          
          {/* Category Filter Pills (Scrollable on Mobile) */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none -mx-4 px-4 lg:mx-0 lg:px-0 w-full lg:w-auto">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value;
              let activeStyles = 'bg-emerald-650 text-white shadow-md shadow-emerald-600/10 scale-105';
              
              if (cat.value === 'Kuliner') {
                activeStyles = 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-105';
              } else if (cat.value === 'Jasa') {
                activeStyles = 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105';
              } else if (cat.value === 'Fashion') {
                activeStyles = 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-105';
              } else if (cat.value === 'Sembako') {
                activeStyles = 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105';
              } else if (cat.value === 'Lainnya') {
                activeStyles = 'bg-slate-600 text-white shadow-md shadow-slate-650/20 scale-105';
              }

              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? activeStyles
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-150 dark:hover:bg-slate-750 active:scale-95 text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-700/60'
                  }`}
                  id={`filter-umkm-${cat.value.toLowerCase()}`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-650 dark:group-focus-within:text-amber-300 transition-colors" />
            <input
              type="text"
              placeholder="Cari toko, roti, jasa pangkas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-sans"
              id="umkm-search-input"
            />
          </div>

        </div>

        {/* UMKM Display Grid */}
        <AnimatePresence mode="popLayout">
          {filteredUmkm.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredUmkm.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)" }}
                  transition={{ 
                    layout: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                    y: { duration: 0.3 },
                    scale: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  key={item.id}
                  className="group bg-white dark:bg-slate-930 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800/80 flex flex-col justify-between transition-all duration-300 shadow-sm cursor-pointer"
                  id={`umkm-card-${item.id}`}
                >
                  <div>
                    {/* Cover Photo */}
                    <div className="aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-emerald-950 relative">
                      <img
                        src={item.image || 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      
                      {/* Category Badge & Promo Banner */}
                      <div className="absolute inset-x-0 top-0 p-3 flex flex-wrap justify-between items-start gap-2">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-white text-[10px] font-bold tracking-wide shadow-md ${
                          item.category === 'Kuliner' ? 'bg-amber-600' :
                          item.category === 'Jasa' ? 'bg-emerald-700' :
                          item.category === 'Fashion' ? 'bg-rose-600' :
                          item.category === 'Sembako' ? 'bg-teal-600' : 'bg-slate-655'
                        }`}>
                          <Tag className="w-3 h-3" />
                          {item.category === 'Kuliner' ? 'Kuliner' :
                           item.category === 'Jasa' ? 'Jasa & Servis' :
                           item.category === 'Fashion' ? 'Fashion / Pakaian' : item.category}
                        </span>
                        
                        {item.promo && (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider shadow-md animate-pulse">
                            <Percent className="w-3 h-3" />
                            Promo
                          </span>
                        )}
                      </div>

                      {/* Info overlay on image bottom */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 pt-12 text-left">
                        <span className="flex items-center gap-1 text-[10px] text-amber-300 font-bold mb-0.5 tracking-wide uppercase">
                          <User className="w-3 h-3" />
                          Owner: {item.owner}
                        </span>
                        <h3 className="text-base font-serif font-black text-white leading-tight">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Specifications Body */}
                    <div className="p-4 space-y-3.5 text-left">
                      <p className="text-xs text-slate-600 dark:text-emerald-100/80 font-sans leading-relaxed min-h-[48px] line-clamp-3">
                        {item.description}
                      </p>

                      {/* Promo Special Box */}
                      {item.promo && (
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-300 font-semibold font-sans flex items-start gap-2">
                          <Percent className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                          <span>{item.promo}</span>
                        </div>
                      )}

                      {/* Location address */}
                      <div className="flex items-center text-[11px] text-slate-500 dark:text-emerald-200/60 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1.5 shrink-0" />
                        <span>{item.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Hub Call Box */}
                  <div className="p-4 pt-0">
                    <a
                      href={getWaLink(item.whatsapp, item.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-emerald-600/20 cursor-pointer border border-emerald-500/10"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-100 fill-current" />
                      <span>Hubungi & Pesan</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
            >
              <div className="text-4xl mb-3">🔍</div>
              <h4 className="font-serif font-black text-lg text-slate-900 dark:text-white">
                Usaha Tidak Ditemukan
              </h4>
              <p className="text-xs text-slate-500 dark:text-emerald-200/65 font-sans max-w-sm mx-auto mt-1">
                Tidak ada UMKM warga yang cocok dengan pencarian "{searchTerm}" dan kategori "{selectedCategory}". Silakan gunakan pencarian lain.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Note and Submission Link */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              🏪 Mau Toko / Usaha Anda Tampil Di Sini?
            </h4>
            <p className="text-xs text-slate-500 dark:text-emerald-200/70 font-sans leading-relaxed">
              Khusus jamaah Masjid MAAR 3 dan warga komplek perumahan Orchid Green Park, silakan daftarkan usaha Anda secara GRATIS melalui pengurus DKM.
            </p>
          </div>
          <a
            href="https://wa.me/6281298765432?text=Bismillah,%20saya%20warga%20OGP%20ingin%20mendaftarkan%20usaha%20saya%20di%20portal%20UMKM%20Masjid%20MAAR%203.%20Bagaimana%2520caranya?"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg border border-amber-500 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white dark:hover:text-amber-950 text-xs font-bold uppercase whitespace-nowrap cursor-pointer transition-all duration-300 shadow-md shadow-amber-500/5"
          >
            Daftar Usaha Anda &rarr;
          </a>
        </div>

      </div>
    </section>
    </div>
  );
}
