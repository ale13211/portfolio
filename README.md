# Portafolio | Alejandro Insfrán

Backend Developer en sistemas financieros de alta criticidad.
Sitio estático con teclado 3D interactivo (Three.js), bilingüe ES/EN, publicado con GitHub Pages.

## Archivos

- `index.html`: estructura de la página
- `styles.css`: estilos
- `data.js`: TODO el contenido (textos, skills/teclas, experiencia y proyectos)
- `main.js`: arma la página a partir de data.js
- `keyboard.js`: escena 3D (teclado, estrellas y animaciones)
- `three.module.min.js` y `RoundedBoxGeometry.js`: Three.js incluido en el repo
- `CV_Alejandro_Insfran_ES.pdf` y `CV_Alejandro_Insfran_EN.pdf`: CV descargable

## Agregar una skill (tecla nueva)

En `data.js`, dentro de `SKILLS`:

```js
{ name: "AWS", key: "AWS", color: "orange", level: "learning",
  phrase: { es: "La nube, paso a paso.", en: "The cloud, step by step." } },
```

Colores: orange, red, blue, cyan, green, purple, yellow, black.

## Agregar un proyecto

Copiá la plantilla que está arriba de `PROJECTS` en `data.js`, completala y guardá. Cada proyecto tiene su link: `https://TU-USUARIO.github.io/#p/slug`.

## Probar en local

No funciona con doble clic en el HTML. En VS Code usá la extensión Live Server, o `python3 -m http.server 8000`.
