'use strict';

/* =========================================================
   1. HELPER & UTILITY
   ========================================================= */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const formatTime = (seconds = 0) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
};

/* =========================================================
   2. SVG ICONS LIBRARY
   ========================================================= */
const ICONS = {
  landmark: `<svg viewBox="0 0 24 24"><path d="M3 22h18M6 18v-7M18 18v-7M12 18v-7M3 11h18L12 3 3 11z"/></svg>`,
  hash: `<svg viewBox="0 0 24 24"><path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/></svg>`,
  triangle: `<svg viewBox="0 0 24 24"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3l-8-14z"/></svg>`,
  book: `<svg viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  cog: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  zero: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><text x="12" y="17" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor" stroke="none">0</text></svg>`,
  calculator: `<svg viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2"/></svg>`,
  spiral: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 10 10 5 5 0 0 0-5-5 2 2 0 0 0-2 2 2 2 0 0 0 2 2"/></svg>`,
  chart: `<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>`,
  atom: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"/></svg>`,
  sigma: `<svg viewBox="0 0 24 24"><path d="M18 7V4H6l6 8-6 8h12v-3"/></svg>`,
  cpu: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24"><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></svg>`,
  pyramid: `<svg viewBox="0 0 24 24"><path d="M2 20h20L12 4 2 20z"/><path d="M12 4v16"/></svg>`,
  medal: `<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  flag: `<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>`,
  column: `<svg viewBox="0 0 24 24"><path d="M4 22h16M6 18h12M8 18V6M16 18V6M12 18V6M3 6h18L12 2 3 6z"/></svg>`,
  mosque: `<svg viewBox="0 0 24 24"><path d="M12 2c0 0-4 3-4 7h8c0-4-4-7-4-7z"/><path d="M5 21h14V13H5v8z"/><path d="M9 21v-4a3 3 0 0 1 6 0v4"/></svg>`,
  swords: `<svg viewBox="0 0 24 24"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6"/><path d="m16 16 4 4"/><path d="m2 2 20 20"/><path d="m19 5-14 14"/></svg>`,
  castle: `<svg viewBox="0 0 24 24"><path d="M4 22V4l4-4 4 4 4-4 4 4v18H4z"/><path d="M9 22v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4"/></svg>`,
  ship: `<svg viewBox="0 0 24 24"><path d="M2 21c.6-1.5 1.5-2 3-2 2 0 2.5 1 4.5 1s2.5-1 4.5-1 2.5 1 4.5 1c1.5 0 2.4.5 3 2"/><path d="M4 15h16l-2-6H6l-2 6z"/><path d="M12 3v6"/></svg>`,
  rocket: `<svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  music: `<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  star: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  hourglass: `<svg viewBox="0 0 24 24"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>`,
  play: `<svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/></svg>`,
  pause: `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" fill="currentColor"/><rect x="14" y="4" width="4" height="16" fill="currentColor"/></svg>`,
  prev: `<svg viewBox="0 0 24 24"><polygon points="19 20 9 12 19 4 19 20" fill="currentColor"/><line x1="5" y1="19" x2="5" y2="5"/></svg>`,
  next: `<svg viewBox="0 0 24 24"><polygon points="5 4 15 12 5 20 5 4" fill="currentColor"/><line x1="19" y1="5" x2="19" y2="19"/></svg>`,
  sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  volHigh: `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  volLow: `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  volMute: `<svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`
};

/* =========================================================
   3. DATA
   ========================================================= */
