// 19 Things Component with Memory Photo Snapshots & Progress Tracker
// 19 years and 19 things I have to say — intentionally left blank with professional photo accents
import { THINGS_19 } from '../data/letterData.js';
import { openPhotoLightbox } from './PhotoLightbox.js';

export function createThings19(onReachPanda) {
  const container = document.createElement('section');
  container.className = 'things-scene-section';
  container.id = 'thingsSection';
  container.setAttribute('data-scene', 'things-19');
  container.setAttribute('data-testid', 'things-19');

  const photoHighlights = {
    1: { src: '/photos/harshitha_1.jpg', label: 'Radiant Smile' },
    3: { src: '/photos/harshitha_2.jpg', label: 'Traditional Grace' },
    6: { src: '/photos/harshitha_3.jpg', label: 'Dance & Campus' },
    9: { src: '/photos/harshitha_4.jpg', label: 'Elegance in Pink' },
    12: { src: '/photos/harshitha_5.jpg', label: 'Mirror Candid' },
    15: { src: '/photos/harshitha_8.jpg', label: 'Saree Glow' },
    18: { src: '/photos/harshitha_9.jpg', label: 'Sunny Days' },
    19: { src: '/photos/harshitha_7.jpg', label: 'Doctor Harshitha' }
  };

  container.innerHTML = `
    <!-- Sticky Progress Tracker Header -->
    <div class="things-progress-bar-container">
      <div class="things-progress-info">
        <span class="progress-title">19 YEARS • 19 MEMORIES</span>
        <span class="progress-count" id="thingsProgressCount">01 / 19</span>
      </div>
      <div class="things-progress-track">
        <div class="things-progress-fill" id="thingsProgressFill" style="width: 5.26%;"></div>
      </div>
    </div>

    <!-- Section Intro Header -->
    <div class="things-intro-header">
      <div class="pill-badge">CHAPTER 03 • 19 MEMORIES</div>
      <h2 class="things-main-title">19 Years. 19 Memories.</h2>
      <p class="things-subtitle">
        A trip down memory lane — from baby tears and dance moves to favorite teachers, school drama, online classes, and cracking NEET as Doctor Harshitha!
      </p>
    </div>

    <!-- 19 Single-Column Cards Container -->
    <div class="things-cards-list" id="thingsList" role="list">
      ${THINGS_19.map((item) => {
        const photo = photoHighlights[item.id];
        return `
          <article class="thing-card ${photo ? 'has-photo-memory' : ''}" data-index="${item.id}" id="thing-item-${item.id}" role="listitem" aria-label="Year ${item.number} of 19">
            <div class="thing-card-header">
              <div class="thing-number-badge">${item.number}</div>
              <div class="thing-card-meta">
                <span class="thing-label">${item.yearLabel}</span>
                <span class="thing-status-tag">${item.tag}</span>
              </div>
              ${photo ? `
                <div class="card-inline-photo-chip">
                  <img src="${photo.src}" alt="${photo.label}" class="chip-avatar-img" />
                  <span class="chip-title">${photo.label}</span>
                </div>
              ` : ''}
            </div>
            
            <div class="thing-card-body">
              <div class="thing-memory-text-container">
                <p class="thing-memory-text telugu-text">${item.text.replace(/\n/g, '<br/>')}</p>
              </div>

              ${photo ? `
                <div class="thing-memory-photo-banner">
                  <img src="${photo.src}" alt="${photo.label}" loading="lazy" class="thing-memory-img" />
                  <div class="thing-memory-caption">
                    <span class="memory-star">⭐</span>
                    <span>Year ${item.number} Milestone: ${photo.label}</span>
                  </div>
                </div>
              ` : ''}
            </div>
          </article>
        `;
      }).join('')}
    </div>

    <!-- Transition separator into Panda Stage -->
    <div class="things-to-panda-divider">
      <div class="divider-ribbon-sparkle">
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
        <span class="divider-icon">🐾</span>
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
      </div>
      <p class="divider-caption">Someone waiting ahead with a special delivery...</p>
    </div>
  `;

  // Attach IntersectionObserver to track scroll progress across the 19 cards
  const progressCount = container.querySelector('#thingsProgressCount');
  const progressFill = container.querySelector('#thingsProgressFill');
  const cards = container.querySelectorAll('.thing-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          const formattedIndex = String(index).padStart(2, '0');
          progressCount.textContent = `${formattedIndex} / 19`;
          progressFill.style.width = `${(index / 19) * 100}%`;

          if (index === 19 && onReachPanda) {
            onReachPanda();
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.2
    });

    cards.forEach(card => observer.observe(card));
  }

  // Interactive Photo Clicks -> Open Lightbox
  const photoBanners = container.querySelectorAll('.thing-memory-photo-banner, .card-inline-photo-chip');
  photoBanners.forEach(banner => {
    banner.style.cursor = 'pointer';
    banner.setAttribute('title', 'Tap to view full photo');
    banner.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = banner.querySelector('img');
      if (img && img.src) {
        openPhotoLightbox(img.src);
      }
    });
  });

  return container;
}
