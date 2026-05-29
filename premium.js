/* PC Brain — Premium starfield. Deeper ink (#06070d), slightly more nebulae. */
(function () {
  function init(c) {
    if (!c) c = document.getElementById('starfield');
    if (!c) return;
    const ctx = c.getContext('2d');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width  = (window.innerWidth) * dpr;
      c.height = (window.innerHeight) * dpr;
      c.style.width  = window.innerWidth + 'px';
      c.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    function draw() {
      const w = window.innerWidth, h = window.innerHeight;
      let seed = 137;
      const sr = () => {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        return (seed >>> 0) / 0xffffffff;
      };
      ctx.fillStyle = '#06070d';
      ctx.fillRect(0, 0, w, h);

      // Layer 1 — distant dust
      const small = Math.floor((w * h) / 1700);
      for (let i = 0; i < small; i++) {
        const x = sr() * w, y = sr() * h, r = sr() * 0.7 + 0.2, a = sr() * 0.35 + 0.12;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(2)})`; ctx.fill();
      }

      // Layer 2 — mid stars w/ slight blue tint
      const mid = Math.floor(small / 4);
      for (let i = 0; i < mid; i++) {
        const x = sr() * w, y = sr() * h, r = sr() * 1.1 + 0.5, a = sr() * 0.4 + 0.25;
        const tint = sr() > 0.55 ? '200,220,255' : (sr() > 0.5 ? '220,210,255' : '255,255,255');
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tint},${a.toFixed(2)})`; ctx.fill();
      }

      // Layer 3 — bright halated stars
      const bright = Math.floor(small / 18);
      for (let i = 0; i < bright; i++) {
        const x = sr() * w, y = sr() * h, r = sr() * 1.4 + 0.9, a = sr() * 0.35 + 0.45;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5);
        g.addColorStop(0, `rgba(180,210,255,${(a * 0.55).toFixed(2)})`);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(x, y, r * 5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,255,${a.toFixed(2)})`; ctx.fill();
      }

      // Nebulae — violet TL, cyan TR, deep violet bottom-center
      function nebula(cx, cy, rad, color) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      }
      nebula(w * 0.10, h * 0.04, w * 0.35, 'rgba(60,30,140,0.10)');
      nebula(w * 0.92, h * 0.10, w * 0.30, 'rgba(0,140,200,0.07)');
      nebula(w * 0.55, h * 0.95, w * 0.45, 'rgba(120,40,170,0.08)');
    }

    resize();
    let t;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(resize, 150); });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      c.style.display = 'none';
    }
  }
  window.PCBPremiumStarfield = init;
  if (document.readyState !== 'loading') init();
  else document.addEventListener('DOMContentLoaded', () => init());
})();