const TIMELINE_DATA = Object.freeze([
  { year: '±3000 SM', icon: 'landmark', title: 'Mesir & Babilonia Kuno', desc: 'Bangsa Mesir dan Babilonia mengembangkan sistem bilangan, tabel perkalian, serta geometri praktis untuk membangun piramida dan mengukur lahan.', fact: 'Papirologi menunjukkan orang Mesir sudah menggunakan nilai π ≈ 3,16 sekitar 2000 tahun sebelum Pythagoras lahir!' },
  { year: '±1800 SM', icon: 'hash', title: 'Lembah Indus', desc: 'Peradaban Harappa menemukan sistem bilangan desimal dan penggunaan awal konsep nol dalam sistem posisional.', fact: 'Sistem bilangan India inilah yang nantinya menyebar ke dunia Islam dan kemudian ke Eropa sebagai "angka Arab".' },
  { year: '±600 SM', icon: 'triangle', title: 'Thales & Pythagoras', desc: 'Matematika berubah dari sekadar hitungan praktis menjadi ilmu abstrak. Pythagoras memperkenalkan pentingnya pembuktian deduktif.', fact: 'Teorema Pythagoras (a² + b² = c²) ternyata sudah dikenal di Babilonia 1000 tahun sebelum Pythagoras!' },
  { year: '±300 SM', icon: 'book', title: 'Euklides — Elemen', desc: 'Euklides menulis "Elemen", kitab geometri aksiomatik yang menjadi buku pelajaran tersukses sepanjang sejarah manusia.', fact: '"Elemen" digunakan sebagai buku teks selama lebih dari 2000 tahun — hanya Alkitab yang mengalahkannya dalam jumlah edisi.' },
  { year: '±250 SM', icon: 'cog', title: 'Archimedes', desc: 'Menghitung nilai π dengan sangat akurat, merumuskan prinsip pengungkit, dan menggunakan metode "exhaustion" yang menjadi cikal bakal kalkulus.', fact: 'Archimedes menemukan rumus volume bola dan tabung, lalu meminta gambar bola di dalam tabung diukir di makamnya.' },
  { year: '±500 M', icon: 'zero', title: 'Aryabhata (India)', desc: 'Mengembangkan sistem bilangan desimal posisional dan menjadikan nol sebagai angka yang bisa dioperasikan.', fact: 'Kata "nol" berasal dari bahasa Arab "ṣifr", yang diserap ke bahasa Latin "zephirum" lalu menjadi "zero".' },
  { year: '±820 M', icon: 'calculator', title: 'Al-Khwarizmi', desc: 'Bapak Aljabar. Karyanya "Al-Jabr" menjadi dasar ilmu aljabar, sedangkan namanya diabadikan sebagai istilah "algoritma".', fact: 'Kata "aljabar" berasal dari "al-jabr" yang berarti "penyelesaian" atau "penyatuan kembali bagian yang patah".' },
  { year: '1202', icon: 'spiral', title: 'Fibonacci', desc: 'Leonardo dari Pisa memperkenalkan angka Arab ke Eropa lewat buku "Liber Abaci", termasuk deret Fibonacci yang terkenal.', fact: 'Deret Fibonacci muncul di alam: susunan biji bunga matahari, cangkang nautilus, hingga pola spiral galaksi.' },
  { year: '1637', icon: 'chart', title: 'René Descartes', desc: 'Menghubungkan aljabar dan geometri melalui sistem koordinat Kartesius — lahirnya geometri analitik.', fact: 'Konon ide koordinat muncul saat Descartes mengamati seekor lalat berjalan di langit-langit kamarnya.' },
  { year: '1687', icon: 'atom', title: 'Newton & Leibniz', desc: 'Secara terpisah, keduanya mengembangkan kalkulus diferensial dan integral yang menjadi tulang punggung sains modern.', fact: 'Perdebatan tentang siapa penemu kalkulus yang sebenarnya berlangsung lebih dari 100 tahun antara Inggris dan Jerman.' },
  { year: '1783', icon: 'sigma', title: 'Leonhard Euler', desc: 'Matematikawan paling produktif sepanjang sejarah. Menstandarkan notasi matematika modern seperti e, i, π, dan f(x).', fact: 'Euler menulis lebih dari 800 karya. Ia bahkan tetap berkarya setelah buta total di usia 59 tahun!' },
  { year: '1936', icon: 'cpu', title: 'Alan Turing', desc: 'Merumuskan "Mesin Turing" — model komputasi abstrak yang menjadi fondasi ilmu komputer dan kecerdasan buatan.', fact: 'Mesin Turing membuktikan bahwa ada masalah yang secara matematis TIDAK MUNGKIN diselesaikan komputer (Halting Problem).' }
]);

