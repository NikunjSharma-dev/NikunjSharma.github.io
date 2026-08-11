/* ==========================================================================
   Modern Developer Portfolio - JavaScript Logic & Interactive Terminal
   Target: Nikunj Sharma (Software & AI/ML Systems Engineer @ IIT Guwahati)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initRetroCursor();
  initProjectFilters();
  initTerminal();
});

/* ==========================================================================
   1. Navbar Scroll Effect & Active Link Highlight
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Highlight current nav item
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. Dark / Light Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`; // Moon icon
    } else {
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`; // Sun icon
    }
  }
}

/* ==========================================================================
   3. Retro Pixel Cursor Toggle
   ========================================================================== */
function initRetroCursor() {
  const cursorBtn = document.getElementById('cursor-toggle-btn');
  const isRetro = localStorage.getItem('portfolio-retro-cursor') === 'true';

  if (isRetro) {
    document.body.classList.add('retro-cursor');
  }

  if (cursorBtn) {
    cursorBtn.addEventListener('click', () => {
      document.body.classList.toggle('retro-cursor');
      const active = document.body.classList.contains('retro-cursor');
      localStorage.setItem('portfolio-retro-cursor', active);
    });
  }
}

/* ==========================================================================
   4. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const projectCards = document.querySelectorAll('.project-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || card.classList.contains(filter)) {
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

/* ==========================================================================
   5. Interactive Terminal Engine (Screenshot 7 Inspired)
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalInput || !terminalBody) return;

  const commandResponses = {
    'help': `Available Commands:
  • help       : Show list of commands
  • skills     : View tech stack & core competencies
  • projects   : View top featured software projects
  • education  : Educational background info
  • open-source: View sktime & community contributions
  • contact    : Email & social channels
  • clear      : Clear terminal screen`,
    
    'skills': `Core Tech Stack & Systems Expertise:
  [Backend]     FastAPI, Python, Node.js, C++, REST APIs, WebSockets
  [AI/ML]      XGBoost, Isolation Forest, SHAP, PyTorch, Numba JIT
  [Databases]  PostgreSQL, PostGIS, Redis, SQLite (FTS5)
  [DevOps]     Docker, GitHub Actions CI/CD, Watchdog, Linux, MCP Protocol`,

    'projects': `Featured Showcase Projects:
  1. DeltaContext  -> Multimodal FTS5 ETL & MCP Server for LLMs
  2. FraudGuard    -> Dual-layer real-time fraud scoring engine
  3. FleetForge    -> Open-source modular logistics & supply chain OS
  4. Cargonaut     -> Logistics control tower & dispatch optimizer
  5. DataPipe      -> Real-time directory watcher & FTS5 search indexer`,

    'education': `Academic Profile:
  🎓 B.Tech in Chemical Engineering
  🏛️ Indian Institute of Technology Guwahati (IITG)
  📍 Guwahati, Assam, India`,

    'open-source': `Major Open-Source Contributions:
  ⭐ sktime (7.7k+ Stars) — Pull Request #10783
  • Built Numba JIT integration engine replacing deprecated NumPy 2.0 np.trapz
  • Solved ZeroDivisionError in ClaSPTransformer & optimized F1 metric evaluation`,

    'contact': `Get in Touch:
  ✉️ Email    : 20.nikunj.sharma@gmail.com
  🐙 GitHub   : https://github.com/NikunjSharma-dev
  💼 LinkedIn : https://linkedin.com/in/NikunjSharma-dev`
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      
      // Append prompt line
      const inputRow = document.createElement('div');
      inputRow.className = 'terminal-row';
      inputRow.innerHTML = `<span class="terminal-prompt">&gt; Nikunj.</span><span class="terminal-cmd">${escapeHTML(command)}</span>`;
      terminalBody.insertBefore(inputRow, terminalInput.parentElement);

      if (command === 'clear') {
        // Clear previous entries except prompt
        const rows = terminalBody.querySelectorAll('.terminal-row');
        rows.forEach(r => r.remove());
      } else if (commandResponses[command]) {
        const outputRow = document.createElement('div');
        outputRow.className = 'terminal-output highlight';
        outputRow.textContent = commandResponses[command];
        terminalBody.insertBefore(outputRow, terminalInput.parentElement);
      } else if (command !== '') {
        const errRow = document.createElement('div');
        errRow.className = 'terminal-output';
        errRow.textContent = `Command not recognized: '${command}'. Type 'help' for available commands.`;
        terminalBody.insertBefore(errRow, terminalInput.parentElement);
      }

      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}
