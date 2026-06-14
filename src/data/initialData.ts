import { Artikel, Kegiatan, Kajian, Galeri, DonasiCampaign, Pengurus, Umkm } from '../types';
// @ts-ignore
import fiqihSunnahFlyer from '../assets/images/fiqih_sunnah_flyer_1780238395487.png';
// @ts-ignore
import sirahNabawiyahFlyer from '../assets/images/sirah_nabawiyah_flyer_1780239260088.png';
// @ts-ignore
import bankSampahOrchidFlyer from '../assets/images/bank_sampah_orchid_flyer_1780239512122.png';
// @ts-ignore
import ustadzIdrusAbidin from '../assets/images/ustadz_idrus_abidin_1780270163083.png';
// @ts-ignore
import kbmaFlyer from '../assets/images/kbma_flyer_1780456335511.png';
// @ts-ignore
import posyanduFlyer from '../assets/images/posyandu_orchid_flyer_1780564362836.png';
// @ts-ignore
import sijumBerkahFlyer from '../assets/images/sijum_berkah_makan_bersama_1780565309782.png';
// @ts-ignore
import sijumDistribusiFlyer from '../assets/images/sijum_distribusi_makanan_baru_1780565800000_1780565764007.png';
// @ts-ignore
import ogpFarmFlyer from '../assets/images/ogp_farm_hidroponik_baru_1780565995709.png';
// @ts-ignore
import idulAdhaFlyer from '../assets/images/idul_adha_qurban_baru_1780566311000_1780566182958.png';
// @ts-ignore
import kerjaBaktiFlyer from '../assets/images/kerja_bakti_islamic_1780566382364.png';
// @ts-ignore
import jamIslamiDiagram from '../assets/images/jam_islami_diagram_1780910995872.png';
// @ts-ignore
import kalenderHijriyahHeader from '../assets/images/kalender_hijriyah_1447_header_1780911459035.png';
// @ts-ignore
import koperasiOgpFlyer from '../assets/images/koperasi_ogp_flyer_1780912340573.png';

// Unsplash premium Islamic & related aesthetics images
export const IMAGES = {
  heroBg: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=1600', // Beautiful mosque lanterns senja ambience
  masjidFront: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=800', // Elegant mosque arch dome
  masjidInterior: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=800', // Light filtering through Islamic design
  kajianIslam: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', // Lecture atmosphere
  sedekahJumat: sijumDistribusiFlyer, // Highly polished Islamic community meal image
  greenOrchid: bankSampahOrchidFlyer, // Beautiful generated Bank Sampah flyer
  ogpFarm: ogpFarmFlyer, // Beautifully generated OGP Farm hydroponic harvest image with Islamic theme
  idulAdha: idulAdhaFlyer, // Beautifully generated clean Islamic Idul Adha celebration/qurban imagery
  communityClean: kerjaBaktiFlyer, // Highly polished Islamic community work (kerja bakti) image
  kidsQuran: 'https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?auto=format&fit=crop&q=80&w=800', // Kids learning
  kbmaFlyer: kbmaFlyer, // New high-quality KBMA flyer
  sportOrchid: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800', // Sports/running
  posyandu: posyanduFlyer, // Magnificent generated Posyandu flyer matching user attached design
  charityOrphan: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800', // Warm social
  eidUmat: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800', // Eid prayer/celebration
  jamIslami: jamIslamiDiagram, // Real jam islami cycle diagram matching PDF page 2
  calendar1447: kalenderHijriyahHeader, // Premium generated calendar 1447 image
  koperasiOgp: koperasiOgpFlyer, // Professional generated Koperasi OGP flyer
};

export const INITIAL_KAJIAN: Kajian[] = [
  {
    id: 'kajian-1',
    ustadz: 'Ustadz Amir Hamzah Lc, MHI',
    theme: 'Fiqih Sunnah',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Pekan Ke-1',
    image: fiqihSunnahFlyer,
    youtubeUrl: 'https://www.youtube.com/watch?v=j2vT1jVXy8o&list=PLLrzrdSGtEBbecjyimKIA4-bQtmERO8QX'
  },
  {
    id: 'kajian-2',
    ustadz: 'Ustadz Hariyanto Lc, MHI',
    theme: 'Shiroh Nabawiyah',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Pekan Ke-2',
    image: sirahNabawiyahFlyer,
    youtubeUrl: 'https://www.youtube.com/watch?v=qU-vkkP4Kcs&list=PLLrzrdSGtEBb-C2PRtbkS-kEC5alDx-AO'
  },
  {
    id: 'kajian-3',
    ustadz: 'Ustadz Idrus Abidin Lc, MA',
    theme: 'Tadabbur & Tafsir Al Quran',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Pekan Ke-3',
    image: ustadzIdrusAbidin,
    youtubeUrl: 'https://www.youtube.com/watch?v=RHm6x5T-DeI&list=PLLrzrdSGtEBa7JshntlsIJ3cIxvk7-ra6'
  },
  {
    id: 'kajian-4',
    ustadz: 'Ustadz Zainal Abidin Lc',
    theme: 'Tazkiyatun Nafs',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Pekan Ke-4',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=300',
    youtubeUrl: 'https://www.youtube.com/watch?v=raAsVvfzLt8&list=PLLrzrdSGtEBZLwtXnLIY8Ja3CVF_HNvMT'
  },
  {
    id: 'kajian-5',
    ustadz: 'Ustadz Dr. Ronny Hidayat Lc, MA',
    theme: 'Kitab Adabul Mufrod',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Pekan Ke-5',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=300',
    youtubeUrl: 'https://www.youtube.com/watch?v=DBuNS3Ua2Nc&list=PLLrzrdSGtEBa2VzuEXpEQikURll5uYCF9'
  },
  {
    id: 'kajian-6',
    ustadz: 'Ustadzah Muthiah Yusuf Lc., S.Pd.I., MA',
    theme: 'Kajian Hilyah Attilawah',
    time: 'Ba’da Subuh s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Setiap Sabtu / Ahad Pekan Tertentu',
    image: 'https://images.unsplash.com/photo-1609599006353-e629f1d40e39?auto=format&fit=crop&q=80&w=600',
    youtubeUrl: 'https://www.youtube.com/watch?v=k4U-Y8S2Tds&list=PLLrzrdSGtEBYn29mO7GvclI165P6_K985'
  },
  {
    id: 'kajian-7',
    ustadz: 'Ustadzah Muthiah Yusuf Lc., S.Pd.I., MA',
    theme: 'Kajian Fiqih Ibu Kitab \'Umdatul Mar\'ah',
    time: 'Ba’da Ashar s/d Selesai',
    location: 'Masjid MAAR 3',
    day: 'Setiap Sabtu Sore',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    youtubeUrl: 'https://www.youtube.com/watch?v=k4U-Y8S2Tds&list=PLLrzrdSGtEBYn29mO7GvclI165P6_K985'
  }
];