const WORLD_DATA = Object.freeze([
  { year: '±3200 SM', region: 'Mesopotamia', icon: 'scroll', title: 'Penemuan Tulisan', desc: 'Bangsa Sumeria menciptakan tulisan paku (cuneiform), menandai awal sejarah tertulis umat manusia.' },
  { year: '±2560 SM', region: 'Mesir', icon: 'pyramid', title: 'Piramida Giza', desc: 'Piramida Agung Giza selesai dibangun — keajaiban teknik yang masih berdiri hingga kini.' },
  { year: '776 SM', region: 'Yunani', icon: 'medal', title: 'Olimpiade Pertama', desc: 'Olimpiade kuno pertama digelar di Olympia, menjadi tradisi yang bertahan ribuan tahun.' },
  { year: '221 SM', region: 'Tiongkok', icon: 'flag', title: 'Penyatuan Tiongkok', desc: 'Qin Shi Huang menyatukan Tiongkok dan memulai pembangunan Tembok Besar.' },
  { year: '476 M', region: 'Eropa', icon: 'column', title: 'Runtuhnya Romawi Barat', desc: 'Kekaisaran Romawi Barat runtuh, menandai dimulainya Abad Pertengahan di Eropa.' },
  { year: '622 M', region: 'Arab', icon: 'mosque', title: 'Hijrah Nabi Muhammad', desc: 'Peristiwa Hijrah menjadi awal kalender Islam dan kebangkitan peradaban Islam.' },
  { year: '1096', region: 'Eropa', icon: 'swords', title: 'Perang Salib', desc: 'Perang Salib dimulai, membuka jalur pertukaran budaya dan ilmu antara Timur dan Barat.' },
  { year: '1453', region: 'Eropa', icon: 'castle', title: 'Jatuhnya Konstantinopel', desc: 'Kota Konstantinopel jatuh ke tangan Turki Utsmani, menandai berakhirnya Abad Pertengahan.' },
  { year: '1492', region: 'Dunia Baru', icon: 'ship', title: 'Columbus ke Amerika', desc: 'Christopher Columbus mencapai Amerika, membuka era eksplorasi dan pertukaran global.' },
  { year: '1969', region: 'Dunia', icon: 'rocket', title: 'Pendaratan di Bulan', desc: 'Apollo 11 mendaratkan manusia pertama di Bulan — puncak pencapaian sains dan teknologi.' }
]);

const QUIZ_DATA = Object.freeze([
  { q: "Siapa yang dijuluki sebagai 'Bapak Aljabar'?", options: ['Euclid', 'Al-Khwarizmi', 'Pythagoras', 'Isaac Newton'], answer: 1, explain: "Muhammad bin Musa Al-Khwarizmi menulis kitab 'Al-Jabr' yang menjadi dasar ilmu aljabar. Namanya juga menjadi asal kata 'algoritma'." },
  { q: 'Peradaban manakah yang pertama kali menggunakan nol sebagai angka?', options: ['Mesir Kuno', 'Yunani Kuno', 'India', 'Romawi'], answer: 2, explain: 'Matematikawan India (seperti Brahmagupta dan Aryabhata) adalah yang pertama memperlakukan nol sebagai angka penuh yang dapat dioperasikan.' },
  { q: "Siapa penulis 'Elemen', kitab geometri aksiomatik yang legendaris?", options: ['Archimedes', 'Thales', 'Euclid', 'Apollonius'], answer: 2, explain: "Euclid menulis 'Elemen' sekitar 300 SM. Buku ini menjadi standar pengajaran geometri selama lebih dari 2000 tahun." },
  { q: 'Peristiwa apa yang menandai berakhirnya Abad Pertengahan di Eropa?', options: ['Runtuhnya Romawi Barat', 'Jatuhnya Konstantinopel', 'Perang Salib', 'Olimpiade Pertama'], answer: 1, explain: 'Jatuhnya Konstantinopel ke tangan Turki Utsmani pada 1453 menandai berakhirnya Abad Pertengahan dan dimulainya era modern.' },
  { q: "Siapa penemu 'Mesin Turing' yang menjadi dasar ilmu komputer?", options: ['John von Neumann', 'Alan Turing', 'Charles Babbage', 'Kurt Gödel'], answer: 1, explain: 'Alan Turing merumuskan Mesin Turing pada 1936. Konsep ini menjadi fondasi teori komputasi dan kecerdasan buatan.' }
]);

