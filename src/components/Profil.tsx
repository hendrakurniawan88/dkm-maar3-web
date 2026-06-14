import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award, Target, Landmark, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Pengurus } from '../types';

interface ProfilProps {
  pengurusList: Pengurus[];
}

export default function Profil({ pengurusList }: ProfilProps) {
  const visiList = [
    'Menjadi masjid yang makmur, ramah jamaah, dan berdampak bagi lingkungan.',
  ];

  const misiList = [
    'Menyelenggarakan ibadah, pendidikan, dan dakwah yang berkualitas.',
    'Memperkuat manajemen kemasjidan (idarah), pemakmuran (imarah), dan pemeliharaan (ri’ayah).',
    'Membangun sinergi dengan lembaga pemerintah, ormas Islam, BAZNAS/BWI/sejenisnya, dan masyarakat.',
  ];

  const programKerjaList = [
    {
      dept: 'Keagamaan & Dakwah',
      desc: 'Penyelenggaraan kajian akhir pekan, pembinaan tarawih maghrib, tahsin remaja, kajian tematik bulanan, penyaluran zakat, infaq dan shadaqah.',
    },
    {
      dept: 'Sosial & Kemasyarakatan',
      desc: 'Penyelenggaraan program Sedekah Jumat Berkah, santunan anak yatim piatu dhuafa wilayah Sawangan, tanggap darurat bencana warga.',
    },
    {
      dept: 'Pendidikan & TPQ',
      desc: 'Pengembangan kurikulum Belajar Mengajar Al-Quran anak-anak OGP secara berjenjang, tahfidz mutun, pembekalan adab harian anak.',
    },
    {
      dept: 'Kesehatan & Lingkungan hidup',
      desc: 'Penyediaan fasilitasi Posyandu Lansia & Balita berkala, pemeliharaan Bank Sampah Orchid, olahraga sunnah bersama di OGP Sport.',
    }  ];

  return (
    <div id="profil-section" className="bg-white dark:bg-slate-950 transition-colors">
      
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
            <Landmark className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Mengenal Masjid MAAR3</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Profil & Struktur DKM
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Pusat peradaban religi, kegotongroyongan, dan asri lingkungan warga Perumahan Orchid Green Park Pasir Putih, Sawangan, Depok.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Sejarah Masjid Grid with Photo Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-emerald-50/20 dark:bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-emerald-700/5 dark:border-slate-800/60 ring-1 ring-emerald-500/2">
          
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald-950 dark:text-emerald-300">
              Sejarah Singkat Masjid MAAR 3
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
              Masjid Muniroh Abdullah Ar-Rukban 3 (atau lebih akrab disingkat <strong>Masjid MAAR3</strong>) didirikan sebagai respon atas kebutuhan utama sarana ibadah jamaah muslim Perumahan Orchid Green Park, Pasir Putih, Sawangan, Depok.
            </p>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
              Dibangun dari gotong royong luhur warga kompleks didukung penuh oleh para donatur, peletakan batu pertamanya menjadi simbol ukhuwah islamiyah warga yang membara. Arsitektur masjid ini mengadopsi struktur estetika Timur Tengah berbalut kesederhanaan tropis nusantara demi menghadirkan kenyamanan bagi jamaah ketika bersujud.
            </p>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
              Kini, Masjid MAAR3 bukan sekadar bangunan bisu pemanggil sholat, melainkan denyut nadi aktivitas lingkungan, dari mencetak anak penghafal Quran, menjaga kesehatan warga (Posyandu), hingga menjaga asrinya lingkungan perumahan (Bank Sampah).
            </p>
          </div>

          <div className="lg:col-span-5 relative group">
            {/* Elegant glass visual border wrap */}
            <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-tr from-amber-400 to-emerald-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-md transition-all duration-300" />
            <div className="relative overflow-hidden rounded-2xl border-4 border-white dark:border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800"
                alt="Masjid MAAR3 Front Exterior"
                className="w-full h-[320px] object-cover hover:scale-105 duration-700 transition-all filter saturate-[1.1]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-300">Eksterior Depan</span>
                <p className="text-sm font-semibold">Keindahan Menara & Kubah Masjid MAAR 3</p>
              </div>
            </div>
          </div>

        </div>

        {/* Visi Misi Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Visi Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute right-[-24px] top-[-24px] opacity-10 text-white">
              <Target className="w-40 h-40" />
            </div>
            
            <div className="flex items-center space-x-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif font-black tracking-wide">VISI MASJID</h3>
            </div>

            <div className="space-y-4 relative z-10">
              {visiList.map((visi, i) => (
                <div key={i} className="flex items-start space-x-3 text-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <p className="text-sm md:text-base leading-relaxed font-sans">{visi}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Misi Card */}
          <div className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden ring-1 ring-white/10">
            <div className="absolute right-[-24px] top-[-24px] opacity-10 text-white">
              <Award className="w-40 h-40" />
            </div>
            
            <div className="flex items-center space-x-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-lg bg-amber-400 text-emerald-950 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-serif font-black tracking-wide">MISI DKM</h3>
            </div>

            <div className="space-y-4 relative z-10">
              {misiList.map((misi, i) => (
                <div key={i} className="flex items-start space-x-3 text-emerald-100">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-sans">
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base leading-relaxed font-sans">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Program Kerja Grid */}
        <div className="mb-20">
          <div className="flex items-center space-x-2.5 mb-8">
            <Landmark className="w-6 h-6 text-emerald-600 dark:text-amber-500" />
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-950 dark:text-white">
              Program Kerja Utama DKM
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programKerjaList.map((prog, i) => (
              <div
                id={`program-card-${i}`}
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-emerald-500/35 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold mb-4 flex items-center justify-center text-sm font-sans">
                  0{i + 1}
                </div>
                <h4 className="text-base font-serif font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                  {prog.dept}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                  {prog.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Struktur DKM (Pengurus) */}
        <div className="bg-white dark:bg-slate-900 text-gray-950 dark:text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden border border-gray-100 dark:border-slate-800">
          <div className="absolute right-[-24px] top-[-24px] opacity-5 text-emerald-900 dark:text-white">
            <Users className="w-40 h-40" />
          </div>

          <div className="flex items-center space-x-2.5 mb-8 relative z-10">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-black tracking-wide text-gray-950 dark:text-white">
              Struktur Pengurus DKM MAAR 3
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {pengurusList.map((pengurus) => (
              <div
                id={`pengurus-item-${pengurus.id}`}
                key={pengurus.id}
                className="bg-gradient-to-br from-emerald-950 to-emerald-900 text-white p-5 rounded-2xl border border-white/10 text-center hover:scale-102 transition-transform duration-300 hover:border-amber-400/40 shadow-lg"
              >
                {/* Avatar with customized luxury golden border */}
                <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-tr from-amber-400 to-emerald-600 p-0.5 shadow-lg relative group">
                  <div className="w-full h-full rounded-full overflow-hidden bg-emerald-950">
                    <img
                      src={pengurus.image}
                      alt={pengurus.name}
                      className="w-full h-full object-cover filter brightness-[0.95]"
                      onError={(e) => {
                        // Fallback default if unsplash rate limited
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(pengurus.name)}`;
                      }}
                    />
                  </div>
                </div>

                <h4 className="text-base font-serif font-bold text-white tracking-wide">
                  {pengurus.name}
                </h4>
                <p className="text-xs text-amber-300 font-semibold mt-1">
                  {pengurus.role}
                </p>
                <p className="text-[10px] text-emerald-200/50 font-sans mt-2">
                  ID: {pengurus.id.toUpperCase()} • DKM MAAR3
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