export const INITIAL_KEGIATAN: Kegiatan[] = [
  {
    id: 'keg-1',
    title: 'Kajian Rutin Ba’da Subuh Akhir Pekan',
    category: 'Kajian Islam',
    description: 'Siri kajian kitab mendalam bersama asatidzah berkompeten bertempat di ruang utama Masjid MAAR 3.',
    date: 'Setiap Sabtu & Ahad',
    time: '04:45 - 06:15 WIB',
    location: 'Masjid MAAR 3, OGP',
    image: IMAGES.kajianIslam,
    status: 'Sedang Berjalan',
    youtubeUrl: 'https://www.youtube.com/watch?v=wJWkViLZH54&list=PLLrzrdSGtEBZ3j8AVDL89668jie2FYb9g&index=1'
  },
  {
    id: 'keg-2',
    title: 'SiJum Berkah & Makan Bersama Selepas Jumat',
    category: 'SiJum',
    description: 'Pembagian hidangan makan siang selepas Sholat Jumat untuk jamaah dan dhuafa di sekitar Orchid Park.',
    date: 'Setiap Hari Jumat',
    time: '12:30 WIB - Selesai',
    location: 'Halaman Masjid MAAR 3',
    image: IMAGES.sedekahJumat,
    status: 'Sedang Berjalan',
    youtubeUrl: 'https://www.youtube.com/watch?v=dLVyne2GSIY&list=PLLrzrdSGtEBZ-pVIcjf5v-Do7cRZGpHz8&index=3'
  },
  {
    id: 'keg-3',
    title: 'Bank Sampah OGP: Pilah Sampah Peduli Bumi',
    category: 'Bank Sampah',
    description: 'Program pengumpulan dan pemilahan sampah anorganik warga untuk didaur ulang secara produktif dan berkah.',
    date: 'Setiap Pekan Ke-2 & Ke-4',
    time: '08:00 - 10:30 WIB',
    location: 'Samping Balai Warga OGP',
    image: IMAGES.greenOrchid,
    status: 'Mendatang',
    youtubeUrl: 'https://www.youtube.com/watch?v=SGDEwQmLGOI&list=PLLrzrdSGtEBZ59Zf5dGQ97rRNXVzB70j5'
  },
  {
    id: 'keg-4',
    title: 'Posyandu OGP: Pelayanan Kesehatan Tumbuh Kembang Lansia & Balita',
    category: 'Posyandu',
    description: 'Pemeriksaan kesehatan gratis, imunisasi balita, serta penyuluhan kesehatan lansia bekerjasama dengan Puskesmas Sawangan.',
    date: 'Setiap Kamis Pekan Ke-3',
    time: '09:00 - 12:00 WIB',
    location: 'Saung Serbaguna OGP',
    image: IMAGES.posyandu,
    status: 'Mendatang',
    youtubeUrl: 'https://www.youtube.com/watch?v=5alDG_L8ePc&list=PLLrzrdSGtEBa51WI3Yf_zjTC8LPJyZQQM'
  },
  {
    id: 'keg-5',
    title: 'Ogp Sport : Badminton, Volly, Tenis Meja, Sepeda, Lari',
    category: 'Ogp Sport',
    description: 'Sarana olahraga bersama bagi warga perumahan yang meliputi Badminton, Volly, Tenis Meja, Sepeda, dan Lari guna mempererat silaturahim dan menjaga kesehatan fisik bersama.',
    date: 'Setiap Ahad Sore',
    time: '15:45 - 17:45 WIB',
    location: 'Lapangan OGP Sport Center',
    image: IMAGES.sportOrchid,
    status: 'Sedang Berjalan',
    youtubeUrl: 'https://www.youtube.com/watch?v=Gd7H9_Af3sN'
  },
  {
    id: 'keg-6',
    title: 'KBMA: Kelompok Belajar Membaca Al-Qur\'an',
    category: 'KBMA',
    description: 'Gerakan Nasional Pengentasan Buta Aksara Al-Qur\'an dengan Metode Ishlah di Masjid MAAR 3 OGP. Program ini gratis! Manfaat mencakup kemampuan membaca Al-Qur\'an dari dasar, e-sertifikat dari LPQQ Kota Depok, silaturahmi, dan menjadi bagian dari pengentasan butasa aksara nasional.',
    date: 'Setiap Ahad',
    time: 'Ba’da Maghrib - Isya',
    location: 'Masjid MAAR3 Perum. Orchid Green Park',
    image: IMAGES.kbmaFlyer,
    status: 'Sedang Berjalan',
    youtubeUrl: 'https://www.youtube.com/watch?v=eU_obh7NUdI&list=PLLrzrdSGtEBZC7XLgvTlzf3lv4CcR6lca'
  },
  {
    id: 'keg-7',
    title: 'Gema Takbir & Semarak Ramadhan Karim',
    category: 'Ramadhan',
    description: 'Rangkaian kegiatan buka puasa bersama, nuzulul quran, pesantren kilat, tarawih khusyuk, dan iktikaf sepuluh hari terakhir.',
    date: '1 Ramadhan s/d Syawal',
    time: '24 Jam Penuh Berkah',
    location: 'Masjid MAAR 3 & Kawasan OGP',
    image: IMAGES.eidUmat,
    status: 'Selesai',
    youtubeUrl: 'https://www.youtube.com/watch?v=sMBP5oKVJhQ&list=PLLrzrdSGtEBaV2ESuLHj_BMbfShbXJvj-'
  },
  {
    id: 'keg-8',
    title: 'Program Qurban Berkah & Tebar Manfaat Idul Adha',
    category: 'Idul Adha',
    description: 'Penerimaan, penyembelihan, dan penyaluran daging hewan qurban Masjid MAAR3 secara sehat dan bersih bagi warga Sawangan.',
    date: '10 Dzulhijjah 1447 H',
    time: '07:30 WIB - Selesai',
    location: 'Area Pemotongan Masjid MAAR 3',
    image: IMAGES.idulAdha,
    status: 'Mendatang',
    youtubeUrl: 'https://www.youtube.com/watch?v=AmkEJ_pMySk&list=PLLrzrdSGtEBbXivJwR0o6cPYeU6v9pjpM'
  },
  {
    id: 'keg-9',
    title: 'Ogp Farm: Ketahanan Pangan Warga & Hidroponik Lestari',
    category: 'Ogp Farm',
    description: 'Pelatihan pembuatan sistem hidroponik, penyemaian benih sayuran, dan perawatan kebun tani bersama warga di lingkungan perumahan.',
    date: 'Setiap Sabtu Sore',
    time: '16:00 WIB - Selesai',
    location: 'Kebun Vertikal Hijau OGP',
    image: IMAGES.ogpFarm,
    status: 'Sedang Berjalan',
    youtubeUrl: 'https://www.youtube.com/watch?v=Fd8S_b29fH3'
  },
  {
    id: 'keg-10',
    title: 'Koperasi OGP kawasan lingkungan orchid green park',
    category: 'Kopsyar OGP',
    description: 'Musyawarah akbar warga perumahan dalam rangka pembentukan, pendaftaran, dan pengelolaan Koperasi Syariah (Kopsyar) OGP untuk pemberdayaan ekonomi umat yang berkeadilan.',
    date: 'Ahad, 14 Juni 2026',
    time: '09:00 WIB - Selesai',
    location: 'Aula Utama Masjid Orchid Green Park',
    image: IMAGES.koperasiOgp,
    status: 'Selesai',
    youtubeUrl: 'https://www.youtube.com/watch?v=Kd9R_f23dH8'
  }
];

