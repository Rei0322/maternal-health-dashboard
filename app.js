// ---------- Theme toggle ----------
(function () {
  const t = document.querySelector('[data-theme-toggle]'),
    r = document.documentElement;
  let d = 'light'; // always open in light mode; the toggle switches to dark
  r.setAttribute('data-theme', d);
  t &&
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML =
        d === 'dark'
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      renderCharts(); // re-render so chart text colors match new theme
    });
})();

// ---------- KPI count-up ----------
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const isInt = Number.isInteger(target);
  const duration = 900;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = isInt ? Math.round(val) : val.toFixed(1);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = isInt ? target : target.toFixed(1);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('[data-count]').forEach(animateCount);

// ---------- Theme-aware color helpers ----------
function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

Chart.defaults.font.family = "'Hanken Grotesk', 'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size = 13;

let charts = [];

function destroyCharts() {
  charts.forEach((c) => c.destroy());
  charts = [];
}

function renderCharts() {
  destroyCharts();
  const text = cssVar('--color-text');
  const muted = cssVar('--color-text-muted');
  const divider = cssVar('--color-divider');
  const peer = cssVar('--color-peer');
  const peerDark = cssVar('--color-peer-dark');
  const us = cssVar('--color-us');
  const usHover = cssVar('--color-us-hover');
  const usSub = cssVar('--color-us-sub');
  const primary = cssVar('--color-primary');
  const accent = cssVar('--color-accent');

  const baseGrid = { color: divider, drawTicks: false };
  const baseTicks = { color: muted, font: { size: 12 } };

  // ---- Chart 1: Mortality ----
  const mCtx = document.getElementById('mortalityChart');
  const mColors = MORTALITY_DATA.map((d) =>
    d.group === 'us' ? us : d.group === 'us-sub' ? usSub : peer
  );
  charts.push(
    new Chart(mCtx, {
      type: 'bar',
      data: {
        labels: MORTALITY_DATA.map((d) => d.label),
        datasets: [
          {
            data: MORTALITY_DATA.map((d) => d.value),
            backgroundColor: mColors,
            borderRadius: 4,
            barThickness: 18,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.x} deaths per 100,000 live births (${MORTALITY_YEAR})`,
            },
          },
        },
        scales: {
          x: {
            grid: baseGrid,
            ticks: { ...baseTicks, callback: (v) => v },
            title: { display: true, text: 'Maternal deaths per 100,000 live births', color: muted, font: { size: 12 } },
          },
          y: { grid: { display: false }, ticks: { color: text, font: { size: 12 } } },
        },
      },
    })
  );

  // ---- Chart 3: Paid leave (dot plot via scatter-style horizontal bar) ----
  const lSorted = [...LEAVE_DATA].sort((a, b) => a.value - b.value);
  const lCtx = document.getElementById('leaveChart');
  charts.push(
    new Chart(lCtx, {
      type: 'bar',
      data: {
        labels: lSorted.map((d) => d.label),
        datasets: [
          {
            data: lSorted.map((d) => d.value),
            backgroundColor: lSorted.map((d) => (d.group === 'us' ? us : peer)),
            borderRadius: 4,
            barThickness: 14,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => `${ctx.parsed.x} weeks paid maternity leave` },
          },
          annotation: undefined,
        },
        scales: {
          x: {
            grid: baseGrid,
            ticks: baseTicks,
            title: { display: true, text: 'Weeks of paid maternity leave', color: muted, font: { size: 12 } },
            suggestedMax: 42,
          },
          y: { grid: { display: false }, ticks: { color: text, font: { size: 12 } } },
        },
      },
      plugins: [
        {
          id: 'oecdLine',
          afterDraw(chart) {
            const { ctx, chartArea, scales } = chart;
            const x = scales.x.getPixelForValue(OECD_AVERAGE_LEAVE);
            ctx.save();
            ctx.strokeStyle = accent;
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(x, chartArea.top);
            ctx.lineTo(x, chartArea.bottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = muted;
            ctx.font = '11px "Hanken Grotesk", sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText('OECD avg: 18.4 wks', x + 6, chartArea.top + 12);
            ctx.restore();
          },
        },
      ],
    })
  );

  // ---- Chart 4: Workforce ----
  const wSorted = [...WORKFORCE_DATA].sort((a, b) => a.obgyn + a.midwife - (b.obgyn + b.midwife));
  const wCtx = document.getElementById('workforceChart');
  charts.push(
    new Chart(wCtx, {
      type: 'bar',
      data: {
        labels: wSorted.map((d) => d.label),
        datasets: [
          {
            label: 'OB-GYNs per 1,000 live births',
            data: wSorted.map((d) => d.obgyn),
            backgroundColor: primary,
            borderRadius: 4,
            barThickness: 12,
          },
          {
            label: 'Midwives per 1,000 live births',
            data: wSorted.map((d) => d.midwife),
            backgroundColor: accent,
            borderRadius: 4,
            barThickness: 12,
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: baseGrid,
            ticks: baseTicks,
            title: { display: true, text: 'Providers per 1,000 live births', color: muted, font: { size: 12 } },
          },
          y: { grid: { display: false }, ticks: { color: text, font: { size: 12 } } },
        },
      },
    })
  );
}

renderCharts();

// ---------- Chart 2: Timing — custom 100%-stacked bar ----------
(function renderTiming() {
  const container = document.getElementById('timingChart');
  const shades = ['#a26e5d', '#7f5244', '#4a659c', '#3b5283', '#6b5446'];
  const total = TIMING_DATA.reduce((s, d) => s + d.value, 0);

  const bar = document.createElement('div');
  bar.className = 'timing-bar';
  TIMING_DATA.forEach((d, i) => {
    const seg = document.createElement('div');
    seg.className = 'timing-segment';
    seg.style.width = (d.value / total) * 100 + '%';
    seg.style.background = shades[i % shades.length];
    seg.textContent = d.value + '%';
    bar.appendChild(seg);
  });

  const labels = document.createElement('div');
  labels.className = 'timing-labels';
  TIMING_DATA.forEach((d) => {
    const l = document.createElement('div');
    l.className = 'timing-label';
    l.style.width = (d.value / total) * 100 + '%';
    l.textContent = d.label;
    labels.appendChild(l);
  });

  container.appendChild(bar);
  container.appendChild(labels);
})();
