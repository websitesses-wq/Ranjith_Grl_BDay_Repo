// Birthday Reveal Component with Hero Portrait and Memory Filmstrip
// Elegant typographic reveal of "HAPPY BIRTHDAY DOCTOR HARSHITHA" with photo galleries
import { soundFx } from '../utils/audioFX.js';
import confetti from 'canvas-confetti';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createBirthdayReveal(onNextSection) {
  const container = document.createElement('div');
  container.className = 'birthday-reveal-scene fade-slide-up';
  container.setAttribute('data-scene', 'birthday-reveal');
  container.setAttribute('data-testid', 'birthday-reveal');

  const photos = [
    { src: '/photos/harshitha_1.jpg', caption: 'Radiant Smile 🌺', tag: 'Grace' },
    { src: '/photos/harshitha_7.jpg', caption: 'Festive Joy 🪔', tag: 'Tradition' },
    { src: '/photos/harshitha_10.jpg', caption: 'Pure Moments ✨', tag: 'Katama' },
    { src: '/photos/harshitha_4.jpg', caption: 'Saree Elegance 🌸', tag: 'Charming' },
    { src: '/photos/harshitha_3.jpg', caption: 'Campus Days 🏫', tag: 'College' },
    { src: '/photos/harshitha_9.jpg', caption: 'Temple Sunshine ☀️', tag: 'Peace' },
    { src: '/photos/harshitha_2.jpg', caption: 'Traditional Aura 🏺', tag: 'Beauty' },
    { src: '/photos/harshitha_5.jpg', caption: 'Candid Mirror 📸', tag: 'Vibe' },
    { src: '/photos/harshitha_8.jpg', caption: 'Timeless Look 💫', tag: 'Precious' },
    { src: '/photos/harshitha_6.jpg', caption: 'Floral Memories 🌷', tag: 'Candid' }
  ];

  container.innerHTML = `
    <div class="reveal-content-box">
      <!-- Stethoscope / Medical Heart Emblem for Doctor Harshitha -->
      <div class="doctor-badge-wrapper">
        <div class="doctor-emblem">
          <svg viewBox="0 0 64 64" width="44" height="44" class="stethoscope-svg">
            <defs>
              <linearGradient id="stethGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FF9A4D" />
                <stop offset="100%" stop-color="#FF6803" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="28" fill="#FFF2E8" stroke="#FF6803" stroke-width="2" />
            <path d="M 22 18 L 22 28 C 22 36 28 42 32 42 C 36 42 42 36 42 28 L 42 18" fill="none" stroke="#FF6803" stroke-width="3" stroke-linecap="round" />
            <circle cx="20" cy="18" r="2.5" fill="#AE3A02" />
            <circle cx="44" cy="18" r="2.5" fill="#AE3A02" />
            <path d="M 32 42 L 32 48 C 32 52 38 52 38 48" fill="none" stroke="#AE3A02" stroke-width="2.5" stroke-linecap="round" />
            <circle cx="38" cy="46" r="4.5" fill="#FF6803" stroke="#AE3A02" stroke-width="1.5" />
            <path d="M 32 24 L 33 27 L 36 28 L 33 29 L 32 32 L 31 29 L 28 28 L 31 27 Z" fill="#AE3A02" />
          </svg>
        </div>
        <div class="pill-badge doctor-tag">DR. HARSHITHA • 19TH BIRTHDAY</div>
      </div>

      <!-- SPOTLIGHT PORTRAIT OF HARSHITHA -->
      <div class="spotlight-portrait-container">
        <div class="spotlight-portrait-frame">
          <img src="/photos/harshitha_7.jpg" alt="Doctor Harshitha" class="spotlight-hero-img" />
          <div class="spotlight-portrait-glow"></div>
          <span class="spotlight-tag">The Birthday Star 🌟</span>
        </div>
      </div>

      <!-- Main Headline Typography -->
      <div class="headline-container">
        <span class="headline-intro">HAPPY BIRTHDAY</span>
        <h1 class="headline-name">DOCTOR HARSHITHA</h1>
        <div class="headline-accent-bar"></div>
      </div>

      <p class="reveal-tribute">
        Wishing an exceptionally joyful 19th birthday to a future doctor, healer, and the most genuine friend. May your year be filled with success, laughter, and endless dreams fulfilled!
      </p>

      <!-- Milestones Row -->
      <div class="milestones-row">
        <div class="milestone-item">
          <span class="milestone-num">19</span>
          <span class="milestone-lbl">Years Old</span>
        </div>
        <div class="milestone-divider"></div>
        <div class="milestone-item">
          <span class="milestone-num">100%</span>
          <span class="milestone-lbl">Good Vibe</span>
        </div>
        <div class="milestone-divider"></div>
        <div class="milestone-item">
          <span class="milestone-num">10</span>
          <span class="milestone-lbl">Memories</span>
        </div>
      </div>

      <!-- HORIZONTAL TOUCH-SWIPE PHOTO FILMSTRIP -->
      <div class="memories-filmstrip-section">
        <div class="filmstrip-header">
          <span class="filmstrip-title">MOMENTS OF HARSHITHA</span>
          <span class="filmstrip-swipe-hint">Swipe sideways 👉</span>
        </div>
        <div class="filmstrip-scroll-track" id="filmstripTrack">
          ${photos.map((item, idx) => `
            <div class="polaroid-card" data-idx="${idx}">
              <div class="polaroid-photo-box">
                <img src="${item.src}" alt="${item.caption}" loading="lazy" class="polaroid-img" />
                <span class="polaroid-tag-chip">${item.tag}</span>
              </div>
              <div class="polaroid-label">${item.caption}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Continue to 19 Things Button -->
      <div class="reveal-action-row">
        <button class="primary-action-btn pulse-action" id="btnGoToThings" aria-label="Continue to 19 things I have to say">
          <span>Explore 19 Things For You</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 5v14M19 12l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>
  `;

  // Play fanfare chord and confetti burst on reveal
  setTimeout(() => {
    soundFx.playCelebrationChord();

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#FF6803', '#AE3A02', '#FF9A4D', '#FFFFFF', '#FFD54F', '#0B0501']
    });
  }, 100);

  // Interactive Spotlight Portrait Click -> Open Lightbox
  const spotlightFrame = container.querySelector('.spotlight-portrait-frame');
  if (spotlightFrame) {
    spotlightFrame.style.cursor = 'pointer';
    spotlightFrame.setAttribute('title', 'Tap to view full photo');
    spotlightFrame.addEventListener('click', () => {
      openPhotoLightbox('/photos/harshitha_7.jpg');
    });
  }

  // Interactive Filmstrip Polaroid Cards Click -> Open Lightbox
  const polaroidCards = container.querySelectorAll('.polaroid-card');
  polaroidCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-idx'), 10);
      const photoItem = photos[idx];
      if (photoItem) {
        openPhotoLightbox(photoItem.src);
      }
    });
  });

  const btnGoToThings = container.querySelector('#btnGoToThings');
  btnGoToThings.addEventListener('click', () => {
    if (onNextSection) onNextSection();
  });

  return container;
}
