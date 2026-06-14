import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Lock } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onAdminClick: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  darkMode,
  setDarkMode,
  onAdminClick,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'jadwal', label: 'Jadwal Sholat' },
    { id: 'kajian', label: 'Kajian' },
    { id: 'kegiatan', label: 'Kegiatan' },
    { id: 'umkm', label: 'UMKM' },
    { id: 'warga', label: 'Portal Warga' },
    { id: 'artikel', label: 'Artikel' },
    { id: 'donasi', label: 'Donasi' },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-emerald-950/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg border-b border-emerald-800/20 dark:border-slate-800/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div
            onClick={() => setCurrentTab('beranda')}
            className="flex items-center space-x-3 cursor-pointer group animate-fade-in"
          >
            {/* Official High-Fidelity DKM MAAR3 Logo Emblem */}
            <Logo size={58} className="group-hover:scale-105 duration-300 transition-transform filter drop-shadow-sm shrink-0" />
            <div>
              <div className="flex items-center">
                <span className="font-serif font-bold text-lg md:text-xl text-white tracking-wide">
                  MASJID MAAR 3
                </span>
                <span className="ml-1.5 inline-block text-[10px] bg-amber-400 text-emerald-950 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                  OGP
                </span>
              </div>
              <p className="text-[9px] md:text-[10px] text-emerald-200 dark:text-emerald-400 tracking-tight font-sans">
                Muniroh Abdullah Ar-Rukban 3
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                id={`nav-${item.id}`}
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`px-3.5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  currentTab === item.id
                    ? 'bg-amber-400 text-emerald-950 font-semibold shadow-md shadow-amber-400/20'
                    : 'text-gray-100 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side Utility Controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggler"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-200 hover:text-amber-400 hover:bg-white/10 transition-colors focus:outline-none"
              title="Ganti Tema"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-emerald-200" />}
            </button>

            {/* Admin Key Access Button */}
            <button
              id="admin-nav-button"
              onClick={onAdminClick}
              className="flex items-center space-x-1 px-4 py-2 rounded-full border border-amber-400/30 text-amber-300 hover:text-white hover:bg-amber-500/10 hover:border-amber-400 transition-all text-xs font-semibold uppercase tracking-wider"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Hamburguer Toggler */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              id="theme-toggler-mobile"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-200 hover:text-amber-400 hover:bg-white/10 transition-colors focus:outline-none"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-emerald-200" />}
            </button>
            <button
              id="mobile-menu-burger"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:text-amber-300 hover:bg-white/10 transition-all focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation with backdrop blur */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-emerald-950/98 dark:bg-slate-900/98 backdrop-blur-lg border-b border-emerald-800/30 dark:border-slate-800/30 shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="px-3 pt-4 pb-6 space-y-1.5 sm:px-4">
            {menuItems.map((item) => (
              <button
                id={`nav-mobile-${item.id}`}
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  currentTab === item.id
                    ? 'bg-amber-400 text-emerald-950 font-bold shadow-md shadow-amber-400/10'
                    : 'text-gray-200 hover:text-amber-400 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-emerald-800/30 dark:border-slate-800/35 flex flex-col space-y-2">
              <button
                id="admin-nav-button-mobile"
                onClick={() => {
                  onAdminClick();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 w-full py-3 rounded-lg bg-amber-500/10 border border-amber-400/40 text-amber-300 font-semibold text-sm tracking-wider uppercase"
              >
                <Lock className="w-4 h-4" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
