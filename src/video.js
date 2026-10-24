// Vídeo de la diapositiva: sin sonido por defecto, se reproduce al entrar en su diapositiva.
export function initVideo(vid, sound) {
  sound.onclick = (e) => {
    e.stopPropagation();
    vid.muted = !vid.muted;
    sound.textContent = vid.muted ? '🔇' : '🔊';
    sound.setAttribute('aria-label', vid.muted ? 'Activar so' : 'Silenciar');
    if (!vid.muted) vid.play().catch(() => {});
  };
  vid.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.click();
  });
  return {
    play: () => vid.play().catch(() => {}),
    pause: () => vid.pause(),
  };
}
