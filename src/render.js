const EQ =
  '<div class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>';

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ESC[c]);

const photo = ({ name, shape, alt, caption, pos }) => `
  <figure class="polaroid p-${shape}">
    <picture>
      <source srcset="img/${name}.webp" type="image/webp">
      <img src="img/${name}.jpg" alt="${esc(alt)}" loading="lazy"${pos ? ` style="object-position:${esc(pos)}"` : ''}>
    </picture>
    ${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}
  </figure>`;

const bodies = {
  cover: (s) => `
    <div class="inner cover">
      <div class="vinyl" aria-hidden="true"><div class="label"><span>${esc(s.label)}</span></div></div>
      <div class="txt">
        <h1>${esc(s.heading)}</h1>
        ${EQ}
        <span class="tap">${esc(s.tap)}</span>
      </div>
    </div>`,
  message: (s) => `
    <div class="inner">
      <p class="msg">${s.html}</p>
      <div class="staff" aria-hidden="true">${s.notes.map((n) => `<span style="${n.style}">${n.glyph}</span>`).join('')}</div>
    </div>`,
  tracks: (s) => `
    <div class="inner">
      <div class="track-head"><span class="track-no">${esc(s.track)}</span><h2>${esc(s.heading)}</h2></div>
      <div class="photos grid">${s.photos.map(photo).join('')}
      </div>
    </div>`,
  player: (s) => `
    <div class="inner">
      <h2>${esc(s.heading)}</h2>
      <div class="player">
        <div class="cover-art" aria-hidden="true">${s.coverImg ? `<img src="${s.coverImg}" alt="">` : s.cover}</div>
        <div><div class="p-title">${esc(s.song)}</div><div class="p-artist">${esc(s.artist)}</div></div>
        <div class="bar" aria-hidden="true"><i></i></div>
        <div class="times"><span>${esc(s.times[0])}</span><span>${esc(s.times[1])}</span></div>
      </div>
      <p class="lead">${s.lead}</p>
      <div class="charts">${s.chips.map((c) => `<span class="chip"><b>${esc(c.b)}</b> ${esc(c.text)}</span>`).join('')}</div>
    </div>`,
  video: (s) => `
    <div class="inner">
      <div class="video-wrap">
        <div class="phone">
          <video id="vid" src="${s.src}" poster="${s.poster}" playsinline loop muted preload="metadata"></video>
          <button class="sound" id="sound" aria-label="Activar so">🔇</button>
        </div>
        <div class="vcap">
          <div class="mic" aria-hidden="true">🎙️</div>
          <p class="quote">${esc(s.quote)}</p>
          <div class="stars" aria-hidden="true">⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>`,
  finale: (s) => `
    <div class="inner">
      ${EQ}
      <h1>${esc(s.heading)}</h1>
      <p class="lead">${s.lead}</p>
      <p class="sign">${esc(s.sign)}</p>
      <button class="again" id="again">${esc(s.again)}</button>
    </div>`,
};

export function renderSlides(slides) {
  return slides
    .map((s) => {
      const flag = s.type === 'video' ? ' data-video' : s.type === 'finale' ? ' data-final' : '';
      return `<section class="slide" data-title="${esc(s.title)}"${flag}>${bodies[s.type](s)}\n  </section>`;
    })
    .join('\n');
}
