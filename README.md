# A Birthday Surprise for Doctor Harshitha (19th Birthday Experience)

An interactive, phone-first web application designed and built for Doctor Harshitha's 19th birthday, featuring a warm 3D product-studio aesthetic inspired by the reference design language (`#FF6803` orange, `#AE3A02` burnt orange, `#BFBFBF` soft gray, `#0B0501` graphite ink, `#FFFFFF` white).

---

## 🎂 The Narrative Story Arc

1. **Stage 01: The 3D Treasure Box**
   - Interactive chest with 3D bevels, rivets, and golden lock.
   - Tap to open: Lid swings open in 3D revealing gifts, ribbons, letters, mini helium balloons, and a golden '19' medallion with a celebratory confetti scatter and audio chime.
   - Smoothly guides to the next scene.

2. **Stage 02: Celebratory Cake with 19-Shaped Candle & Blow Detection**
   - Replaces the reference computer with an original layered 3D birthday cake with frosting drips and pearls.
   - Single sculpted **19-shaped candle** with a lively flickering flame and ambient amber glow.
   - **Microphone blow detection**: Detects breath/RMS spike using local Web Audio API.
   - **Tap-to-blow fallback**: Forgiving 68x68px hit target allowing immediate tap to blow out the candle.
   - Extinguishes with an air puff, smoke wisps, and realistic audio effect.

3. **Stage 03: Floating Slow-Motion Balloons & Touch to Burst**
   - 6 floating balloons in warm palette shades drift across the phone canvas in non-linear slow motion with attached strings.
   - Touch any balloon to trigger a tactile pop physics effect (squeeze, burst, radial particle spread, and synthesizer pop sound).
   - Live counter tracks progression (`0 / 6` to `6 / 6`).

4. **Stage 04: Grand Birthday Reveal**
   - Unveils **"HAPPY BIRTHDAY DOCTOR HARSHITHA"** in bold editorial typography.
   - Features a custom medical stethoscope emblem honoring her journey as a doctor and healer.
   - Golden confetti burst and celebratory fanfare audio chord.

5. **Stage 05: 19 Years & 19 Memories**
   - Curated list of 19 cards with sticky scroll progress tracker (`01/19` to `19/19`).
   - Cards 1 through 19 feature Ranjith's nostalgic, personal Telugu-English memories spanning from crying in year 1, baby class, dance performances, and school teachers to online classes, NEET long term victory, and stepping in as Doctor Harshitha.
   - Enhanced with photo milestone banners and full-screen lightbox zoom.

6. **Stage 06: Panda Guide holding the Letter**
   - Minimalist cute 3D vector Panda holding a wax-sealed letter.
   - Pulsing `"touch me touch me"` invitation badge with animated glowing ripple ring.

7. **Stage 07: Unfolding Letter with KitKat Chocolates**
   - Tactile paper modal unfolding smoothly with paper rustle sound.
   - Decorated with two realistic **KitKat chocolate bar props** (red wrappers, exposed chocolate wafers, and silver foil trim).
   - Character-for-character preservation of Ranjith's personal Telugu-English letter, honoring all original line breaks, emojis, and the signature `_ranjith...`.
   - Keepsake polaroid photo pinned to the parchment.
   - Close and Replay controls allowing the experience to be relived anytime.

---

## 🛠️ Technical Details & Stack

- **Framework**: Vite + Vanilla Modern JavaScript (ES Modules)
- **Styling**: Vanilla CSS using custom design tokens (`tokens.css`)
- **Audio**: Custom Web Audio API synthesizer for tactile pops, chimes, and extinguish sounds (zero external MP3 assets)
- **Blow Detection**: AudioContext frequency analyzer for microphone breath detection + reliable touch fallback
- **Visuals**: Scalable Vector Graphics (SVG) with 3D gradients and drop shadows for retina/high-DPR crispness
- **Particles**: Lightweight `canvas-confetti` integration
- **Phone Canvas**: Optimized for mobile viewports (360x800, 390x844 canonical, 412x915, 430x932) with `env(safe-area-inset-*)` support.

---

## 🚀 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📝 How to Edit the 19 Things & Content

All content is cleanly separated in `src/data/letterData.js`:
- To add content into the 19 blank cards, update the `text` fields inside `THINGS_19` in `src/data/letterData.js`.
- The letter text and recipient details are also accessible in `src/data/letterData.js`.
