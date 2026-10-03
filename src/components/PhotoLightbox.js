// Reusable Mobile-First Photo Lightbox & Gallery Modal
// Provides full-screen high-resolution inspection, touch swiping, thumbnail navigation, and sound feedback

import { soundFx } from '../utils/audioFX.js';

export const PHOTO_GALLERY = [
  {
    id: 1,
    src: '/photos/harshitha_1.jpg',
    title: 'Radiant Smile 🌺',
    tag: 'Grace',
    desc: 'Standing tall in red saree with boundless joy and positive energy.'
  },
  {
    id: 2,
    src: '/photos/harshitha_2.jpg',
    title: 'Traditional Aura 🏺',
    tag: 'Tradition',
    desc: 'Festive blessings with decorated kalasam in serene celebration.'
  },
  {
    id: 3,
    src: '/photos/harshitha_3.jpg',
    title: 'Campus Days 🏫',
    tag: 'College',
    desc: 'Stepping forward with ambition and quiet confidence on campus.'
  },
  {
    id: 4,
    src: '/photos/harshitha_4.jpg',
    title: 'Saree Elegance 🌸',
    tag: 'Elegance',
    desc: 'A calm afternoon smile in soft blush pink saree.'
  },
  {
    id: 5,
    src: '/photos/harshitha_5.jpg',
    title: 'Candid Mirror 📸',
    tag: 'Vibe',
    desc: 'Playful candid mirror selfie capturing your effortless style.'
  },
  {
    id: 6,
    src: '/photos/harshitha_6.jpg',
    title: 'Floral Memories 🌷',
    tag: 'Candid',
    desc: 'Warm nostalgic moments framed by gentle blossoms.'
  },
  {
    id: 7,
    src: '/photos/harshitha_7.jpg',
    title: 'Festive Joy 🪔',
    tag: 'Star',
    desc: 'The birthday star glowing amidst bright festive rangoli patterns.'
  },
  {
    id: 8,
    src: '/photos/harshitha_8.jpg',
    title: 'Timeless Look 💫',
    tag: 'Precious',
    desc: 'A timeless festive portrait commemorating 19 magnificent years.'
  },
  {
    id: 9,
    src: '/photos/harshitha_9.jpg',
    title: 'Temple Sunshine ☀️',
    tag: 'Peace',
    desc: 'Peaceful afternoon under open skies in charming floral shades.'
  },
  {
    id: 10,
    src: '/photos/harshitha_10.jpg',
    title: 'Pure Moments ✨',
    tag: 'Katama',
    desc: 'The genuine, heartwarming smile of a truly irreplaceable friend.'
  }
];

let activeLightboxModal = null;

