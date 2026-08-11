/* ==========================================================================
   2-Page Developer Portfolio JavaScript
   - Theme Toggle (Dark / Light)
   - Interactive Filter Chips on Projects Page
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initProductFilters();
});

function initThemeToggle() {
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeIcons(next);
    });
  });

  function updateThemeIcons(theme) {
    themeBtns.forEach(btn => {
      btn.innerHTML = `🌙`;
    });
  }
}

/* Interactive Filter System for projects.html */
function initProductFilters() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterChips.length || !productCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterCategory = chip.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });
}
