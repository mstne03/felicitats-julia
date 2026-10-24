const COLS = ['#ff3d8b', '#ffd23f', '#2de2e6', '#ff7a2f', '#b28dff', '#fff7ec'];

// Devuelve burst(): lanza una ráfaga de confeti (no hace nada con prefers-reduced-motion).
export function initConfetti(cv) {
  const cx = cv.getContext('2d');
  let parts = [];
  let raf = 0;

  function size() {
    cv.width = innerWidth * devicePixelRatio;
    cv.height = innerHeight * devicePixelRatio;
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  size();
  addEventListener('resize', size);

  function tick() {
    cx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter((p) => p.y < innerHeight + 40 && p.life < 400);
    for (const p of parts) {
      p.vy += 0.32;
      p.vx *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life++;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.r);
      cx.fillStyle = p.c;
      if (p.note) {
        cx.font = '22px serif';
        cx.fillText('♪', 0, 0);
      } else cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cx.restore();
    }
    raf = parts.length ? requestAnimationFrame(tick) : 0;
    if (!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }

  return function burst() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < 160; i++) {
      parts.push({
        x: innerWidth / 2 + (Math.random() - 0.5) * innerWidth * 0.4,
        y: innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        r: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.3,
        c: COLS[i % COLS.length],
        note: Math.random() < 0.12,
        life: 0,
      });
    }
    if (!raf) tick();
  };
}
