/* ═══════════════════════════════════════════════════
   BIRTHDAY OS — COMPLETE SCRIPT
   For: Deepika ❤️
═══════════════════════════════════════════════════ */

const HER_NAME = "Deepika";

/* ── Inject name everywhere ── */
document.querySelectorAll(
  '#github-name, #hero-name, #cert-name'
).forEach(el => { if (el) el.textContent = HER_NAME; });

/* ════════════════════════════════════════════════════
   CURSOR GLOW + TRAIL
════════════════════════════════════════════════════ */
const cursorGlow = document.getElementById('cursor-glow');
const trailContainer = document.getElementById('cursor-trail-container');
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorGlow.style.left = mouseX + 'px';
  cursorGlow.style.top  = mouseY + 'px';

  /* trail dot */
  const dot = document.createElement('div');
  dot.className = 'cursor-trail';
  const hue = Math.floor(Math.random() * 60) - 30 + 340; // pinkish hues
  dot.style.cssText = `
    left:${mouseX}px; top:${mouseY}px;
    background:hsl(${hue},100%,65%);
    width:${Math.random()*6+4}px;
    height:${Math.random()*6+4}px;
  `;
  trailContainer.appendChild(dot);
  setTimeout(() => dot.remove(), 600);
});

/* ════════════════════════════════════════════════════
   MATRIX RAIN CANVAS
════════════════════════════════════════════════════ */
(function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols  = Math.floor(W / 16);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'DEEPIKABIRTHDAY01❤🎂🎊✨🚀💖HAPPYCODE01010101';
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '14px JetBrains Mono, monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const alpha = Math.random();
      ctx.fillStyle = alpha > 0.95
        ? '#ff2d55'
        : alpha > 0.8
          ? '#ff6b8a'
          : '#39ff14';
      ctx.fillText(ch, i * 16, y * 16);
      if (y * 16 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(drawMatrix, 60);
})();

