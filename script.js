// script.js - Undangan Tasyakuran 4 Bulanan Tri Gina & M. Ilyas

document.addEventListener('DOMContentLoaded', () => {
  initGuestName();
  initCountdown();
  initAudio();
  initGuestbook();
  initCopyWhatsApp();
  initCalendarLink();
});

// 1. Ambil Nama Tamu dari URL Parameter (?to=Nama+Tamu)
function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to') || urlParams.get('nama') || urlParams.get('u');
  
  const guestCoverEl = document.getElementById('guestCoverName');
  const guestFormEl = document.getElementById('senderName');

  if (guestName) {
    const cleanName = decodeURIComponent(guestName.replace(/\+/g, ' '));
    if (guestCoverEl) guestCoverEl.textContent = cleanName;
    if (guestFormEl) guestFormEl.value = cleanName;
  }
}

// 2. Buka Undangan & Pemutar Audio
let isAudioPlaying = false;
let bgMusic;

function initAudio() {
  bgMusic = document.getElementById('bgMusic');
  const openBtn = document.getElementById('btnOpenInvitation');
  const coverScreen = document.getElementById('coverScreen');
  const audioBtn = document.getElementById('audioBtn');
  const audioIcon = document.getElementById('audioIcon');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      coverScreen.classList.add('opened');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Play audio on user gesture
      if (bgMusic) {
        bgMusic.play().then(() => {
          isAudioPlaying = true;
          updateAudioButtonState();
        }).catch(err => {
          console.log('Autoplay prevented or audio source issue:', err);
        });
      }
    });
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (!bgMusic) return;

      if (isAudioPlaying) {
        bgMusic.pause();
        isAudioPlaying = false;
      } else {
        bgMusic.play();
        isAudioPlaying = true;
      }
      updateAudioButtonState();
    });
  }

  function updateAudioButtonState() {
    if (isAudioPlaying) {
      audioBtn.classList.add('rotating');
      audioIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
    } else {
      audioBtn.classList.remove('rotating');
      audioIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
    }
  }
}

// 3. Countdown Timer (Target: 29 November 2026, 15:30:00 WIB / UTC+7)
function initCountdown() {
  const targetDate = new Date('2026-11-29T15:30:00+07:00').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minutesEl = document.getElementById('cdMinutes');
    const secondsEl = document.getElementById('cdSeconds');

    if (!daysEl) return;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// 4. Tambah Acara ke Google Calendar
function initCalendarLink() {
  const btnCal = document.getElementById('btnAddToCal');
  if (!btnCal) return;

  btnCal.addEventListener('click', (e) => {
    e.preventDefault();
    const title = encodeURIComponent("Tasyakuran 4 Bulanan Tri Gina & M. Ilyas");
    const details = encodeURIComponent("Tasyakuran 4 Bulanan (Walimatul Hamli) atas kehamilan calon buah hati dari Tri Gina dan M. Ilyas.");
    const location = encodeURIComponent("Rumah Bapak Tarmidi");
    // 29 Nov 2026 15:30 WIB = 08:30 UTC. Duration 3 hours -> 11:30 UTC
    const dates = "20261129T083000Z/20261129T120000Z";
    
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(calUrl, '_blank');
  });
}

// 5. Buku Doa & Ucapan (Local Storage)
const DEFAULT_WISHES = [
  {
    name: "Keluarga Besar Bpk. Tarmidi",
    status: "Hadir",
    message: "Alhamdulillah, semoga ibu dan calon bayi selalu diberikan kesehatan, kelancaran hingga persalinan, serta menjadi anak yang sholeh/sholehah pembawa berkah bagi keluarga. Aamiin ya Rabbal 'Alamin.",
    date: "Baru saja"
  },
  {
    name: "Hj. Siti & Keluarga",
    status: "Insya Allah Hadir",
    message: "Barakallahu fiikum untuk Gina dan Ilyas. Semoga senantiasa dalam lindungan Allah SWT, dilancarkan kehamilannya sampai persalinan.",
    date: "1 jam lalu"
  }
];

function initGuestbook() {
  const form = document.getElementById('wishesForm');
  const wishesList = document.getElementById('wishesList');
  const STORAGE_KEY = 'tasyakuran_4bln_gina_ilyas_wishes';

  let wishes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_WISHES;

  function renderWishes() {
    if (!wishesList) return;
    wishesList.innerHTML = '';

    wishes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'p-3.5 bg-white/90 rounded-xl border border-stone-200/80 shadow-sm text-left';
      
      const badgeColor = item.status === 'Hadir' 
        ? 'bg-emerald-100 text-emerald-800' 
        : item.status === 'Insya Allah Hadir'
          ? 'bg-amber-100 text-amber-800'
          : 'bg-stone-100 text-stone-700';

      card.innerHTML = `
        <div class="flex items-center justify-between mb-1.5">
          <h4 class="font-semibold text-stone-800 text-sm">${escapeHtml(item.name)}</h4>
          <span class="text-[11px] px-2 py-0.5 rounded-full font-medium ${badgeColor}">
            ${item.status}
          </span>
        </div>
        <p class="text-xs text-stone-600 leading-relaxed mb-1.5">${escapeHtml(item.message)}</p>
        <span class="text-[10px] text-stone-400 block text-right">${item.date || 'Baru saja'}</span>
      `;
      wishesList.appendChild(card);
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const statusInput = document.getElementById('attendanceStatus');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput.value.trim();
      const status = statusInput.value;
      const message = messageInput.value.trim();

      if (!name || !message) {
        showToast('Mohon lengkapi nama dan doa restu Anda 🙏');
        return;
      }

      const newWish = {
        name,
        status,
        message,
        date: 'Baru saja'
      };

      wishes.unshift(newWish);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
      renderWishes();

      messageInput.value = '';
      showToast('Terima kasih atas doa & ucapan tulus Anda ❤️');
    });
  }

  renderWishes();
}

// 6. Tombol Salin Teks WhatsApp
function initCopyWhatsApp() {
  const btnCopy = document.getElementById('btnCopyWa');
  if (!btnCopy) return;

  btnCopy.addEventListener('click', () => {
    const textToCopy = `*UNDANGAN TASYAKURAN 4 BULANAN (WALIMATUL HAMLI)*

_Assalamu’alaikum Warahmatullahi Wabarakatuh_

Puji dan syukur kami panjatkan kehadirat Allah SWT, dengan memohon rahmat dan ridho-Nya, kami bermaksud menyelenggarakan acara *Tasyakuran 4 Bulanan (Walimatul Hamli)* atas kehamilan ananda/calon buah hati kami:

*Tri Gina & M. Ilyas*

Yang insya Allah akan dilaksanakan pada:
🗓 *Hari/Tanggal:* Minggu, 29 November 2026
⏰ *Waktu:* Pukul 15.30 WIB s/d Selesai
📍 *Tempat:* Rumah Bapak Tarmidi

Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi keselamatan calon ibu dan buah hati.

Undangan Digital & Doa:
${window.location.origin}${window.location.pathname}

Atas kehadiran dan doa restunya kami ucapkan terima kasih yang sebesar-besarnya.
_Jazakumullahu Khairan Katsiran_

_Wassalamu’alaikum Warahmatullahi Wabarakatuh_

*Keluarga Besar Tri Gina & M. Ilyas*
*Keluarga Besar Bpk. Tarmidi*`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast('Teks undangan WhatsApp berhasil disalin!');
    }).catch(() => {
      showToast('Gagal menyalin otomatis, silakan salin manual.');
    });
  });
}

// 7. Toast Message Helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toastText');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Helper sanitization
function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}
