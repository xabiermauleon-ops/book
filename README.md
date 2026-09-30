# Book — Xabier Mauleon

El sitio de **xabimauleon.netlify.app**, en castellano e inglés.

Las páginas **no se escriben a mano: se generan**. Lo que se edita son los
datos y los textos; el HTML es la salida.

## Estructura

```
build/          El generador y todo el contenido
  build.js        Maquetación de cada tipo de página
  cases.js        Los 13 casos. Cada texto lleva sus dos idiomas: { es, en }
  paginas.js      Inicio, sobre mí, contacto y gracias, también bilingües
  textos.js       Diccionario de interfaz: clave en castellano → inglés
src/            Lo que se mantiene a mano y el generador copia tal cual
  styles.css      Hoja de estilos
  script.js       Menú, filtros, cabecera y animaciones
  img/            Imágenes
  cv-…​.pdf        El CV
public/         La salida. NO se versiona: se reconstruye entera
```

## Compilar

```
node build/build.js
```

Borra `public/`, copia `src/` dentro y escribe las 41 páginas. Sin
dependencias: solo Node.

Netlify ejecuta este mismo comando en cada despliegue, así que **lo
publicado siempre sale de lo versionado**. No se puede cambiar un texto y
olvidarse de reconstruir.

## Cómo cambiar cosas

**Un texto de un caso** → `build/cases.js`. Busca el `slug` y edita el
idioma que toque.

**Un texto del inicio, sobre mí o contacto** → `build/paginas.js`.

**Una etiqueta de interfaz** (menú, pie, botones) → `build/textos.js`.

**Una imagen** → `src/img/`. Si sustituyes una conservando el nombre,
**cámbiale el nombre**: la caché de Netlify dura un año y quien ya haya
visitado el sitio seguiría viendo la antigua. El CSS y el JavaScript no
tienen ese problema: el generador les pone una huella del contenido en la
dirección y se renuevan solos.

## Dos interruptores

En `build/build.js`, arriba del todo:

- `SITIO` — el dominio. Solo se toca si Netlify da otro.
- `PUBLICAR_INGLES` — si está en `false`, el inglés se genera pero no se
  publica: ni carpeta `/en/`, ni selector de idioma, ni `hreflang`, ni
  entradas en el sitemap. Sirve para trabajar en las traducciones sin que
  salgan a producción a medias.

## Traducciones

Si un texto tiene `es` pero no `en`, el generador publica el castellano y
**avisa por consola** con la lista de lo que falta. No se rompe nada, pero
queda registrado.

## Versión de Node

`.nvmrc` fija Node 22 para que Netlify compile siempre con la misma
versión. Sin eso, Netlify usa la que tenga por defecto, y esa cambia con
el tiempo: el sitio podría dejar de compilar un día sin que nadie haya
tocado nada.

## El CV

El CV es **una página del sitio**, no un archivo aparte: `build/cv.js` guarda
el contenido en los dos idiomas y se publica en `/cv.html` y `/en/cv.html`.

El PDF sale de imprimir esa misma página:

```
node build/build.js
node build/pdf.js
```

`build/pdf.js` usa Chromium y por eso **no se ejecuta en Netlify** —sus
servidores no traen navegador—. Se lanza a mano y los dos PDF resultantes se
guardan en `src/`, que sí está versionado.

Regla práctica: si tocas `build/cv.js`, ejecuta los dos comandos y haz commit
también de los PDF. Si solo ejecutas el primero, la página web queda al día y
el PDF descargable no.
