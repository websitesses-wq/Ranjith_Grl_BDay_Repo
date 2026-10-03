// Web Audio API Synthesizer and Microphone Blow Detector
// Pure client-side, zero external audio asset dependencies, guaranteed reliable on mobile

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.micStream = null;
    this.analyser = null;
    this.audioInput = null;
    this.isListening = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound(enabled) {
    this.soundEnabled = enabled !== undefined ? enabled : !this.soundEnabled;
    return this.soundEnabled;
  }

  // Play delicate chime when treasure box unlocks
  playChime() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.08);
      osc.stop(this.ctx.currentTime + idx * 0.08 + 0.65);
    });
  }

  // Play candle flame flicker / gentle crackle
  playFlameIgnite() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Play candle blow & extinguish puff sound
  playBlowExtinguish() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Breath / white noise puff
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.35);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Play balloon pop sound
  playBalloonPop(pitchOffset = 0) {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Fast percussive thud + short burst noise
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    const startFreq = 280 + pitchOffset * 30;
    osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);

    // High snap
    const snapOsc = this.ctx.createOscillator();
    const snapGain = this.ctx.createGain();
    snapOsc.type = 'sine';
    snapOsc.frequency.setValueAtTime(900 + pitchOffset * 50, this.ctx.currentTime);
    snapOsc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.04);

    snapGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    snapGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

    snapOsc.connect(snapGain);
    snapGain.connect(this.ctx.destination);

    snapOsc.start();
    snapOsc.stop(this.ctx.currentTime + 0.05);
  }

  // Play joyful celebratory fan-fare chord on birthday reveal
  playCelebrationChord() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.5]; // C major flourish
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.07);
      gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + idx * 0.07);
      osc.stop(this.ctx.currentTime + idx * 0.07 + 1.25);
    });
  }

  // Play paper unfold rustle
  playPaperUnfold() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
  }

  // Play camera shutter click for photo viewing
  playCameraClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    // Fast mechanical shutter snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // Microphone Blow Detection Model
  // As per DPR page 35: establish noise floor, detect RMS spike, debounce, release immediately.
  async startBlowDetection(onBlowDetected, onError) {
    if (this.isListening) return;
    try {
      this.initContext();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (onError) onError('Microphone API not supported on this browser');
        return;
      }

      this.micStream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
      });

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 1024;
      this.analyser.smoothingTimeConstant = 0.2;

      this.audioInput = this.ctx.createMediaStreamSource(this.micStream);
      this.audioInput.connect(this.analyser);
      this.isListening = true;

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowStreak = 0;
      const requiredBlowStreak = 4; // ~60ms sustained breath energy

      const checkBlow = () => {
        if (!this.isListening) return;

        this.analyser.getByteFrequencyData(dataArray);

        // Blow sound (wind / turbulence) produces significant low-to-mid energy
        // Check energy between bins 5 and 45 (~100Hz - 1000Hz)
        let lowEnergy = 0;
        let count = 0;
        for (let i = 4; i < 40; i++) {
          lowEnergy += dataArray[i];
          count++;
        }
        const avgEnergy = lowEnergy / count;

        // If average energy is above threshold (blowing into microphone)
        if (avgEnergy > 72) {
          blowStreak++;
          if (blowStreak >= requiredBlowStreak) {
            this.stopBlowDetection();
            if (onBlowDetected) onBlowDetected();
            return;
          }
        } else {
          blowStreak = Math.max(0, blowStreak - 1);
        }

        requestAnimationFrame(checkBlow);
      };

      requestAnimationFrame(checkBlow);
    } catch (err) {
      this.stopBlowDetection();
      if (onError) onError(err);
    }
  }

  stopBlowDetection() {
    this.isListening = false;
    if (this.micStream) {
      this.micStream.getTracks().forEach(track => track.stop());
      this.micStream = null;
    }
    if (this.audioInput) {
      try { this.audioInput.disconnect(); } catch (_) {}
      this.audioInput = null;
    }
    this.analyser = null;
  }
}

export const soundFx = new SoundSystem();