export const INITIAL_ARTIKEL: Artikel[] = [
  {
    id: 'art-1',
    title: 'Mengokohkan Aqidah Islam di Era Digital yang Serba Cepat',
    category: 'Aqidah',
    snippet: 'Bagaimana menjaga integritas keimanan dan menjauhkan keraguan di tengah derasnya arus informasi media sosial modern.',
    content: `Kehidupan di era modern menyajikan tantangan yang unik bagi keimanan seorang Muslim. Informasi bergulir tanpa batas, membuka ruang bagi berbagai pemikiran yang sekilas logis namun bisa mengikis kemurnian tauhid jika tidak difilter dengan baik.

Rasulullah SAW bersabda, "Segeralah beramal sebelum datangnya fitnah-fitnah yang seperti potongan malam yang gelapgulita. Di pagi hari seseorang dalam keadaan mukmin dan di sore harinya menjadi kafir." (HR. Muslim).

Langkah kokoh membentengi Aqidah di era modern:
1. Menuntut Ilmu Syar'i yang Bersumber dari Kitabullah dan Sunnah Melalui Guru berkompeten.
2. Memperbanyak Doa Keteguhan Iman (Ya Muqollibal Qulub Tsabbit Qolbi 'Ala Dienik).
3. Memilih Komunitas Bergaul yang Saling Mengingatkan dalam Ibadah.
4. Membatasi Konsumsi Konten yang Menyebarkan Syubhat atau Keraguan Agama.

Mari luangkan waktu menghadiri rukun kajian di Masjid MAAR 3 bersama para asatidzah demi menyegarkan kembali sumpah iman kita setiap pekan.`,
    author: 'Ustadz Idrus Abidin Lc, MA',
    date: '2026-05-28',
    readTime: '5 Menit Baca',
    image: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=400',
    likes: 42
  },
  {
    id: 'art-2',
    title: 'Panduan Praktis Thaharah & Sifat Sholat Nabi Muhammad SAW',
    category: 'Fiqih',
    snippet: 'Mengulas hukum thaharah dan meluruskan gerakan-gerakan sholat agar selaras dengan tuntunan syari’at yang shahih.',
    content: `Sholat adalah tiang agama dan amalan yang pertama kali dihisab pada Hari Kiamat. Agar diterima di sisi Allah SWT, sholat wajib memenuhi dua syarat mutlak: ikhlas karena Allah dan mutaba'ah (mengikuti tuntunan) Rasulullah SAW.

Nabi SAW bersabda, "Sholatlah kalian sebagaimana kalian melihat aku sholat." (HR. Bukhari).

Beberapa poin penyempurna Sholat kita:
1. Thaharah Sempurna: Berwudhu dengan membasuh anggota wudhu secara merata tanpa tergesa-gesa.
2. Thuma'ninah di Setiap Posisi: Tidak terburu-buru ruku' dan sujud hingga tulang kembali lurus mapan.
3. Posisi Tangan Saat Sedekap: Meletakkan tangan kanan di atas punggung tangan kiri pada dada/perut bagian atas.
4. Pandangan Fokus ke Sajadah: Menundukkan pandangan dan menjaga ketundukan jiwa dari distrasi.

Melalui Kajian Pekan ke-1 bersama Ustadz Amir Hamzah Lc, MHI, pembahasan kitab Fiqih Sunnah dikupas mendalam guna membersihkan amalan ibadah kita dari kekeliruan.`,
    author: 'Ustadz Amir Hamzah Lc, MHI',
    date: '2026-05-24',
    readTime: '7 Menit Baca',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=400',
    likes: 56
  },
  {
    id: 'art-3',
    title: 'Adab Bertetangga dalam Islam: Menghidupkan Harmoni Kehidupan',
    category: 'Akhlak',
    snippet: 'Indahnya tuntunan Islam dalam membangun rukun warga yang damai, bersih, aman, dan saling menghormati.',
    content: `Masjid di tengah perumahan Orchid Green Park bukan sekadar tempat ibadah ritual, namun pusat rekayasa sosial islami yang menularkan harmoni tetangga.

Rasulullah SAW mengajarkan begitu tingginya nilai tetangga:
"Barangsiapa yang beriman kepada Allah dan Hari Akhir, maka hendaklah dia memuliakan tetangganya." (HR. Bukhari & Muslim).

Aplikasi Adab Bertetangga Modern:
1. Menjaga Kebersihan Bersama: Berpartisipasi aktif dalam memilah sampah di program Bank Sampah Orchid dan kerja bakti lingkungan.
2. Tidak Mengganggu Kenyamanan: Mengatur volume suara kendaraan, parkir mobil yang tertata rapi tanpa menutup akses jalan, dan bertegur sapa ramah.
3. Saling Berbagi: Melalui program Sedekah Jumat atau saling mengirim makanan ringan di akhir pekan.
4. Menjenguk yang Sakit: Memperhatikan tetangga yang sedang dirundung kesulitan atau sakit, serta mendoakan kebaikan.

Mari bersama tumbuhkan karakter mulia rukun warga di OGP, selaras dengan indahnya uswah khuluqiah Rasulullah SAW.`,
    author: 'Ustadz Zainal Abidin Lc',
    date: '2026-05-18',
    readTime: '4 Menit Baca',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&q=80&w=400',
    likes: 67
  },
  {
    id: 'art-4',
    title: 'Mendidik Generasi Qurani yang Cerdas dan Berakhlaq Mulia',
    category: 'Keluarga Islami',
    snippet: 'Langkah strategis keluarga muslim di Orchid Green Park dalam mengimbangi paparan gadget dengan bimbingan rohani anak.',
    content: `Anak adalah amanah agung yang kelak akan dimintai pertanggungjawaban oleh Allah SWT. Mengasuh mereka di era gempuran gawai membutuhkan sinergitas solid antara rumah (orang tua) dan masjid.

Rasulullah SAW bersabda: "Setiap kalian adalah pemimpin dan setiap kalian akan ditanya tentang kepemimpinannya..." (HR. Bukhari).

Bagaimana melahirkan anak bermental Quran?
- Alokasi Waktu Gadget-Free di rumah, terutama saat Maghrib s/d Isya.
- Dekatkan dengan Masjid: Daftarkan mereka ke TPQ DKM MAAR 3 agar mendapatkan lingkungan pergaulan yang shalih.
- Teladan dari Ayah & Ibu: Anak adalah peniru ulung, hadirkan rutinitas mengaji bapak-ibu agar ditiru alami.

Komitmen DKM MAAR3 untuk memfasilitasi program TPQ dan Kelompok Belajar Mengajar Al Quran didasari keinginan luhur melahirkan generasi shalih pilar bangsa.`,
    author: 'Ustadz Hariyanto Lc, MHI',
    date: '2026-05-12',
    readTime: '6 Menit Baca',
    image: 'https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?auto=format&fit=crop&q=80&w=400',
    likes: 89
  },
  {
    id: 'art-5',
    title: 'Nilai Waktu dalam Perspektif Islam (Standarisasi Jam, Kalender & Tahun Hijriah)',
    category: 'Dakwah',
    snippet: 'Kajian mendalam mengenai pondasi filosofis Jam Islami, peradaban Kalender Hijriah, serta hakikat Taubat dan Hijrah sebagai sarana perbaikan kualitas diri yang berkelanjutan berdasarkan Al-Qur\'an dan As-Sunnah.',
    content: `# Nilai Waktu dalam Perspektif Islam
*(Standarisasi Jam, Kalender dan Tahun Hijriah)*

**Ust. H. Idrus Abidin, Lc., M.A**

---

### Standarisasi Jam dalam Perspektif Islam

Salah satu aspek penting dalam memahami nilai waktu dalam Islam adalah memahami standar pengukuran waktu yang digunakan syariat. Islam tidak hanya mengatur amalan berdasarkan hitungan jam dan hari, tetapi juga memberikan paradigma tersendiri tentang kapan suatu hari dimulai dan bagaimana waktu harus dimaknai sebagai sarana ibadah kepada Allah Swt.

Perhitungan waktu dalam sistem modern umumnya dimulai pada pukul 00.00 tengah malam. Namun dalam perspektif Islam, pergantian hari dimulai sejak terbenamnya matahari atau masuknya waktu Magrib. Hal ini berdasarkan, salah satunya, pada firman Allah Swt yang berbunyi:

يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ ۖ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ ۗ
*"Mereka bertanya kepadamu tentang bulan sabit. Katakanlah, 'Bulan sabit itu adalah penunjuk waktu bagi manusia dan (bagi ibadah) haji.'”* (QS. Al-Baqarah: 189)

Ibnu Katsir *rahimahullah* menjelaskan ayat tersebut dengan mengatakan, “Maksudnya, Allah menjadikan bulan sabit sebagai tanda-tanda waktu puasa kaum muslim dan waktu berbuka mereka, bilangan masa iddah istri-istri (menunggu), dan tanda waktu agama (ibadah haji) mereka.”[1]

Lebih detil lagi, Syeikh al-Sa’di *rahimahullah* menjelaskan, “Maksudnya, Allah Swt dengan kelembutan dan rahmat-Nya menjadikan dengan pengaturan ini, sabit itu terlihat kecil pada awal bulan, lalu bertambah besar hingga menjadi sempurna di pertengahannya. Kemudian mulai berkurang lagi kesempurnaannya (sejak tanggal 15 tiap bulan hijriah) dan seperti itulah seterusnya hingga masyarakat mengetahui tanda-tanda dan standar waktu ibadah-ibadah mereka, seperti puasa, waktu zakat, denda (kaffarat) dan masa-masa ibadah haji, dan ketika haji itu jatuh pada bulan-bulan yang telah ditentukan, serta menghabiskan waktu yang sangat banyak.”

Demikian pula, dengan standar waktu tersebut diketahuilah tempo-tempo dari penjadwalan hutang-hutang yang ditangguhkan, masa penyewaan, masa bilangan, dan masa kehamilan, dan lain sebagainya dari semua hal yang merupakan kebutuhan utama makhluk. Lalu Allah menjadikannya sebagai standar perhitungan yang diketahui oleh setiap orang, baik anak kecil maupun orang dewasa, orang pintar maupun orang bodoh. Seandainya saja standar perhitungan (jam dan tanggal tersebut) berdasarkan tahun matahari, maka hanya sedikit masyarakat yang bisa mengetahuinya.[2]

Oleh karena itu, waktu Magrib dapat dipahami sebagai titik awal sebuah hari baru dalam jam dan kalender Islam. Prinsip ini tampak dalam penentuan awal Ramadan, Idul Fitri, Idul Adha, dan berbagai ibadah lainnya yang selalu dikaitkan dengan munculnya hilal dan pergantian hari setelah matahari terbenam.

---

### Konsep Siklus "Jam Islami" 24 Jam

Berdasarkan konsep tersebut, standar jam Islami dapat digambarkan sebagai siklus waktu yang dimulai dari Magrib sebagai jam nol (00).

*   **Pukul 00.00 (Magrib / Matahari Terbenam):** Titik awal hari baru dalam konsep penanggalan Islam. Setelah Magrib dimulailah fase malam yang menjadi kesempatan emas untuk memperbanyak ibadah, zikir, tilawah Al-Qur'an, muhasabah, dan istirahat yang bernilai ibadah.
*   **Pukul 01.00 (Isya / Hilangnya Cahaya Merah di Ufuk):** Menandai awal aktivitas malam, dilanjutkan dengan waktu tidur yang merupakan kebutuhan fitrah manusia untuk mempersiapkan diri menjalani aktivitas keesokan harinya secara produktif.
*   **Pukul 11.00 - Sepertiga Malam Terakhir (Qiyamul Lail / Tahajud):** Seorang Muslim sangat dianjurkan menghidupkan malam dengan qiyamul lail, shalat tahajud, istigfar, berdoa, dan berbagai bentuk pendekatan diri kepada Allah Swt.
*   **Pukul 10.00 (Persiapan Malam & Introspeksi):** Fase kontemplatif introspeksi diri sebelum terbangun di pertengahan malam.
*   **Pukul 09.00 (Subuh / Fajar Shadiq):** Fase baru kehidupan seorang Muslim. Subuh bukan sekadar penanda datangnya pagi, tetapi momentum pembuka seluruh aktivitas harian yang diawali dengan ibadah agung.
*   **Pukul 08.00 (Aktivitas Pagi & Amal Shalih):** Fase awal mengawali hari untuk belajar, bekerja, dan menunaikan kewajiban sosial kemasyarakatan.
*   **Pukul 07.00 (Dhuha / Waktu Dhuha):** Dikenal sebagai salah satu waktu yang penuh keberkahan untuk berdoa, bekerja, menuntut ilmu, dan mencari karunia Allah di muka bumi.
*   **Pukul 06.00 (Zuhur / Matahari Tergelincir):** Ketika matahari tergelincir di tengah langit, masuklah waktu Zuhur yang dalam konsep Jam Islami ditempatkan pada posisi puncak siklus siang. Waktu ini menjadi pengingat bahwa di tengah kesibukan duniawi, seorang Muslim harus berhenti sejenak untuk memenuhi panggilan Allah.
*   **Pukul 05.00 (Menjelang Sore & Persiapan Ibadah):** Fase transisi menghentikan aktivitas perlahan untuk persiapan ibadah sore.
*   **Pukul 04.00 (Aktivitas Siang & Amal Shalih/Persiapan Sore):** Fase berkarya dan menyempurnakan amal di siang hari.
*   **Pukul 03.00 (Asar / Bayangan Benda Seukuran Benda):** Menjadi fase evaluasi penting terhadap seluruh aktivitas harian dan persiapan spiritual menuju berakhirnya siang.

Selanjutnya datanglah Magrib kembali yang menandai berakhirnya satu siklus kehidupan harian sekaligus awal siklus berikutnya. Dengan demikian, seluruh perjalanan waktu seorang Muslim sesungguhnya bergerak dari ibadah menuju ibadah, dari ketaatan menuju ketaatan, dan dari satu kesempatan amal menuju kesempatan amal berikutnya. Konsep ini menegaskan bahwa waktu dalam Islam bukan sekadar hitungan matematis, tetapi merupakan rangkaian peluang untuk mendekatkan diri kepada Allah Swt.

Standarisasi Jam Islami juga mengandung pesan filosofis yang mendalam. Dimulainya hari sejak Magrib mengajarkan bahwa kehidupan seorang Muslim harus diawali dengan ibadah sebelum aktivitas duniawi. Malam tidak dipandang sebagai waktu yang kosong, tetapi sebagai sarana membangun kekuatan spiritual melalui salat, zikir, istigfar, dan perenungan diri. Sementara siang hari menjadi medan pengabdian dan amal saleh dalam bentuk bekerja, belajar, berdakwah, serta memberikan manfaat kepada sesama manusia.

Dengan demikian, Jam Islami bukan sekadar model penomoran waktu, melainkan representasi dari pandangan hidup Islam yang menempatkan seluruh rentang waktu sebagai amanah Allah. Setiap jam, setiap hari, dan setiap tahun harus bernilai ibadah, sehingga kehidupan seorang Muslim senantiasa bergerak dalam siklus kebaikan, perbaikan, dan penghambaan kepada Allah Swt. Inilah makna keberkahan waktu yang sesungguhnya, yaitu ketika seluruh perjalanan hidup diarahkan untuk meraih ridha Allah dan kebahagiaan dunia akhirat.

---

### Kalender Hijriah dan Peradaban Waktu dalam Islam

Setelah memahami konsep Jam Islami sebagai standar harian dalam kehidupan seorang Muslim, pembahasan tentang waktu tidak dapat dilepaskan dari sistem kalender yang digunakan oleh umat Islam, yaitu kalender Hijriah. Jika Jam Islami mengatur siklus waktu harian, maka kalender Hijriah mengatur siklus waktu bulanan dan tahunan yang menjadi dasar pelaksanaan berbagai ibadah dalam Islam.

Kalender Hijriah merupakan sistem penanggalan yang didasarkan pada peredaran bulan (*al-qamar*) mengelilingi bumi. Oleh karena itu, kalender ini dikenal pula dengan istilah kalender qamariyah. Allah Swt. berfirman:

إِنَّ عِدَّةَ الشُّهُورِ عِنْدَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ
*"Sesungguhnya bilangan bulan di sisi Allah adalah dua belas bulan dalam ketetapan Allah pada waktu Dia menciptakan langit dan bumi..."* (QS. At-Taubah: 36)

Berbeda dengan kalender Masehi yang berlandaskan peredaran matahari, kalender Hijriah mengikuti siklus bulan yang berjumlah sekitar 354 hari dalam satu tahun. Karena itu, seluruh ibadah yang berkaitan dengan waktu syar'i mengikuti kalender Hijriah, seperti Ramadan, Idul Fitri, Idul Adha, haji, zakat fitrah, puasa sunnah, bulan-bulan haram, serta berbagai momentum ibadah lainnya.

Penggunaan kalender Hijriah sesungguhnya bukan hanya persoalan administrasi waktu, melainkan bagian dari identitas peradaban Islam. Kalender ini menghubungkan kehidupan seorang Muslim dengan peristiwa-peristiwa besar dalam sejarah Islam, sekaligus mengingatkan bahwa perjalanan hidup manusia senantiasa berada dalam pengawasan Allah Swt. Oleh sebab itu, penting bagi umat Islam untuk membiasakan diri mengenal tanggal, bulan, dan tahun Hijriah di samping penggunaan kalender Masehi yang berlaku secara umum.

Lebih jauh lagi, perhitungan umur seorang Muslim sejatinya lebih tepat diukur berdasarkan kalender Hijriah, karena seluruh ketentuan syariat yang berkaitan dengan waktu berlandaskan sistem penanggalan tersebut. Hal ini menunjukkan bahwa standar waktu dalam Islam tidak hanya mencakup hitungan jam dan hari, tetapi juga mencakup bulan dan tahun yang seluruhnya terintegrasi dalam sistem ibadah seorang Muslim.

---

### Taubat dan Hijrah: Perspektif Islam tentang Perubahan dan Perbaikan

Pemahaman terhadap waktu dalam Islam tidak hanya berhenti pada aspek pengukuran dan penanggalan. Waktu memiliki makna yang jauh lebih mendalam, yaitu sebagai sarana perubahan, perbaikan, dan peningkatan kualitas diri. Karena itu, pembahasan tentang waktu dalam Islam harus berujung pada konsep taubat dan hijrah sebagai bentuk pemanfaatan waktu secara produktif dan bernilai ibadah.

Setiap detik yang berlalu sesungguhnya merupakan kesempatan yang diberikan Allah kepada manusia untuk memperbaiki diri. Islam tidak memandang masa lalu sebagai beban yang harus disesali tanpa akhir, tetapi sebagai pelajaran yang mendorong seseorang untuk menjadi lebih baik pada masa kini dan masa yang akan datang. Inilah hakikat taubat, yaitu kembali kepada Allah setelah melakukan kesalahan dan kekeliruan.

Taubat merupakan kondisi penyesalan yang lahir dari hati karena kelalaian terhadap perintah Allah. Penyesalan tersebut diwujudkan dalam bentuk istigfar dengan lisan, penghentian maksiat dengan anggota badan, serta tekad yang kuat untuk tidak mengulanginya di masa mendatang. Dengan demikian, taubat bukan sekadar ucapan, melainkan proses transformasi diri yang melibatkan hati, pikiran, perilaku, lingkungan, dan orientasi hidup seseorang.

Dalam konteks inilah hijrah memperoleh maknanya yang hakiki. Secara bahasa, hijrah berarti meninggalkan, berpindah, atau menjauh dari sesuatu. Adapun secara istilah, hijrah adalah perpindahan dari kondisi yang buruk menuju kondisi yang lebih baik, dari kemaksiatan menuju ketaatan, dari kebodohan menuju ilmu, dari kelalaian menuju kesadaran, dan dari kehidupan yang jauh dari Allah menuju kehidupan yang lebih dekat kepada-Nya.

Hijrah bukanlah peristiwa yang hanya terjadi pada masa Rasulullah ﷺ ketika berpindah dari Makkah ke Madinah. Hijrah adalah proyek kehidupan yang berlangsung sepanjang usia seorang Muslim. Rasulullah ﷺ bersabda:

لاَ تَنْقَطِعُ الْهِجْرَةُ حَتَّى تَنْقَطِعَ التَّوْبَةُ وَلاَ تَنْقَطِعُ التَّوْبَةُ حَتَّى تَطْلُعَ الشَّمْسُ مِنْ مَغْرِبِهَا
*"Hijrah tidak akan terputus hingga taubat terputus, dan taubat tidak akan terputus hingga matahari terbit dari arah barat."* (Shahih, HR. Ahmad 4/99, Abu Dawud 2479, Ath-Thabarani 19/387/907, Al-Baihaqi 9/17, Ad-Darimi 2513, Nasa’i 8711, Abu Ya’la 737. Dishahihkan oleh Syaikh Al-Albani dalam Irwaaul-Ghalil 1208)

Hadis ini menunjukkan bahwa selama pintu taubat masih terbuka, selama itu pula kesempatan hijrah dan perbaikan diri tetap tersedia bagi setiap manusia.

Dalam praktiknya, hijrah memiliki cakupan yang sangat luas. Seseorang dapat berhijrah dari kekufuran menuju keimanan, dari kemunafikan menuju kejujuran, dari maksiat menuju ketaatan, dari akhlak tercela menuju akhlak mulia, dari kezaliman menuju keadilan, bahkan dari sekadar menjalankan Islam menuju tingkatan ihsan yang lebih sempurna. Segenap perjalanan hidup seorang Muslim sesungguhnya merupakan proses peningkatan kualitas diri yang berkelanjutan.

Karena itu, konsep hijrah dalam Islam dapat digambarkan sebagai grafik yang terus meningkat. Seorang Muslim tidak boleh merasa puas dengan kondisi dirinya saat ini. Ia harus senantiasa bergerak dari Islam menuju iman, dari iman menuju ihsan, dan dari kebaikan menuju kebaikan yang lebih sempurna. Waktu yang berlalu seharusnya menjadi saksi adanya peningkatan kualitas ilmu, ibadah, akhlak, dan kontribusi sosial seorang Muslim.

Dengan demikian, kalender Hijriah dan konsep hijrah memiliki hubungan yang sangat erat. Pergantian tahun Hijriah bukan sekadar pergantian angka dalam penanggalan, melainkan momentum evaluasi dan perbaikan diri. Setiap datangnya tahun baru Hijriah, seorang Muslim hendaknya melakukan muhasabah terhadap perjalanan hidupnya, menilai sejauh mana waktu yang telah diberikan Allah digunakan untuk kebaikan, serta menyusun komitmen baru untuk menjadi pribadi yang lebih bertakwa.

Hakikat hijrah bukanlah berpindah tempat semata, melainkan berpindah menuju ridha Allah. Hakikat waktu bukanlah sekadar pergantian hari, bulan, dan tahun, tetapi kesempatan yang terus diperbarui oleh Allah agar manusia dapat memperbaiki dirinya. Oleh karena itu, orang yang paling beruntung adalah mereka yang menjadikan setiap pergantian waktu sebagai sarana taubat, hijrah, dan peningkatan kualitas penghambaan kepada Allah Swt. Sebaliknya, kerugian terbesar adalah ketika hari, bulan, dan tahun terus berganti tanpa menghasilkan perubahan yang mendekatkan diri kepada-Nya.

---

### Karakteristik Waktu dalam Perspektif Islam

Setelah memahami konsep Jam Islami, kalender Hijriah, serta makna taubat dan hijrah sebagai proses perbaikan diri, maka penting untuk memahami karakteristik waktu dalam perspektif Islam. Pemahaman terhadap karakteristik waktu akan membantu seorang Muslim memosisikan dirinya secara benar dalam memanfaatkan umur yang telah Allah anugerahkan.

Islam memandang waktu bukan sekadar fenomena alam yang bergerak secara mekanis, tetapi sebagai bagian dari tanda-tanda kekuasaan Allah yang memiliki nilai spiritual, moral, dan peradaban. Oleh karena itu, setiap Muslim dituntut untuk memahami hakikat waktu agar mampu mengelolanya secara produktif dan bernilai ibadah.

#### 1. Waktu Merupakan Amanah dari Allah
Karakteristik pertama waktu dalam Islam adalah bahwa waktu merupakan amanah yang diberikan Allah kepada manusia. Umur yang dimiliki seseorang bukanlah miliknya secara mutlak, melainkan titipan yang kelak akan dimintai pertanggungjawaban. Rasulullah ﷺ bersabda:

لاَ تَزُولُ قَدَمَا عَبْدٍ يَوْمَ الْقِيَامَةِ حَتَّى يُسْأَلَ عَنْ أَرْبَعٍ: عَنْ عُمُرِهِ فِيمَا أَفْنَاهُ، وَعَنْ شَبَابِهِ فِيمَا أَبْلاَهُ, وَعَنْ مَالِهِ مِنْ أَيْنَ AKتَسَبَهُ وَفِيمَا أَنْفَقَهُ, وَعَنْ عِلْمِهِ مَاذَا عَمِلَ فِيهِ
*"Tidak akan bergeser kedua kaki seorang hamba pada hari kiamat hingga ia ditanya tentang umurnya untuk apa ia habiskan..."* (HR. At-Tirmidzi, no. 2417)

Hadis ini menunjukkan bahwa umur bukan sekadar rentang kehidupan biologis, tetapi modal utama yang menentukan keberhasilan atau kegagalan manusia di akhirat. Setiap detik yang berlalu merupakan bagian dari amanah yang harus dipertanggungjawabkan di hadapan Allah Swt.

#### 2. Waktu Bersifat Terbatas dan Tidak Dapat Diulang
Karakteristik kedua adalah bahwa waktu terus berjalan dan tidak pernah kembali. Harta yang hilang dapat dicari kembali, kesehatan yang menurun masih dapat diupayakan pemulihannya, tetapi waktu yang telah berlalu tidak mungkin diulang.

Karena itu, Islam mengajarkan sikap bersegera dalam melakukan kebaikan (*musāra‘ah ilā al-khairāt*) dan berlomba-lomba dalam amal saleh (*fastabigu al-khairāt*). Seorang Muslim tidak diperkenankan menunda-nunda kebaikan karena tidak ada jaminan bahwa kesempatan yang sama akan kembali datang. Kesadaran inilah yang melahirkan budaya produktivitas dalam Islam, yaitu memanfaatkan setiap peluang untuk memperbanyak amal sebelum datang berbagai penghalang seperti sakit, kesibukan, usia lanjut, atau kematian.

#### 3. Waktu Bersifat Cepat Berlalu
Al-Qur'an menggambarkan bahwa kehidupan dunia yang panjang sekalipun akan terasa sangat singkat ketika manusia berada di akhirat. Bahkan manusia merasa seakan-akan hanya tinggal sesaat di dunia. Fenomena ini menunjukkan bahwa persepsi manusia terhadap panjangnya umur sering kali menipu. Banyak orang merasa memiliki waktu yang panjang sehingga menunda taubat dan amal saleh, padahal kehidupan dapat berakhir kapan saja. Oleh sebab itu, seorang Muslim harus memandang setiap hari sebagai kesempatan yang sangat berharga dan tidak menganggap remeh berlalunya waktu.

#### 4. Waktu Bersifat Teosentris
Dalam perspektif Islam, waktu tidak berdiri sendiri, melainkan berada di bawah kehendak dan pengaturan Allah Swt. Seluruh perputaran siang dan malam, pergantian bulan dan tahun, serta perjalanan umur manusia merupakan bagian dari sunnatullah yang telah ditetapkan-Nya.

Pandangan teosentris ini membedakan konsep waktu dalam Islam dari pandangan materialistik yang memandang waktu hanya sebagai ukuran fisik. Islam mengajarkan bahwa setiap satuan waktu memiliki hubungan dengan tujuan penciptaan manusia, yaitu beribadah kepada Allah. Dengan demikian, ukuran keberhasilan penggunaan waktu tidak semata-mata diukur dari capaian materi, tetapi dari sejauh mana waktu tersebut mendekatkan seseorang kepada Allah Swt.

#### 5. Waktu Bersifat Moral
Islam memberikan dimensi moral terhadap waktu. Nilai suatu waktu tidak ditentukan oleh panjang atau pendeknya durasi, tetapi oleh kualitas amal yang dilakukan di dalamnya. Satu jam yang digunakan untuk menuntut ilmu, berdakwah, membantu sesama, atau berzikir dapat lebih bernilai daripada berhari-hari yang dihabiskan dalam kelalaian. Karena itu, Islam tidak hanya mengajarkan efisiensi waktu, tetapi juga keberkahan waktu. Keberkahan waktu terjadi ketika suatu rentang waktu menghasilkan manfaat yang besar bagi agama, diri, keluarga, dan masyarakat.

#### 6. Waktu Bersifat Produktif
Islam menolak budaya menyia-niaakan waktu (*idhā‘at al-waqt*). Seorang Muslim dituntut untuk mengisi kehidupannya dengan aktivitas yang bermanfaat dan bernilai ibadah. Produktivitas dalam Islam tidak hanya bermakna aktivitas ekonomi, tetapi mencakup seluruh bentuk amal yang mendatangkan kebaikan, baik yang berkaitan dengan urusan dunia maupun akhirat. Karena itu, bekerja, belajar, berdakwah, meneliti, mengajar, mengurus keluarga, bahkan beristirahat dapat bernilai ibadah apabila dilakukan dengan niat yang benar dan sesuai tuntunan syariat.

#### 7. Waktu Memiliki Dimensi Historis, Aktual, dan Futuristik
Para ulama menjelaskan bahwa waktu dalam Islam memiliki tiga dimensi utama, yaitu masa lalu, masa kini, dan masa depan.
*   **Masa lalu** merupakan sumber pelajaran (*'ibrah*). Sejarah para nabi, umat terdahulu, serta pengalaman pribadi menjadi bahan evaluasi untuk memperbaiki kehidupan.
*   **Masa kini** merupakan arena amal. Pada saat inilah manusia memiliki kesempatan untuk memilih antara ketaatan dan kemaksiatan.
*   **Masa depan** merupakan orientasi perencanaan. Seorang Muslim tidak hanya memikirkan kehidupan dunia, tetapi juga mempersiapkan kehidupan akhirat yang kekal.

Karakteristik ini menjadikan seorang Muslim sebagai pribadi yang reflektif terhadap masa lalu, produktif pada masa kini, dan visioner terhadap masa depan.

#### 8. Waktu Memiliki Nilai Berjenjang dan Bertingkat
Tidak semua waktu memiliki nilai yang sama dalam Islam. Allah memberikan keutamaan tertentu pada waktu-waktu tertentu sebagai bentuk rahmat dan peluang peningkatan pahala. Misalnya:
*   Bulan Ramadan lebih utama dibanding bulan lainnya.
*   Sepuluh hari pertama Zulhijah memiliki keutamaan yang besar.
*   Malam Lailatul Qadar lebih baik daripada seribu bulan.
*   Hari Jumat merupakan penghulu seluruh hari.
*   Sepertiga malam terakhir merupakan waktu yang sangat dianjurkan untuk berdoa dan bermunajat.

Hal ini menunjukkan bahwa Islam mengajarkan strategi pemanfaatan waktu dengan memaksimalkan momentum-momentum yang memiliki nilai spiritual lebih tinggi.

#### 9. Waktu Merupakan Sarana Perubahan dan Perbaikan
Karakteristik terakhir yang sangat penting adalah bahwa waktu merupakan media perubahan. Seluruh konsep taubat, hijrah, tazkiyatun nafs, dan pembangunan peradaban Islam berlangsung dalam bingkai waktu.

Setiap pergantian hari, pekan, bulan, dan tahun sesungguhnya merupakan undangan Allah kepada manusia untuk memperbaiki diri. Karena itu, seorang Muslim tidak boleh stagnan dalam kehidupannya. Ia harus senantiasa bergerak dari keburukan menuju kebaikan, dari kebaikan menuju yang lebih baik, dan dari iman menuju derajat ihsan.

---

[1] http://www.ibnukatsironline.com/2015/04/tafsir-surat-al-baqarah-ayat-189.html
[2] https://daaralatsarindonesia.com/tafsir-002-189/`,
    author: 'Ust. H. Idrus Abidin, Lc., M.A',
    date: '2026-06-08',
    readTime: '9 Menit Baca',
    image: IMAGES.jamIslami,
    likes: 128
  },
  {
    id: 'art-6',
    title: 'Kalender Hijriyah 1447 Beserta Asal Usul dan Sejarah',
    category: 'Dakwah',
    snippet: 'Menelusuri sejarah emas lahirnya kalender Hijriyah di masa Khalifah Umar bin Khattab r.a., musyawarah agung para sahabat, keputusan memilih rute Hijrah, hingga daftar tanggal penting 1447 Hijriyah.',
    content: `# Kalender Hijriyah 1447 Beserta Asal Usul dan Sejarah
*Mengenal Sejarah Agung Peradaban Islam dan Tanggal-Tanggal Penting Tahun 1447 H*

---

### Sejarah Lahirnya Kalender Hijriyah

Sistem penanggalan Hijriyah merupakan salah satu peninggalan peradaban Islam yang sangat agung. Penanggalan ini lahir bukan sekadar untuk kepentingan administrasi belaka, melainkan sebagai penanda identitas umat dan syiar ibadah yang terus berdenyut hingga hari ini.

#### 1. Penanggalan Arab Sebelum Kalender Hijriyah
Sebelum lahirnya kalender Hijriyah, bangsa Arab tidak memiliki format penamaan tahun yang menggunakan angka atau bilangan bulat berurutan (misal tahun satu, dua, dst). Mereka menandai tahun berdasarkan peristiwa-peristiwa penting yang terjadi pada masa tersebut.

Beberapa contoh istilah tahun yang populer di kalangan bangsa Arab sebelum adanya kalender Hijriyah antara lain:
*   **Tahun Gajah (*’Amul Fil*):** Dinamakan demikian karena pada tahun tersebut terjadi penyerangan Ka\'bah oleh pasukan gajah pimpinan Abrahah yang bertepatan dengan tahun kelahiran Rasulullah ﷺ.
*   **Tahun Renovasi Ka\'bah:** Penanda waktu ketika Ka\'bah direnovasi akibat banjir besar dan para kabilah Arab berselisih meletakkan Hajar Aswad.
*   **Tahun Harb Al-Fijar:** Tahun di mana terjadi perang Fijar antara kabilah Quraisy dan kabilah Hawazin.

Ketiadaan bilangan angka tahun ini terus berlangsung hingga masa kenabian Rasulullah ﷺ dan masa awal kekhalifahan Abu Bakar Ash-Shiddiq r.a.

#### 2. Lahirnya Kalender Hijriyah dan Penetapan Tahun Pertama
Pada masa kepemimpinan **Khalifah Umar bin Khattab r.a.** (sekitar tahun 17 Hijriyah), wilayah kekuasaan Islam meluas dengan sangat pesat hingga meliputi wilayah Persia, Syam, dan Mesir. Seiring perluasan wilayah tersebut, kegiatan surat-menyurat dinas dan tata kelola dokumen negara semakin intensif dilakukan. 

Tantangan administrasi muncul ketika **Gubernur Bashrah, Abu Musa Al-Asy’ari r.a.**, mengirimkan sepucuk surat kepada Khalifah Umar bin Khattab r.a. Dalam surat tersebut, Abu Musa menyampaikan keluhannya yang berbunyi:

> *"Telah sampai kepada kami surat-surat dari Anda yang tidak ada tanggalnya, sehingga kami bingung mana perintah yang harus kami utamakan terlebih dahulu."*

Menyadari pentingnya keteraturan administrasi, Khalifah Umar bin Khattab r.a. segera mengumpulkan para sahabat senior—termasuk Utsman bin Affan r.a, Ali bin Abi Thalib r.a, Abdurrahman bin Auf r.a, Saad bin Abi Waqqas r.a, dan Zubair bin Awwam r.a—untuk mengadakan musyawarah guna menetapkan sistem penanggalan yang baku bagi umat Islam.

Dalam musyawarah mulia tersebut, muncul beberapa usulan mengenai penetapan permulaan tahun pertama kalender Islam:
1.  **Dihitung dari hari kelahiran Rasulullah ﷺ.** Usulan ini dinilai mulia namun kurang tepat karena tanggal pasti kelahiran beliau masih menjadi perdebatan di kalangan ulama sejarah.
2.  **Dihitung dari tahun diutusnya beliau menjadi Rasul (*bi’tsah*).**
3.  **Dihitung dari tahun wafatnya beliau.** Usulan ini ditolak karena tahun wafatnya Rasulullah ﷺ melambangkan kesedihan terdalam bagi umat Islam, bukan pembuka kejayaan.
4.  **Mengikuti kalender Romawi atau Persia.** Usulan ini ditolak karena umat Islam harus mandiri dan memiliki identitas peradaban tersendiri yang murni.

Di tengah jalannya diskusi, **Sahabat Ali bin Abi Thalib r.a.** mengusulkan jalan keluar yang sangat visioner:

> *"Mari kita menetapkan dimulainya kalender Islam sejak tahun berhijrahnya Rasulullah ﷺ dari Makkah ke Madinah."*

Usulan dari Ali bin Abi Thalib r.a. ini langsung disetujui oleh Khalifah Umar bin Khattab r.a. dan seluruh sahabat yang hadir. Peristiwa **Hijrah** dipilih karena merupakan garis pemisah (*Al-Fariq*) yang sangat tegas antara yang hak dan yang batil, serta menjadi tonggak awal berdirinya komunitas dan kedaulatan umat Islam yang kokoh di Madinah.

#### 3. Penetapan Bulan Pertama Kalender Hijriyah
Setelah menyepakati tahun pertama dimulai dari peristiwa Hijrah, musyawarah berlanjut pada penentuan bulan pertama sebagai pembuka lembaran tahun baru. 

Ada beberapa usulan, di antaranya mengajukan bulan **Rabi’ul Awal** (karena pada bulan tersebut Rasulullah ﷺ melakukan hijrah dan tiba di Madinah) serta bulan **Ramadhan** (karena kemuliaannya sebagai bulan suci umat Islam).

Namun, **Sahabat Utsman bin Affan r.a.** memberikan usulan terbaik lainnya:

> *"Mari kita jadikan bulan Muharram sebagai bulan pertama."*

Alasan penunjukan **Muharram** yang dikemukakan oleh Utsman bin Affan r.a. didasari beberapa landasan kuat:
*   Muharram merupakan salah satu dari empat bulan haram (*Shahrul Haram*) atau bulan suci yang dimuliakan Allah sejak dahulu kala.
*   Muharram adalah waktu pulangnya para jemaah haji dari tanah suci Makkah setelah menyelesaikan rukun Islam kelima (ibadah agung). Kepulangan ini melambangkan jiwa-jiwa baru yang fitrah dan bertekad memulai catatan amal yang suci.
*   Secara geopolitik, sepulangnya umat dari melaksanakan ibadah haji, mereka siap memulai lembaran hidup dan tugas-tugas kenegaraan atau dakwah yang baru.

Khalifah Umar dan para sahabat menyepakati usulan Utsman r.a tersebut. Maka dari itulah, kalender Islam resmi lahir dengan nama **Kalender Hijriyah**, dimulai dari peristiwa Hijrah, dengan **1 Muharram** sebagai hari pertamanya.

---

### Daftar Tanggal Penting Kalender 1447 Hijriyah

Sebagai persiapan diri dalam beribadah dan menyusun agenda tahunan, berikut adalah prakiraan tanggal-tanggal penting di tahun 1447 Hijriyah (berkisar antara pertengahan tahun 2025 M hingga pertengahan tahun 2026 M) berdasarkan hisab astronomis kalender nasional:

*   **1 Muharram 1447 H (Tahun Baru Islam):** Diperkirakan jatuh pada **Jumat, 27 Juni 2025 M**. Di Indonesia, momen ini diperingati sebagai Hari Libur Nasional resmi.
*   **10 Muharram 1447 H (Hari Asyura):** Diperkirakan jatuh pada **Minggu, 6 Juli 2025 M** (Sangat dianjurkan menunaikan puasa sunnah Tasu\'a dan Asyura).
*   **1 Rabi\'ul Awal 1447 H (Maulid Nabi):** Diperkirakan jatuh pada **Minggu, 24 Agustus 2025 M**.
*   **1 Rajab 1447 H (Awal Bulan Rajab):** Diperkirakan jatuh pada **Selasa, 21 Desember 2025 M**.
*   **1 Syaban 1447 H (Awal Bulan Syaban):** Diperkirakan jatuh pada **Rabu, 20 Januari 2026 M**.
*   **1 Ramadhan 1447 H (Awal Puasa Ramadhan):** Diperkirakan jatuh pada **Rabu, 18 Februari 2026 M**.
*   **17 Ramadhan 1447 H (Nuzulul Qur\'an):** Diperkirakan jatuh pada **Jumat, 6 Maret 2026 M**.
*   **1 Syawal 1447 H (Hari Raya Idul Fitri):** Diperkirakan jatuh pada **Jumat, 20 Maret 2026 M**.
*   **1 Dzulhijjah 1447 H (Awal Bulan Dzulhijjah):** Diperkirakan jatuh pada **Senin, 18 Mei 2026 M**.
*   **9 Dzulhijjah 1447 H (Hari Arafah / Puasa Arafah):** Diperkirakan jatuh pada **Selasa, 26 Mei 2026 M**.
*   **10 Dzulhijjah 1447 H (Hari Raya Idul Adha):** Diperkirakan jatuh pada **Rabu, 27 Mei 2026 M**.

---

### Hikmah Memahami Waktu dan Penanggalan Hijriyah

Dengan mengenal sejarah dan daftar tanggal penting di atas, kita diingatkan bahwa waktu terus mengalir laksana air. Setiap detiknya adalah modal berharga dari Allah Swt. untuk mengumpulkan bekal menuju akhirat. 

Penggunaan Kalender Hijriyah bukan hanya bermanfaat untuk mengatur waktu ibadah formal saja, melainkan sarana menjaga identitas keislaman dalam rutinitas keseharian kita. Mari kita syiarkan penggunaan tanggal Hijriyah bersandingan dengan kalender Gregorian (Masehi) demi memelihara warisan pemikiran khulafaur rasyidin yang penuh berkah ini.`,
    author: 'Ust. H. Idrus Abidin, Lc., M.A',
    date: '2026-06-08',
    readTime: '9 Menit Baca',
    image: IMAGES.calendar1447,
    likes: 198
  }
];

