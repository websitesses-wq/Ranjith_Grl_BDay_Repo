// Balloon Field Component
// Floating slow-motion balloons, forgiving touch targets, squeeze & pop physics, counter progression
import { soundFx } from '../utils/audioFX.js';

export function createBalloonField(onAllBalloonsPopped) {
  const container = document.createElement('div');
  container.className = 'balloon-field-overlay';
  container.setAttribute('data-scene', 'balloon-field');

  const balloonConfigs = [
    { id: 1, color: '#FF6803', x: 12, y: 16, delay: 0, duration: 8.5, size: 54 },
    { id: 2, color: '#AE3A02', x: 72, y: 20, delay: 1.2, duration: 9.2, size: 50 },
    { id: 3, color: '#FFFFFF', x: 20, y: 46, delay: 2.1, duration: 10.0, size: 56, stroke: '#BFBFBF' },
    { id: 4, color: '#FF9A4D', x: 74, y: 52, delay: 0.8, duration: 8.0, size: 52 },
    { id: 5, color: '#F59E0B', x: 44, y: 12, delay: 1.8, duration: 9.6, size: 48 },
    { id: 6, color: '#E65100', x: 46, y: 64, delay: 2.6, duration: 8.8, size: 54 }
  ];

  let poppedCount = 0;
  const totalBalloons = balloonConfigs.length;

  container.innerHTML = `
    <!-- Top Progress Pill -->
    <div class="balloon-progress-header">
      <div class="balloon-count-badge" id="balloonCounter">
        <span class="badge-dot"></span>
        <span id="balloonCounterText">Touch each balloon: 0 / ${totalBalloons} popped</span>
      </div>
    </div>

    <!-- Floating Balloons Canvas Layer -->
    <div class="balloons-stage" id="balloonsStage"></div>
  `;

  const stage = container.querySelector('#balloonsStage');
  const counterText = container.querySelector('#balloonCounterText');

  balloonConfigs.forEach((cfg, index) => {
    const balloonEl = document.createElement('div');
    balloonEl.className = `floating-balloon balloon-phase-${index + 1}`;
    balloonEl.id = `balloon-${cfg.id}`;
    balloonEl.setAttribute('data-testid', `balloon-${cfg.id}`);
    balloonEl.setAttribute('role', 'button');
    balloonEl.setAttribute('tabindex', '0');
    balloonEl.setAttribute('aria-label', `Balloon ${cfg.id}, tap to pop`);

    // Position percentages inside bounded stage
    balloonEl.style.left = `${cfg.x}%`;
    balloonEl.style.top = `${cfg.y}%`;
    balloonEl.style.animationDelay = `${cfg.delay}s`;
    balloonEl.style.animationDuration = `${cfg.duration}s`;

    balloonEl.innerHTML = `
      <div class="balloon-visual" style="width: ${cfg.size}px; height: ${cfg.size * 1.25}px;">
        <svg viewBox="0 0 60 85" width="100%" height="100%" class="balloon-svg">
          <defs>
            <radialGradient id="balloonShine-${cfg.id}" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.9" />
              <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.3" />
              <stop offset="65%" stop-color="${cfg.color}" />
              <stop offset="100%" stop-color="#AE3A02" />
            </radialGradient>
            <filter id="balloonShadow-${cfg.id}" x="-20%" y="-10%" width="140%" height="140%">
              <feDropShadow dx="2" dy="5" stdDeviation="3" flood-color="#0B0501" flood-opacity="0.14" />
            </filter>
          </defs>
          <!-- Balloon Body -->
          <ellipse cx="30" cy="32" rx="26" ry="31" fill="url(#balloonShine-${cfg.id})" ${cfg.stroke ? `stroke="${cfg.stroke}" stroke-width="1.5"` : ''} filter="url(#balloonShadow-${cfg.id})" />
          <!-- Specular highlight -->
          <ellipse cx="20" cy="20" rx="6" ry="11" fill="#FFFFFF" opacity="0.65" transform="rotate(-25 20 20)" />
          <!-- Balloon Knot -->
          <polygon points="27,62 33,62 30,67" fill="${cfg.color}" stroke="#AE3A02" stroke-width="0.8" />
          <!-- Swaying String -->
          <path d="M 30 67 Q 26 74 34 81 Q 28 88 32 94" stroke="#0B0501" stroke-width="1.2" fill="none" opacity="0.35" class="balloon-string" />
        </svg>
      </div>

      <!-- Pop Burst Particles Container -->
      <div class="pop-burst-particles" id="burst-${cfg.id}"></div>
    `;

    let isPopped = false;

    const popBalloon = (e) => {
      if (isPopped) return;
      isPopped = true;
      e.stopPropagation();

      poppedCount++;
      soundFx.playBalloonPop(index);

      // Squeeze then radial burst
      balloonEl.classList.add('balloon-bursting');

      // Create burst particles
      const burstContainer = balloonEl.querySelector(`#burst-${cfg.id}`);
      for (let p = 0; p < 12; p++) {
        const particle = document.createElement('span');
        particle.className = 'burst-particle';
        const angle = (p / 12) * 2 * Math.PI;
        const dist = 32 + Math.random() * 24;
        particle.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
        particle.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
        particle.style.backgroundColor = p % 2 === 0 ? cfg.color : '#FF9A4D';
        burstContainer.appendChild(particle);
      }

      // Update counter
      counterText.textContent = `Touch each balloon: ${poppedCount} / ${totalBalloons} popped`;

      // Remove after burst finishes
      setTimeout(() => {
        balloonEl.style.visibility = 'hidden';
        balloonEl.style.pointerEvents = 'none';
      }, 340);

      // Check if all balloons popped
      if (poppedCount === totalBalloons) {
        counterText.innerHTML = `<strong>All balloons popped! 🎉</strong>`;
        setTimeout(() => {
          if (onAllBalloonsPopped) onAllBalloonsPopped();
        }, 380);
      }
    };

    balloonEl.addEventListener('click', popBalloon);
    balloonEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        popBalloon(e);
      }
    });

    stage.appendChild(balloonEl);
  });

  return container;
}
