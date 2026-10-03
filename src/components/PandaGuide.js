// Panda Guide Component
// Cute 3D vector panda holding a sealed letter with "touch me touch me" pulse prompt
import { soundFx } from '../utils/audioFX.js';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createPandaGuide(onOpenLetter) {
  const container = document.createElement('section');
  container.className = 'panda-scene-section';
  container.id = 'pandaSection';
  container.setAttribute('data-scene', 'panda-guide');
  container.setAttribute('data-testid', 'panda-letter');

  container.innerHTML = `
    <div class="panda-intro-header">
      <div class="pill-badge">SURPRISE 04 • PERSONAL LETTER</div>
      <h2 class="panda-heading">A Special Delivery for Katama</h2>
      <p class="panda-subtext">Look who travelled all the way with an envelope addressed to you.</p>
    </div>

    <!-- Panda Stage with Interactive Letter Prop -->
    <div class="panda-stage-wrapper">
      <div class="ambient-glow panda-glow"></div>

      <!-- Interactive Composition: Panda + Letter Prop -->
      <div class="panda-character-card" id="pandaTouchTrigger" role="button" tabindex="0" aria-label="Touch the panda to open the secret letter">
        
        <!-- Pulsing "touch me touch me" prompt ring -->
        <div class="touch-me-badge" id="touchMePrompt">
          <div class="pulse-ring"></div>
          <div class="badge-pill">
            <span class="sparkle-icon">💌</span>
            <span class="badge-text">touch me touch me</span>
          </div>
        </div>

        <div class="panda-visual-wrapper">
          <svg viewBox="0 0 240 260" width="210" height="230" class="panda-svg">
            <defs>
              <linearGradient id="pandaFurWhite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="70%" stop-color="#F7F5F2" />
                <stop offset="100%" stop-color="#E5E1DB" />
              </linearGradient>
              <linearGradient id="pandaFurBlack" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2D2826" />
                <stop offset="100%" stop-color="#0B0501" />
              </linearGradient>
              <linearGradient id="pandaCheekGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FF9A4D" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#FF9A4D" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="envelopeGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFFDFB" />
                <stop offset="100%" stop-color="#F2ECE4" />
              </linearGradient>
              <filter id="pandaDropShadow" x="-15%" y="-10%" width="130%" height="130%">
                <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#0B0501" flood-opacity="0.12" />
              </filter>
            </defs>

            <!-- Shadow on Floor -->
            <ellipse cx="120" cy="242" rx="75" ry="12" fill="#0B0501" opacity="0.16" />

            <!-- PANDA BODY & EARS -->
            <g filter="url(#pandaDropShadow)">
              <!-- Ears -->
              <circle cx="62" cy="62" r="22" fill="url(#pandaFurBlack)" />
              <circle cx="62" cy="62" r="14" fill="#0B0501" opacity="0.4" />

              <circle cx="178" cy="62" r="22" fill="url(#pandaFurBlack)" />
              <circle cx="178" cy="62" r="14" fill="#0B0501" opacity="0.4" />

              <!-- Lower Body Torso -->
              <ellipse cx="120" cy="190" rx="68" ry="52" fill="url(#pandaFurWhite)" />
              <!-- Black belly band / shoulders -->
              <path d="M 56 160 Q 120 185 184 160 L 175 195 Q 120 215 65 195 Z" fill="url(#pandaFurBlack)" opacity="0.15" />

              <!-- Feet / Paws Bottom -->
              <ellipse cx="78" cy="230" rx="20" ry="14" fill="url(#pandaFurBlack)" />
              <circle cx="78" cy="226" r="6" fill="#4A4441" />
              <ellipse cx="162" cy="230" rx="20" ry="14" fill="url(#pandaFurBlack)" />
              <circle cx="162" cy="226" r="6" fill="#4A4441" />

              <!-- Head Base -->
              <ellipse cx="120" cy="112" rx="66" ry="56" fill="url(#pandaFurWhite)" />

              <!-- Cute Rosy Cheeks -->
              <circle cx="72" cy="128" r="14" fill="url(#pandaCheekGrad)" />
              <circle cx="168" cy="128" r="14" fill="url(#pandaCheekGrad)" />

              <!-- Eye Patches (Signature Tilted Panda Ovals) -->
              <ellipse cx="82" cy="106" rx="17" ry="21" fill="url(#pandaFurBlack)" transform="rotate(-18 82 106)" />
              <ellipse cx="158" cy="106" rx="17" ry="21" fill="url(#pandaFurBlack)" transform="rotate(18 158 106)" />

              <!-- Eyes & Shiny Highlights -->
              <circle cx="85" cy="105" r="7" fill="#0B0501" />
              <circle cx="83" cy="102" r="2.8" fill="#FFFFFF" />
              <circle cx="87" cy="107" r="1.4" fill="#FFFFFF" />

              <circle cx="155" cy="105" r="7" fill="#0B0501" />
              <circle cx="153" cy="102" r="2.8" fill="#FFFFFF" />
              <circle cx="157" cy="107" r="1.4" fill="#FFFFFF" />

              <!-- Cute Nose -->
              <ellipse cx="120" cy="122" rx="9" ry="6" fill="#0B0501" />
              <ellipse cx="119" cy="121" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.6" />

              <!-- Smiling Mouth -->
              <path d="M 120 128 L 120 133 Q 112 142 105 135 M 120 133 Q 128 142 135 135" fill="none" stroke="#0B0501" stroke-width="2.5" stroke-linecap="round" />

              <!-- Left Arm holding Letter -->
              <ellipse cx="64" cy="175" rx="16" ry="26" fill="url(#pandaFurBlack)" transform="rotate(22 64 175)" />
              <!-- Right Arm supporting Letter -->
              <ellipse cx="176" cy="175" rx="16" ry="26" fill="url(#pandaFurBlack)" transform="rotate(-22 176 175)" />
            </g>

            <!-- HELD LETTER PROP (tilted -4deg, 78x92px) -->
            <g id="letterPropSvg" transform="translate(108, 142) rotate(-4)">
              <!-- Envelope Body -->
              <rect x="-38" y="-45" width="76" height="90" rx="8" fill="url(#envelopeGrad)" stroke="#BFBFBF" stroke-width="2" />
              <!-- Flap lines -->
              <path d="M -38 -45 L 0 -12 L 38 -45" fill="none" stroke="#AE3A02" stroke-width="1.8" opacity="0.4" />
              <!-- Diagonal fold creases -->
              <line x1="-38" y1="45" x2="-10" y2="10" stroke="#BFBFBF" stroke-width="1" />
              <line x1="38" y1="45" x2="10" y2="10" stroke="#BFBFBF" stroke-width="1" />
              <!-- Orange Wax Seal -->
              <circle cx="0" cy="-6" r="13" fill="#FF6803" stroke="#AE3A02" stroke-width="2" />
              <!-- Wax Seal Inner Monogram / Heart -->
              <path d="M -5 -8 C -5 -11, 0 -11, 0 -7 C 0 -11, 5 -11, 5 -8 C 5 -4, 0 0, 0 1 C 0 0, -5 -4, -5 -8 Z" fill="#FFFFFF" />
              <!-- Tiny Stamp lines -->
              <line x1="-24" y1="20" x2="14" y2="20" stroke="#FF6803" stroke-width="2.2" stroke-linecap="round" />
              <line x1="-24" y1="27" x2="4" y2="27" stroke="#AE3A02" stroke-width="1.8" stroke-linecap="round" opacity="0.6" />
            </g>
          </svg>
        </div>

        <!-- Attached mini polaroid on Panda envelope -->
        <div class="panda-attached-polaroid" aria-hidden="true">
          <div class="panda-polaroid-frame">
            <img src="/photos/harshitha_5.jpg" alt="Harshitha" class="panda-polaroid-img" />
            <div class="polaroid-pin">📌</div>
            <span class="panda-polaroid-tag">For You 🤍</span>
          </div>
        </div>

        <div class="panda-tap-instruction">
          <span>Tap to unfold Ranjith's letter</span>
        </div>
      </div>
    </div>
  `;

  const touchTrigger = container.querySelector('#pandaTouchTrigger');
  const letterPropSvg = container.querySelector('#letterPropSvg');
  const promptBadge = container.querySelector('#touchMePrompt');

  let isTriggered = false;

  const handleOpen = () => {
    if (isTriggered) return;
    isTriggered = true;

    // Feedback
    touchTrigger.classList.add('panda-activated');
    promptBadge.style.opacity = '0';
    promptBadge.style.pointerEvents = 'none';

    // Play tactile unfold sound
    soundFx.playPaperUnfold();

    // Trigger opening callback after 220ms
    setTimeout(() => {
      if (onOpenLetter) onOpenLetter();
      isTriggered = false; // allow reopen if closed
    }, 220);
  };

  touchTrigger.addEventListener('click', handleOpen);
  touchTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  });

  // Interactive Panda Polaroid Click -> Open Lightbox
  const pandaPolaroid = container.querySelector('.panda-polaroid-frame');
  if (pandaPolaroid) {
    pandaPolaroid.style.cursor = 'pointer';
    pandaPolaroid.setAttribute('title', 'Tap to view photo');
    pandaPolaroid.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoLightbox('/photos/harshitha_5.jpg');
    });
  }

  return container;
}