export const INITIAL_DONASI: DonasiCampaign[] = [
  {
    id: 'don-1',
    title: 'Pembangunan Kubah & Renovasi Menara Masjid MAAR 3',
    description: 'Penyempurnaan infrastruktur kubah luar, struktur kedap bocor, dan menara adzan yang kokoh nan estetik demi keagungan syiar dawah.',
    raised: 285500000,
    target: 500000000,
    donorsCount: 342,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=600',
    category: 'Pembangunan'
  },
  {
    id: 'don-2',
    title: 'Dana Operasional Bulanan & Sosial Keagamaan Masjid',
    description: 'Menopang pembiayaan listrik AC, honorarium asatidzah, kebersihan harian masjid, air wudhu, gas, dan penyediaan sajadah wangi.',
    raised: 32400000,
    target: 50000000,
    donorsCount: 154,
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80&w=600',
    category: 'Operasional'
  },
  {
    id: 'don-3',
    title: 'Sedekah Jumat Berkah: Pembagian Makanan Saji',
    description: 'Donasi khusus pekanan untuk penyediaan ratusan bungkus nasi berkah bergizi sehat bagi jamaah usai Jumatan.',
    raised: 18700000,
    target: 20000000,
    donorsCount: 221,
    image: IMAGES.sedekahJumat,
    category: 'Sedekah Jumat'
  },
  {
    id: 'don-4',
    title: 'Program Santunan Dhuafa & Pendidikan Anak Yatim OGP',
    description: 'Biaya beasiswa sekolah berkala bagi adik-adik yatim di sekitar Sawangan Depok, serta bantuan pangan pokok lansia prasejahtera.',
    raised: 45000000,
    target: 60000000,
    donorsCount: 98,
    image: IMAGES.charityOrphan,
    category: 'Program Sosial'
  }
];