const TRACKS = Object.freeze([
  { title: 'ains ba la vida', artist: 'votrad', cover: 'music', src: 'lagu1.mp3' },
  { title: 'ass', artist: 'Artis tiktok', cover: 'star', src: 'lagu2.mp3' },
  { title: 'politik', artist: 'Artis tiktok', cover: 'hourglass', src: 'lagu3.mp3' }
]);
/* =========================================================
   4. CLASS: THEME MANAGER
   ========================================================= */
class ThemeManager {
  constructor() {
    this.root   = document.documentElement;
    this.toggle = $('#themeToggle');
    this.apply(this.initialTheme());
    
    this.toggle.addEventListener('click', () => {
      const next = this.root.dataset.theme === 'dark' ? 'light' : 'dark';
      this.apply(next);
    });
  }

  initialTheme() {
    let saved = null;
    try { saved = localStorage.getItem('mathTheme'); } catch (e) {}
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  apply(theme) {
    this.root.dataset.theme = theme;
    this.toggle.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    try { localStorage.setItem('mathTheme', theme); } catch (e) {}
  }
}

/* =========================================================
   5. CLASS: TIMELINE
   ========================================================= */
class Timeline {
  constructor(opts) {
    this.data      = opts.data;
    this.container = $(opts.container);
    this.template  = $(opts.template);
    this.render();
  }

  render() {
    const fragment = document.createDocumentFragment();
    for (const item of this.data) {
      const node = this.template.content.cloneNode(true);
      node.querySelector('.t-year').textContent  = item.year;
      node.querySelector('.t-icon').innerHTML    = ICONS[item.icon] || '';
      node.querySelector('.t-title').textContent = item.title;
      node.querySelector('.t-desc').textContent  = item.desc;
      node.querySelector('.t-fact p').textContent = `💡 ${item.fact}`;

      const details = node.querySelector('details');
      details.addEventListener('toggle', () => {
        details.querySelector('.t-hint').textContent = details.open ? 'Tutup ▴' : 'Fakta menarik ▾';
      });

      fragment.append(node);
    }
    this.container.append(fragment);
  }
}

/* =========================================================
   6. CLASS: SEJARAH DUNIA
   ========================================================= */
class WorldHistory {
  constructor(opts) {
    this.data      = opts.data;
    this.container = $(opts.container);
    this.template  = $(opts.template);
    this.render();
  }

