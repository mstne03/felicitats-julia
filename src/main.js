// latin-ext antes que latin: gana la última @font-face declarada, y las métricas de la unidad
// `ch` salen de ella (como en el CSS de Google Fonts); al revés, `ch` caería a 0,5em.
import '@fontsource/shrikhand/latin-ext-400.css';
import '@fontsource/shrikhand/latin-400.css';
import '@fontsource-variable/dm-sans/opsz.css';
import '@fontsource/dm-mono/latin-ext-500.css';
import '@fontsource/dm-mono/latin-500.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/cover.css';
import './styles/polaroids.css';
import './styles/player.css';
import './styles/video.css';
import './styles/dock.css';
import './styles/lightbox.css';

import { slides } from './content/slides.js';
import { renderSlides } from './render.js';
import { initNav } from './nav.js';
import { initConfetti } from './confetti.js';
import { initVideo } from './video.js';
import { initLightbox } from './lightbox.js';

const deck = document.getElementById('deck');
deck.innerHTML = renderSlides(slides);

// notas musicales flotantes
const bg = document.getElementById('bg');
const glyphs = ['♪', '♫', '♬', '♩', '🎵', '🎶'];
for (let i = 0; i < 14; i++) {
  const s = document.createElement('span');
  s.className = 'note';
  s.textContent = glyphs[i % glyphs.length];
  s.style.left = Math.random() * 100 + '%';
  s.style.fontSize = 18 + Math.random() * 26 + 'px';
  s.style.animationDelay = -Math.random() * 14 + 's';
  s.style.animationDuration = 10 + Math.random() * 10 + 's';
  bg.appendChild(s);
}

const burst = initConfetti(document.getElementById('confetti'));
const video = initVideo(document.getElementById('vid'), document.getElementById('sound'));

initLightbox(deck);

initNav({
  slides: [...deck.children],
  deck,
  onEnter(i, el, initial) {
    if (el.hasAttribute('data-video')) video.play();
    else video.pause();
    if (el.hasAttribute('data-final') || (i === 0 && initial)) burst();
  },
});
