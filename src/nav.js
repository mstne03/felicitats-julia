// Navegación: dock, teclado, clic (el tercio izquierdo retrocede), swipe y deep-link por hash.
export function initNav({ slides, deck, onEnter }) {
  const n = slides.length;
  const count = document.getElementById('count');
  const nowTitle = document.getElementById('nowTitle');
  const wave = document.getElementById('wave');
  const hint = document.getElementById('hint');
  let cur = 0;

  for (let i = 0; i < n; i++) {
    const b = document.createElement('i');
    b.style.height = 30 + Math.abs(Math.sin(i * 1.7)) * 70 + '%';
    wave.appendChild(b);
  }
  const bars = [...wave.children];

  function go(i, initial = false) {
    i = Math.max(0, Math.min(n - 1, i));
    if (i === cur && slides[i].classList.contains('active')) return;
    slides.forEach((s, k) => {
      s.classList.toggle('active', k === i);
      s.classList.toggle('before', k < i);
    });
    cur = i;
    count.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
    nowTitle.textContent = slides[i].dataset.title;
    bars.forEach((b, k) => b.classList.toggle('on', k <= i));
    // reinicia la animación de la barra de progreso
    slides[i].querySelectorAll('.bar i').forEach((el) => {
      el.style.animation = 'none';
      void el.offsetWidth;
      el.style.animation = '';
    });
    onEnter(i, slides[i], initial);
    try {
      history.replaceState(null, '', '#' + (i + 1));
    } catch {
      /* iframes sandboxed */
    }
    if (i > 0) hint.style.opacity = 0;
  }

  const next = () => go(cur + 1);
  const prev = () => go(cur - 1);
  document.getElementById('next').onclick = (e) => {
    e.stopPropagation();
    next();
  };
  document.getElementById('prev').onclick = (e) => {
    e.stopPropagation();
    prev();
  };
  document.getElementById('again').onclick = (e) => {
    e.stopPropagation();
    go(0);
  };

  addEventListener('keydown', (e) => {
    // Enter/Espacio sobre un botón activan el botón, no avanzan la diapositiva
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('button')) return;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
      e.preventDefault();
      next();
    } else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) {
      e.preventDefault();
      prev();
    } else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(n - 1);
  });

  deck.addEventListener('click', (e) => {
    if (e.target.closest('button,video,a')) return;
    if (e.clientX < innerWidth / 3) prev();
    else next();
  });

  // swipe
  let sx = 0;
  let sy = 0;
  let swiped = 0;
  addEventListener(
    'touchstart',
    (e) => {
      const t = e.touches[0];
      sx = t.clientX;
      sy = t.clientY;
    },
    { passive: true },
  );
  addEventListener(
    'touchend',
    (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
        (dx < 0 ? next : prev)();
        swiped = Date.now();
      }
    },
    { passive: true },
  );
  // un swipe no debe contar también como clic
  deck.addEventListener(
    'click',
    (e) => {
      if (Date.now() - swiped < 400) e.stopImmediatePropagation();
    },
    true,
  );

  setTimeout(() => (hint.style.opacity = 0), 6000);

  const h = parseInt((location.hash || '').slice(1), 10);
  go(isNaN(h) ? 0 : h - 1, true);
}
