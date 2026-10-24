// Contingut de les diapositives. Per afegir-ne o editar-ne una, només cal tocar aquest fitxer.
//
// Tipus: cover | message | tracks | player | video | finale
// Camps `html`/`lead`: HTML de confiança (contingut estàtic nostre, mai entrada d'usuari).
// Fotos: `name` és el fitxer a public/img/ sense extensió; `shape`: land | sq | port;
// `pos` (opcional) és l'object-position de la imatge.
export const slides = [
  {
    type: 'cover',
    title: 'Intro · Per molts anys, Júlia!',
    kicker: 'En directe · 19 anys de gira',
    heading: 'Per molts anys, Júlia!',
    tap: 'Toca, llisca o fes servir les fletxes →',
    label: '19',
  },
  {
    type: 'message',
    title: 'Dedicatòria · Els teus cosins',
    kicker: 'Dedicatòria',
    html: 'Els teus cosins preferits et desitgen uns <span class="hl">19 anys</span> plens <span class="hl2">d\'èxit</span>',
    notes: [
      { glyph: '♪', style: 'left:8%' },
      { glyph: '♫', style: 'left:30%;top:30%' },
      { glyph: '♩', style: 'left:54%;top:62%' },
      { glyph: '♬', style: 'left:78%;top:38%' },
    ],
  },
  {
    type: 'tracks',
    title: 'Pista 01 · Les primeres maquetes',
    track: 'Pista 01',
    heading: 'Les primeres maquetes',
    photos: [
      { name: 'foto-01', shape: 'land', alt: 'Foto de petits', caption: 'Demo 0.1' },
      { name: 'foto-02', shape: 'land', alt: 'Foto en un banc', caption: 'Primer èxit ✌️' },
    ],
  },
  {
    type: 'tracks',
    title: "Pista 02 · Gira d'estiu",
    track: 'Pista 02',
    heading: "Gira d'estiu",
    photos: [
      { name: 'foto-04', shape: 'land', alt: "Foto d'estiu", caption: 'Backstage' },
      { name: 'foto-03', shape: 'land', alt: 'Foto en família', caption: 'Tota la banda' },
    ],
  },
  {
    type: 'tracks',
    title: "Pista 03 · Festa a l'estudi (feat. cosins)",
    track: 'Pista 03',
    heading: "Festa a l'estudi",
    photos: [
      { name: 'foto-05', shape: 'land', alt: 'Foto de grup', caption: 'Cor de veus' },
      { name: 'foto-06', shape: 'land', alt: 'Selfie amb els cosins', caption: 'feat. els cosins' },
    ],
  },
  {
    type: 'tracks',
    title: 'Pista 04 · Edició especial',
    track: 'Pista 04',
    heading: 'Edició especial',
    photos: [
      {
        name: 'foto-07',
        shape: 'land',
        alt: 'Bufant espelmes',
        caption: 'Bufa fort! 🎂',
        pos: '62% 50%',
      },
      { name: 'foto-08', shape: 'port', alt: 'Obrint regals', caption: 'Unboxing' },
    ],
  },
  {
    type: 'tracks',
    title: 'Pista 05 · Estiu sense fi',
    track: 'Pista 05',
    heading: 'Estiu sense fi',
    photos: [
      { name: 'foto-09', shape: 'sq', alt: 'Foto vora el mar', caption: 'Portada del single' },
      { name: 'foto-11', shape: 'land', alt: 'Foto a la platja', caption: 'Videoclip' },
      { name: 'foto-10', shape: 'land', alt: 'Banyant-se al port', caption: 'Making of' },
    ],
  },
  {
    type: 'player',
    title: 'Pròximament · Hit mundial',
    kicker: 'Pròximament',
    heading: 'La teva propera cançó?',
    cover: '🎤',
    song: 'Hit mundial',
    artist: 'Júlia · Single 2026',
    times: ['0:19', '∞'],
    lead: 'Esperem que la teva propera cançó sigui <em>un hit mundial</em>',
    chips: [
      { b: '#1', text: 'a les llistes' },
      { b: '∞', text: 'reproduccions' },
      { b: '19', text: "anys d'èxits" },
    ],
  },
  {
    type: 'video',
    title: 'Pista extra · La propera guanyadora',
    kicker: 'Pista extra · Live',
    src: 'media/ot.mp4',
    poster: 'media/ot-poster.jpg',
    quote: '"La propera guanyadora d\'OT"',
  },
  {
    type: 'finale',
    title: 'Bis · Per molts anys!',
    heading: 'Per molts anys!',
    lead: 'Que soni fort aquest any <em>19</em> 🎶',
    sign: 'Els teus cosins Pau i Marc',
    again: '↺ Tornar a escoltar',
  },
];