export function openPhotoLightbox(target) {
  if (activeLightboxModal) {
    activeLightboxModal.remove();
    activeLightboxModal = null;
  }

  // Determine initial index
  let currentIndex = 0;
  if (typeof target === 'number') {
    if (target >= 1 && target <= PHOTO_GALLERY.length) {
      currentIndex = target - 1;
    } else if (target >= 0 && target < PHOTO_GALLERY.length) {
      currentIndex = target;
    }
  } else if (typeof target === 'string') {
    const foundIdx = PHOTO_GALLERY.findIndex(p => p.src.includes(target) || target.includes(p.src));
    if (foundIdx !== -1) currentIndex = foundIdx;
  }

  soundFx.playCameraClick();

  // Prevent background scroll
  const prevOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const modal = document.createElement('div');
  modal.className = 'photo-lightbox-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Photo Zoom Viewer');

  modal.innerHTML = `
    <div class="photo-lightbox-shell">
      <!-- Top Control Bar -->
      <div class="lightbox-top-bar">
        <div class="lightbox-counter-badge" id="lightboxCounter">
          MOMENT ${String(currentIndex + 1).padStart(2, '0')} / 10
        </div>
        <button class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Close Photo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Main Stage -->
      <div class="lightbox-stage" id="lightboxStage">
        <!-- Prev Button -->
        <button class="lightbox-nav-btn nav-prev" id="lightboxPrevBtn" aria-label="Previous Photo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Polaroid Presentation Card -->
        <div class="lightbox-polaroid-frame" id="lightboxCard">
          <div class="lightbox-image-box">
            <img src="${PHOTO_GALLERY[currentIndex].src}" alt="${PHOTO_GALLERY[currentIndex].title}" id="lightboxImg" class="lightbox-main-img" />
            <span class="lightbox-tag" id="lightboxTag">${PHOTO_GALLERY[currentIndex].tag}</span>
          </div>
          <div class="lightbox-caption-area">
            <h3 class="lightbox-title" id="lightboxTitle">${PHOTO_GALLERY[currentIndex].title}</h3>
            <p class="lightbox-desc" id="lightboxDesc">${PHOTO_GALLERY[currentIndex].desc}</p>
          </div>
        </div>

        <!-- Next Button -->
        <button class="lightbox-nav-btn nav-next" id="lightboxNextBtn" aria-label="Next Photo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <!-- Bottom Thumbnail Track -->
      <div class="lightbox-thumbnails-rail" id="lightboxThumbs">
        ${PHOTO_GALLERY.map((p, idx) => `
          <button class="lightbox-thumb-btn ${idx === currentIndex ? 'active-thumb' : ''}" data-idx="${idx}" aria-label="View photo ${idx + 1}">
            <img src="${p.src}" alt="${p.title}" class="thumb-mini-img" />
          </button>
        `).join('')}
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  activeLightboxModal = modal;

  const counterEl = modal.querySelector('#lightboxCounter');
  const imgEl = modal.querySelector('#lightboxImg');
  const tagEl = modal.querySelector('#lightboxTag');
  const titleEl = modal.querySelector('#lightboxTitle');
  const descEl = modal.querySelector('#lightboxDesc');
  const cardEl = modal.querySelector('#lightboxCard');
  const closeBtn = modal.querySelector('#lightboxCloseBtn');
  const prevBtn = modal.querySelector('#lightboxPrevBtn');
  const nextBtn = modal.querySelector('#lightboxNextBtn');
  const thumbBtns = modal.querySelectorAll('.lightbox-thumb-btn');

  function updateView(newIdx) {
    if (newIdx < 0) newIdx = PHOTO_GALLERY.length - 1;
    if (newIdx >= PHOTO_GALLERY.length) newIdx = 0;
    currentIndex = newIdx;

    soundFx.playCameraClick();

    // Subtle re-entry animation
    cardEl.classList.remove('slide-enter');
    void cardEl.offsetWidth; // trigger reflow
    cardEl.classList.add('slide-enter');

    const item = PHOTO_GALLERY[currentIndex];
    counterEl.textContent = `MOMENT ${String(currentIndex + 1).padStart(2, '0')} / 10`;
    imgEl.src = item.src;
    imgEl.alt = item.title;
    tagEl.textContent = item.tag;
    titleEl.textContent = item.title;
    descEl.textContent = item.desc;

    thumbBtns.forEach((btn, idx) => {
      btn.classList.toggle('active-thumb', idx === currentIndex);
    });

    // Auto scroll thumb into view
    const activeThumb = modal.querySelector(`.lightbox-thumb-btn[data-idx="${currentIndex}"]`);
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function closeModal() {
    document.body.style.overflow = prevOverflow;
    window.removeEventListener('keydown', handleKeyDown);
    if (modal.parentElement) {
      modal.remove();
    }
    activeLightboxModal = null;
  }

  // Next / Prev listeners
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateView(currentIndex + 1);
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    updateView(currentIndex - 1);
  });

  closeBtn.addEventListener('click', closeModal);

  // Click outside card to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-stage')) {
      closeModal();
    }
  });

  // Thumbnail buttons
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      updateView(idx);
    });
  });

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      updateView(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      updateView(currentIndex - 1);
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  // Touch Swipe for mobile phones
  let touchStartX = 0;
  let touchStartY = 0;
  cardEl.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  cardEl.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    // Horizontal swipe threshold 40px, ensure horizontal intent
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        updateView(currentIndex + 1); // Swiped left -> show next
      } else {
        updateView(currentIndex - 1); // Swiped right -> show prev
      }
    }
  }, { passive: true });
}
