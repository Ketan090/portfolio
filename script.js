document.addEventListener('DOMContentLoaded', function () {

  // --- TOAST NOTIFICATION ---
  function showToast(type, title, message, duration) {
    duration = duration || 4000;
    var container = document.getElementById('toast-container');
    if (!container) return null;

    var icons = {
      success: '\u2713',
      error: '\u2717',
      info: '\u2139'
    };

    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.style.position = 'relative';
    toast.innerHTML =
      '<div class="toast-icon ' + type + '">' + (icons[type] || icons.info) + '</div>' +
      '<div class="toast-body">' +
        '<div class="toast-title">' + title + '</div>' +
        '<div class="toast-msg">' + message + '</div>' +
      '</div>' +
      '<button class="toast-close" aria-label="Close">&times;</button>' +
      '<div class="toast-progress"></div>';

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });

    // Close button
    var closeBtn = toast.querySelector('.toast-close');
    function dismiss() {
      toast.classList.remove('show');
      toast.classList.add('hide');
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }
    closeBtn.addEventListener('click', dismiss);

    // Progress bar
    var progress = toast.querySelector('.toast-progress');
    if (progress) {
      progress.style.width = '100%';
      progress.style.transitionDuration = duration + 'ms';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          progress.style.width = '0%';
        });
      });
    }

    // Auto-dismiss
    var timer = setTimeout(dismiss, duration);
    toast.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      if (progress) progress.style.transitionDuration = '0s';
    });
    toast.addEventListener('mouseleave', function () {
      if (progress) {
        var remaining = parseFloat(getComputedStyle(progress).width) / parseFloat(getComputedStyle(progress.parentElement).width) * duration;
        progress.style.transitionDuration = remaining + 'ms';
        progress.style.width = '0%';
      }
      timer = setTimeout(dismiss, 3000);
    });

    return { dismiss: dismiss };
  }

  // --- BOOT LOADING ---
  (function () {
    var loader = document.getElementById('loading-screen');
    var bar = document.getElementById('boot-bar-loading');
    var overlay = document.getElementById('boot-overlay');
    var bootMac = document.getElementById('boot-mac');
    var bootWin = document.getElementById('boot-win');
    var bootLinux = document.getElementById('boot-linux');
    var barMac = document.getElementById('boot-bar-mac');
    var barLinux = document.getElementById('boot-bar-linux');
    var avatarInner = document.getElementById('avatar-inner');
    if (!loader || !bar || !overlay || !bootMac || !bootWin || !bootLinux || !barMac || !barLinux || !avatarInner) return;

    avatarInner.style.display = 'none';

    function animateBar(barEl, duration, callback) {
      var start = null;
      function frame(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        barEl.style.width = (eased * 100) + '%';
        if (p < 1) requestAnimationFrame(frame);
        else callback();
      }
      requestAnimationFrame(frame);
    }

    function showLogo(logoEl, barEl, showBar, next) {
      logoEl.classList.add('active');
      if (showBar) {
        barEl.style.width = '0%';
        animateBar(barEl, 1200, function () {
          logoEl.classList.remove('active');
          setTimeout(next, 300);
        });
      } else {
        setTimeout(function () {
          logoEl.classList.remove('active');
          setTimeout(next, 300);
        }, 1500);
      }
    }

    function showAvatar(next) {
      overlay.style.opacity = '0';
      avatarInner.style.display = '';
      setTimeout(function () {
        avatarInner.style.display = 'none';
        overlay.style.opacity = '1';
        setTimeout(next, 200);
      }, 2000);
    }

    function startCycle() {
      showLogo(bootMac, barMac, true, function () {
        showAvatar(function () {
          showLogo(bootWin, null, false, function () {
            showAvatar(function () {
              showLogo(bootLinux, barLinux, true, function () {
                showAvatar(function () {
                  startCycle();
                });
              });
            });
          });
        });
      });
    }

    // Phase 1: Full-page three-logos boot
    animateBar(bar, 2500, function () {
      loader.classList.add('hidden');
      // Phase 2: After loading screen, show profile then start cycling
      setTimeout(function () {
        overlay.style.opacity = '0';
        avatarInner.style.display = '';
        setTimeout(startCycle, 3000);
      }, 500);
    });
  })();



  // --- THEME ---
  var theme = localStorage.getItem('theme') || 'dark';
  var html = document.documentElement;
  html.className = theme;

  function setTheme(t) {
    theme = t;
    html.className = t;
    localStorage.setItem('theme', t);
  }

  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    });
  });

  // --- SCROLL EVENTS ---
  var progress = document.getElementById('scroll-progress');
  var navbar = document.getElementById('navbar');
  var backBtn = document.getElementById('back-to-top');
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;
    var docH = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docH > 0 ? (scrollY / docH) * 100 : 0;
    progress.style.width = pct + '%';

    if (scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    if (scrollY > 400) backBtn.classList.add('visible');
    else backBtn.classList.remove('visible');

    // Active nav link
    var current = '';
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 120;
      var bottom = top + sec.offsetHeight;
      if (scrollY >= top && scrollY < bottom) current = sec.id;
    });
    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });

  backBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- MOBILE MENU ---
  var menuBtn = document.getElementById('menu-btn');
  var overlay = document.getElementById('mobile-overlay');
  var closeBtn = document.getElementById('menu-close');

  function openMenu() { overlay.classList.add('open'); menuBtn.classList.add('open'); }
  function closeMenu() { overlay.classList.remove('open'); menuBtn.classList.remove('open'); }

  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeMenu(); });
  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(function (l) {
    l.addEventListener('click', closeMenu);
  });

  // --- TYPEWRITER ---
  var roles = ['Full Stack Web Apps', 'Responsive Interfaces', 'Scalable APIs', 'Modern UIs'];
  var idx = 0, ch = 0, del = false;
  var tw = document.getElementById('typewriter');

  function type() {
    var cur = roles[idx];
    if (!del && ch < cur.length) {
      ch++;
      tw.textContent = cur.slice(0, ch);
      setTimeout(type, 50 + Math.random() * 40);
    } else if (!del && ch === cur.length) {
      setTimeout(function () { del = true; type(); }, 2000);
    } else if (del && ch > 0) {
      ch--;
      tw.textContent = cur.slice(0, ch);
      setTimeout(type, 20 + Math.random() * 20);
    } else {
      del = false;
      idx = (idx + 1) % roles.length;
      setTimeout(type, 400);
    }
  }
  type();

  // --- SCROLL REVEAL ---
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  // --- SKILLS ---
  var technical = [
    'HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Node.js',
    'Express.js', 'MongoDB', 'SQL', 'Git', 'GitHub', 'REST APIs',
    'Tailwind CSS', 'Bootstrap', 'Responsive Web Design', 'Figma (UI/UX Basics)'
  ];
  var aiSkills = [
    'AI-Assisted Software Development', 'Prompt Engineering',
    'AI-Assisted Debugging', 'GitHub Copilot', 'ChatGPT', 'Claude AI',
    'Gemini AI', 'Rapid Prototyping', 'Code Refactoring',
    'Technical Documentation using AI'
  ];
  var softSkills = [
    'Problem Solving', 'Team Collaboration', 'Communication',
    'Adaptability', 'Time Management', 'Critical Thinking', 'Continuous Learning'
  ];

  function renderTags(id, items) {
    var container = document.getElementById(id);
    items.forEach(function (item) {
      var el = document.createElement('span');
      el.className = 'skill-tag';
      el.textContent = item;
      container.appendChild(el);
    });
  }

  renderTags('skills-technical', technical);
  renderTags('skills-ai', aiSkills);
  renderTags('skills-soft', softSkills);

  // --- PROJECTS ---
  var projects = [
    {
      title: 'DailyVerse \u2013 Grocery E-Commerce Website',
      tags: ['Next.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      desc: 'Full-stack grocery e-commerce platform with product listings, search, cart, checkout, authentication, and admin dashboard.',
      github: 'https://github.com',
      live: 'https://github.com',
      icon: '\uD83D\uDED2'
    },
    {
      title: 'Portfolio Website',
      tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      desc: 'Responsive personal portfolio website showcasing projects and technical skills with modern design.',
      github: 'https://github.com',
      live: 'https://github.com',
      icon: '\uD83D\uDC64'
    },
    {
      title: 'Task Manager Web App',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      desc: 'Task management application with authentication, CRUD operations, and RESTful APIs.',
      github: 'https://github.com',
      live: 'https://github.com',
      icon: '\uD83D\uDCCB'
    },
    {
      title: 'Weather App',
      tags: ['JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
      desc: 'Real-time weather application using the OpenWeather API with a clean, responsive interface.',
      github: 'https://github.com',
      live: 'https://github.com',
      icon: '\uD83C\uDFA4'
    }
  ];

  (function () {
    var grid = document.getElementById('projects-grid');
    projects.forEach(function (p, i) {
      var card = document.createElement('div');
      card.className = 'project-card reveal';
      if (i > 0) { card.style.transitionDelay = (i * 0.1) + 's'; }
      card.innerHTML =
        '<div class="project-icon">' + p.icon + '</div>' +
        '<div class="project-links">' +
          '<a href="' + p.github + '" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="GitHub">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' +
          '</a>' +
          '<a href="' + p.live + '" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="Live">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
          '</a>' +
        '</div>' +
        '<h3 class="project-title">' + p.title + '</h3>' +
        '<p class="project-desc">' + p.desc + '</p>' +
        '<div class="project-tags">' + p.tags.map(function (t) { return '<span class="project-tag">' + t + '</span>'; }).join('') + '</div>';
      grid.appendChild(card);
      revealObserver.observe(card);
    });
  })();

  // --- TOOLS ---
  var tools = [
    { name: 'VS Code', icon: '\uD83D\uDCBB' },
    { name: 'Postman', icon: '\uD83D\uDCEE' },
    { name: 'Git', icon: '\uD83D\uDD00' },
    { name: 'GitHub', icon: '\uD83D\uDC19' },
    { name: 'MongoDB Atlas', icon: '\uD83C\uDF43' },
    { name: 'Figma', icon: '\uD83C\uDFA8' },
    { name: 'ChatGPT', icon: '\uD83E\uDD16' },
    { name: 'GitHub Copilot', icon: '\u2728' }
  ];

  (function () {
    var grid = document.getElementById('tools-grid');
    tools.forEach(function (t, i) {
      var el = document.createElement('div');
      el.className = 'tool-item reveal';
      el.style.transitionDelay = (i * 0.06) + 's';
      el.innerHTML = '<span class="tool-icon">' + t.icon + '</span><span class="tool-name">' + t.name + '</span>';
      grid.appendChild(el);
      revealObserver.observe(el);
    });
  })();

  // --- LANGUAGES ---
  var langs = ['English', 'Hindi', 'Marathi'];

  (function () {
    var grid = document.getElementById('langs-grid');
    langs.forEach(function (l, i) {
      var el = document.createElement('div');
      el.className = 'lang-item reveal';
      el.style.transitionDelay = (i * 0.08) + 's';
      el.innerHTML =
        '<svg class="lang-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
        '<span class="lang-name">' + l + '</span>';
      grid.appendChild(el);
      revealObserver.observe(el);
    });
  })();

  // --- CONTACT FORM ---
  var form = document.getElementById('contact-form');
  var nameInp = document.getElementById('form-name');
  var emailInp = document.getElementById('form-email');
  var msgInp = document.getElementById('form-message');
  var errName = document.getElementById('error-name');
  var errEmail = document.getElementById('error-email');
  var errMsg = document.getElementById('error-message');
  var submitBtn = document.getElementById('form-submit');
  var submitText = document.getElementById('submit-text');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;

    if (!nameInp.value.trim()) {
      errName.textContent = 'Name is required';
      nameInp.style.borderColor = '#ef4444';
      valid = false;
    } else {
      errName.textContent = '';
      nameInp.style.borderColor = '';
    }

    if (!emailInp.value.trim()) {
      errEmail.textContent = 'Email is required';
      emailInp.style.borderColor = '#ef4444';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInp.value)) {
      errEmail.textContent = 'Please enter a valid email';
      emailInp.style.borderColor = '#ef4444';
      valid = false;
    } else {
      errEmail.textContent = '';
      emailInp.style.borderColor = '';
    }

    if (!msgInp.value.trim()) {
      errMsg.textContent = 'Message is required';
      msgInp.style.borderColor = '#ef4444';
      valid = false;
    } else {
      errMsg.textContent = '';
      msgInp.style.borderColor = '';
    }

    if (valid) {
      var messages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
      messages.push({
        id: Date.now(),
        name: nameInp.value.trim(),
        email: emailInp.value.trim(),
        message: msgInp.value.trim(),
        timestamp: new Date().toLocaleString()
      });
      localStorage.setItem('admin_messages', JSON.stringify(messages));
      sendToSheet(nameInp.value.trim(), emailInp.value.trim(), msgInp.value.trim());
      submitText.textContent = 'Message Sent!';
      submitBtn.disabled = true;
      nameInp.value = '';
      emailInp.value = '';
      msgInp.value = '';
      setTimeout(function () {
        submitText.textContent = 'Send Message';
        submitBtn.disabled = false;
      }, 3000);
    }
  });

  // Clear error styling on input
  [nameInp, emailInp, msgInp].forEach(function (inp) {
    inp.addEventListener('input', function () {
      inp.style.borderColor = '';
      var errEl = inp.closest('.form-group').querySelector('.form-error');
      if (errEl) errEl.textContent = '';
    });
  });

  // --- ADMIN PANEL ---
  var ADMIN_PIN = '441106';
  var adminOverlay = document.getElementById('admin-overlay');
  var adminClose = document.getElementById('admin-close');
  var adminTrigger = document.getElementById('admin-trigger');
  var adminPinScreen = document.getElementById('admin-pin-screen');
  var adminContent = document.getElementById('admin-content');
  var adminPinError = document.getElementById('admin-pin-error');
  var adminMsgList = document.getElementById('admin-msg-list');
  var adminPinBoxes = document.querySelectorAll('.admin-pin-box');
  var adminExportBtn = document.getElementById('admin-export-btn');

  if (adminTrigger && adminOverlay) {
    adminTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      adminOverlay.classList.add('open');
      adminPinScreen.style.display = '';
      adminContent.style.display = 'none';
      adminPinError.textContent = '';
      adminPinBoxes.forEach(function (b) { b.value = ''; b.classList.remove('filled'); });
      if (adminPinBoxes[0]) adminPinBoxes[0].focus();
    });
  }

  if (adminClose && adminOverlay) {
    adminClose.addEventListener('click', function () {
      adminOverlay.classList.remove('open');
    });
    adminOverlay.addEventListener('click', function (e) {
      if (e.target === adminOverlay) adminOverlay.classList.remove('open');
    });
  }

  adminPinBoxes.forEach(function (box, idx) {
    box.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '');
      if (this.value) this.classList.add('filled');
      else this.classList.remove('filled');
      if (this.value && idx < adminPinBoxes.length - 1) {
        adminPinBoxes[idx + 1].focus();
      }
      adminPinError.textContent = '';
    });

    box.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !this.value && idx > 0) {
        adminPinBoxes[idx - 1].focus();
        adminPinBoxes[idx - 1].value = '';
        adminPinBoxes[idx - 1].classList.remove('filled');
      }
      if (e.key === 'Enter') checkPin();
    });

    box.addEventListener('paste', function (e) {
      e.preventDefault();
      var data = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
      for (var i = 0; i < data.length && i < adminPinBoxes.length; i++) {
        adminPinBoxes[i].value = data[i];
        adminPinBoxes[i].classList.add('filled');
      }
      if (data.length === 6) checkPin();
      else if (data.length > 0) adminPinBoxes[Math.min(data.length, 5)].focus();
    });
  });

  function checkPin() {
    var entered = '';
    adminPinBoxes.forEach(function (b) { entered += b.value; });
    if (entered === ADMIN_PIN) {
      adminPinScreen.style.display = 'none';
      adminContent.style.display = '';
      adminPinError.textContent = '';
      loadMessages();
      switchTab('messages');
      refreshLinks();
    } else {
      adminPinError.textContent = 'Incorrect PIN. Try again.';
      adminPinBoxes.forEach(function (b) { b.value = ''; b.classList.remove('filled'); });
      if (adminPinBoxes[0]) adminPinBoxes[0].focus();
    }
  }

  // --- Tabs ---
  function switchTab(name) {
    document.querySelectorAll('.admin-tab').forEach(function (t) {
      t.classList.toggle('active', t.getAttribute('data-tab') === name);
    });
    document.querySelectorAll('.admin-tab-panel').forEach(function (p) {
      p.classList.toggle('active', p.id === 'tab-' + name);
    });
    if (name === 'links') refreshLinks();
  }

  document.querySelectorAll('.admin-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchTab(this.getAttribute('data-tab'));
    });
  });

  // --- Links tab ---
  function refreshLinks() {
    var photoInput = document.getElementById('admin-link-photo');
    var resumeInput = document.getElementById('admin-link-resume');
    // Always fetch from manifest (cloud is source of truth)
    fetch(MANIFEST_URL + '?t=' + Date.now())
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; })
      .then(function (m) {
        if (photoInput) photoInput.value = (m && m.photoUrl) ? m.photoUrl : 'No photo link yet';
        if (resumeInput) resumeInput.value = (m && m.resumeUrl) ? m.resumeUrl : 'No resume link yet';
      });
  }

  document.querySelectorAll('.admin-link-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(this.getAttribute('data-copy'));
      if (!target) return;
      target.select();
      target.setSelectionRange(0, 99999);
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (err) {}
      if (navigator.clipboard) {
        navigator.clipboard.writeText(target.value).catch(function () {});
        copied = true;
      }
      var old = this.textContent;
      this.textContent = copied ? 'Copied!' : 'Copy';
      setTimeout(function () { btn.textContent = old; }, 1500);
    });
  });

  // --- Messages ---
  function loadMessages() {
    var messages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
    var titleEl = document.querySelector('#tab-messages .admin-title');
    if (titleEl) titleEl.textContent = 'Notifications (' + messages.length + ')';
    if (messages.length === 0) {
      adminMsgList.innerHTML = '<div class="admin-empty">No messages yet.</div>';
      return;
    }
    var html = '';
    for (var i = messages.length - 1; i >= 0; i--) {
      var m = messages[i];
      html +=
        '<div class="admin-msg-item" data-id="' + m.id + '">' +
          '<div class="admin-msg-header">' +
            '<span class="admin-msg-name">' + escapeHtml(m.name) + '</span>' +
            '<span class="admin-msg-time">' + escapeHtml(m.timestamp) + '</span>' +
          '</div>' +
          '<div class="admin-msg-email">' + escapeHtml(m.email) + '</div>' +
          '<div class="admin-msg-text">' + escapeHtml(m.message) + '</div>' +
          '<button class="admin-msg-delete" data-id="' + m.id + '">Delete</button>' +
        '</div>';
    }
    adminMsgList.innerHTML = html;

    document.querySelectorAll('.admin-msg-delete').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = Number(this.getAttribute('data-id'));
        var msgs = JSON.parse(localStorage.getItem('admin_messages') || '[]');
        msgs = msgs.filter(function (msg) { return msg.id !== id; });
        localStorage.setItem('admin_messages', JSON.stringify(msgs));
        loadMessages();
      });
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbytyEPjb5YmjQGO8DLoGqEcxAqnKYIt_RB8o4hu9v6oEKMpaghEOvLRkkRcfhzLh0sT/exec';

  function sendToSheet(name, email, message) {
    if (!SHEET_URL) return;
    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ type: 'message', name: name, email: email, message: message })
    });
  }

  function downloadCSV(messages) {
    if (!messages || messages.length === 0) return;
    var csv = 'Name,Email,Message,Timestamp\n';
    for (var i = 0; i < messages.length; i++) {
      var m = messages[i];
      csv += '"' + (m.name || '').replace(/"/g, '""') + '",';
      csv += '"' + (m.email || '').replace(/"/g, '""') + '",';
      csv += '"' + (m.message || '').replace(/"/g, '""') + '",';
      csv += '"' + (m.timestamp || '').replace(/"/g, '""') + '"\n';
    }
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contact_messages.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }

  if (adminExportBtn) {
    adminExportBtn.addEventListener('click', function () {
      downloadCSV(JSON.parse(localStorage.getItem('admin_messages') || '[]'));
    });
  }

  var adminDeleteBtn = document.getElementById('admin-delete-all');
  if (adminDeleteBtn) {
    adminDeleteBtn.addEventListener('click', function () {
      if (confirm('Delete all messages?')) {
        localStorage.removeItem('admin_messages');
        loadMessages();
      }
    });
  }

  // --- Link upload (0x0.st / catbox via Apps Script) ---
  function onLinkReady(type, url, statusEl, downloadUrl) {
    if (type === 'photo') {
      // Cache-bust so the browser fetches the freshly uploaded file, not the cached old one
      profileImg.src = url + (url.indexOf('?') === -1 ? '?t=' : '&t=') + Date.now();
      var photoLinkInput = document.getElementById('admin-link-photo');
      if (photoLinkInput) photoLinkInput.value = url;
    } else {
      if (resumeLink) resumeLink.href = downloadUrl || url;
      var resumeLinkInput = document.getElementById('admin-link-resume');
      if (resumeLinkInput) resumeLinkInput.value = url;
    }
    if (statusEl) {
      statusEl.textContent = 'Link generated!';
      statusEl.className = 'admin-drive-status success';
      setTimeout(function () { statusEl.textContent = ''; statusEl.className = 'admin-drive-status'; }, 6000);
    }
    var label = type === 'photo' ? 'Profile Photo' : 'Resume';
    showToast('success', label + ' Uploaded', 'File stored in the cloud and live on the website.');
  }

  function onLinkError(statusEl, msg) {
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.className = 'admin-drive-status error';
    }
    showToast('error', 'Upload Failed', msg || 'Something went wrong. Please try again.');
  }

  function generateLink(type, data, statusEl) {
    if (!SHEET_URL) {
      onLinkError(statusEl, 'Set SHEET_URL in script.js');
      return;
    }
    if (!data) {
      onLinkError(statusEl, 'No data to upload');
      return;
    }

    if (statusEl) {
      statusEl.textContent = 'Generating link...';
      statusEl.className = 'admin-drive-status';
    }

    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timeout = controller ? setTimeout(function () { controller.abort(); }, 60000) : null;

    fetch(SHEET_URL, {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ type: type, data: data }),
      signal: controller ? controller.signal : undefined
    })
    .then(function (res) {
      if (!res.ok) throw new Error('Server error ' + res.status);
      return res.json();
    })
    .then(function (result) {
      if (result && result.url) {
        onLinkReady(type, result.url, statusEl);
      } else {
        onLinkError(statusEl, (result && result.error) || 'No link returned');
      }
    })
    .catch(function (err) {
      onLinkError(statusEl, 'Failed: ' + err.message);
    })
    .finally(function () {
      if (timeout) clearTimeout(timeout);
    });
  }

  // --- Photo source toggle ---
  var photoSourceDefault = document.getElementById('photo-source-default');
  var photoSourceCustom = document.getElementById('photo-source-custom');
  var photoCustomSection = document.getElementById('admin-photo-custom-section');
  var photoDriveBtn = document.getElementById('admin-photo-drive');
  var photoDriveStatus = document.getElementById('admin-photo-drive-status');

  function setPhotoSource(source) {
    if (source === 'default') {
      if (photoCustomSection) photoCustomSection.style.display = 'none';
      if (photoDriveBtn) photoDriveBtn.style.display = 'none';
      if (photoDriveStatus) { photoDriveStatus.textContent = ''; photoDriveStatus.className = 'admin-drive-status'; }
    } else {
      if (photoCustomSection) photoCustomSection.style.display = '';
    }
  }

  if (photoSourceDefault) {
    photoSourceDefault.addEventListener('change', function () {
      if (this.checked) setPhotoSource('default');
    });
  }
  if (photoSourceCustom) {
    photoSourceCustom.addEventListener('change', function () {
      if (this.checked) setPhotoSource('custom');
    });
  }

  // --- Resume source toggle ---
  var resumeSourceDefault = document.getElementById('resume-source-default');
  var resumeSourceCustom = document.getElementById('resume-source-custom');
  var resumeCustomSection = document.getElementById('admin-resume-custom-section');
  var pdfDriveBtn = document.getElementById('admin-pdf-drive');
  var pdfDriveStatus = document.getElementById('admin-pdf-drive-status');

  function setResumeSource(source) {
    if (source === 'default') {
      if (resumeLink) resumeLink.download = '';
      if (resumeCustomSection) resumeCustomSection.style.display = 'none';
      if (pdfDriveBtn) pdfDriveBtn.style.display = 'none';
      if (pdfDriveStatus) { pdfDriveStatus.textContent = ''; pdfDriveStatus.className = 'admin-drive-status'; }
    } else {
      if (resumeCustomSection) resumeCustomSection.style.display = '';
    }
  }

  if (resumeSourceDefault) {
    resumeSourceDefault.addEventListener('change', function () {
      if (this.checked) setResumeSource('default');
    });
  }
  if (resumeSourceCustom) {
    resumeSourceCustom.addEventListener('change', function () {
      if (this.checked) setResumeSource('custom');
    });
  }

  // Source toggles default to custom (manifest is source of truth)
  if (photoSourceCustom) photoSourceCustom.checked = true;
  if (photoCustomSection) photoCustomSection.style.display = '';
  if (resumeSourceCustom) resumeSourceCustom.checked = true;
  if (resumeCustomSection) resumeCustomSection.style.display = '';

  // --- Permanent Local File Save Helper ---
  function saveLocalFile(type, data, filename) {
    return fetch('/api/save-local', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: type, data: data, filename: filename })
    }).then(function (res) {
      if (!res.ok) throw new Error('Local server status ' + res.status);
      return res.json();
    });
  }

  function downloadDataUrl(dataUrl, filename) {
    var a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  var BLOB_TOKEN = (typeof window !== 'undefined' && window.BLOB_TOKEN) || 'vercel_blob_rw_hsNf951gsDGCzL1Y_QqPWenRrxEjHQ8PDVldxfXrH5xTXLK';
  var MANIFEST_URL = 'https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json';

  // Convert a data URL to a Blob
  function dataURLToBlob(dataURL) {
    if (!dataURL) return null;
    var parts = dataURL.match(/^data:([^;]+);base64,(.+)$/);
    if (!parts) return null;
    var mime = parts[1];
    var raw = atob(parts[2]);
    var arr = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  // Delete ALL blobs with a given prefix via Vercel Blob REST API
  function cleanupBlobPrefix(prefix) {
    return fetch('https://blob.vercel-storage.com?prefix=' + encodeURIComponent(prefix), {
      method: 'GET',
      headers: { 'authorization': 'Bearer ' + BLOB_TOKEN, 'x-api-version': '7' }
    })
    .then(function (res) { return res.ok ? res.json() : { blobs: [] }; })
    .catch(function () { return { blobs: [] }; })
    .then(function (data) {
      var blobs = data.blobs || [];
      var chain = Promise.resolve();
      blobs.forEach(function (b) {
        chain = chain.then(function () {
          return fetch('https://blob.vercel-storage.com/' + encodeURIComponent(b.pathname), {
            method: 'DELETE',
            headers: { 'authorization': 'Bearer ' + BLOB_TOKEN, 'x-api-version': '7' }
          }).catch(function () {});
        });
      });
      return chain;
    });
  }

  // Upload via /api/save serverless function (works on Vercel, avoids CORS limits)
  function uploadViaServer(type, dataUrl, filename) {
    return fetch('/api/save', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ type: type, data: dataUrl, filename: filename || '' })
    }).then(function (res) {
      if (!res.ok) throw new Error('Server upload HTTP ' + res.status);
      return res.json();
    });
  }

  // Direct Vercel Blob upload for manifest updates only (manifest.json uses only allowed CORS headers)
  function directBlobUpload(pathname, blob, contentType) {
    // Overwrite the existing file at this pathname — no random suffix, no new files
    var url = 'https://blob.vercel-storage.com/' + pathname;
    return fetch(url, {
      method: 'PUT',
      headers: {
        'authorization': 'Bearer ' + BLOB_TOKEN,
        'x-api-version': '7',
        'x-add-random-suffix': '0',
        'x-allow-overwrite': '1',
        'content-type': contentType || 'application/octet-stream'
      },
      body: blob
    }).then(function (res) {
      if (!res.ok) return res.text().then(function(t) { throw new Error('Blob upload HTTP ' + res.status + ': ' + t); });
      return res.json();
    });
  }

  function updateCloudManifest(updates) {
    return fetch(MANIFEST_URL + '?t=' + Date.now())
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; })
      .then(function (existing) {
        var merged = Object.assign({}, existing, updates, { updatedAt: Date.now() });
        var manifestBlob = new Blob([JSON.stringify(merged, null, 2)], { type: 'application/json' });
        return directBlobUpload('manifest.json', manifestBlob, 'application/json').then(function () {
          return merged;
        });
      });
  }

  // --- Upload progress helper ---
  function showUploadProgress(prefix, stepText, pct) {
    var wrap = document.getElementById('admin-' + prefix + '-progress');
    var fill = document.getElementById('admin-' + prefix + '-progress-fill');
    var step = document.getElementById('admin-' + prefix + '-progress-step');
    if (!wrap || !fill || !step) return;
    wrap.classList.add('active');
    if (pct === 'indeterminate') {
      fill.className = 'admin-progress-fill indeterminate';
    } else {
      fill.className = 'admin-progress-fill';
      fill.style.width = Math.min(pct, 100) + '%';
    }
    step.classList.add('active');
    step.classList.remove('done');
    step.querySelector('.step-text').textContent = stepText;
  }

  function finishUploadProgress(prefix, success) {
    var wrap = document.getElementById('admin-' + prefix + '-progress');
    var fill = document.getElementById('admin-' + prefix + '-progress-fill');
    var step = document.getElementById('admin-' + prefix + '-progress-step');
    if (!wrap || !fill || !step) return;
    if (success) {
      fill.className = 'admin-progress-fill';
      fill.style.width = '100%';
      step.classList.remove('active');
      step.classList.add('done');
      step.querySelector('.step-text').textContent = 'Done!';
    } else {
      step.classList.remove('active');
      step.querySelector('.step-text').textContent = 'Failed';
    }
    setTimeout(function () {
      wrap.classList.remove('active');
      fill.style.width = '0%';
      step.classList.remove('active', 'done');
      step.querySelector('.step-text').textContent = '';
    }, success ? 3000 : 5000);
  }

  function uploadToBlob(pathname, data, isImage, statusEl) {
    var prefix = isImage ? 'photo' : 'resume';
    if (statusEl) {
      statusEl.textContent = 'Storing in cloud...';
      statusEl.className = 'admin-drive-status';
    }
    showUploadProgress(prefix, 'Preparing...', 10);

    var type = isImage ? 'photo' : 'resume';
    var filename = isImage ? 'profile_photo.jpg' : 'resume.pdf';

    // Primary: upload through Vercel serverless function /api/save
    return uploadViaServer(type, data, filename)
      .then(function (result) {
        showUploadProgress(prefix, 'Saving manifest...', 85);
        var url = isImage ? result.photoUrl : (result.resumeUrl || result.downloadUrl);
        var downloadUrl = isImage ? url : (result.downloadUrl || url);
        finishUploadProgress(prefix, true);
        onLinkReady(type, url, statusEl, downloadUrl);
        return url;
      })
      .catch(function (serverErr) {
        // Fallback: try direct blob upload if /api/save is unavailable (local dev without server)
        console.warn('Server upload failed, trying direct blob:', serverErr.message);
        showUploadProgress(prefix, 'Uploading to cloud...', 'indeterminate');
        var blob = dataURLToBlob(data);
        if (!blob) { finishUploadProgress(prefix, false); throw new Error('Invalid file data'); }
        var contentType = blob.type || (isImage ? 'image/jpeg' : 'application/pdf');

        // Delete ALL existing blobs with this prefix so the upload is a clean replace
        return cleanupBlobPrefix(prefix)
          .then(function () {
            showUploadProgress(prefix, 'Uploading to cloud...', 'indeterminate');
            return directBlobUpload(pathname, blob, contentType);
          })
          .then(function (result) {
            showUploadProgress(prefix, 'Saving manifest...', 85);
            var updates = {};
            if (isImage) {
              updates.photoUrl = result.url;
              updates.photoTimestamp = Date.now();
            } else {
              updates.resumeUrl = result.url;
              updates.resumeDownloadUrl = result.downloadUrl || (result.url + '?download=1');
              updates.resumeName = 'Ketan_Mahajan_Resume.pdf';
              updates.resumeTimestamp = Date.now();
            }
            return updateCloudManifest(updates).then(function () {
              finishUploadProgress(prefix, true);
              onLinkReady(isImage ? 'photo' : 'resume', result.url, statusEl, result.downloadUrl);
              return result.url;
            });
          })
          .catch(function (err) {
            finishUploadProgress(prefix, false);
            throw err;
          });
      });
  }

  // --- Photo (old crop UI removed — using set-photo-btn flow below) ---
  var profileImg = document.getElementById('profile-photo');

  // --- Resume ---
  var resumeLink = document.getElementById('resume-link');

  var MANIFEST_URL = 'https://hsnf951gsdgczl1y.public.blob.vercel-storage.com/manifest.json';

  // Clear any leftover local-only photo/resume data — manifest is the single source of truth
  ['link_photo_url','link_resume_url','photo_timestamp','resume_timestamp','custom_photo','custom_photo_bust','custom_resume_data','custom_resume_bust','custom_resume_name'].forEach(function(k) { localStorage.removeItem(k); });

  // --- Live Content Synchronization for All Visitors ---
  function syncLiveContent() {
    // Manifest is the GLOBAL source of truth — all visitors see the same latest file.
    fetch(MANIFEST_URL + '?t=' + Date.now())
      .then(function (res) {
        if (!res.ok) throw new Error('Manifest fetch failed: ' + res.status);
        return res.json();
      })
      .then(function (manifest) {
        if (!manifest) return;
        // Photo: always point to the latest generated link
        if (manifest.photoUrl) {
          var photoBust = manifest.photoUrl + (manifest.photoUrl.indexOf('?') === -1 ? '?t=' : '&t=') + Date.now();
          if (profileImg) profileImg.src = photoBust;

          var pLi = document.getElementById('admin-link-photo');
          if (pLi) pLi.value = manifest.photoUrl;
        }
        // Resume: always point to the latest generated link; hide button if none exists
        if (manifest.resumeUrl) {
          var resumeUrl = manifest.resumeDownloadUrl || manifest.resumeUrl;
          if (resumeLink) {
            resumeLink.href = resumeUrl;
            resumeLink.style.display = '';
            if (manifest.resumeName) resumeLink.download = manifest.resumeName;
          }

          var rLi = document.getElementById('admin-link-resume');
          if (rLi) rLi.value = manifest.resumeUrl;
        } else {
          if (resumeLink) resumeLink.style.display = 'none';
        }
      })
      .catch(function () {
        // 2. Fallback to /api/content
        fetch('/api/content')
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data && data.success) {
              if (data.photo && data.photo.url && profileImg) {
                profileImg.src = data.photo.url;
              }
              if (data.resume && data.resume.url && resumeLink) {
                resumeLink.href = data.resume.url;
                resumeLink.style.display = '';
              } else if (resumeLink) {
                resumeLink.style.display = 'none';
              }
            }
          })
          .catch(function () {
            // 3. Fallback to Google Apps Script if available
            if (SHEET_URL) {
              fetch(SHEET_URL)
                .then(function (r) { return r.json(); })
                .then(function (res) {
                  if (res && res.success) {
                    if (res.photoUrl && profileImg) profileImg.src = res.photoUrl;
                    if (res.resumeUrl && resumeLink) {
                      resumeLink.href = res.resumeUrl;
                      resumeLink.style.display = '';
                    } else if (resumeLink) {
                      resumeLink.style.display = 'none';
                    }
                  }
                })
                .catch(function () {});
            }
          });
      });
  }

  syncLiveContent();

  // --- Set as Profile Picture Button (hero section) ---
  var setPhotoBtn = document.getElementById('set-photo-btn');
  var setPhotoInput = document.getElementById('set-photo-input');
  var setCropWrap = document.getElementById('set-photo-crop-wrap');
  var setCropImg = document.getElementById('set-photo-crop-img');
  var setCropApply = document.getElementById('set-photo-crop-apply');
  var setCropCancel = document.getElementById('set-photo-crop-cancel');
  var setCropper = null;
  var setPhotoData = null;

  if (setPhotoBtn) {
    setPhotoBtn.addEventListener('click', function () {
      setPhotoInput.click();
    });
  }

  if (setPhotoInput) {
    setPhotoInput.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      if (setCropper) { setCropper.destroy(); setCropper = null; }
      setCropWrap.style.display = 'none';
      setPhotoData = null;

      var reader = new FileReader();
      reader.onload = function (ev) {
        setCropImg.src = ev.target.result;
        setCropWrap.style.display = '';
        setCropImg.onload = function () {
          setCropper = new Cropper(setCropImg, {
            aspectRatio: 1,
            viewMode: 1,
            dragMode: 'move',
            autoCropArea: 1,
            background: false
          });
        };
      };
      reader.readAsDataURL(file);
    });
  }

  if (setCropApply) {
    setCropApply.addEventListener('click', function () {
      if (!setCropper) return;
      setPhotoData = setCropper.getCroppedCanvas({ width: 300, height: 300 }).toDataURL('image/jpeg', 0.90);
      setCropper.destroy();
      setCropper = null;
      setCropWrap.style.display = 'none';

      var photoDriveStatus = document.getElementById('admin-photo-drive-status');
      if (photoDriveStatus) {
        photoDriveStatus.textContent = 'Storing in cloud & activating...';
        photoDriveStatus.className = 'admin-drive-status';
      }
      showToast('info', 'Uploading...', 'Sending photo to Vercel Blob storage.');

      uploadToBlob('profile_photo.jpg', setPhotoData, true, photoDriveStatus)
        .then(function (cloudUrl) {
          profileImg.src = cloudUrl + (cloudUrl.indexOf('?') === -1 ? '?t=' : '&t=') + Date.now();
          showToast('success', 'Profile Picture Set', 'Photo uploaded to Vercel and set as your profile picture.');
          syncLiveContent();
          refreshLinks();
        })
        .catch(function () {
          showToast('error', 'Upload Failed', 'Cloud upload failed. Please try again.', 6000);
        })
        .finally(function () {
          setPhotoData = null;
          setPhotoInput.value = '';
        });
    });
  }

  if (setCropCancel) {
    setCropCancel.addEventListener('click', function () {
      if (setCropper) { setCropper.destroy(); setCropper = null; }
      setCropWrap.style.display = 'none';
      setPhotoData = null;
      setPhotoInput.value = '';
    });
  }

  // --- Set Resume PDF Button (admin panel) ---
  var setResumeBtn = document.getElementById('set-resume-btn');
  var setResumeInput = document.getElementById('set-resume-input');

  if (setResumeBtn) {
    setResumeBtn.addEventListener('click', function () {
      setResumeInput.click();
    });
  }

  if (setResumeInput) {
    setResumeInput.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var filename = file.name;
      var reader = new FileReader();
      reader.onload = function (ev) {
        var dataUrl = ev.target.result;
        var pdfDriveStatus = document.getElementById('admin-pdf-drive-status');
        if (pdfDriveStatus) {
          pdfDriveStatus.textContent = 'Storing in cloud & activating...';
          pdfDriveStatus.className = 'admin-drive-status';
        }
        showToast('info', 'Uploading...', 'Sending resume PDF to Vercel Blob storage.');

        uploadToBlob('resume.pdf', dataUrl, false, pdfDriveStatus)
          .then(function (cloudUrl) {
            var downloadUrl = cloudUrl.indexOf('?') === -1 ? (cloudUrl + '?download=1') : cloudUrl;
            if (resumeLink) {
              resumeLink.href = downloadUrl;
              resumeLink.download = filename || 'Ketan_Mahajan_Resume.pdf';
            }

            showToast('success', 'Resume Uploaded', 'Resume PDF stored in Vercel Blob and live on the website.');
            syncLiveContent();
            refreshLinks();
          })
          .catch(function () {
            showToast('error', 'Upload Failed', 'Cloud upload failed. Please try again.', 6000);
          })
          .finally(function () {
            setResumeInput.value = '';
          });
      };
      reader.readAsDataURL(file);
    });
  }

});
