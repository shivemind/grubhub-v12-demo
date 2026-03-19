function initSlideBG() {
  const canvas = document.getElementById('slideBgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles, gridPulse = 0, time = 0;

  const ORANGE = { r: 255, g: 85, b: 1 };
  const GREEN  = { r: 0,  g: 165, b: 80 };
  const WHITE  = { r: 200, g: 200, b: 220 };

  function resize() {
    w = canvas.width  = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((w * h) / 6000);
    for (let i = 0; i < count; i++) {
      const palette = [ORANGE, GREEN, WHITE][Math.floor(Math.random() * 3)];
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        color: palette,
        alpha: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function drawGrid() {
    const spacing = 60;
    const glow = 0.03 + Math.sin(gridPulse) * 0.015;
    ctx.strokeStyle = `rgba(255, 85, 1, ${glow})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let x = 0; x < w; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = 0; y < h; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.stroke();
  }

  function drawOrbs() {
    const orbs = [
      { x: w * 0.15, y: h * 0.35, radius: h * 0.35, color: ORANGE, alpha: 0.06 },
      { x: w * 0.85, y: h * 0.65, radius: h * 0.30, color: GREEN,  alpha: 0.04 },
      { x: w * 0.5,  y: h * 0.2,  radius: h * 0.25, color: ORANGE, alpha: 0.03 }
    ];
    orbs.forEach((o, i) => {
      const drift = Math.sin(time * 0.3 + i * 2) * 30;
      const grad = ctx.createRadialGradient(
        o.x + drift, o.y + drift * 0.5, 0,
        o.x + drift, o.y + drift * 0.5, o.radius
      );
      const a = o.alpha + Math.sin(time * 0.5 + i) * 0.015;
      grad.addColorStop(0, `rgba(${o.color.r},${o.color.g},${o.color.b},${a})`);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });
  }

  function drawParticles() {
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      p.pulse += 0.02;
      const a = p.alpha * (0.6 + Math.sin(p.pulse) * 0.4);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${a})`;
      ctx.fill();
    });
  }

  function drawConnections() {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.08;
          ctx.strokeStyle = `rgba(255, 85, 1, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawScanLine() {
    const yPos = (time * 40) % (h + 60) - 30;
    const grad = ctx.createLinearGradient(0, yPos - 30, 0, yPos + 30);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.5, 'rgba(255, 85, 1, 0.03)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, yPos - 30, w, 60);
  }

  function drawVignette() {
    const grad = ctx.createRadialGradient(w / 2, h / 2, h * 0.25, w / 2, h / 2, h * 0.9);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, 'rgba(15, 15, 26, 0.6)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function frame() {
    time += 0.016;
    gridPulse += 0.015;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(0, 0, w, h);

    drawGrid();
    drawOrbs();
    drawScanLine();
    drawParticles();
    drawConnections();
    drawVignette();

    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  frame();
}

function initSlides() {
  const container = document.getElementById('slidesContainer');

  const canvasEl = document.createElement('canvas');
  canvasEl.id = 'slideBgCanvas';
  container.appendChild(canvasEl);

  const slides = [
    {
      eyebrow: 'The Evolution',
      title: 'Postman v12: From API Client to API Platform',
      body: `
        <p>APIs have become the interface between applications, services, and increasingly AI systems.</p>
        <p>As organizations scale, managing APIs requires visibility, governance, and distribution across teams.</p>
        <p style="margin-top:24px;font-weight:600;color:var(--text-primary);">Postman v12 introduces a management plane and a distribution plane on top of the traditional API workflow.</p>
      `,
      visual: `
        <div style="display:flex;gap:16px;justify-content:center;margin-top:32px;">
          <div style="padding:16px 28px;background:rgba(34,34,58,0.8);border:1px solid var(--border);border-radius:var(--radius-lg);text-align:center;backdrop-filter:blur(8px);">
            <div style="font-size:2rem;margin-bottom:8px;">&#x1f4e6;</div>
            <div style="font-size:0.85rem;font-weight:600;">API Client</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Testing &amp; Debugging</div>
          </div>
          <div style="display:flex;align-items:center;font-size:2rem;color:var(--gh-red);">&rarr;</div>
          <div style="padding:16px 28px;background:linear-gradient(135deg,rgba(255,85,1,0.15),rgba(0,165,80,0.1));border:1px solid var(--gh-red);border-radius:var(--radius-lg);text-align:center;backdrop-filter:blur(8px);">
            <div style="font-size:2rem;margin-bottom:8px;">&#x1f3d7;&#xfe0f;</div>
            <div style="font-size:0.85rem;font-weight:600;color:var(--gh-red);">API Platform</div>
            <div style="font-size:0.7rem;color:var(--text-secondary);margin-top:4px;">Visibility \u00b7 Governance \u00b7 Distribution</div>
          </div>
        </div>
      `
    },
    {
      eyebrow: 'Platform Architecture',
      title: 'Three Layers of the Postman v12 Platform',
      body: `<p>The management plane gives platform teams visibility and governance. The distribution plane enables discovery and reuse. The inner dev loop powers day-to-day workflows.</p>`,
      visual: `
        <div class="arch-layers">
          <div class="arch-layer distribution">
            <div class="layer-label">Distribution Plane</div>
            Private API Network \u00b7 API Discovery \u00b7 Developer Portal
          </div>
          <div class="arch-layer management">
            <div class="layer-label">Management Plane</div>
            API Catalog \u00b7 Governance Rules \u00b7 Insights &amp; Analytics
          </div>
          <div class="arch-layer devloop">
            <div class="layer-label">Inner Dev Loop</div>
            Design \u00b7 Test \u00b7 Debug \u00b7 Document \u00b7 Monitor
          </div>
        </div>
      `
    },
    {
      eyebrow: 'Developer Workflows',
      title: 'Built for Modern Developer Workflows',
      body: `<p>Postman v12 integrates natively with Git, CI/CD, YAML-first specs, and AI-powered automation.</p>`,
      visual: `
        <div class="workflow-grid">
          <div class="workflow-item">
            <div class="workflow-icon git">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><path d="M5.6 5.6l4.2 4.2"/><path d="M14.2 14.2l4.2 4.2"/></svg>
            </div>
            <span class="workflow-label">Git Sync</span>
          </div>
          <div class="workflow-item">
            <div class="workflow-icon ci">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
            </div>
            <span class="workflow-label">CI/CD Pipeline</span>
          </div>
          <div class="workflow-item">
            <div class="workflow-icon yaml">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>
            </div>
            <span class="workflow-label">YAML Specs</span>
          </div>
          <div class="workflow-item">
            <div class="workflow-icon ai">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z"/><path d="M16 14h.01"/><path d="M8 14h.01"/><path d="M12 17v4"/><path d="M8 21h8"/><path d="M20 10c0 4.418-3.582 8-8 8s-8-3.582-8-8"/></svg>
            </div>
            <span class="workflow-label">Agent Mode</span>
          </div>
        </div>
      `
    }
  ];

  slides.forEach((slide, i) => {
    const el = document.createElement('div');
    el.className = `slide${i === 0 ? ' active' : ''}`;
    el.innerHTML = `
      <div class="slide-content">
        <div class="slide-eyebrow">${slide.eyebrow}</div>
        <div class="slide-title">${slide.title}</div>
        ${slide.visual}
        <div class="slide-body">${slide.body}</div>
      </div>
    `;
    container.appendChild(el);
  });

  let current = 0;
  const allSlides = container.querySelectorAll('.slide');
  const indicator = document.getElementById('slideIndicator');

  function goTo(idx) {
    if (idx < 0 || idx >= allSlides.length) return;
    allSlides[current].classList.remove('active');
    allSlides[current].classList.add('exit');
    setTimeout(() => allSlides[current === 0 ? allSlides.length - 1 : current - 1]?.classList.remove('exit'), 500);

    current = idx;
    allSlides.forEach(s => { s.classList.remove('active'); s.classList.remove('exit'); });
    allSlides[current].classList.add('active');
    indicator.textContent = `${current + 1} / ${allSlides.length}`;
  }

  document.getElementById('prevSlide').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextSlide').addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', e => {
    if (!document.getElementById('tab-slides').classList.contains('active')) return;
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  initSlideBG();
}
