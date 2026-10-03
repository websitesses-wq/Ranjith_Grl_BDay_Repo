// Letter Dialog Component with KitKat Chocolate Props & Exact Telugu-English Message
// Per DPR: Character-for-character preserved source copy, KitKat garnishes, responsive reading frame
import { LETTER_DATA } from '../data/letterData.js';
import { soundFx } from '../utils/audioFX.js';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createLetterDialog(onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'letter-modal-backdrop';
  overlay.id = 'letterModalBackdrop';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Personal Birthday Letter from Ranjith to Harshitha');

  overlay.innerHTML = `
    <!-- The Tactile Unfolded Paper Letter -->
    <div class="letter-paper-sheet" id="letterPaperSheet">
      
      <!-- Sticky / Fixed Top Header Bar -->
      <div class="letter-header-bar">
        <div class="letter-stamp-badge">
          <span class="stamp-icon">💌</span>
          <span class="stamp-text">FOR KATAMA • CONFIDENTIAL</span>
        </div>
        <button class="letter-close-btn" id="btnCloseLetter" aria-label="Close letter">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Scrollable Inner Paper Content -->
      <div class="letter-scroll-body" id="letterScrollBody">
        
        <!-- Subtle Inner Decorative Border -->
        <div class="letter-watermark-bg"></div>

        <!-- KITKAT CHOCOLATE PROP 1 (Top-Right / Header garnish, rotated 10deg) -->
        <div class="kitkat-garnish kitkat-top-right" title="KitKat Chocolate Treat" aria-hidden="true">
          <svg viewBox="0 0 110 50" width="76" height="34" class="kitkat-svg">
            <defs>
              <linearGradient id="kitkatRedGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#C62828" />
                <stop offset="35%" stop-color="#E53935" />
                <stop offset="70%" stop-color="#D32F2F" />
                <stop offset="100%" stop-color="#B71C1C" />
              </linearGradient>
              <linearGradient id="silverFoil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ECEFF1" />
                <stop offset="50%" stop-color="#CFD8DC" />
                <stop offset="100%" stop-color="#90A4AE" />
              </linearGradient>
              <linearGradient id="waferGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#5D4037" />
                <stop offset="100%" stop-color="#3E2723" />
              </linearGradient>
              <filter id="chocShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#0B0501" flood-opacity="0.25" />
              </filter>
            </defs>
            <g filter="url(#chocShadow)">
              <!-- Red Wrapper Main Body -->
              <rect x="18" y="6" width="84" height="38" rx="5" fill="url(#kitkatRedGrad)" stroke="#B71C1C" stroke-width="1.2" />
              <!-- Exposed Chocolate Wafer Fingers on Left -->
              <rect x="4" y="10" width="16" height="13" rx="2" fill="url(#waferGrad)" />
              <rect x="4" y="27" width="16" height="13" rx="2" fill="url(#waferGrad)" />
              <!-- Exposed Silver Foil Edge -->
              <path d="M 18 6 L 22 25 L 18 44" fill="none" stroke="url(#silverFoil)" stroke-width="4" />
              <!-- KitKat Signature Typography & Oval Badge -->
              <ellipse cx="60" cy="25" rx="26" ry="13" fill="#FFFFFF" />
              <text x="60" y="29" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="12" fill="#D32F2F" text-anchor="middle">KitKat</text>
            </g>
          </svg>
        </div>

        <!-- Keepsake Polaroid Photo Pinned to Letter -->
        <div class="letter-polaroid-keepsake" title="Special Keepsake for Katama" aria-hidden="true">
          <div class="keepsake-polaroid-frame">
            <img src="/photos/harshitha_10.jpg" alt="Katama" class="keepsake-polaroid-img" />
            <div class="keepsake-tape-strip"></div>
            <span class="keepsake-caption">Katama 🌸</span>
          </div>
        </div>

        <!-- Letter Header Salutation -->
        <div class="letter-salutation-block">
          <p class="letter-salutation-text">${LETTER_DATA.salutation}</p>
        </div>

        <!-- Delicate Burnt-Orange Divider -->
        <div class="letter-inner-divider"></div>

        <!-- Letter Body Paragraphs (Exact Unaltered Telugu-English Text) -->
        <div class="letter-paragraphs-block">
          <p class="letter-paragraph telugu-text">
            ${LETTER_DATA.paragraphs[0]}
          </p>

          <p class="letter-paragraph telugu-text">
            ${LETTER_DATA.paragraphs[1]}
          </p>
        </div>

        <!-- KITKAT CHOCOLATE PROP 2 (Lower Corner garnish, rotated -8deg) -->
        <div class="kitkat-garnish kitkat-bottom-left" title="Crispy KitKat Wafers" aria-hidden="true">
          <svg viewBox="0 0 110 50" width="72" height="32" class="kitkat-svg">
            <use href="#kitkatRedGrad" />
            <g filter="url(#chocShadow)">
              <rect x="8" y="6" width="86" height="38" rx="5" fill="url(#kitkatRedGrad)" stroke="#B71C1C" stroke-width="1.2" />
              <!-- Right side exposed wafer -->
              <rect x="92" y="10" width="14" height="13" rx="2" fill="url(#waferGrad)" />
              <rect x="92" y="27" width="14" height="13" rx="2" fill="url(#waferGrad)" />
              <!-- Silver foil crimp -->
              <path d="M 90 6 L 86 25 L 90 44" fill="none" stroke="url(#silverFoil)" stroke-width="4" />
              <!-- KitKat oval badge -->
              <ellipse cx="48" cy="25" rx="24" ry="12" fill="#FFFFFF" />
              <text x="48" y="29" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-style="italic" font-size="11" fill="#D32F2F" text-anchor="middle">KitKat</text>
            </g>
          </svg>
        </div>

        <!-- Signature Block (Exact Indentation and Wording) -->
        <div class="letter-signature-block">
          <div class="signature-line">
            <span class="signature-author">${LETTER_DATA.signature}</span>
          </div>
          <div class="signature-caption">Always in your corner • Happy 19th</div>
        </div>

        <!-- Calming Final Footer Note -->
        <div class="letter-end-badge">
          <span class="end-dot"></span>
          <span>That was your surprise 🧡</span>
          <span class="end-dot"></span>
        </div>

      </div>
    </div>
  `;

  const sheet = overlay.querySelector('#letterPaperSheet');
  const closeBtn = overlay.querySelector('#btnCloseLetter');

  const handleClose = () => {
    sheet.classList.add('letter-folding-close');
    overlay.classList.add('backdrop-fading');
    soundFx.playPaperUnfold();

    setTimeout(() => {
      overlay.remove();
      if (onClose) onClose();
    }, 320);
  };

  closeBtn.addEventListener('click', handleClose);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      handleClose();
    }
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape' && document.body.contains(overlay)) {
      handleClose();
      document.removeEventListener('keydown', escHandler);
    }
  });

  // Interactive Keepsake Polaroid Click -> Open Lightbox
  const polaroidKeepsake = overlay.querySelector('.keepsake-polaroid-frame');
  if (polaroidKeepsake) {
    polaroidKeepsake.style.cursor = 'pointer';
    polaroidKeepsake.setAttribute('title', 'Tap to view photo');
    polaroidKeepsake.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoLightbox('/photos/harshitha_10.jpg');
    });
  }

  return overlay;
}
