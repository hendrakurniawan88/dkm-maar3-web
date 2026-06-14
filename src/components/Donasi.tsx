import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, QrCode, DollarSign, Users, Sparkles, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { DonasiCampaign, Donor } from '../types';
// @ts-ignore
import qrisDkmFlyer from '../assets/images/qris_dkm_maar3_1780566954034.png';

interface DonasiProps {
  campaigns: DonasiCampaign[];
  onAddDonation: (campaignId: string, amount: number, donorName: string, message: string) => void;
  recentDonors: Donor[];
}

export default function DonasiComponent({ campaigns, onAddDonation, recentDonors }: DonasiProps) {
  const [selectedCampaign, setSelectedCampaign] = useState<DonasiCampaign | null>(null);
  const [donorName, setDonorName] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showQris, setShowQris] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1); // 1: form, 2: QRIS view
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  // Pre-selected option presets
  const donationPresets = [10000, 25000, 50000, 100000, 250000, 500000];

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(num);
  };

  const handlePresetSelect = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleOpenDonateForm = (campaign: DonasiCampaign) => {
    setSelectedCampaign(campaign);
    setDonorName('');
    setAmount('');
    setMessage('');
    setStep(1);
    setShowQris(true);
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Masukkan jumlah donasi valid (minimal Rp 10.000).');
      return;
    }
    setStep(2); // Show QRIS
  };

  const handleConfirmSimulationPayment = () => {
    if (!selectedCampaign) return;
    const parsedAmount = parseInt(amount);
    const finalName = donorName.trim() || 'Hamba Allah';
    const finalMsg = message.trim() || 'Semoga barokah dan bermanfaat bagi umat. Aamiin.';

    // Execute callback
    onAddDonation(selectedCampaign.id, parsedAmount, finalName, finalMsg);

    // Play successful animation
    setSuccessAnimation(true);
    setStep(3); // Success Screen
    
    // Clear state
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowQris(false);
    setSelectedCampaign(null);
  };

  return (
    <div id="donasi-section" className="bg-slate-50 dark:bg-slate-900 transition-colors">
      
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
            <Heart className="w-4 h-4 text-rose-400 animate-pulse fill-rose-400" />
            <span>Infaq & Sedekah Online</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-serif font-black tracking-wider text-white uppercase drop-shadow-md mb-3">
            <span className="bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent">
              Gerakan Donasi & Infaq
            </span>
          </h2>

          <p className="mt-2 text-sm md:text-base text-emerald-100/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Salurkan amal jariyah terbaik Anda untuk mendukung pembangunan fisik, operasional kemakmuran masjid, dan santunan sosial umat.
          </p>
        </div>
      </div>

      {/* Main Body Section */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Dashboard layout: Left Campaigns / Right scrolling Donors list */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Campaigns Lists */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((camp) => {
              const pct = Math.min(Math.round((camp.raised / camp.target) * 100), 100);
              
              return (
                <div
                  id={`campaign-card-${camp.id}`}
                  key={camp.id}
                  className="bg-white dark:bg-slate-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 shadow-md flex flex-col justify-between"
                >
                  <div className="relative h-44 bg-slate-800">
                    <img
                      src={camp.image}
                      alt={camp.title}
                      className="w-full h-full object-cover filter brightness-[0.9]"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-emerald-700 text-white px-3 py-1 rounded-full border border-white/15">
                        {camp.category}
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                        {camp.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans mt-2 line-clamp-3">
                        {camp.description}
                      </p>
                    </div>

                    {/* Progress tracking section */}
                    <div className="mt-6 space-y-2.5">
                      <div className="flex justify-between items-end text-xs">
                        <div>
                          <p className="text-[10px] text-gray-400 font-sans uppercase">Terkumpul</p>
                          <p className="font-serif font-black text-sm md:text-base text-emerald-800 dark:text-amber-400">
                            {formatRupiah(camp.raised)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 font-sans uppercase">Target</p>
                          <p className="font-mono font-bold text-gray-700 dark:text-stone-300">
                            {formatRupiah(camp.target)}
                          </p>
                        </div>
                      </div>

                      {/* Bar indicator */}
                      <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-amber-400 rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      {/* Percentage + Donors Count detail row */}
                      <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">{pct}% Tercapai</span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {camp.donorsCount} Muwakif/Donatur
                        </span>
                      </div>
                    </div>

                    {/* CTA Donate button */}
                    <button
                      id={`donate-trigger-btn-${camp.id}`}
                      onClick={() => handleOpenDonateForm(camp)}
                      className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-emerald-600/10 flex items-center justify-center space-x-1"
                    >
                      <span>Infaq Online Sekarang</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scrolling Donors List Feed */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-950 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-md">
            <h3 className="text-lg font-serif font-bold text-gray-950 dark:text-white flex items-center mb-1">
              <Sparkles className="w-4 h-4 text-amber-500 mr-2 shrink-0 animate-pulse" />
              Doa & Shadaqah Terbaru
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mb-5 pb-3 border-b border-gray-100 dark:border-slate-800 leading-snug">
              Untaian doa terbaik para muwakif/donatur yang bersedekah di Masjid MAAR3.
            </p>

            {/* scrolling block */}
            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-emerald-800/10 scrollbar-track-transparent">
              {recentDonors.length > 0 ? (
                recentDonors.map((donor, idx) => {
                  const correlatedCamp = campaigns.find((c) => c.id === donor.campaignId);
                  
                  return (
                    <div
                      id={`recent-donor-card-${donor.id}`}
                      key={donor.id || idx}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100/50 dark:border-slate-800/50 text-left space-y-2 relative"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xs font-serif font-black text-gray-900 dark:text-white line-clamp-1">
                            {donor.name}
                          </h4>
                          <span className="text-[9px] uppercase tracking-wide bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                            {correlatedCamp ? correlatedCamp.category : 'Infaq'}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-emerald-700 dark:text-amber-400">
                          {formatRupiah(donor.amount)}
                        </span>
                      </div>

                      {donor.message && (
                        <p className="text-[11px] text-gray-600 dark:text-gray-400 italic bg-white dark:bg-slate-950/40 p-2 rounded-lg border border-gray-100/30 font-sans leading-relaxed">
                          "{donor.message}"
                        </p>
                      )}

                      <div className="text-[9px] text-gray-400 text-right">
                        {donor.date}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-xs text-gray-400 font-sans">
                  Belum ada transaksi donasi masuk hari ini.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* DONATION PROCESSING MODAL - QRIS FLOW */}
        <AnimatePresence>
          {showQris && selectedCampaign && (
            <div
              id="donation-modal-overlay"
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex justify-center items-center p-4 select-none"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ transform: 'scale(0.95)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                exit={{ transform: 'scale(0.95)', opacity: 0 }}
                className="bg-white dark:bg-slate-950 text-gray-900 dark:text-white rounded-3xl w-full max-w-lg p-6 shadow-2xl relative border border-gray-100 dark:border-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button Trigger */}
                <button
                  id="close-donate-modal-btn"
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2.5 rounded-full text-gray-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-900 focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* STEP 1: FORM INPUTS DETAILS */}
                {step === 1 && (
                  <form onSubmit={handleSubmitDetails} className="space-y-4 text-left pt-3">
                    <div className="border-b border-gray-100 dark:border-slate-800 pb-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-400 text-emerald-950 px-2 rounded-full inline-block">
                        Form Sahabat Jariyah
                      </span>
                      <h3 className="text-lg font-serif font-bold text-emerald-900 dark:text-white mt-1 leading-snug">
                        Infaq: {selectedCampaign.category}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        Untuk: {selectedCampaign.title}
                      </p>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Jumlah Infaq (Rupiah)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif font-black text-emerald-700 dark:text-emerald-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          required
                          min="10000"
                          placeholder="Jumlah Minimal Rp 10.000"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      {/* Preset triggers */}
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {donationPresets.map((pr) => (
                          <button
                            key={pr}
                            type="button"
                            onClick={() => handlePresetSelect(pr)}
                            className="py-1.5 rounded-lg border border-gray-100/40 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 font-mono text-[10px] text-gray-700 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors"
                          >
                            {pr >= 100000 ? `${pr / 1000}k` : formatRupiah(pr).replace('Rp', '')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name Inputs */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Nama Muwakif / Donatur
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Lengkap / Inisial (Kosongkan jika Hamba Allah)"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Message input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Doa & Harapan (Opsional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tuliskan do'a, harapan atau wasiat shadaqah anda..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    {/* Submit go to QRIS triggers */}
                    <button
                      id="submit-donate-btn"
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-emerald-500/10 flex items-center justify-center space-x-1"
                    >
                      <QrCode className="w-4 h-4" />
                      <span>Buat Kode Pembayaran QRIS</span>
                    </button>
                  </form>
                )}

                {/* STEP 2: DISPLAY PREMIUM QRIS PLACEHOLDER & CONFIRM TRIGGER */}
                {step === 2 && (
                  <div className="text-center space-y-5 py-4">
                    <div className="border-b border-gray-100 dark:border-slate-800 pb-3 text-left">
                      <h3 className="text-base font-serif font-bold text-emerald-950 dark:text-white leading-snug">
                        Metode Scan QRIS Masjid MAAR3
                      </h3>
                      <p className="text-xs text-gray-400">
                        Scan menggunakan e-wallet (Gopay, OVO, Dana, LinkAja) atau Mobile Banking (BCA, Mandiri, dll).
                      </p>
                    </div>

                    {/* QRIS Layout Frame */}
                    <div className="bg-white p-3 rounded-3xl border-2 border-dashed border-emerald-800/30 inline-block shadow-md max-w-[280px]">
                      <img
                        src={qrisDkmFlyer}
                        alt="QRIS ZISWAF DKM Masjid MAAR3"
                        className="w-56 h-auto rounded-2xl border border-gray-100 mx-auto"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Invoice details */}
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl text-left border border-gray-100 dark:border-slate-800 space-y-1.5 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-400">Nominal Infaq</span>
                        <span className="text-emerald-800 dark:text-amber-400 font-mono text-sm">
                          {formatRupiah(parseInt(amount))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">ID Muwakif</span>
                        <span className="font-mono text-[10px]">{donorName || 'Hamba Allah'}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 pt-1.5 text-center dark:text-gray-400 border-t border-white/20">
                        Kode Pembayaran ini di-generate otomatis untuk demo infaq virtual Masjid MAAR 3.
                      </p>
                    </div>

                    {/* Simulation controls */}
                    <div className="space-y-2 pt-2">
                      <button
                        id="confirm-payment-simulation"
                        type="button"
                        onClick={handleConfirmSimulationPayment}
                        className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-1"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Konfirmasi Donasi Berhasil (Simulasi)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full py-2.5 rounded-xl bg-transparent border border-gray-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-gray-500 hover:text-gray-700 text-xs font-semibold"
                      >
                        Edit Jumlah Infaq
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: SUCCESS ANIMATION SCREEN */}
                {step === 3 && (
                  <div className="text-center py-8 space-y-4">
                    {/* Ripple checked vectors */}
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-amber-400 mx-auto flex items-center justify-center animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-950 dark:text-white">
                        Infaq Berhasil Diterima!
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-amber-400 font-bold mt-1 uppercase tracking-wide">
                        Jazaakumullahu Khairan Katsiran
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-5 rounded-2xl text-xs max-w-sm mx-auto text-left leading-relaxed text-gray-600 dark:text-gray-400 font-sans space-y-1">
                      <p><strong>Nama:</strong> {donorName || 'Hamba Allah'}</p>
                      <p><strong>Infaq:</strong> {formatRupiah(parseInt(amount))}</p>
                      <p><strong>Tujuan:</strong> {selectedCampaign.title}</p>
                      <p className="border-t border-gray-100/30 pt-2 italic">
                        "{message || 'Semoga barokah dan bermanfaat bagi umat. Aamiin.'}"
                      </p>
                    </div>

                    <button
                      id="close-success-dialog"
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-lg shadow"
                    >
                      Selesai
                    </button>
                  </div>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
