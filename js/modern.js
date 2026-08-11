/* ==========================================================================
   Minimalist 2-Page Developer Portfolio JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
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
      if (theme === 'light') {
        btn.innerHTML = `🌙`;
      } else {
        btn.innerHTML = `🌙`;
      }
    });
  }
}