export const INITIAL_PENGURUS: Pengurus[] = [
  {
    id: 'peng-idrus',
    name: 'Ustadz Idrus Abidin Lc, MA',
    role: 'Pembina Dakwah & Kajian Syariah',
    image: ustadzIdrusAbidin
  },
  {
    id: 'peng-2',
    name: 'Bapak Dr. Ir. Gunawan M.T.',
    role: 'Wakil Ketua DKM',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-3',
    name: 'Bapak Rudi Setiawan, S.E.',
    role: 'Sekretaris Jenderal',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-4',
    name: 'Bapak Haji Ahmad Fauzi, Ak.',
    role: 'Bendahara Keuangan',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-5',
    name: 'Ustadz Amir Hamzah Lc, MHI',
    role: 'Bidang Pembinaan Dakwah & Kajian',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-6',
    name: 'Bapak Ir. Nanang Sunandar',
    role: 'Ketua Bidang Sosial & Pengabdian Masyarakat',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-7',
    name: 'Ibu Hajjah Siti Rahmah, S.Pd.I.',
    role: 'Koordinator TPQ & Pendidikan Anak',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-8',
    name: 'Bapak Hendra Wijaya, S.T.',
    role: 'Koordinator Bank Sampah & Lingkungan',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-9',
    name: 'Bapak Dr. Dedi Kurniawan',
    role: 'Koordinator Kesehatan & Posyandu',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-10',
    name: 'Bapak Ahmad Syarifuddin',
    role: 'Koordinator Kebun Hidroponik OGP Farm',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-11',
    name: 'Bapak Rian Hidayat, S.Kom.',
    role: 'Koordinator Kepemudaan & OGP Sport',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'peng-12',
    name: 'Bapak Ir. Hermawan Syahputra',
    role: 'Koordinator Perlengkapan & Sarana Masjid',
    image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=300'
  }
];