  render() {
    const fragment = document.createDocumentFragment();
    for (const item of this.data) {
      const node = this.template.content.cloneNode(true);
      node.querySelector('.wc-icon').innerHTML     = ICONS[item.icon] || '';
      node.querySelector('.wc-region').textContent = item.region;
      node.querySelector('.wc-year').textContent   = item.year;
      node.querySelector('.wc-title').textContent  = item.title;
      node.querySelector('.wc-desc').textContent   = item.desc;
      fragment.append(node);
    }
    this.container.append(fragment);
  }
}
/* =========================================================
   7. CLASS: HISTORY ARTICLES
   ========================================================= */
class HistoryArticles {
  constructor(containerId) {
    this.container = $(containerId);
    this.data = [
      {
        title: "1. Era Kuno: Kebutuhan Praktis (±3000 SM - 600 SM)",
        content: `
          <p>Matematika lahir bukan di ruang kelas, melainkan di tengah debu pembangunan dan pasar.</p>
          <ul>
            <li><strong>Mesir Kuno & Babilonia:</strong> Mereka butuh matematika untuk hal yang sangat praktis. Orang Mesir menggunakan geometri untuk mengukur tanah di tepi Sungai Nil yang selalu banjir, dan menghitung material untuk membangun <strong>Piramida</strong>. Orang Babilonia menggunakan matematika untuk astronomi dan membuat kalender. Mereka sudah mengenal teorema Pythagoras 1000 tahun sebelum Pythagoras lahir!</li>
            <li><strong>Lembah Indus (India Kuno):</strong> Peradaban ini adalah yang pertama kali mencetuskan ide tentang <strong>Angka Nol (0)</strong> dan sistem bilangan desimal (basis 10) yang kita pakai sampai sekarang.</li>
          </ul>
        `
      },
      {
        title: "2. Era Yunani: Lahirnya Pembuktian (±600 SM - 300 M)",
        content: `
          <p>Inilah titik balik terpenting. Bangsa Yunani mengubah matematika dari "sekadar cara menghitung" menjadi "ilmu logika".</p>
          <ul>
            <li><strong>Thales & Pythagoras:</strong> Mereka mulai bertanya, "Kenapa rumus ini bisa benar?" Mereka memperkenalkan <strong>pembuktian deduktif</strong> (membuktikan sesuatu lewat logika, bukan cuma coba-coba).</li>
            <li><strong>Euklides:</strong> Menulis buku legendaris berjudul <strong>"Elemen"</strong>. Buku ini adalah kitab geometri paling berpengaruh sepanjang masa. Selama lebih dari 2000 tahun, buku ini dijadikan buku wajib sekolah di seluruh dunia.</li>
            <li><strong>Archimedes:</strong> Ilmuwan jenius yang menghitung nilai Pi (π) dengan sangat akurat dan menemukan prinsip pengungkit. Metodenya menjadi cikal bakal ilmu Kalkulus.</li>
          </ul>
        `
      },
      {
        title: "3. Era Keemasan Islam (±800 M - 1200 M)",
        content: `
          <p>Saat Eropa masuk ke Abad Kegelapan (Dark Ages) di mana ilmu pengetahuan dilarang, dunia Islam justru mengalami Zaman Keemasan.</p>
          <ul>
            <li><strong>Al-Khwarizmi:</strong> Seorang ilmuwan Muslim yang dijuluki <strong>Bapak Aljabar</strong>. Karyanya yang berjudul <em>Al-Jabr</em> menjadi dasar ilmu aljabar modern. Bahkan kata <strong>"Algoritma"</strong> (yang jadi dasar coding) diambil dari namanya. Tanpa dia, web yang lagi kamu buka ini nggak akan pernah ada.</li>
            <li><strong>Angka Arab & Nol:</strong> Lewat perdagangan, dunia Islam menyebarkan sistem angka dari India (termasuk angka 0) ke seluruh dunia. Angka Romawi (I, V, X) yang rumit akhirnya ditinggalkan.</li>
          </ul>
        `
      },
      {
        title: "4. Era Revolusi Ilmiah (Abad ke-17)",
        content: `
          <p>Matematika mulai digunakan untuk membaca hukum alam semesta.</p>
          <ul>
            <li><strong>René Descartes:</strong> Menghubungkan Aljabar dan Geometri lewat sistem <strong>Koordinat Kartesius</strong> (sumbu X dan Y). Konon, idenya muncul saat dia melihat lalat berjalan di langit-langit kamarnya.</li>
            <li><strong>Isaac Newton & Gottfried Leibniz:</strong> Secara terpisah, mereka menemukan <strong>Kalkulus</strong>. Ilmu ini adalah "matematika tentang perubahan" yang membuat manusia bisa menghitung kecepatan, gravitasi, dan lintasan planet.</li>
          </ul>
        `
      },
      {
        title: "5. Era Modern: Mesin Berpikir (Abad ke-20)",
        content: `
          <p>Matematika berubah menjadi fondasi teknologi digital.</p>
          <ul>
            <li><strong>Alan Turing (1936):</strong> Menciptakan konsep <strong>"Mesin Turing"</strong>, sebuah model komputasi yang menjadi dasar dari semua komputer dan AI (Kecerdasan Buatan) saat ini.</li>
            <li><strong>Hari Ini:</strong> Matematika ada di balik algoritma TikTok yang kamu scroll, enkripsi keamanan bank, hingga peluncuran roket SpaceX ke Mars.</li>
          </ul>
        `
      },
      {
        title: "6. Sejarah Dunia: Lahirnya Peradaban (±3200 SM)",
        content: `
          <ul>
            <li><strong>Penemuan Tulisan (Mesopotamia):</strong> Bangsa Sumeria menciptakan tulisan paku (cuneiform) di atas lempengan tanah liat. Ini adalah momen ketika "Prasejarah" berakhir dan "Sejarah" dimulai, karena manusia mulai mencatat.</li>
            <li><strong>Piramida Giza (Mesir):</strong> Dibangun sekitar 2560 SM, menjadi keajaiban teknik yang masih berdiri kokoh sampai hari ini.</li>
          </ul>
        `
      },
      {
        title: "7. Sejarah Dunia: Era Klasik & Abad Pertengahan",
        content: `
          <ul>
            <li><strong>Olimpiade Pertama (776 SM):</strong> Digelar di Yunani untuk menghormati dewa Zeus. Ini menjadi tradisi yang dihidupkan kembali di era modern.</li>
            <li><strong>Penyatuan Tiongkok (221 SM):</strong> Kaisar Qin Shi Huang menyatukan Tiongkok dan memulai pembangunan Tembok Besar.</li>
            <li><strong>Runtuhnya Romawi Barat (476 M):</strong> Kekaisaran terbesar di Eropa runtuh. Ini menandai berakhirnya era Kuno dan dimulainya Abad Pertengahan.</li>
            <li><strong>Hijrah Nabi Muhammad (622 M):</strong> Menjadi awal kalender Islam dan titik awal kebangkitan peradaban Islam di bidang sains, kedokteran, dan matematika.</li>
            <li><strong>Perang Salib (1096):</strong> Perang agama antara Eropa dan Timur Tengah. Meskipun berdarah, perang ini membuka jalur pertukaran budaya, di mana ilmu pengetahuan dari Arab (seperti Aljabar) mulai dipelajari orang Eropa.</li>
            <li><strong>Jatuhnya Konstantinopel (1453):</strong> Kota ini jatuh ke tangan Turki Utsmani. Peristiwa ini menandai <strong>berakhirnya Abad Pertengahan</strong> dan lahirnya era baru (Renaissance).</li>
          </ul>
        `
      },
      {
        title: "8. Sejarah Dunia: Era Penjelajahan & Modern",
        content: `
          <ul>
            <li><strong>Columbus ke Amerika (1492):</strong> Christopher Columbus menyeberangi Samudra Atlantik. Ini membuka era eksplorasi global, pertukaran tanaman, hewan, dan budaya antara belahan Bumi Timur dan Barat.</li>
            <li><strong>Pendaratan di Bulan (1969):</strong> Apollo 11 membawa manusia pertama (Neil Armstrong) ke Bulan. Ini adalah puncak kemenangan sains dan matematika manusia.</li>
            <li><strong>Era Internet & AI:</strong> Manusia menciptakan internet, media sosial, dan kecerdasan buatan. Dunia menjadi sangat terhubung tanpa batas ruang dan waktu.</li>
          </ul>
        `
      }
    ];
    
    this.render();
  }

