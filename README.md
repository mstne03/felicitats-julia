# Per molts anys, Júlia!

Felicitación de cumpleaños en formato presentación (10 diapositivas con estética musical). Sitio estático con Vite y JS vanilla; el texto está en catalán.

## Arrancar

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # compila a dist/
npm run preview    # sirve dist/ en local
npm run lint       # ESLint
npm run format     # Prettier
npm test           # test de humo con Playwright (capturas en test-results/)
```

La primera vez, `npx playwright install chromium` descarga el navegador que usan `npm test` y `npm run og`.

## Añadir o editar una diapositiva

Todo el contenido está en `src/content/slides.js`. Cada diapositiva es un objeto con `type` (`cover`, `message`, `tracks`, `player`, `video` o `finale`) y sus textos. Para una pista de fotos, copia una existente de tipo `tracks` y cambia título y fotos. El HTML se genera a partir de esos datos.

Si cambias el número de diapositivas, actualiza también el `01 / 10` inicial de `index.html` y la constante `TOTAL` de `tests/smoke.spec.js`.

## Añadir una foto

1. Deja la original en `img-src/` (carpeta ignorada por git, créala si no existe).
2. `npm run images`: reduce a 1100 px como máximo y genera `public/img/<nombre>.jpg` (progresivo, calidad 78) y `<nombre>.webp`.
3. Referénciala en `slides.js` con `name: '<nombre>'` (sin extensión), `shape` (`land`, `sq` o `port`), `alt` y `caption`.

Las fotos se cachean un día (`vercel.json`); si sustituyes una con el mismo nombre, puede tardar en refrescarse a quien ya la visitó.

## Regenerar la imagen OG

El diseño está en `og/og.html`. `npm run og` lo renderiza a `public/og.png` (1200×630). La URL de producción de las metas `og:url`, `og:image` y `twitter:image` sale de una sola constante, `SITE_URL` en `src/site.js`.

## Despliegue

Vercel compila con `npm run build` y sirve `dist/` (configurado en `vercel.json`). Un push a `master` va a producción; las demás ramas y PRs generan un despliegue de preview.
