// modern.js
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  
  if (themeToggle) {
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
      if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
      } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
      }
    });
  }

  // Project Filtering on projects.html
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.tc-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter cards
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else {
            if (card.getAttribute('data-category').includes(filter)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Multi-Photo Card Gallery Handling
  const galleryContainers = document.querySelectorAll('.tc-image-container[data-gallery]');
  galleryContainers.forEach(container => {
    try {
      const gallery = JSON.parse(container.getAttribute('data-gallery'));
      if (!Array.isArray(gallery) || gallery.length <= 1) return;

      let currentIndex = 0;
      const img = container.querySelector('img');
      const prevBtn = container.querySelector('.prev-btn');
      const nextBtn = container.querySelector('.next-btn');
      const currentIndexEl = container.querySelector('.current-index');
      const totalCountEl = container.querySelector('.total-count');

      if (totalCountEl) totalCountEl.textContent = gallery.length;

      const updateCardImage = (index) => {
        currentIndex = (index + gallery.length) % gallery.length;
        if (img) img.src = gallery[currentIndex];
        if (currentIndexEl) currentIndexEl.textContent = currentIndex + 1;
        container.setAttribute('data-current-index', currentIndex);
      };

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          updateCardImage(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          updateCardImage(currentIndex + 1);
        });
      }
    } catch (err) {
      console.error('Error parsing data-gallery JSON:', err);
    }
  });

  // Lightbox Modal for Beyond Coding Gallery & Project Cards
  const galleryImages = document.querySelectorAll('.masonry-gallery img, .image-grid img, .slide img, .tc-image-container img');
  if (galleryImages.length > 0) {
    let lightbox = document.querySelector('.lightbox-modal');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox-modal';
      lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close photo">&times;</button>
        <button class="lightbox-nav-btn lightbox-prev" aria-label="Previous photo">&lsaquo;</button>
        <button class="lightbox-nav-btn lightbox-next" aria-label="Next photo">&rsaquo;</button>
        <img src="" alt="Expanded View">
        <div class="lightbox-counter">1 of 1</div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const counterEl = lightbox.querySelector('.lightbox-counter');

    let currentGalleryList = [];
    let currentGalleryIndex = 0;

    const updateLightboxContent = () => {
      if (currentGalleryList.length > 0) {
        const item = currentGalleryList[currentGalleryIndex];
        lightboxImg.src = typeof item === 'string' ? item : item.src;
        lightboxImg.alt = typeof item === 'string' ? 'Expanded View' : (item.alt || 'Expanded View');

        if (currentGalleryList.length > 1) {
          prevBtn.style.display = 'flex';
          nextBtn.style.display = 'flex';
          counterEl.style.display = 'block';
          counterEl.textContent = `${currentGalleryIndex + 1} of ${currentGalleryList.length}`;
        } else {
          prevBtn.style.display = 'none';
          nextBtn.style.display = 'none';
          counterEl.style.display = 'none';
        }
      }
    };

    const openLightbox = (items, startIndex = 0) => {
      currentGalleryList = Array.isArray(items) ? items : [items];
      currentGalleryIndex = startIndex;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGalleryList.length > 1) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
        updateLightboxContent();
      }
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentGalleryList.length > 1) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryList.length;
        updateLightboxContent();
      }
    });

    galleryImages.forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const container = img.closest('.tc-image-container');
        if (container && container.hasAttribute('data-gallery')) {
          try {
            const gallery = JSON.parse(container.getAttribute('data-gallery'));
            const activeIdx = parseInt(container.getAttribute('data-current-index') || '0', 10);
            openLightbox(gallery, activeIdx);
            return;
          } catch (err) {}
        }
        openLightbox({ src: img.src, alt: img.alt }, 0);
      });
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === closeBtn) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' && currentGalleryList.length > 1) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
        updateLightboxContent();
      } else if (e.key === 'ArrowRight' && currentGalleryList.length > 1) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryList.length;
        updateLightboxContent();
      }
    });
  }
});