export const INITIAL_GALERI: Galeri[] = [
  { id: 'gal-1', title: 'Suasana Khidmat Sholat Tarawih Perdana', category: 'Kajian Islam', image: IMAGES.masjidInterior, date: '2026-03-10' },
  { id: 'gal-2', title: 'Keseruan Belajar Selesai di TPQ MAAR3', category: 'KBMA', image: IMAGES.kbmaFlyer, date: '2026-04-12' },
  { id: 'gal-3', title: 'Distribusi Paket Makanan SiJum Berkah', category: 'SiJum', image: IMAGES.sedekahJumat, date: '2026-05-15' },
  { id: 'gal-4', title: 'Panen Hidroponik Sayur Segar Warga OGP', category: 'Ogp Farm', image: IMAGES.ogpFarm, date: '2026-05-20' },
  { id: 'gal-5', title: 'Gotong Royong Ibu-ibu Orchid Menimbang Sampah anorganik', category: 'Bank Sampah', image: IMAGES.greenOrchid, date: '2026-05-22' },
  { id: 'gal-6', title: 'Pemeriksaan Kesehatan Tensi Lansia Orchid', category: 'Posyandu', image: IMAGES.posyandu, date: '2026-05-24' },
  { id: 'gal-7', title: 'Turnamen Badminton Persahabatan Orchid Cup', category: 'Ogp Sport', image: IMAGES.sportOrchid, date: '2026-05-25' },
  { id: 'gal-8', title: 'Sujud Syukur & Takbir Semarak Ramadhan', category: 'Ramadhan', image: IMAGES.eidUmat, date: '2026-05-01' },
  { id: 'gal-9', title: 'Persiapan Hewan Qurban Sehat Syariat Masjid MAAR3', category: 'Idul Adha', image: IMAGES.idulAdha, date: '2026-05-30' },
  { id: 'gal-10', title: 'Koperasi OGP kawasan lingkungan orchid green park', category: 'Kopsyar OGP', image: IMAGES.koperasiOgp, date: '2026-06-01' }
];

