// Treasure Box Component
// Visual 3D studio treasure chest with hinged lid, internal surprises, floating product-style elements, and micro celebratory burst
import { soundFx } from '../utils/audioFX.js';
import confetti from 'canvas-confetti';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createTreasureBox(onOpen) {
  const container = document.createElement('div');
  container.className = 'treasure-box-scene';
  container.setAttribute('data-scene', 'treasure-box');

  container.innerHTML = `
    <div class="scene-header">
      <div class="pill-badge">STAGE 01 • UNBOXING</div>
      <h2 class="scene-title">A Gift Waiting to be Opened</h2>
      <p class="scene-subtitle">Inside lies the beginning of your 19th birthday journey. Tap the chest to unlock the magic.</p>
    </div>

    <div class="box-stage-wrapper">
      <!-- Ambient Studio Glow -->
      <div class="ambient-glow box-glow"></div>

      <!-- Floating 3D studio decorative background objects (Reference 1 Aesthetic) -->
      <div class="floating-deco-object deco-star-top" aria-hidden="true">
        <svg viewBox="0 0 40 40" width="32" height="32">
          <polygon points="20,2 25,14 38,15 28,24 31,37 20,30 9,37 12,24 2,15 15,14" fill="#FF9A4D" opacity="0.85" />
        </svg>
      </div>
      <div class="floating-deco-object deco-bubble-right" aria-hidden="true">
        <svg viewBox="0 0 50 50" width="38" height="38">
          <circle cx="25" cy="25" r="20" fill="#FF6803" opacity="0.25" />
          <circle cx="20" cy="20" r="6" fill="#FFFFFF" opacity="0.6" />
        </svg>
      </div>
      <div class="floating-deco-object deco-ribbon-left" aria-hidden="true">
        <svg viewBox="0 0 60 40" width="46" height="30">
          <path d="M 5 25 Q 30 -5 55 25" stroke="#FF6803" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.7" />
        </svg>
      </div>

      <!-- Interactive Treasure Box -->
      <div class="box-container" id="treasureBoxInteractive" role="button" tabindex="0" aria-label="Open the birthday treasure box">
        
        <!-- Floating Surprises (Revealed on Open) -->
        <div class="box-contents" id="boxContents" aria-hidden="true">
          
          <!-- Surprise 1: Floating Mini Polaroid of Harshitha -->
          <div class="surprise-item item-photo-polaroid">
            <div class="mini-polaroid-frame">
              <img src="/photos/harshitha_10.jpg" alt="Harshitha smiling" class="mini-polaroid-img" />
              <span class="mini-polaroid-caption">Katama ✨</span>
            </div>
          </div>

          <!-- Surprise 2: 3D Wrapped Gift Box -->
          <div class="surprise-item item-gift">
            <svg viewBox="0 0 70 70" width="58" height="58" class="pop-svg">
              <defs>
                <linearGradient id="giftBodyGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FF8A3D" />
                  <stop offset="60%" stop-color="#FF6803" />
                  <stop offset="100%" stop-color="#AE3A02" />
                </linearGradient>
                <linearGradient id="goldRibbon" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FFF3D6" />
                  <stop offset="50%" stop-color="#FFD54F" />
                  <stop offset="100%" stop-color="#FFB300" />
                </linearGradient>
              </defs>
              <rect x="12" y="24" width="46" height="40" rx="8" fill="url(#giftBodyGrad)" />
              <rect x="8" y="16" width="54" height="12" rx="4" fill="#C24505" />
              <rect x="31" y="16" width="8" height="48" fill="url(#goldRibbon)" />
              <rect x="12" y="38" width="46" height="8" fill="url(#goldRibbon)" />
              <path d="M 28 16 C 18 4, 8 12, 28 16 C 48 12, 38 4, 28 16 Z" fill="url(#goldRibbon)" />
            </svg>
          </div>

          <!-- Surprise 3: Mini Letter Envelope -->
          <div class="surprise-item item-letter">
            <svg viewBox="0 0 60 70" width="50" height="58" class="pop-svg">
              <rect x="6" y="10" width="48" height="52" rx="7" fill="#FFFFFF" stroke="#BFBFBF" stroke-width="2" />
              <line x1="14" y1="24" x2="46" y2="24" stroke="#FF6803" stroke-width="3" stroke-linecap="round" />
              <line x1="14" y1="34" x2="40" y2="34" stroke="#AE3A02" stroke-width="2.5" stroke-linecap="round" opacity="0.7" />
              <line x1="14" y1="44" x2="34" y2="44" stroke="#0B0501" stroke-width="2" stroke-linecap="round" opacity="0.4" />
              <circle cx="40" cy="50" r="5" fill="#FF6803" />
            </svg>
          </div>

          <!-- Surprise 4: Flowing Silk Ribbon -->
          <div class="surprise-item item-ribbon">
            <svg viewBox="0 0 80 40" width="66" height="30" class="pop-svg">
              <path d="M 8 26 Q 40 -8 72 26 Q 40 14 8 26 Z" fill="#FFA726" />
            </svg>
          </div>

          <!-- Surprise 5: Floating Mini Balloon -->
          <div class="surprise-item item-balloon">
            <svg viewBox="0 0 45 65" width="38" height="50" class="pop-svg">
              <ellipse cx="22" cy="22" rx="18" ry="22" fill="url(#miniBalloonGrad2)" />
              <polygon points="19,43 25,43 22,48" fill="#AE3A02" />
              <path d="M 22 48 Q 26 56 20 64" stroke="#0B0501" stroke-width="1.4" fill="none" opacity="0.4" />
              <ellipse cx="15" cy="15" rx="5" ry="9" fill="#FFFFFF" opacity="0.55" transform="rotate(-20 15 15)" />
              <defs>
                <linearGradient id="miniBalloonGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FFB074" />
                  <stop offset="100%" stop-color="#FF6803" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <!-- Surprise 6: Golden '19' Medallion -->
          <div class="surprise-item item-coin-19">
            <div class="coin-badge-19">19</div>
          </div>

          <!-- Confetti bursts -->
          <div class="surprise-item item-sparkle-1">✨</div>
          <div class="surprise-item item-sparkle-2">⭐</div>
          <div class="surprise-item item-sparkle-3">🎉</div>
        </div>

        <!-- The 3D Treasure Box Structure -->
        <div class="box-3d-model">
          <!-- Lid Assembly (Rotates open in 3D) -->
          <div class="box-lid" id="boxLid">
            <svg viewBox="0 0 270 120" width="260" height="115" class="box-svg-lid">
              <defs>
                <linearGradient id="lidGradHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFA86B" />
                  <stop offset="25%" stop-color="#FF6803" />
                  <stop offset="80%" stop-color="#C24505" />
                  <stop offset="100%" stop-color="#8F2C00" />
                </linearGradient>
                <linearGradient id="goldRimHigh" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#FFF3D6" />
                  <stop offset="50%" stop-color="#FFD54F" />
                  <stop offset="100%" stop-color="#FFB300" />
                </linearGradient>
                <filter id="lidShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#0B0501" flood-opacity="0.25" />
                </filter>
              </defs>
              <g filter="url(#lidShadow)">
                <path d="M 22 80 Q 135 15 248 80 L 252 100 Q 135 45 18 100 Z" fill="url(#lidGradHigh)" />
                <path d="M 38 78 Q 135 24 232 78" stroke="#FFEAD8" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round" />
                <path d="M 18 96 Q 135 42 252 96 L 252 104 Q 135 50 18 104 Z" fill="url(#goldRimHigh)" />
                <rect x="122" y="78" width="26" height="26" rx="6" fill="#FFE082" stroke="#AE3A02" stroke-width="2" />
                <circle cx="135" cy="91" r="4.5" fill="#0B0501" />
              </g>
            </svg>
          </div>

          <!-- Box Chest Base -->
          <div class="box-base">
            <svg viewBox="0 0 270 150" width="260" height="145" class="box-svg-base">
              <defs>
                <linearGradient id="baseBodyHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FF6803" />
                  <stop offset="30%" stop-color="#E65100" />
                  <stop offset="85%" stop-color="#AE3A02" />
                  <stop offset="100%" stop-color="#6E1E00" />
                </linearGradient>
                <linearGradient id="innerCavityHigh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#260C02" />
                  <stop offset="100%" stop-color="#0F0401" />
                </linearGradient>
                <linearGradient id="goldHasp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#FFE082" />
                  <stop offset="100%" stop-color="#FFB300" />
                </linearGradient>
              </defs>
              <ellipse cx="135" cy="26" rx="114" ry="20" fill="url(#innerCavityHigh)" />
              <path d="M 21 26 L 35 128 Q 135 146 235 128 L 249 26 Q 135 44 21 26 Z" fill="url(#baseBodyHigh)" />
              <path d="M 32 28 L 44 127 L 58 127 L 46 28 Z" fill="#C24505" opacity="0.65" />
              <path d="M 238 28 L 226 127 L 212 127 L 224 28 Z" fill="#C24505" opacity="0.65" />
              <circle cx="43" cy="50" r="2.5" fill="#FFE082" />
              <circle cx="47" cy="85" r="2.5" fill="#FFE082" />
              <circle cx="51" cy="115" r="2.5" fill="#FFE082" />
              <circle cx="227" cy="50" r="2.5" fill="#FFE082" />
              <circle cx="223" cy="85" r="2.5" fill="#FFE082" />
              <circle cx="219" cy="115" r="2.5" fill="#FFE082" />
              <rect x="122" y="34" width="26" height="34" rx="6" fill="url(#goldHasp)" stroke="#AE3A02" stroke-width="1.5" />
              <circle cx="135" cy="46" r="4" fill="#0B0501" />
              <polygon points="133,49 137,49 136,58 134,58" fill="#0B0501" />
              <ellipse cx="135" cy="140" rx="110" ry="10" fill="#0B0501" opacity="0.22" />
            </svg>
          </div>
        </div>

        <!-- Tactile Tap Prompt Indicator -->
        <div class="box-tap-prompt" id="boxTapPrompt">
          <div class="touch-ring"></div>
          <div class="tap-label">
            <span class="tap-icon">🎁</span>
            <span class="tap-text">Tap the Box to Open</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Post-opening Action -->
    <div class="box-post-action" id="boxPostAction" style="display: none;">
      <button class="primary-action-btn pulse-action" id="btnNextToCake">
        <span>Proceed to Birthday Cake 🎂</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `;

  const boxBtn = container.querySelector('#treasureBoxInteractive');
  const lid = container.querySelector('#boxLid');
  const contents = container.querySelector('#boxContents');
  const tapPrompt = container.querySelector('#boxTapPrompt');
  const postAction = container.querySelector('#boxPostAction');
  const btnNext = container.querySelector('#btnNextToCake');

  let isOpen = false;

  const triggerOpen = () => {
    if (isOpen) return;
    isOpen = true;

    boxBtn.classList.add('box-pressed');
    setTimeout(() => boxBtn.classList.remove('box-pressed'), 80);

    soundFx.playChime();

    lid.classList.add('lid-opened');
    contents.classList.add('contents-revealed');
    tapPrompt.style.opacity = '0';
    tapPrompt.style.pointerEvents = 'none';

    confetti({
      particleCount: 36,
      spread: 70,
      origin: { y: 0.58 },
      colors: ['#FF6803', '#AE3A02', '#FF9A4D', '#FFFFFF', '#FFD54F', '#0B0501'],
      ticks: 140,
      gravity: 1.1,
      scalar: 0.95
    });

    setTimeout(() => {
      postAction.style.display = 'block';
      postAction.classList.add('fade-slide-up');
    }, 550);
  };

  boxBtn.addEventListener('click', triggerOpen);
  boxBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerOpen();
    }
  });

  btnNext.addEventListener('click', () => {
    if (onOpen) onOpen();
  });

  // Interactive Mini Polaroid Click -> Open Lightbox
  const miniPolaroid = container.querySelector('.mini-polaroid-frame');
  if (miniPolaroid) {
    miniPolaroid.style.cursor = 'pointer';
    miniPolaroid.setAttribute('title', 'Tap to view photo');
    miniPolaroid.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoLightbox('/photos/harshitha_10.jpg');
    });
  }

  return container;
}
