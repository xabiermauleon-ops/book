/* Genera el CV en PDF imprimiendo la página /cv.html con Chromium.
   Se ejecuta a mano, no en Netlify: sus servidores no traen navegador.
   Uso: node build/pdf.js   (después de node build/build.js) */

const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', 'public');
const DESTINO = path.resolve(__dirname, '..', 'src');

(async () => {
  const nav = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await (await nav.newContext()).newPage();
  for (const [origen, salida] of [['cv.html', 'cv-xabier-mauleon.pdf'], ['en/cv.html', 'cv-xabier-mauleon-en.pdf']]) {
    await page.goto('file://' + path.join(ROOT, origen), { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.pdf({
      path: path.join(DESTINO, salida),
      format: 'A4',
      printBackground: true,
      margin: { top: '14mm', right: '14mm', bottom: '16mm', left: '14mm' }
    });
    console.log('  ' + salida);
  }
  await nav.close();
})();