export const INITIAL_UMKM: Umkm[] = [
  {
    id: 'umkm-1',
    name: 'Dapoer Orchid Barokah',
    owner: 'Ibu Fatimah Az-Zahra',
    category: 'Kuliner',
    description: 'Menyediakan aneka kue basah tradisional, nasi tumpeng kuning hias, catering aqiqah, dan paket makanan sehat harian tanpa MSG untuk warga komplek.',
    address: 'Perumahan OGP Blok A4 No. 12',
    whatsapp: '6281298765432',
    promo: 'Diskon 10% Khusus Pesanan Konsumsi Pengajian Masjid',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'umkm-2',
    name: 'Barbershop Green OGP',
    owner: 'Mas Heri Prasetyo',
    category: 'Jasa',
    description: 'Pangkas rambut pria dan anak-anak, hair styling, creambath, dan pijat rileksasi pundak yang rapi dan nyaman. Siap home service untuk lansia yang sakit.',
    address: 'Depan Gerbang Utama OGP Ruko No. 2',
    whatsapp: '6281312345678',
    promo: 'Gratis Cukur untuk Anak Yatim dan Dhuafa Setiap Jumat',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'umkm-3',
    name: 'Nafisa Hijab & Syar\'i',
    owner: 'Ibu Annisa Rahmawati',
    category: 'Fashion',
    description: 'Koleksi busana muslimah, gamis premium, hijab syar\'i berbahan voal premium adem flowy, serta perlengkapan umroh dan haji dengan model elegan kekinian.',
    address: 'Perumahan OGP Blok C1 No. 05',
    whatsapp: '6285711112222',
    promo: 'Free Ongkir COD Khusus Sewilayah Dalam Komplek OGP',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'umkm-4',
    name: 'Toko Kelontong Barokah Jaya',
    owner: 'Bapak Haji Ahmad',
    category: 'Sembako',
    description: 'Menyediakan sembako murah, Beras Pandanwangi super, telur omega fresh harian, LPG melon/bright gas, air mineral galon isi ulang, dan bumbu bumbu lengkap harian.',
    address: 'Perumahan OGP Blok B2 No. 15',
    whatsapp: '6289988877777',
    promo: 'Gratis Antar/Delivery Gas & Galon Sampai Masuk Dapur Rumah',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'umkm-5',
    name: 'Orchid Laundry Syariah Clean',
    owner: 'Bapak Roni Kurniawan',
    category: 'Jasa',
    description: 'Jasa cuci kering lipat setrika ekspres maupun reguler. Dijamin higienis dan suci karena memisahkan pakaian najis sesuai tuntunan fiqih syariah.',
    address: 'Perumahan OGP Blok AA No. 04',
    whatsapp: '6281122233344',
    promo: 'Diskon 20% bagi Pengendara Ojek Online & Cuci Mukena Masjid GRATIS',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebd01?auto=format&fit=crop&q=80&w=400'
  }
];
