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
    heading: 'Per molts anys, Júlia!',
    tap: 'Toca, llisca o fes servir les fletxes →',
    label: '19',
  },
  {
    type: 'message',
    title: 'Dedicatòria · Els teus cosins',
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
    title: 'Pista 01 · Per més records amb tu',
    track: 'Pista 01',
    heading: 'Per més records amb tu',
    photos: [
      { name: 'foto-01', shape: 'land', alt: 'Foto de petits' },
      { name: 'foto-02', shape: 'land', alt: 'Foto en un banc' },
      { name: 'foto-03', shape: 'land', alt: 'Foto en família' },
      { name: 'foto-04', shape: 'land', alt: "Foto d'estiu" },
      { name: 'foto-05', shape: 'land', alt: 'Foto de grup' },
      { name: 'foto-06', shape: 'land', alt: 'Selfie amb els cosins' },
    ],
  },
  {
    type: 'tracks',
    title: 'Pista 02 · Per més records amb tu',
    track: 'Pista 02',
    heading: 'Per més records amb tu',
    photos: [
      { name: 'foto-07', shape: 'land', alt: 'Bufant espelmes', pos: '62% 50%' },
      { name: 'foto-08', shape: 'port', alt: 'Obrint regals' },
      { name: 'foto-09', shape: 'sq', alt: 'Foto vora el mar' },
      { name: 'foto-10', shape: 'land', alt: 'Banyant-se al port' },
      { name: 'foto-11', shape: 'land', alt: 'Foto a la platja' },
    ],
  },
  {
    type: 'player',
    title: 'Pròximament · Hit mundial',
    heading: 'La teva propera cançó?',
    cover: '🎤',
    song: 'Hit mundial',
    artist: 'Júlia · Single 2026',
    times: ['0:19', '∞'],
    lead: 'Esperem que la teva propera cançó sigui <em>un hit mundial</em>',
    chips: [
      { b: '#1', text: 'a les llistes' },
      { b: '∞', text: 'reproduccions' },
    ],
  },
  {
    type: 'video',
    title: 'Pista extra · La propera guanyadora',
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
