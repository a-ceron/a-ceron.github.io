# Ariel Cerón — sitio personal

Sitio estático construido con Astro. Las entradas se guardan como Markdown en el repositorio y se publican junto con el sitio. No se requiere una base de datos ni un proveedor de correo.

## Desarrollo

```sh
npm install
npm run dev
npm run build
```

## Crear contenido

Desde la raíz del proyecto, usa el comando `new` e indica en qué sección quieres crear la entrada:

```sh
npm run new -- blog
npm run new -- project
npm run new -- newsletter
```

El asistente pide título, descripción, fecha, etiquetas y portada opcional, y crea un archivo Markdown listo para editar en la colección correspondiente. También puedes pasar un slug:

```sh
npm run new -- blog mi-articulo
npm run new -- project mi-proyecto
npm run new -- newsletter noviembre-2026
```

El comando también acepta `npm run new:blog`, `npm run new:project` y `npm run new:newsletter` como atajos. Los proyectos requieren un enlace HTTPS a un repositorio de GitHub. Las imágenes opcionales deben estar en `src/assets/`; indica en el asistente la ruta relativa desde el archivo Markdown, por ejemplo `../../assets/portada.jpg`.

Los borradores del blog se pueden marcar con `draft: true` en el frontmatter y no se publicarán en el listado, sus rutas ni el RSS.

## Newsletter sin integraciones

Las publicaciones del newsletter se escriben en Markdown y aparecen en `/newsletter`. El feed RSS está disponible en `/newsletter/rss.xml` y se puede seguir desde cualquier lector RSS. No se recopilan correos ni se envían a servicios externos.
