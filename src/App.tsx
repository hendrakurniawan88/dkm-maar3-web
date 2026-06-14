import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Firebase Integrations
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  updateDoc 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';

const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};
import Profil from './components/Profil';
import JadwalSholat from './components/JadwalSholat';
import KajianComponent from './components/Kajian';
import KegiatanComponent from './components/Kegiatan';
import GaleriComponent from './components/Galeri';
import ArtikelComponent from './components/Artikel';
import DonasiComponent from './components/Donasi';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import VideoProfil from './components/VideoProfil';
import VisitorCounter from './components/VisitorCounter';
// @ts-ignore
import fiqihSunnahFlyer from './assets/images/fiqih_sunnah_flyer_1780238395487.png';
// @ts-ignore
import sirahNabawiyahFlyer from './assets/images/sirah_nabawiyah_flyer_1780239260088.png';
// @ts-ignore
import bankSampahOrchidFlyer from './assets/images/bank_sampah_orchid_flyer_1780239512122.png';
// @ts-ignore
import ustadzIdrusAbidin from './assets/images/ustadz_idrus_abidin_1780270163083.png';
// @ts-ignore
import kbmaFlyer from './assets/images/kbma_flyer_1780456335511.png';
// @ts-ignore
import posyanduFlyer from './assets/images/posyandu_orchid_flyer_1780564362836.png';
// @ts-ignore
import sijumDistribusiFlyer from './assets/images/sijum_distribusi_makanan_baru_1780565800000_1780565764007.png';
// @ts-ignore
import ogpFarmFlyer from './assets/images/ogp_farm_hidroponik_baru_1780565995709.png';
// @ts-ignore
import idulAdhaFlyer from './assets/images/idul_adha_qurban_baru_1780566311000_1780566182958.png';
// @ts-ignore
import kerjaBaktiFlyer from './assets/images/kerja_bakti_islamic_1780566382364.png';

// Types
import { Artikel, Kegiatan, Kajian, Galeri, DonasiCampaign, Pengurus, Donor, Umkm } from './types';

// Initial Mock Content
import {
  INITIAL_ARTIKEL,
  INITIAL_KEGIATAN,
  INITIAL_KAJIAN,
  INITIAL_GALERI,
  INITIAL_DONASI,
  INITIAL_PENGURUS,
  INITIAL_UMKM,
} from './data/initialData';