/* ════════════════════════════════════════════════════
   FLOATING PARTICLES
════════════════════════════════════════════════════ */
(function initParticles() {
  const container = document.getElementById('particles-container');
  const colors = ['#ff2d55','#ff6b8a','#bf5af2','#00d4ff','#ffd60a','#ff00aa'];
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*12+8}s;
      animation-delay:${Math.random()*10}s;
    `;
    container.appendChild(p);
  }
})();

/* ════════════════════════════════════════════════════
   FIREWORKS CANVAS
════════════════════════════════════════════════════ */
const fwCanvas = document.getElementById('fireworks-canvas');
const fwCtx = fwCanvas.getContext('2d');
fwCanvas.width  = window.innerWidth;
fwCanvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  fwCanvas.width  = window.innerWidth;
  fwCanvas.height = window.innerHeight;
});

let fireworks = [];
let fwActive  = false;

function launchFirework(x, y) {
  const hue = Math.random() * 360;
  const particles = [];
  for (let i = 0; i < 120; i++) {
    const angle = (Math.PI * 2 / 120) * i + Math.random() * 0.3;
    const speed = Math.random() * 8 + 2;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      radius: Math.random() * 3 + 1,
      color: `hsl(${hue + Math.random() * 60 - 30},100%,65%)`,
      gravity: 0.08,
      decay: Math.random() * 0.015 + 0.012,
    });
  }
  fireworks.push(particles);
}

function animateFireworks() {
  fwCtx.fillStyle = 'rgba(0,0,0,0.18)';
  fwCtx.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
  fireworks = fireworks.filter(particles => {
    particles.forEach(p => {
      p.x  += p.vx; p.y  += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98; p.vy *= 0.98;
      p.alpha -= p.decay;
      fwCtx.globalAlpha = Math.max(0, p.alpha);
      fwCtx.beginPath();
      fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      fwCtx.fillStyle = p.color;
      fwCtx.fill();
    });
    fwCtx.globalAlpha = 1;
    return particles.some(p => p.alpha > 0);
  });
  if (fwActive || fireworks.length > 0) requestAnimationFrame(animateFireworks);
  else { fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height); }
}

function startFireworks(duration = 5000) {
  fwActive = true;
  animateFireworks();
  const interval = setInterval(() => {
    launchFirework(
      Math.random() * fwCanvas.width,
      Math.random() * fwCanvas.height * 0.7
    );
  }, 300);
  setTimeout(() => {
    fwActive = false;
    clearInterval(interval);
  }, duration);
}

/* ════════════════════════════════════════════════════
   SECTION NAVIGATION
════════════════════════════════════════════════════ */
const sections = [
  'boot-screen','terminal-section','vscode-section',
  'github-section','hero-section','certificate-section','error-section'
];
let currentSection = 'boot-screen';

function goToSection(id) {
  const prev = document.getElementById(currentSection);
  const next = document.getElementById(id);
  if (!next || currentSection === id) return;

  prev.classList.add('exit-up');
  prev.classList.remove('active-section');
  setTimeout(() => prev.classList.remove('exit-up'), 700);

  next.style.display = 'flex';
  setTimeout(() => next.classList.add('active-section'), 50);
  currentSection = id;
  updateNavDots(id);
  onSectionEnter(id);
}

function updateNavDots(id) {
  document.querySelectorAll('.nav-dot').forEach(dot => {
    dot.classList.toggle('active', dot.dataset.section === id);
  });
}

document.querySelectorAll('.nav-dot').forEach(dot => {
  dot.addEventListener('click', () => {
    const target = dot.dataset.section;
    if (sections.includes(target)) goToSection(target);
  });
});

function onSectionEnter(id) {
  switch(id) {
    case 'terminal-section':  startTerminal(); break;
    case 'vscode-section':    startVSCode(); break;
    case 'github-section':    startGitHub(); break;
    case 'hero-section':      startHero(); break;
    case 'certificate-section': startCert(); break;
    case 'error-section':     break;
  }
}

/* ════════════════════════════════════════════════════
   SECTION 1 — BOOT SCREEN
════════════════════════════════════════════════════ */
const bootSteps = [
  { pct: 5,  label: 'Loading kernel modules...', log: '<span class="log-ok">[ OK ]</span> kernel: birthday_core loaded' },
  { pct: 12, label: 'Initializing happiness.ko...', log: '<span class="log-ok">[ OK ]</span> happiness: module registered' },
  { pct: 20, label: 'Loading happiness...', log: '<span class="log-inf">[ -- ]</span> Loading <b>happiness</b> ████░░░░░░ 20%' },
  { pct: 35, label: 'Mounting /dev/cake...', log: '<span class="log-ok">[ OK ]</span> cake: /dev/cake mounted successfully 🎂' },
  { pct: 48, label: 'Starting memory allocator...', log: '<span class="log-ok">[ OK ]</span> malloc: allocated 365 days of joy' },
  { pct: 60, label: 'Injecting smiles...', log: '<span class="log-inf">[ -- ]</span> smile_daemon: injecting... ██████░░░░ 60%' },
  { pct: 72, label: 'Resolving DNS for love.local...', log: '<span class="log-ok">[ OK ]</span> dns: love.local → 127.0.0.1 ❤️' },
  { pct: 80, label: 'Injecting cake...', log: '<span class="log-ok">[ OK ]</span> cake: injected ██████████ 80% 🎂' },
  { pct: 91, label: 'Compiling happiness bytecode...', log: '<span class="log-ok">[ OK ]</span> gcc: happiness.so compiled with -O3 ✨' },
  { pct: 100, label: '✅ Deployment Successful', log: '<span class="log-ok">[ OK ]</span> BirthdayOS ready — Welcome, <b style="color:#ff2d55">Deepika</b> ❤️' },
];

(function startBoot() {
  const bar   = document.getElementById('progress-bar');
  const pct   = document.getElementById('progress-pct');
  const label = document.getElementById('progress-label');
  const log   = document.getElementById('boot-log');
  let idx = 0;

  function step() {
    if (idx >= bootSteps.length) {
      setTimeout(() => goToSection('terminal-section'), 1200);
      return;
    }
    const s = bootSteps[idx++];
    bar.style.width   = s.pct + '%';
    pct.textContent   = s.pct + '%';
    label.textContent = s.label;
    log.innerHTML    += `<div>${s.log}</div>`;
    log.scrollTop     = log.scrollHeight;
    setTimeout(step, idx === bootSteps.length ? 800 : Math.random() * 350 + 200);
  }
  setTimeout(step, 600);
})();

/* ════════════════════════════════════════════════════
   SECTION 2 — TERMINAL
════════════════════════════════════════════════════ */
const terminalScript = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'engineer_who_cares_a_lot 👨‍💻', cls: 't-out' },
  { type: 'cmd', text: 'git log --oneline --author="Deepika"' },
  { type: 'out', text: 'a3f9c12  feat: be absolutely amazing', cls: 't-out' },
  { type: 'out', text: 'b7e2d45  fix: removed all sadness', cls: 't-out' },
  { type: 'out', text: 'c1a8f90  chore: smiled at everyone', cls: 't-out' },
  { type: 'cmd', text: 'cat /etc/birthday.conf' },
  { type: 'out', text: 'NAME=Deepika\nDATE=today\nVIBES=immaculate\nHAPPINESS=∞', cls: 't-info' },
  { type: 'cmd', text: 'git commit -m "Happy Birthday"' },
  { type: 'out', text: '[main] 1 file changed, ∞ insertions(+), 0 deletions(-)', cls: 't-success' },
  { type: 'cmd', text: 'git push origin happiness' },
  { type: 'out', text: 'Enumerating joy...  Done.\nCounting blessings... 365\nPushing to origin/happiness ━━━━━━ 100%', cls: 't-out' },
  { type: 'out', text: 'Done. 🚀', cls: 't-success' },
  { type: 'cmd', text: 'echo "Happy Birthday, Deepika! ❤️"' },
  { type: 'big', text: '✨ Happy Birthday, Deepika! ❤️ ✨', cls: 't-big' },
];

function startTerminal() {
  const output = document.getElementById('terminal-output');
  const nextBtn = document.getElementById('terminal-next-btn');
  output.innerHTML = '';
  let i = 0;

  function typeCmd(text, onDone) {
    const el = document.createElement('div');
    el.innerHTML = '<span class="t-cmd">$ </span><span></span>';
    output.appendChild(el);
    const span = el.querySelector('span:last-child');
    let j = 0;
    const iv = setInterval(() => {
      span.textContent += text[j++];
      if (j >= text.length) { clearInterval(iv); setTimeout(onDone, 300); }
    }, 40);
  }

  function showOut(text, cls, onDone) {
    const el = document.createElement('div');
    el.className = cls || 't-out';
    el.style.whiteSpace = 'pre-wrap';
    el.textContent = text;
    el.style.opacity = 0;
    output.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity 0.4s'; el.style.opacity = 1; }, 50);
    const tb = document.getElementById('terminal-body');
    tb.scrollTop = tb.scrollHeight;
    setTimeout(onDone, 400);
  }

  function next() {
    if (i >= terminalScript.length) {
      nextBtn.style.display = 'inline-block';
      nextBtn.style.opacity = 0;
      setTimeout(() => { nextBtn.style.transition = 'opacity 0.5s'; nextBtn.style.opacity = 1; }, 100);
      return;
    }
    const s = terminalScript[i++];
    const delay = s.type === 'cmd' ? 500 : 120;
    setTimeout(() => {
      if (s.type === 'cmd')  typeCmd(s.text, next);
      else                   showOut(s.text, s.cls, next);
    }, delay);
  }
  setTimeout(next, 300);
}

/* ════════════════════════════════════════════════════
   SECTION 3 — VS CODE
════════════════════════════════════════════════════ */
const vsFiles = {
  '❤️ heart.js': {
    tab: '❤️ heart.js',
    lang: 'js',
    code: [
      { t: 'cc', s: '// heart.js — the most important module' },
      { t: 'cc', s: '// Author: Your Friendly Engineer ❤️' },
      { t: '', s: '' },
      { t: 'ck', s: 'const ', n: 'cn', ns: 'Deepika ', r: '= {' },
      { t: 'cs', s: "  name: 'Deepika'," },
      { t: 'cv', s: '  happiness: Infinity,' },
      { t: 'cv', s: '  smiles_per_day: 1000,' },
      { t: 'cs', s: "  today: '🎂 Birthday'," },
      { t: '', s: '' },
      { t: 'cn', s: '  deploy() {' },
      { t: 'cc', s: "    // returns joy to everyone 🌸" },
      { t: '', s: "    return '✨ ' + this.name + ' is amazing! ✨';" },
      { t: '', s: '  },' },
      { t: '', s: '' },
      { t: 'cn', s: '  celebrate() {' },
      { t: '', s: "    console.log('🎊 Happy Birthday, Deepika!');" },
      { t: '', s: "    console.log('❤️  You make every day brighter.');" },
      { t: '', s: '    launchFireworks();' },
      { t: '', s: '    deployConfetti();' },
      { t: '', s: '  }' },
      { t: '', s: '};' },
      { t: '', s: '' },
      { t: 'ck', s: 'export default ', n: 'cn', ns: 'Deepika', r: ';' },
    ],
  },
  '🎂 cake.ts': {
    tab: '🎂 cake.ts',
    lang: 'ts',
    code: [
      { t: 'cc', s: '// cake.ts — birthday cake interface' },
      { t: '', s: '' },
      { t: 'ck', s: 'interface ', n: 'cn', ns: 'BirthdayCake ', r: '{' },
      { t: '', s: '  candles: number;' },
      { t: '', s: '  flavor: string;' },
      { t: '', s: '  wishes: string[];' },
      { t: '', s: '}' },
      { t: '', s: '' },
      { t: 'ck', s: 'const ', n: 'cn', ns: 'deepikasCake', r: ': BirthdayCake = {' },
      { t: 'cv', s: '  candles: /* her age */ Infinity,' },
      { t: 'cs', s: "  flavor: 'Chocolate Overload 🍫'," },
      { t: '', s: '  wishes: [' },
      { t: 'cs', s: "    'Endless happiness 💫'," },
      { t: 'cs', s: "    'All your dreams realized ✨'," },
      { t: 'cs', s: "    'Zero bugs in life 🐛'," },
      { t: 'cs', s: "    'Always be loved ❤️'," },
      { t: '', s: '  ]' },
      { t: '', s: '};' },
    ],
  },
  '🎊 wishes.json': {
    tab: '🎊 wishes.json',
    lang: 'json',
    code: [
      { t: '', s: '{' },
      { t: 'ck', s: '  "to": ', n: 'cs', ns: '"Deepika"', r: ',' },
      { t: 'ck', s: '  "from": ', n: 'cs', ns: '"Your Friendly Engineer"', r: ',' },
      { t: 'ck', s: '  "occasion": ', n: 'cs', ns: '"Birthday 🎂"', r: ',' },
      { t: 'ck', s: '  "message": ', n: 'cs', ns: '"You are absolutely wonderful."', r: ',' },
      { t: 'ck', s: '  "wishes": ', r: '[' },
      { t: 'cs', s: '    "May your code always compile",' },
      { t: 'cs', s: '    "May your PRs always get approved",' },
      { t: 'cs', s: '    "May your coffee always be perfect ☕",' },
      { t: 'cs', s: '    "May you always be surrounded by love ❤️"' },
      { t: '', s: '  ],' },
      { t: 'ck', s: '  "confidence": ', n: 'cv', ns: '100', r: ',' },
      { t: 'ck', s: '  "love": ', n: 'cs', ns: '"Infinite ∞"' },
      { t: '', s: '}' },
    ],
  }
};

function renderVSCode(filename) {
  const file  = vsFiles[filename];
  const area  = document.getElementById('vscode-code');
  const tab   = document.getElementById('vscode-tab-name');
  if (!file || !area || !tab) return;
  tab.textContent = file.tab;
  area.innerHTML  = '';
  file.code.forEach(line => {
    const div = document.createElement('span');
    div.className = 'code-line';
    if (line.n) {
      div.innerHTML =
        `<span class="${line.t}">${escHtml(line.s)}</span>` +
        `<span class="${line.n}">${escHtml(line.ns)}</span>` +
        `<span>${escHtml(line.r || '')}</span>`;
    } else {
      div.innerHTML = `<span class="${line.t}">${escHtml(line.s)}</span>`;
    }
    area.appendChild(div);
  });
}

function escHtml(s='') {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

let vsCodeStarted = false;
function startVSCode() {
  if (vsCodeStarted) return;
  vsCodeStarted = true;
  renderVSCode('❤️ heart.js');

  /* Explorer click */
  document.getElementById('vs-file-heart').addEventListener('click', () => {
    setActiveExplorer('vs-file-heart');
    renderVSCode('❤️ heart.js');
  });
  document.getElementById('vs-file-cake').addEventListener('click', () => {
    setActiveExplorer('vs-file-cake');
    renderVSCode('🎂 cake.ts');
  });
  document.getElementById('vs-file-wishes').addEventListener('click', () => {
    setActiveExplorer('vs-file-wishes');
    renderVSCode('🎊 wishes.json');
  });

  setTimeout(() => {
    const btn = document.getElementById('vscode-next-btn');
    if (btn) { btn.style.display = 'inline-block'; }
  }, 1500);
}

function setActiveExplorer(id) {
  document.querySelectorAll('.explorer-item').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

/* ════════════════════════════════════════════════════
   SECTION 4 — GITHUB
════════════════════════════════════════════════════ */
const fakeCommits = [
  { hash: 'a1b2c3d', msg: 'feat: deploy another year of awesomeness 🚀', time: '2h ago' },
  { hash: 'e4f5g6h', msg: 'fix: removed every trace of sadness 🛠️',    time: '5h ago' },
  { hash: 'i7j8k9l', msg: 'chore: smiled at 100 people today 😊',       time: '1d ago' },
  { hash: 'm0n1o2p', msg: 'feat: added cake to production 🎂',           time: '2d ago' },
  { hash: 'q3r4s5t', msg: 'style: glowed up. naturally. ✨',             time: '3d ago' },
];

let githubStarted = false;
function startGitHub() {
  if (githubStarted) return;
  githubStarted = true;
  buildContribGraph();
  buildFakeCommits();
  setTimeout(() => {
    const btn = document.getElementById('github-next-btn');
    if (btn) { btn.style.display = 'inline-block'; }
  }, 2000);
}

function buildContribGraph() {
  const grid = document.getElementById('contrib-graph');
  if (!grid) return;
  const levels = ['#0d1117','#ff2d55','#ff6b8a','#ff9eb5','#ffc8d6','#ffe4ec'];
  const totalCells = 7 * 53;
  const today = new Date();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    const daysAgo = totalCells - 1 - i;
    const d = new Date(today); d.setDate(d.getDate() - daysAgo);
    const isBirthday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth();

    let level;
    if (isBirthday) level = 5;
    else {
      const r = Math.random();
      level = r < 0.35 ? 0 : Math.floor(r * 5) + 1;
      if (level > 5) level = 5;
    }
    cell.style.background = levels[level];
    cell.title = `${d.toDateString()} — ${level > 0 ? level + ' contributions' : 'no contributions'}`;
    setTimeout(() => { cell.style.opacity = '1'; }, i * 2);
    grid.appendChild(cell);
  }
}

function buildFakeCommits() {
  const container = document.getElementById('fake-commits');
  if (!container) return;
  fakeCommits.forEach((c, idx) => {
    const item = document.createElement('div');
    item.className = 'commit-item';
    item.innerHTML = `
      <span class="commit-hash">${c.hash}</span>
      <span class="commit-msg">${c.msg}</span>
      <span class="commit-time">${c.time}</span>
    `;
    container.appendChild(item);
    setTimeout(() => item.classList.add('show'), idx * 300 + 400);
  });
}

/* ════════════════════════════════════════════════════
   SECTION 5 — HERO
════════════════════════════════════════════════════ */
const heroCommands = [
  '$ git push origin happiness',
  'Pushing... ████████████ Done ✓',
  '$ ssh deepika@life.beautiful',
  'Welcome. Everything is better now. ❤️',
];

let heroStarted = false;
function startHero() {
  if (heroStarted) return;
  heroStarted = true;

  /* floating emojis */
  const floaters = document.getElementById('floaters');
  const emojis   = ['❤️','🎂','🎊','✨','🎉','💖','🌸','🚀','⭐','🍰','💫','🎈'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'float-emoji';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*12+8}s;
      animation-delay:${Math.random()*8}s;
      font-size:${Math.random()*1.5+1}rem;
    `;
    floaters.appendChild(el);
  }

  /* hero terminal typewriter */
  const cmdEl = document.getElementById('hero-cmd');
  let hi = 0;
  function cycleCmd() {
    if (!cmdEl) return;
    const txt = heroCommands[hi % heroCommands.length];
    hi++;
    cmdEl.textContent = '';
    let j = 0;
    const iv = setInterval(() => {
      cmdEl.textContent += txt[j++];
      if (j >= txt.length) { clearInterval(iv); setTimeout(cycleCmd, 2000); }
    }, 55);
  }
  cycleCmd();

  /* rocket launch on section enter */
  setTimeout(rocketLaunch, 800);

  /* auto-fireworks */
  startFireworks(4000);
}

