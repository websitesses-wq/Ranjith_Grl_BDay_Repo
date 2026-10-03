// Birthday Cake Hero Component with 19-shaped Candle & Blow Detection
// Replaces the reference computer with a 3D-styled cake in the same warm orange aesthetic
import { soundFx } from '../utils/audioFX.js';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createCakeHero(onBlowComplete) {
  const container = document.createElement('div');
  container.className = 'cake-scene-stage';
  container.setAttribute('data-scene', 'cake-hero');

  container.innerHTML = `
    <div class="scene-header">
      <div class="pill-badge">STAGE 02 • THE CAKE</div>
      <h2 class="scene-title">Make a 19th Birthday Wish</h2>
      <p class="scene-subtitle">Blow into your microphone or tap the flame to blow out 19!</p>
    </div>

    <div class="cake-stage-wrapper">
      <div class="ambient-glow cake-glow"></div>

      <!-- Studio Floating Decorative Objects (Reference 1 Aesthetic) -->
      <div class="floating-deco-object deco-cake-star" aria-hidden="true">
        <svg viewBox="0 0 30 30" width="26" height="26">
          <polygon points="15,2 18,10 27,11 20,17 22,26 15,21 8,26 10,17 3,11 12,10" fill="#FF9A4D" />
        </svg>
      </div>
      <div class="floating-deco-object deco-cake-pill" aria-hidden="true">
        <div class="studio-pill-prop">🩺 Dr. Har</div>
      </div>
      <div class="floating-deco-object deco-cake-avatar" aria-hidden="true">
        <div class="floating-cake-avatar-frame">
          <img src="/photos/harshitha_1.jpg" alt="Harshitha" class="floating-cake-avatar-img" />
          <span class="floating-cake-avatar-star">✨</span>
        </div>
      </div>
      <div class="floating-deco-object deco-cake-ring" aria-hidden="true">
        <div class="studio-ring-prop"></div>
      </div>

      <!-- Hero Cake 3D Model -->
      <div class="cake-composition" id="cakeComposition">
        
        <!-- The 19 Candle Assembly with Interactive Flame -->
        <div class="candle-assembly" id="candleAssembly">
          
          <!-- Interactive Flame (68x68px tap target) -->
          <div class="flame-hitbox" id="flameHitbox" role="button" tabindex="0" aria-label="Tap flame to blow out 19 candle">
            <!-- Flame SVG with Realistic Glow & Flicker -->
            <div class="flame-graphic" id="flameGraphic">
              <svg viewBox="0 0 40 50" width="36" height="46" class="flame-svg">
                <defs>
                  <radialGradient id="flameCoreGrad2" cx="50%" cy="75%" r="65%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="35%" stop-color="#FFE082" />
                    <stop offset="70%" stop-color="#FF9A4D" />
                    <stop offset="100%" stop-color="#FF6803" stop-opacity="0.1" />
                  </radialGradient>
                  <filter id="flameGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
                <!-- Outer halo glow -->
                <path d="M 20 2 Q 34 22 28 38 Q 20 48 12 38 Q 6 22 20 2 Z" fill="#FF6803" opacity="0.38" filter="url(#flameGlowFilter)" />
                <!-- Main Flame Body -->
                <path d="M 20 5 Q 31 24 26 38 Q 20 45 14 38 Q 9 24 20 5 Z" fill="url(#flameCoreGrad2)" />
                <!-- Inner Core -->
                <ellipse cx="20" cy="38" rx="4.5" ry="5.5" fill="#FFFFFF" />
              </svg>
            </div>

            <!-- Smoke Arcs (appears on extinguish) -->
            <div class="smoke-particles" id="smokeParticles" style="display: none;">
              <svg viewBox="0 0 50 60" width="46" height="56" class="smoke-svg">
                <path d="M 22 50 Q 15 35 25 22 Q 35 12 28 2" stroke="#BFBFBF" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-dasharray="40" class="smoke-wisp-1" />
                <path d="M 24 50 Q 32 38 22 26 Q 16 16 20 6" stroke="#AE3A02" stroke-width="2" fill="none" opacity="0.5" stroke-linecap="round" stroke-dasharray="35" class="smoke-wisp-2" />
              </svg>
            </div>
          </div>

          <!-- Candle Wicks & Wax 19 Vector Structure -->
          <div class="candle-wax-19">
            <svg viewBox="0 0 110 110" width="94" height="94" class="candle-19-svg">
              <defs>
                <linearGradient id="waxGrad2" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#FFF2E8" />
                  <stop offset="25%" stop-color="#FF9A4D" />
                  <stop offset="70%" stop-color="#FF6803" />
                  <stop offset="100%" stop-color="#AE3A02" />
                </linearGradient>
                <filter id="waxShadow2" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="1" dy="3" stdDeviation="2.5" flood-color="#0B0501" flood-opacity="0.22" />
                </filter>
              </defs>

              <!-- Wick -->
              <line x1="52" y1="12" x2="52" y2="24" stroke="#0B0501" stroke-width="3" stroke-linecap="round" />

              <!-- Number '1' (wax rounded bevel) -->
              <g filter="url(#waxShadow2)">
                <path d="M 24 40 L 34 32 L 34 88 L 22 88 L 22 84 L 42 84 L 42 88 L 30 88" stroke="url(#waxGrad2)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                <!-- 3D Bevel highlight -->
                <path d="M 24 40 L 34 32 L 34 88" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" opacity="0.65" />
              </g>

              <!-- Number '9' (wax rounded loop & tail) -->
              <g filter="url(#waxShadow2)">
                <ellipse cx="76" cy="46" rx="16" ry="14" fill="none" stroke="url(#waxGrad2)" stroke-width="12" />
                <path d="M 92 46 L 92 72 Q 92 90 70 88 Q 60 87 58 80" fill="none" stroke="url(#waxGrad2)" stroke-width="12" stroke-linecap="round" />
                <ellipse cx="76" cy="45" rx="15" ry="13" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.65" />
              </g>
            </svg>
          </div>
        </div>

        <!-- The 3D Layered Birthday Cake Body -->
        <div class="cake-body-svg-wrapper">
          <svg viewBox="0 0 340 280" width="292" height="242" class="cake-svg">
            <defs>
              <linearGradient id="cakeTierTopGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFFBF7" />
                <stop offset="50%" stop-color="#FFEAD8" />
                <stop offset="100%" stop-color="#FFD6BA" />
              </linearGradient>
              <linearGradient id="cakeBaseSideGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#9C3300" />
                <stop offset="25%" stop-color="#FF6803" />
                <stop offset="75%" stop-color="#FF8329" />
                <stop offset="100%" stop-color="#7A2200" />
              </linearGradient>
              <linearGradient id="cakeTierUpperSideGrad2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#B23E03" />
                <stop offset="35%" stop-color="#FF7519" />
                <stop offset="85%" stop-color="#FF9347" />
                <stop offset="100%" stop-color="#8F2C00" />
              </linearGradient>
              <linearGradient id="frostingDripGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="100%" stop-color="#FCEEE3" />
              </linearGradient>
              <linearGradient id="plateGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#F5F2EF" />
                <stop offset="50%" stop-color="#E0DBD3" />
                <stop offset="100%" stop-color="#C2BAB0" />
              </linearGradient>
            </defs>

            <!-- Cake Ceramic Stand / Platter with Studio Depth -->
            <ellipse cx="170" cy="248" rx="146" ry="24" fill="url(#plateGrad2)" />
            <ellipse cx="170" cy="243" rx="138" ry="19" fill="#FFFFFF" opacity="0.95" />

            <!-- BOTTOM TIER BODY -->
            <path d="M 45 160 L 45 220 Q 170 252 295 220 L 295 160 Q 170 190 45 160 Z" fill="url(#cakeBaseSideGrad2)" />
            <!-- Bottom Tier Frosting Top Plane -->
            <ellipse cx="170" cy="160" rx="125" ry="26" fill="url(#cakeTierTopGrad2)" />

            <!-- Frosting Drips Bottom Tier -->
            <path d="M 45 160 
                     Q 60 178 75 164 
                     Q 95 186 115 166 
                     Q 145 192 170 166 
                     Q 200 190 225 165 
                     Q 255 184 275 164 
                     L 295 160 
                     Q 170 190 45 160 Z" fill="url(#frostingDripGrad2)" />

            <!-- TOP TIER BODY -->
            <path d="M 80 102 L 80 148 Q 170 174 260 148 L 260 102 Q 170 126 80 102 Z" fill="url(#cakeTierUpperSideGrad2)" />
            <!-- Top Tier Frosting Plane -->
            <ellipse cx="170" cy="102" rx="90" ry="19" fill="url(#cakeTierTopGrad2)" />

            <!-- Top Tier Frosting Drips -->
            <path d="M 80 102 
                     Q 98 118 116 106 
                     Q 140 125 170 106 
                     Q 200 124 224 106 
                     Q 245 118 260 102 
                     Q 170 126 80 102 Z" fill="url(#frostingDripGrad2)" />

            <!-- Decorative Pearls & Sprinkles on Frosting -->
            <circle cx="100" cy="98" r="5" fill="#FF6803" />
            <circle cx="125" cy="106" r="4.5" fill="#AE3A02" />
            <circle cx="150" cy="100" r="4" fill="#FF9A4D" />
            <circle cx="190" cy="100" r="4.5" fill="#FF6803" />
            <circle cx="215" cy="106" r="4.5" fill="#AE3A02" />
            <circle cx="240" cy="98" r="5" fill="#FF9A4D" />
            
            <!-- Confetti Stars on Plate -->
            <polygon points="65,232 68,238 74,238 69,242 71,248 65,244 59,248 61,242 56,238 62,238" fill="#FF6803" opacity="0.85" />
            <polygon points="275,232 278,238 284,238 279,242 281,248 275,244 269,248 271,242 266,238 272,238" fill="#FF9A4D" opacity="0.85" />
          </svg>
        </div>

        <!-- Air-puff Ring Indicator -->
        <div class="cake-cue-badge" id="cakeCueBadge">
          <div class="pulsing-mic-dot"></div>
          <span class="cake-cue-text">Tap flame or blow into mic</span>
        </div>
      </div>

      <!-- Blow Control & Mic Permission Button -->
      <div class="blow-controls-panel">
        <button class="mic-toggle-btn" id="btnToggleMic" aria-label="Use microphone to blow candle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
            <line x1="12" y1="19" x2="12" y2="23"/>
            <line x1="8" y1="23" x2="16" y2="23"/>
          </svg>
          <span id="micBtnText">Use Microphone to Blow</span>
        </button>
        <div class="blow-fallback-hint">or tap directly on the candle flame</div>
      </div>
    </div>
  `;

  const flameHitbox = container.querySelector('#flameHitbox');
  const flameGraphic = container.querySelector('#flameGraphic');
  const smokeParticles = container.querySelector('#smokeParticles');
  const btnToggleMic = container.querySelector('#btnToggleMic');
  const micBtnText = container.querySelector('#micBtnText');
  const cueBadge = container.querySelector('#cakeCueBadge');

  let isBlown = false;

  const extinguishCandle = () => {
    if (isBlown) return;
    isBlown = true;

    // Stop mic listening if active
    soundFx.stopBlowDetection();

    // Play extinguish & breath sound
    soundFx.playBlowExtinguish();

    // Extinguish animation
    flameGraphic.classList.add('flame-extinguished');
    smokeParticles.style.display = 'block';
    smokeParticles.classList.add('smoke-rise');

    cueBadge.innerHTML = `<span class="cake-cue-text" style="color: var(--orange);">Wish Granted! 🎂</span>`;
    btnToggleMic.disabled = true;
    btnToggleMic.style.opacity = '0.5';

    // 150ms visual pause after flame goes out before next state, per DPR
    setTimeout(() => {
      if (onBlowComplete) onBlowComplete();
    }, 450);
  };

  // Tap-to-blow fallback
  flameHitbox.addEventListener('click', extinguishCandle);
  flameHitbox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      extinguishCandle();
    }
  });

  // Microphone path
  btnToggleMic.addEventListener('click', () => {
    if (isBlown) return;

    if (!soundFx.isListening) {
      micBtnText.textContent = "Listening... Blow gently now!";
      btnToggleMic.classList.add('mic-active');

      soundFx.startBlowDetection(
        () => {
          extinguishCandle();
        },
        (err) => {
          micBtnText.textContent = "Mic unavailable • Tap the flame!";
          btnToggleMic.classList.remove('mic-active');
        }
      );
    } else {
      soundFx.stopBlowDetection();
      micBtnText.textContent = "Use Microphone to Blow";
      btnToggleMic.classList.remove('mic-active');
    }
  });

  // Interactive Cake Avatar Photo Click -> Open Lightbox
  const cakeAvatar = container.querySelector('.floating-cake-avatar-frame');
  if (cakeAvatar) {
    cakeAvatar.style.cursor = 'pointer';
    cakeAvatar.setAttribute('title', 'Tap to view photo');
    cakeAvatar.addEventListener('click', () => {
      openPhotoLightbox('/photos/harshitha_1.jpg');
    });
  }

  return container;
}
