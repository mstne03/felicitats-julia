// Visor de fotos: al pulsar una polaroid abre un <dialog> con el carrusel de las fotos de esa
// diapositiva. El deslizamiento es scroll-snap nativo; <dialog> aporta Esc, foco atrapado y fondo inerte.
export function initLightbox(deck) {
  const dlg = document.getElementById('lb');
  const track = document.getElementById('lbTrack');
  const count = document.getElementById('lbCount');
  const prev = document.getElementById('lbPrev');
  const next = document.getElementById('lbNext');
  let total = 0;

  const index = () => Math.round(track.scrollLeft / track.clientWidth);
  const step = (d) => track.scrollBy({ left: d * track.clientWidth });
  function update() {
    const i = index();
    count.textContent = `${i + 1} / ${total}`;
    prev.disabled = i === 0;
    next.disabled = i === total - 1;
  }

  function open(fig) {
    const figs = [...fig.closest('.photos').querySelectorAll('.polaroid')];
    track.replaceChildren(
      ...figs.map((f) => {
        const pic = f.querySelector('picture').cloneNode(true);
        const img = pic.querySelector('img');
        img.loading = 'eager';
        img.removeAttribute('style'); // el encuadre de la miniatura no aplica: aquí se ve entera
        const item = document.createElement('div');
        item.className = 'lb-item';
        item.append(pic);
        return item;
      }),
    );
    total = figs.length;
    dlg.showModal();
    track.style.scrollBehavior = 'auto';
    track.scrollLeft = figs.indexOf(fig) * track.clientWidth;
    track.style.scrollBehavior = '';
    update();
  }

  deck.addEventListener('click', (e) => {
    const fig = e.target.closest('.polaroid');
    if (fig) open(fig);
  });
  deck.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.polaroid')) {
      e.preventDefault();
      open(e.target);
    }
  });

  track.addEventListener('scroll', update, { passive: true });
  prev.onclick = () => step(-1);
  next.onclick = () => step(1);
  document.getElementById('lbClose').onclick = () => dlg.close();
  // clic fuera de la foto cierra
  dlg.addEventListener('click', (e) => {
    if (!e.target.closest('img,button')) dlg.close();
  });

  // la navegación del deck escucha teclado y swipe en window: dentro del visor no debe cambiar de diapositiva
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      step(e.key === 'ArrowRight' ? 1 : -1);
    }
    e.stopPropagation();
  });
  for (const type of ['touchstart', 'touchend']) {
    dlg.addEventListener(type, (e) => e.stopPropagation(), { passive: true });
  }
}