import UmkmPanel from './components/UmkmPanel';
import WargaPanel from './components/WargaPanel';
import AssetMasjid from './components/AssetMasjid';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Core structured states initialized to default fallback data
  const [artikelList, setArtikelList] = useState<Artikel[]>(INITIAL_ARTIKEL);
  const [kegiatanList, setKegiatanList] = useState<Kegiatan[]>(INITIAL_KEGIATAN);
  const [kajianList, setKajianList] = useState<Kajian[]>(INITIAL_KAJIAN);
  const [galeriList, setGaleriList] = useState<Galeri[]>(INITIAL_GALERI);
  const [campaignList, setCampaignList] = useState<DonasiCampaign[]>(INITIAL_DONASI);
  const [pengurusList, setPengurusList] = useState<Pengurus[]>(INITIAL_PENGURUS);
  const [umkmList, setUmkmList] = useState<Umkm[]>(INITIAL_UMKM);
  const [profileVideoUrl, setProfileVideoUrl] = useState<string>('https://www.youtube.com/watch?v=6NLwziTHHy4&list=PLLrzrdSGtEBben3b7-LIzvaqjY60XFM8S');
  
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Set up Firebase Auth listener to make user reactive in App component
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((usr) => {
      setCurrentUser(usr);
    });
    return () => unsub();
  }, []);

  const [recentDonors, setRecentDonors] = useState<Donor[]>([
    {
      id: 'don-p-1',
      campaignId: 'don-1',
      name: 'Bapak H. Yudhi Akhtar',
      amount: 2500000,
      date: '2026-05-30',
      message: 'Bismillah, lancarkan seluruh renovasi menara kiblat Masjid MAAR3. Semoga menjadi wasilah istana surga.',
    },
    {
      id: 'don-p-2',
      campaignId: 'don-2',
      name: 'Ibu Ratna Orchid',
      amount: 150000,
      date: '2026-05-31',
      message: 'Sedekah jumat barokah, khusus bagi asatidzah dan operasional kelistrikan ac subuh.',
    },
    {
      id: 'don-p-3',
      campaignId: 'don-4',
      name: 'Hamba Allah',
      amount: 300000,
      date: '2026-05-31',
      message: 'Infaq bagi santunan rutin bulanan anak yatim komplek Orchid Green Park.'
    }
  ]);

  // PHASE 1: REAL-TIME FIRESTORE LISTENER SYNC ENGINE
  useEffect(() => {
    const unsubscribers = [
      onSnapshot(collection(db, 'artikel'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Artikel[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Artikel);
          });
          setArtikelList(items);
        }
      }, (e) => {
        console.error('Subscription error artikel: ', e);
        handleFirestoreError(e, OperationType.GET, 'artikel');
      }),

      onSnapshot(collection(db, 'kegiatan'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Kegiatan[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Kegiatan);
          });
          setKegiatanList(items);
        }
      }, (e) => {
        console.error('Subscription error kegiatan: ', e);
        handleFirestoreError(e, OperationType.GET, 'kegiatan');
      }),

      onSnapshot(collection(db, 'kajian'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Kajian[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Kajian);
          });
          setKajianList(items);
        }
      }, (e) => {
        console.error('Subscription error kajian: ', e);
        handleFirestoreError(e, OperationType.GET, 'kajian');
      }),

      onSnapshot(collection(db, 'galeri'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Galeri[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Galeri);
          });
          setGaleriList(items);
        }
      }, (e) => {
        console.error('Subscription error galeri: ', e);
        handleFirestoreError(e, OperationType.GET, 'galeri');
      }),

      onSnapshot(collection(db, 'campaigns'), (snapshot) => {
        if (!snapshot.empty) {
          const items: DonasiCampaign[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as DonasiCampaign);
          });
          setCampaignList(items);
        }
      }, (e) => {
        console.error('Subscription error campaigns: ', e);
        handleFirestoreError(e, OperationType.GET, 'campaigns');
      }),

      onSnapshot(collection(db, 'pengurus'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Pengurus[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Pengurus);
          });
          setPengurusList(items);
        }
      }, (e) => {
        console.error('Subscription error pengurus: ', e);
        handleFirestoreError(e, OperationType.GET, 'pengurus');
      }),

      onSnapshot(collection(db, 'donors'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Donor[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Donor);
          });
          items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setRecentDonors(items);
        }
      }, (e) => {
        console.error('Subscription error donors: ', e);
        handleFirestoreError(e, OperationType.GET, 'donors');
      }),

      onSnapshot(collection(db, 'umkm'), (snapshot) => {
        if (!snapshot.empty) {
          const items: Umkm[] = [];
          snapshot.forEach((snap) => {
            items.push(snap.data() as Umkm);
          });
          setUmkmList(items);
        }
      }, (e) => {
        console.error('Subscription error umkm: ', e);
        handleFirestoreError(e, OperationType.GET, 'umkm');
      }),

      onSnapshot(doc(db, 'config', 'app'), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && data.profileVideoUrl) {
            setProfileVideoUrl(data.profileVideoUrl);
          }
        }
      }, (e) => {
        console.error('Subscription error config: ', e);
        handleFirestoreError(e, OperationType.GET, 'config/app');
      })
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  // PHASE 2: AUTOMATIC RETROACTIVE BACKEND DATABASES SEEDER
  useEffect(() => {
    const seedCollectionIfEmpty = async (collectionName: string, initialData: any[]) => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        if (querySnapshot.empty) {
          console.log(`Seeding database collection "${collectionName}" with defaults...`);
          for (const item of initialData) {
            await setDoc(doc(db, collectionName, item.id), item);
          }
        }
      } catch (error) {
        console.error(`Error seeding ${collectionName}:`, error);
      }
    };

    const runAutoSeeding = async () => {
      if (currentUser && (currentUser.email === 'saylhendra@gmail.com' || currentUser.email === 'yudhiakhtar@gmail.com')) {
        const isSeeded = localStorage.getItem('maar3_firestore_seeded_ok');
        if (!isSeeded) {
          try {
            await seedCollectionIfEmpty('artikel', INITIAL_ARTIKEL);
            await seedCollectionIfEmpty('kegiatan', INITIAL_KEGIATAN);
            await seedCollectionIfEmpty('kajian', INITIAL_KAJIAN);
            await seedCollectionIfEmpty('galeri', INITIAL_GALERI);
            await seedCollectionIfEmpty('campaigns', INITIAL_DONASI);
            await seedCollectionIfEmpty('pengurus', INITIAL_PENGURUS);
            await seedCollectionIfEmpty('umkm', INITIAL_UMKM);

            // Default donors
            const donorQuery = await getDocs(collection(db, 'donors'));
            if (donorQuery.empty) {
              const defaultDonors = [
                {
                  id: 'don-p-1',
                  campaignId: 'don-1',
                  name: 'Bapak H. Yudhi Akhtar',
                  amount: 2500000,
                  date: '2026-05-30',
                  message: 'Bismillah, lancarkan seluruh renovasi menara kiblat Masjid MAAR3. Semoga menjadi wasilah istana surga.',
                },
                {
                  id: 'don-p-2',
                  campaignId: 'don-2',
                  name: 'Ibu Ratna Orchid',
                  amount: 150000,
                  date: '2026-05-31',
                  message: 'Sedekah jumat barokah, khusus bagi asatidzah dan operasional kelistrikan ac subuh.',
                },
                {
                  id: 'don-p-3',
                  campaignId: 'don-4',
                  name: 'Hamba Allah',
                  amount: 300000,
                  date: '2026-05-31',
                  message: 'Infaq bagi santunan rutin bulanan anak yatim komplek Orchid Green Park.'
                }
              ];
              for (const d of defaultDonors) {
                await setDoc(doc(db, 'donors', d.id), d);
              }
            }

            // Default config
            const configDoc = doc(db, 'config', 'app');
            await setDoc(configDoc, { profileVideoUrl: 'https://www.youtube.com/watch?v=6NLwziTHHy4&list=PLLrzrdSGtEBben3b7-LIzvaqjY60XFM8S' });

            localStorage.setItem('maar3_firestore_seeded_ok', 'true');
            console.log('Seeding cloud complete!');
          } catch (e) {
            console.error('Failed to run cloud seeder: ', e);
          }
        }
      }
    };
    runAutoSeeding();
  }, [currentUser]);

  // PHASE 3: SECURED TRANSACTION SYNCHRONIZATION WRAPPERS
  const syncArtikelList = async (action: React.SetStateAction<Artikel[]>) => {
    const newValue = typeof action === 'function' ? action(artikelList) : action;
    setArtikelList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_artikel', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = artikelList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'artikel', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = artikelList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'artikel', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'artikel');
    }
  };

  const syncKegiatanList = async (action: React.SetStateAction<Kegiatan[]>) => {
    const newValue = typeof action === 'function' ? action(kegiatanList) : action;
    setKegiatanList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_kegiatan', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = kegiatanList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'kegiatan', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = kegiatanList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'kegiatan', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'kegiatan');
    }
  };

  const syncKajianList = async (action: React.SetStateAction<Kajian[]>) => {
    const newValue = typeof action === 'function' ? action(kajianList) : action;
    setKajianList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_kajian', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = kajianList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'kajian', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = kajianList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'kajian', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'kajian');
    }
  };

  const syncGaleriList = async (action: React.SetStateAction<Galeri[]>) => {
    const newValue = typeof action === 'function' ? action(galeriList) : action;
    setGaleriList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_galeri', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = galeriList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'galeri', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = galeriList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'galeri', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'galeri');
    }
  };

  const syncCampaignList = async (action: React.SetStateAction<DonasiCampaign[]>) => {
    const newValue = typeof action === 'function' ? action(campaignList) : action;
    setCampaignList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_campaigns', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = campaignList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'campaigns', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = campaignList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'campaigns', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'campaigns');
    }
  };

  const syncPengurusList = async (action: React.SetStateAction<Pengurus[]>) => {
    const newValue = typeof action === 'function' ? action(pengurusList) : action;
    setPengurusList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_pengurus', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = pengurusList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'pengurus', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = pengurusList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'pengurus', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'pengurus');
    }
  };

  const syncUmkmList = async (action: React.SetStateAction<Umkm[]>) => {
    const newValue = typeof action === 'function' ? action(umkmList) : action;
    setUmkmList(newValue);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_umkm', JSON.stringify(newValue));
      return;
    }

    try {
      const deleted = umkmList.filter(oldItem => !newValue.some(newItem => newItem.id === oldItem.id));
      for (const item of deleted) {
        await deleteDoc(doc(db, 'umkm', item.id));
      }
      const addedOrUpdated = newValue.filter(newItem => {
        const oldItem = umkmList.find(x => x.id === newItem.id);
        return !oldItem || JSON.stringify(oldItem) !== JSON.stringify(newItem);
      });
      for (const item of addedOrUpdated) {
        await setDoc(doc(db, 'umkm', item.id), item);
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'umkm');
    }
  };

  const syncProfileVideoUrl = async (url: string) => {
    setProfileVideoUrl(url);

    if (!currentUser || (currentUser.email !== 'saylhendra@gmail.com' && currentUser.email !== 'yudhiakhtar@gmail.com')) {
      localStorage.setItem('maar3_profile_video', url);
      return;
    }

    try {
      await setDoc(doc(db, 'config', 'app'), { profileVideoUrl: url });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'config/app');
    }
  };

  // Dark light mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Article Liking functionality
  const handleLikeArtikel = async (id: string) => {
    const article = artikelList.find((art) => art.id === id);
    if (!article) return;

    // Optimistically update lists
    setArtikelList((prev) =>
      prev.map((art) => (art.id === id ? { ...art, likes: art.likes + 1 } : art))
    );

    try {
      await setDoc(doc(db, 'artikel', id), {
        ...article,
        likes: article.likes + 1
      });
    } catch (e) {
      console.error('Error updating public article likes count: ', e);
      localStorage.setItem('maar3_artikel', JSON.stringify(artikelList));
    }
  };

  // Add donation live simulation handler
  const handleAddDonation = async (campaignId: string, amount: number, donorName: string, message: string) => {
    const campaign = campaignList.find((camp) => camp.id === campaignId);
    if (!campaign) return;

    const newDonor: Donor = {
      id: `donor-${Date.now()}`,
      campaignId,
      name: donorName,
      amount,
      date: new Date().toISOString().split('T')[0],
      message,
    };

    // Optimistically update client UI lists
    setCampaignList((prev) =>
      prev.map((camp) =>
        camp.id === campaignId
          ? {
              ...camp,
              raised: camp.raised + amount,
              donorsCount: camp.donorsCount + 1,
            }
          : camp
      )
    );
    setRecentDonors((prev) => [newDonor, ...prev]);

    try {
      // 1. Create Donor Item record in Cloud (permitted for guests)
      await setDoc(doc(db, 'donors', newDonor.id), newDonor);

      // 2. Increment raised funds matching constraints on campaigns collection (permitted for guests)
      await setDoc(doc(db, 'campaigns', campaignId), {
        ...campaign,
        raised: campaign.raised + amount,
        donorsCount: campaign.donorsCount + 1,
      });
    } catch (e) {
      console.error('Failed to submit simulation donation records to Firestore: ', e);
      // fallback persistence
      localStorage.setItem('maar3_campaigns', JSON.stringify(campaignList));
      localStorage.setItem('maar3_donors', JSON.stringify([newDonor, ...recentDonors]));
    }
  };

  // Active Tab View Routing render helper
  const renderTabView = () => {
    switch (currentTab) {
      case 'beranda':
        return (
          <>
            <Hero onTabChange={setCurrentTab} />
                       {/* Quick Summary Highlights Section */}
            <div className="bg-slate-50 dark:bg-slate-950 py-16 border-t border-emerald-950/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Text panel Center */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariant}
                  className="text-center max-w-3xl mx-auto space-y-4 mb-12 flex flex-col items-center justify-center text-center w-full"
                >
                  <span className="text-xs uppercase font-extrabold text-amber-600 tracking-widest bg-amber-100 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full inline-block text-center mx-auto">
                    Pusat Kemaslahatan Umat
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-gray-950 dark:text-white leading-tight text-center">
                    Visi Kebersamaan Di Wilayah Depok
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-sans max-w-2xl mx-auto text-center">
                    Masjid MAAR3 bukan sekadar bangunan peribadahan bisu. Kami membina lingkungan harmonis warga Orchid Green Park melalui kolaborasi program kesejahteraan lahir dan batin, kebersihan ekologi lingkungan, serta pembinaan akhlaq generasi masa depan bangsa.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => setCurrentTab('profil')}
                      className="py-2.5 px-5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase cursor-pointer transition-colors shadow-sm"
                    >
                      Baca Sejarah Masjid &rarr;
                    </button>
                    <button
                      onClick={() => setCurrentTab('artikel')}
                      className="py-2.5 px-5 rounded-lg border border-gray-200 text-gray-650 hover:text-emerald-700 dark:border-slate-800 dark:text-slate-300 dark:hover:text-amber-400 text-xs font-bold uppercase cursor-pointer"
                    >
                      Perpustakaan Syiar Artikel
                    </button>
                  </div>
                </motion.div>

                {/* Visual card Highlights Below, Centered */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeInUpVariant}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
                >
                  
                  {/* Highlight Box 1 */}
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-150/40 dark:border-slate-800 text-center flex flex-col items-center relative overflow-hidden group cursor-pointer transition-colors duration-300"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/5 rounded-full blur-xl group-hover:scale-125 duration-500 transition-transform" />
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-bold mb-4 font-mono">
                      🕋
                    </div>
                    <h4 className="font-serif font-bold text-base text-gray-950 dark:text-white">
                      Kajian Ruang Utama
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-sans leading-relaxed">
                      Pengembangan materi figh, tafsir, aqidah serta tazkiyatun nafs rutin dibina asatidzah berkompeten tiap Sabtu & Ahad subuh.
                    </p>
                  </motion.div>

                  {/* Highlight Box 2 */}
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -4, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15), 0 10px 10px -5px rgba(0,0,0,0.08)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-150/40 dark:border-slate-800 text-center flex flex-col items-center relative overflow-hidden group cursor-pointer transition-colors duration-300"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/5 rounded-full blur-xl group-hover:scale-125 duration-500 transition-transform" />
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 font-mono">
                      🌱
                    </div>
                    <h4 className="font-serif font-bold text-base text-gray-950 dark:text-white">
                      Bank Sampah & Posyandu
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-sans leading-relaxed">
                      Sinergitas nyata DKM MAAR3 bersama pengurus warga Orchid Green Park dalam melestarikan bumi asri asri serta pemeriksaan balita-lansia.
                    </p>
                  </motion.div>

                </motion.div>

              </div>
            </div>

            {/* Video Profil Masjid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariant}
            >
              <VideoProfil 
                videoUrl={profileVideoUrl} 
                onUpdateVideoUrl={syncProfileVideoUrl} 
                isAdmin={true}
              />
            </motion.div>

            {/* Asset Masjid Panel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariant}
            >
              <AssetMasjid />
            </motion.div>

            {/* Visitor Counter Section */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUpVariant}
            >
              <VisitorCounter />
            </motion.div>


          </>
        );

      case 'profil':
        return <Profil pengurusList={pengurusList} />;
      
      case 'jadwal':
        return <JadwalSholat />;

      case 'kajian':
        return <KajianComponent kajianList={kajianList} />;

      case 'kegiatan':
        return <KegiatanComponent kegiatanList={kegiatanList} />;

      case 'galeri':
        return <GaleriComponent galeriList={galeriList} />;

      case 'umkm':
        return <UmkmPanel umkmList={umkmList} showFullHeader={true} />;

      case 'warga':
        return <WargaPanel showFullHeader={true} />;

      case 'artikel':
        return <ArtikelComponent artikelList={artikelList} onLike={handleLikeArtikel} />;

      case 'donasi':
        return (
          <DonasiComponent
            campaigns={campaignList}
            onAddDonation={handleAddDonation}
            recentDonors={recentDonors}
          />
        );

      case 'admin':
        return (
          <AdminDashboard
            artikelList={artikelList}
            kegiatanList={kegiatanList}
            kajianList={kajianList}
            galeriList={galeriList}
            campaignList={campaignList}
            pengurusList={pengurusList}
            umkmList={umkmList}
            setArtikelList={syncArtikelList}
            setKegiatanList={syncKegiatanList}
            setKajianList={syncKajianList}
            setGaleriList={syncGaleriList}
            setCampaignList={syncCampaignList}
            setPengurusList={syncPengurusList}
            setUmkmList={syncUmkmList}
            onClose={() => setCurrentTab('beranda')}
          />
        );

      default:
        return <Hero onTabChange={setCurrentTab} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Glossmorphism Header Navigation Menu */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAdminClick={() => setCurrentTab('admin')}
      />

      {/* Main Routed Components viewport */}
      <main className="flex-grow">
        {renderTabView()}
      </main>

      {/* Footer layout */}
      <Footer
        onTabChange={setCurrentTab}
        onAdminClick={() => setCurrentTab('admin')}
      />

    </div>
  );
}