  render() {
    if (!this.container) return;
    
    const fragment = document.createDocumentFragment();
    
    this.data.forEach(item => {
      const details = document.createElement('details');
      details.className = 'article-card';
      
      const summary = document.createElement('summary');
      summary.textContent = item.title;
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'article-content';
      contentDiv.innerHTML = item.content;
      
      details.appendChild(summary);
      details.appendChild(contentDiv);
      fragment.appendChild(details);
    });
    
    this.container.appendChild(fragment);
  }
}

/* =========================================================
   8. CLASS: KUIS
   ========================================================= */
class Quiz {
  constructor(opts) {
    this.data      = opts.data;
    this.container = $(opts.container);
    this.index = 0;
    this.score = 0;
    this.answered = false;
    this.renderQuestion();
  }

  renderQuestion() {
    this.answered = false;
    const item = this.data[this.index];
    const progress = (this.index / this.data.length) * 100;

    this.container.innerHTML = `
      <div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
        <div class="quiz-bar" style="width:${progress}%"></div>
      </div>
      <p class="quiz-count">SOAL ${this.index + 1} DARI ${this.data.length}</p>
      <h3 class="quiz-q">${item.q}</h3>
      <div class="quiz-options" role="group">
        ${item.options.map((opt, i) =>
          `<button type="button" class="opt" data-index="${i}">${String.fromCharCode(65 + i)}. ${opt}</button>`
        ).join('')}
      </div>
      <p class="quiz-explain" role="status" aria-live="polite"></p>
      <button type="button" class="quiz-next">Soal Berikutnya &rarr;</button>
    `;

    this.container.querySelectorAll('.opt').forEach((btn) => {
      btn.addEventListener('click', () => this.answer(Number(btn.dataset.index)));
    });
    this.container.querySelector('.quiz-next').addEventListener('click', () => this.next());
  }

