// Main Application Controller & State Machine
// Coordinates scenes in exact narrative order as specified in user request and DPR
import './styles/main.css';
import { soundFx } from './utils/audioFX.js';
import QRCode from 'qrcode';
import { createTreasureBox } from './components/TreasureBox.js';
import { createCakeHero } from './components/CakeHero.js';
import { createBalloonField } from './components/BalloonField.js';
import { createBirthdayReveal } from './components/BirthdayReveal.js';
import { createThings19 } from './components/Things19.js';
import { createPandaGuide } from './components/PandaGuide.js';
import { createLetterDialog } from './components/LetterDialog.js';

class BirthdayExperienceApp {
  constructor() {
    this.appEl = document.getElementById('app');
    this.currentState = 'INTRO';
    this.audioEnabled = true;
    this.letterModalOpen = false;
    this.phoneUrl = `http://10.236.114.26:5173/`;

    this.initShell();
    this.initTouchFeedback();
    this.startState('BOX_READY');
  }

  initShell() {
    this.appEl.innerHTML = `
      <!-- Ambient Studio Lighting Glows -->
      <div class="studio-background-blobs">
        <div class="blob-1"></div>
        <div class="blob-2"></div>
      </div>

      <!-- Phone App Header Bar -->
      <header class="app-top-nav">
        <div class="brand-monogram">
          <span class="brand-dot"></span>
          <span>19TH CELEBRATION</span>
        </div>
        <div class="top-nav-actions">
          <!-- Open on Phone QR button -->
          <button class="icon-control-btn" id="btnPhoneQr" aria-label="Open on Phone" title="Open on Phone (Same Wi-Fi)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="5" y="2" width="14" height="20" rx="3"/>
              <line x1="12" y1="18" x2="12" y2="18.01"/>
            </svg>
          </button>

          <!-- Audio Toggle Button -->
          <button class="icon-control-btn" id="btnAudioToggle" aria-label="Toggle Sound" title="Toggle Sound">
            <svg id="audioIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Dynamic Scene Stage Container -->
      <main class="scene-container" id="sceneStage" role="main"></main>

      <!-- App Footer / Replay -->
      <footer class="app-footer" id="appFooter">
        <button class="replay-btn" id="btnReplayAll">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
            <path d="M21 3v5h-5"/>
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
            <path d="M3 21v-5h5"/>
          </svg>
          <span>Replay From Beginning</span>
        </button>
        <button class="phone-link-footer-btn" id="btnFooterPhone">
          <span>📱 Open on Mobile Phone: <strong>${this.phoneUrl}</strong></span>
        </button>
        <p class="footer-copy">Crafted with care • A dedicated 19th birthday tribute</p>
      </footer>
    `;

    this.sceneStage = this.appEl.querySelector('#sceneStage');
    this.btnAudioToggle = this.appEl.querySelector('#btnAudioToggle');
    this.audioIcon = this.appEl.querySelector('#audioIcon');
    this.btnReplayAll = this.appEl.querySelector('#btnReplayAll');
    this.btnPhoneQr = this.appEl.querySelector('#btnPhoneQr');
    this.btnFooterPhone = this.appEl.querySelector('#btnFooterPhone');

    // Phone QR modal trigger
    this.btnPhoneQr.addEventListener('click', () => this.showPhoneConnectModal());
    this.btnFooterPhone.addEventListener('click', () => this.showPhoneConnectModal());

    // Audio toggle
    this.btnAudioToggle.addEventListener('click', () => {
      this.audioEnabled = soundFx.toggleSound();
      this.updateAudioIcon();
    });

    // Full Replay from Treasure Box
    this.btnReplayAll.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.startState('BOX_READY');
    });
  }

  showPhoneConnectModal() {
    const modal = document.createElement('div');
    modal.className = 'letter-modal-backdrop';
    modal.innerHTML = `
      <div class="letter-paper-sheet phone-connect-sheet">
        <div class="letter-header-bar">
          <div class="letter-stamp-badge">
            <span>📱</span>
            <span>OPEN ON YOUR PHONE</span>
          </div>
          <button class="letter-close-btn" id="btnClosePhoneModal" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="phone-modal-body">
          <p class="phone-modal-instruction">
            Scan this QR code with your phone camera, or enter the link in Safari / Chrome:
          </p>
          <div class="qr-code-wrapper">
            <canvas id="phoneQrCanvas"></canvas>
          </div>
          <div class="phone-url-display">
            <span class="url-text" id="phoneUrlText">${this.phoneUrl}</span>
            <button class="copy-url-btn" id="btnCopyUrl" title="Copy Link">
              <span id="copyBtnLabel">Copy</span>
            </button>
          </div>
          <p class="phone-modal-hint">
            ✓ Phone and computer must be connected to the same Wi-Fi.
          </p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const canvas = modal.querySelector('#phoneQrCanvas');
    QRCode.toCanvas(canvas, this.phoneUrl, {
      width: 190,
      margin: 2,
      color: {
        dark: '#0B0501',
        light: '#FFFFFF'
      }
    });

    const closeBtn = modal.querySelector('#btnClosePhoneModal');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });

    const copyBtn = modal.querySelector('#btnCopyUrl');
    const copyLabel = modal.querySelector('#copyBtnLabel');
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(this.phoneUrl).then(() => {
        copyLabel.textContent = "Copied! ✓";
        setTimeout(() => copyLabel.textContent = "Copy", 2000);
      });
    });
  }

  updateAudioIcon() {
    if (this.audioEnabled) {
      this.audioIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
      `;
    } else {
      this.audioIcon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="23" y1="9" x2="17" y2="15"/>
        <line x1="17" y1="9" x2="23" y2="15"/>
      `;
    }
  }

  initTouchFeedback() {
    // Subtle tactile touch ripple effect as specified in DPR page 67
    document.addEventListener('pointerdown', (e) => {
      if (e.target.closest('input, textarea')) return;

      const ripple = document.createElement('div');
      ripple.className = 'touch-ripple-effect';
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);

      setTimeout(() => ripple.remove(), 350);
    });
  }

  startState(state) {
    this.currentState = state;
    this.sceneStage.innerHTML = '';

    switch (state) {
      case 'BOX_READY':
        this.renderTreasureBox();
        break;

      case 'CAKE_READY':
        this.renderCakeStage();
        break;

      case 'FULL_JOURNEY':
        this.renderFullStory();
        break;
    }
  }

  // 1. Treasure Box Scene
  renderTreasureBox() {
    const boxComponent = createTreasureBox(() => {
      this.startState('CAKE_READY');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this.sceneStage.appendChild(boxComponent);
  }

  // 2. Birthday Cake with 19 Candle & Blow
  renderCakeStage() {
    const cakeComponent = createCakeHero(() => {
      this.renderBalloonsOverlay();
    });
    this.sceneStage.appendChild(cakeComponent);
  }

  // 3. Slow-Motion Balloons
  renderBalloonsOverlay() {
    const balloonsComponent = createBalloonField(() => {
      balloonsComponent.remove();
      this.startState('FULL_JOURNEY');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this.appEl.appendChild(balloonsComponent);
  }

  // 4, 5, 6, 7: Birthday Reveal -> 19 Things -> Panda -> Letter
  renderFullStory() {
    this.sceneStage.innerHTML = '';

    // Step 4: Grand Birthday Reveal (Happy Birthday Doctor Harshitha)
    const revealComponent = createBirthdayReveal(() => {
      const thingsEl = document.getElementById('thingsSection');
      if (thingsEl) {
        thingsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    this.sceneStage.appendChild(revealComponent);

    // Step 5: 19 Years & 19 Things (Intentionally Blank)
    const thingsComponent = createThings19(() => {});
    this.sceneStage.appendChild(thingsComponent);

    // Step 6: Panda Guide holding the letter ("touch me touch me")
    const pandaComponent = createPandaGuide(() => {
      this.openLetterModal();
    });
    this.sceneStage.appendChild(pandaComponent);
  }

  // Step 7: Tactile Letter Dialog with KitKat Chocolates
  openLetterModal() {
    if (this.letterModalOpen) return;
    this.letterModalOpen = true;

    document.body.style.overflow = 'hidden';

    const letterDialog = createLetterDialog(() => {
      this.letterModalOpen = false;
      document.body.style.overflow = '';
    });

    document.body.appendChild(letterDialog);
  }
}

// Initialize on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  new BirthdayExperienceApp();
});