function rocketLaunch() {
  const rc = document.getElementById('rocket-container');
  const rocket = document.getElementById('rocket');
  if (!rc || !rocket) return;
  rc.style.transition = 'bottom 2s cubic-bezier(0.25,0.46,0.45,0.94)';
  rc.style.bottom = '110%';
  setTimeout(() => {
    rc.style.transition = '';
    rc.style.bottom = '-80px';
    setTimeout(rocketLaunch, 8000);
  }, 2200);
}

/* ════════════════════════════════════════════════════
   SECTION 6 — CERTIFICATE
════════════════════════════════════════════════════ */
function startCert() {
  const cert = document.querySelector('.cert-card');
  if (!cert) return;
  cert.style.transform = 'scale(0.9) rotateY(15deg)';
  cert.style.opacity   = '0';
  cert.style.transition = 'all 0.8s cubic-bezier(0.34,1.56,0.64,1)';
  setTimeout(() => {
    cert.style.transform = 'scale(1) rotateY(0deg)';
    cert.style.opacity   = '1';
  }, 100);
}

/* ════════════════════════════════════════════════════
   CONFETTI
════════════════════════════════════════════════════ */
function triggerConfetti() {
  const overlay = document.getElementById('confetti-overlay');
  const colors  = ['#ff2d55','#ffd60a','#bf5af2','#00d4ff','#39ff14','#ff00aa','#ffffff'];
  const shapes  = ['◆','●','▲','■','★','♥'];

  for (let i = 0; i < 200; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size  = Math.random() * 12 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.textContent = shape;
    piece.style.cssText = `
      left:${Math.random()*100}%;
      font-size:${size}px;
      color:${color};
      animation-duration:${Math.random()*3+2}s;
      animation-delay:${Math.random()*1.5}s;
    `;
    overlay.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
  startFireworks(5000);
}

/* ════════════════════════════════════════════════════
   DEPLOY HAPPINESS (404 section)
════════════════════════════════════════════════════ */
function deployHappiness() {
  triggerConfetti();
  setTimeout(() => goToSection('easter-section'), 800);
}

/* ════════════════════════════════════════════════════
   EASTER EGG
════════════════════════════════════════════════════ */
const easterLines = [
  { cls: 'el-line', txt: '> Developer Console' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line el-white', txt: 'Congratulations.' },
  { cls: 'el-line', txt: 'You discovered the easter egg. 🥚' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line', txt: 'Finding awesome people in the universe...' },
  { cls: 'el-line el-white', txt: '████████████████ 100%' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line el-gold', txt: '✓ Search complete.' },
  { cls: 'el-line el-gold', txt: '  1 result found.' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line el-pink el-big', txt: '  YOU ❤️' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line el-white', txt: `  name    : "${HER_NAME}"` },
  { cls: 'el-line el-white', txt: '  status  : Absolutely Amazing' },
  { cls: 'el-line el-white', txt: '  uptime  : 100% (since birth)' },
  { cls: 'el-line el-white', txt: '  version : Birthday Edition 2026' },
  { cls: 'el-line', txt: '' },
  { cls: 'el-line el-gold', txt: '> Happy Birthday, Deepika. 🎂' },
  { cls: 'el-line el-gold', txt: '> You are one of a kind. ✨' },
];

(function initEasterEgg() {
  /* Konami-ish: typing "deepika" triggers it */
  let typed = '';
  document.addEventListener('keydown', e => {
    typed += e.key.toLowerCase();
    if (typed.length > 10) typed = typed.slice(-10);
    if (typed.includes('deepika')) {
      typed = '';
      revealEaster();
    }
  });
})();

function revealEaster() {
  const eSection = document.getElementById('easter-section');
  eSection.style.display = 'flex';
  goToSection('error-section'); // bounce through 404 first
  setTimeout(() => goToSection('easter-section'), 100);
  const log = document.getElementById('easter-log');
  if (!log) return;
  log.innerHTML = '';
  easterLines.forEach((line, idx) => {
    const div = document.createElement('div');
    div.className = line.cls;
    div.textContent = line.txt;
    div.style.animationDelay = (idx * 0.12) + 's';
    log.appendChild(div);
  });
  startFireworks(6000);
  triggerConfetti();
}

/* Also trigger after "Deploy Happiness" in 404 */
function deployHappiness() {
  triggerConfetti();
  startFireworks(4000);
  setTimeout(() => revealEaster(), 1200);
}

/* ════════════════════════════════════════════════════
   AI POPUP
════════════════════════════════════════════════════ */
const aiMessages = [
  `<p>Hello! 👋 I've scanned <strong>7 billion humans</strong>. Found <strong>1 exceptional one</strong>.</p><p>Confidence: <span style="color:#ff2d55"><strong>100%</strong></span> ❤️</p>`,
  `<p>My analysis shows that <strong>${HER_NAME}</strong> brings <strong>+500 joy units</strong> to every room she enters. 📊</p>`,
  `<p>Predicted happiness for today: <strong>∞</strong> 🚀<br>Predicted bugs: <strong>0</strong> ✅</p>`,
  `<p>Fun fact: The universe has been celebrating your existence since the day you were born. 🌌</p>`,
  `<p>Final output: <span style="color:#ff2d55"><strong>${HER_NAME}</strong></span> = <strong>One of a kind</strong> ✨<br>No further analysis needed.</p>`,
];
let aiIdx = 0;
let aiOpen = false;

function toggleAI() {
  const popup = document.getElementById('ai-popup');
  aiOpen = !aiOpen;
  popup.classList.toggle('open', aiOpen);
}
function closeAI() {
  document.getElementById('ai-popup').classList.remove('open');
  aiOpen = false;
}
function aiNextMessage() {
  aiIdx = (aiIdx + 1) % aiMessages.length;
  document.getElementById('ai-popup-body').innerHTML = aiMessages[aiIdx];
}

/* auto-show AI popup after hero enters */
setTimeout(() => {
  if (currentSection === 'hero-section') {
    document.getElementById('ai-popup').classList.add('open');
    aiOpen = true;
    setTimeout(() => closeAI(), 5000);
  }
}, 3000);

/* ════════════════════════════════════════════════════
   MUSIC (Web Audio API — happy birthday melody)
════════════════════════════════════════════════════ */
let audioCtx = null;
let musicPlaying = false;
let musicInterval = null;

/* Happy Birthday note sequence: freq (Hz) + duration (s) */
const happyBdayNotes = [
  [261.6,0.3],[261.6,0.1],[293.7,0.4],[261.6,0.4],[349.2,0.4],[329.6,0.8],
  [261.6,0.3],[261.6,0.1],[293.7,0.4],[261.6,0.4],[392.0,0.4],[349.2,0.8],
  [261.6,0.3],[261.6,0.1],[523.3,0.4],[440.0,0.4],[349.2,0.4],[329.6,0.4],[293.7,0.8],
  [466.2,0.3],[466.2,0.1],[440.0,0.4],[349.2,0.4],[392.0,0.4],[349.2,0.8],
];

function playNote(freq, duration, startTime) {
  const osc  = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
  gain.gain.linearRampToValueAtTime(0, startTime + duration - 0.05);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playHappyBirthday() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let t = audioCtx.currentTime + 0.1;
  happyBdayNotes.forEach(([freq, dur]) => {
    playNote(freq, dur, t);
    t += dur + 0.05;
  });
  return t - audioCtx.currentTime + 0.5;
}

function toggleMusic() {
  const btn = document.getElementById('music-btn');
  if (musicPlaying) {
    clearTimeout(musicInterval);
    musicPlaying = false;
    btn.textContent = '🎵';
    btn.classList.remove('playing');
  } else {
    musicPlaying = true;
    btn.textContent = '🔇';
    btn.classList.add('playing');
    function loopSong() {
      if (!musicPlaying) return;
      const len = playHappyBirthday();
      musicInterval = setTimeout(loopSong, len * 1000);
    }
    loopSong();
  }
}

/* ════════════════════════════════════════════════════
   KEYBOARD SHORTCUTS
════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    const idx = sections.indexOf(currentSection);
    if (idx < sections.length - 1) goToSection(sections[idx + 1]);
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    const idx = sections.indexOf(currentSection);
    if (idx > 0) goToSection(sections[idx - 1]);
  }
  if (e.key === 'm' || e.key === 'M') toggleMusic();
  if (e.key === 'f' || e.key === 'F') triggerConfetti();
});

/* ════════════════════════════════════════════════════
   TOUCH SWIPE NAVIGATION (mobile)
════════════════════════════════════════════════════ */
(function initSwipe() {
  let touchStartX = 0, touchStartY = 0;
  document.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return; // too short
    if (Math.abs(dx) > Math.abs(dy)) {
      // horizontal swipe
      const idx = sections.indexOf(currentSection);
      if (dx < -40 && idx < sections.length - 1) goToSection(sections[idx + 1]); // swipe left → next
      if (dx >  40 && idx > 0)                   goToSection(sections[idx - 1]); // swipe right → prev
    }
  }, { passive: true });
})();

/* ════════════════════════════════════════════════════
   CLICK ANYWHERE TO MAKE MINI FIREWORK
════════════════════════════════════════════════════ */
document.addEventListener('click', e => {
  if (['BUTTON','INPUT','A'].includes(e.target.tagName)) return;
  launchFirework(e.clientX, e.clientY);
  if (fireworks.length === 1) animateFireworks();
});

/* ════════════════════════════════════════════════════
   RESIZE
════════════════════════════════════════════════════ */
window.addEventListener('resize', () => {
  fwCanvas.width  = window.innerWidth;
  fwCanvas.height = window.innerHeight;
});

console.log(`%c
██████╗ ███████╗███████╗██████╗ ██╗██╗  ██╗ █████╗
██╔══██╗██╔════╝██╔════╝██╔══██╗██║██║ ██╔╝██╔══██╗
██║  ██║█████╗  █████╗  ██████╔╝██║█████╔╝ ███████║
██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██║██╔═██╗ ██╔══██║
██████╔╝███████╗███████╗██║     ██║██║  ██╗██║  ██║
╚═════╝ ╚══════╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝

Happy Birthday, Deepika! ❤️
Type "deepika" to unlock the easter egg 🥚
Press M to toggle music 🎵
Press F for confetti 🎊
`, 'color: #ff2d55; font-size: 12px;');