  answer(chosen) {
    if (this.answered) return;
    this.answered = true;

    const item = this.data[this.index];
    const isCorrect = chosen === item.answer;
    if (isCorrect) this.score++;

    const buttons = this.container.querySelectorAll('.opt');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === item.answer) btn.classList.add('correct');
    });
    if (!isCorrect) buttons[chosen].classList.add('wrong');

    const explain = this.container.querySelector('.quiz-explain');
    explain.innerHTML = isCorrect 
      ? `<span style="color:var(--accent-2);font-weight:bold;">&#10004; Benar!</span> ${item.explain}`
      : `<span style="color:#e74c3c;font-weight:bold;">&#10006; Belum tepat.</span> ${item.explain}`;
    explain.classList.add('show');

    const nextBtn = this.container.querySelector('.quiz-next');
    nextBtn.style.display = 'inline-block';
    
    const textBtn = this.index === this.data.length - 1 
      ? 'Lihat Hasil &rarr;' 
      : 'Soal Berikutnya &rarr;';
    nextBtn.innerHTML = textBtn;
  }

  next() {
    this.index++;
    if (this.index < this.data.length) {
      this.renderQuestion();
    } else {
      this.renderResult();
    }
  }

  renderResult() {
    const percent = Math.round((this.score / this.data.length) * 100);
    let title, message;

    if (percent === 100) {
      title = 'Sempurna!';
      message = 'Kamu benar-benar ahli sejarah matematika & dunia!';
    } else if (percent >= 60) {
      title = 'Bagus sekali!';
      message = 'Pemahamanmu sudah kuat. Sedikit lagi menuju sempurna!';
    } else {
      title = 'Terus belajar!';
      message = 'Baca lagi timeline di atas, lalu coba kuisnya sekali lagi ya!';
    }

    this.container.innerHTML = `
      <div class="quiz-result">
        <p class="big">${this.score}/${this.data.length}</p>
        <h3>${title}</h3>
        <p>${message}<br>Skor kamu: <b>${percent}%</b></p>
        <button type="button" class="btn" id="restartQuiz">Ulangi Kuis</button>
      </div>
    `;

    this.container.querySelector('#restartQuiz').addEventListener('click', () => {
      this.index = 0;
      this.score = 0;
      this.renderQuestion();
    });
  }
}
/* =========================================================
   9. CLASS: MUSIC PLAYER
   ========================================================= */
class MusicPlayer {
  constructor(tracks) {
    this.tracks = tracks;
    this.current = 0;
    this.audio = new Audio();
    this.audio.preload = 'metadata';

    this.els = {
      root:         $('#musicPlayer'),
      cover:        $('#musicCover'),
      title:        $('#trackTitle'),
      artist:       $('#trackArtist'),
      play:         $('#playBtn'),
      prev:         $('#prevBtn'),
      next:         $('#nextBtn'),
      progress:     $('#progressNative'),
      currentTime:  $('#currentTime'),
      durationTime: $('#durationTime'),
      volume:       $('#volumeSlider'),
      volIcon:      $('#volIcon'),
      trackList:    $('#trackList')
    };

    this.bindEvents();
    this.renderTrackList();
    this.load(0, false);
  }

  get isPlaying() {
    return !this.audio.paused;
  }

  renderTrackList() {
    const fragment = document.createDocumentFragment();
    this.tracks.forEach((track, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'track-btn';
      btn.textContent = track.title;
      btn.addEventListener('click', () => this.load(i, true));
      fragment.append(btn);
    });
    this.els.trackList.append(fragment);
  }

  bindEvents() {
    const a = this.audio;

    this.els.play.addEventListener('click', () => {
      this.isPlaying ? this.pause() : this.play();
    });
    
    this.els.prev.innerHTML = ICONS.prev;
    this.els.next.innerHTML = ICONS.next;

    this.els.prev.addEventListener('click', () => {
      this.load(this.current - 1, this.isPlaying);
    });
    this.els.next.addEventListener('click', () => {
      this.load(this.current + 1, this.isPlaying);
    });
    this.els.volume.addEventListener('input', () => {
      this.setVolume(Number(this.els.volume.value) / 100);
    });
    this.els.progress.addEventListener('click', (e) => {
      this.seek(e);
    });

    a.addEventListener('loadedmetadata', () => {
      this.els.durationTime.textContent = formatTime(a.duration);
    });
    a.addEventListener('timeupdate', () => {
      if (!a.duration) return;
      this.els.progress.value = (a.currentTime / a.duration) * 100;
      this.els.currentTime.textContent = formatTime(a.currentTime);
    });
    a.addEventListener('ended', () => {
      this.load(this.current + 1, true);
    });
  }

  async play() {
    try {
      await this.audio.play();
      this.els.play.innerHTML = ICONS.pause;
      this.els.play.setAttribute('aria-label', 'Jeda');
      this.els.root.classList.add('playing');
    } catch (e) {
      this.els.play.innerHTML = ICONS.play;
      this.els.root.classList.remove('playing');
    }
  }

  pause() {
    this.audio.pause();
    this.els.play.innerHTML = ICONS.play;
    this.els.play.setAttribute('aria-label', 'Putar');
    this.els.root.classList.remove('playing');
  }

  load(index, autoplay = false) {
    this.current = (index + this.tracks.length) % this.tracks.length;
    const track = this.tracks[this.current];

    this.audio.src = track.src;
    this.els.cover.innerHTML = ICONS[track.cover] || ICONS.music;
    this.els.title.textContent  = track.title;
    this.els.artist.textContent = track.artist;
    this.els.progress.value     = 0;
    this.els.currentTime.textContent  = '0:00';
    this.els.durationTime.textContent = '0:00';

    $$('.track-btn', this.els.trackList).forEach((btn, i) => {
      btn.classList.toggle('active', i === this.current);
    });

    if (autoplay) this.play();
  }

  setVolume(value) {
    this.audio.volume = value;
    this.els.volIcon.innerHTML = value === 0 ? ICONS.volMute : value < 0.5 ? ICONS.volLow : ICONS.volHigh;
  }

  seek(event) {
    if (!this.audio.duration) return;
    const rect  = this.els.progress.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    this.audio.currentTime = ratio * this.audio.duration;
  }
}

/* =========================================================
   10. CLASS: SCROLL REVEAL & COUNT UP
   ========================================================= */
class ScrollReveal {
  constructor(selector = '.reveal') {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    $$(selector).forEach((el) => this.observer.observe(el));
  }
}

class CountUp {
  constructor(selector = '[data-count]') {
    this.formatter = new Intl.NumberFormat('id-ID');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          this.animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    $$(selector).forEach((el) => observer.observe(el));
  }

  animate(el) {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = this.formatter.format(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

/* =========================================================
   11. CLASS: FLOATING SYMBOLS
   ========================================================= */
class FloatingSymbols {
  constructor(container) {
    const wrap = $(container);
    if (!wrap) return;

    const symbols = ['π', '∑', '√', '∫', '∞', 'Δ', 'θ', '≈', 'φ', '∂', 'λ', '≠', '∛', '±'];
    const fragment = document.createDocumentFragment();
    
    for (const sym of symbols) {
      const span = document.createElement('span');
      span.className = 'float-sym';
      span.textContent = sym;
      span.style.left = `${Math.random() * 96}%`;
      span.style.top  = `${Math.random() * 92}%`;
      span.style.fontSize = `${Math.random() * 3.2 + 1.4}rem`;
      span.style.animationDuration = `${Math.random() * 6 + 6}s`;
      span.style.animationDelay    = `${Math.random() * 5}s`;
      fragment.append(span);
    }
    wrap.append(fragment);
  }
}

/* =========================================================
   12. INIT (MENJALANKAN SEMUA FITUR)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new FloatingSymbols('#symbols');

  new Timeline({
    data: TIMELINE_DATA,
    container: '#timelineContainer',
    template: '#tpl-timeline'
  });

  new WorldHistory({
    data: WORLD_DATA,
    container: '#worldGrid',
    template: '#tpl-world'
  });

  new HistoryArticles('#articleContainer');
  new Quiz({ data: QUIZ_DATA, container: '#quizBox' });
  new MusicPlayer(TRACKS);

  new ScrollReveal('.reveal');
  new CountUp('[data-count]');
});