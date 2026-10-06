# ASTRO WEBSITE DEVELOPMENT SPEC: CERRAJEROS MADRID OPENSERVI — v2

> **Versión:** v2.2 · 2026-10-06 · Base: v1. v2.1 = v2 + paleta «Victoria Alada», fuentes disponibles y redacción precisa de la cobertura. v2.2 = cambios del cliente del 2026-10-06 (tabla «Cambios v2.2», justo debajo). Se mantiene la numeración §1–§35; las secciones nuevas son §36–§43 y los anexos A–D.
>
> **Alcance:** esta versión incluye únicamente los cambios que el cliente ha aprobado y los datos que ha facilitado. Todo lo que no aparece en el resumen siguiente **no ha cambiado** respecto a v1 (texto idéntico).
>
> **Marcas:** `[CAMBIO v2]` sección modificada · `[NUEVO v2]` sección añadida · `[ELIMINADO v2]` sección retirada · `TODO-CLIENTE` dato que debe aportar la empresa (no inventarlo).
>
> **Fuera de esta revisión (decisión del cliente):** los textos legales (§16, sin cambios), las redirecciones (§31, eliminado) y los precios (§40: la web no los publica).
>
> **Se mantiene sin cambios:** la regla de no inventar reseñas, tiempos de llegada, credenciales ni garantías (§18, §19).

## Cambios v2.3 (2026-10-06, pedidos por el cliente): páginas de localidad

Prevalece sobre v2.2 en las páginas de localidad. Bloques nuevos, por este orden después de los servicios:

| Bloque | Contenido | De dónde sale |
|---|---|---|
| Ventajas («Lo que tienes al llamarnos») | Cerrajero propio en la zona, 24 horas, presupuesto antes de empezar, sin romper si se puede, garantía por escrito (si está activa), opiniones de Google. Cada una enlaza a su prueba (§19). | `src/data/zona.ts` |
| Banner de llamada | Banda dorada con el teléfono grande y botón (`data-cta="banner-zona-<slug>"`). Texto obsidiana sobre oro. | `src/components/zona/BannerLlamada.astro` |
| «Ten esto a mano al llamar» | Dirección, qué ha pasado, tipo de puerta y algo que acredite la relación con la vivienda. Aviso: «llama primero al 112» (único `tel:` permitido además del comercial). | `src/data/zona.ts` |
| «Consejo para <zona>» | Consejo práctico real del cerrajero de la zona. Sin texto, no se pinta. | Ficha: `consejo` |
| «Cerrajeros cerca de <zona>» | Hasta 4 zonas próximas con cerrajero propio (`nearby`, de más a menos cerca). Desde una página indexable solo se enlazan las `ready` (§5). | Ficha: `nearby` |
| Preguntas frecuentes | Primero las preguntas reales de la ficha; después 4 generales (cerrajero en la zona, 24 horas, precio, zonas cercanas). Microdatos `FAQPage`. | Ficha: `faqs` + `src/data/zona.ts` |

Vuelve el mínimo de §5: **≥ 2 preguntas propias en la ficha** para pasar a `ready` (las generales no cuentan: son iguales en todas las zonas). Los bloques comunes llevan el nombre de la zona pero el mismo texto en todas: lo que hace única cada página sigue siendo la ficha (intro, barrios, consejo, preguntas propias, casos), y por eso la puerta de indexación se mantiene.

## Cambios v2.2 (2026-10-06, pedidos por el cliente)

v2.2 prevalece sobre cualquier sección de v2.1 que la contradiga. Las secciones afectadas se dejan como estaban para conservar el historial; donde choquen, manda esta tabla.

| § | Cambio v2.2 |
|---|---|
| 2, 10, 21, 33, 36 | **Sin páginas de hub.** Se eliminan `/servicios/` y `/cerrajeros/`. «Servicios» es un desplegable de la cabecera con enlace directo a cada servicio (apertura de puertas y urgente 24 h a sus secciones de la Home; cambio de cerraduras e instalación de cerrojos a sus páginas). Las migas quedan en «Inicio › página». |
| 6, 17, 36 | **Zonas solo en la Home** (sección `#zonas`, con el mapa esquemático y el de Google bajo demanda). Texto: «Atendemos en todo Madrid. Aunque no esté tu zona en la lista, trabajamos en todas las de alrededor. Somos rápidos y tenemos un buen equipo listo para ayudarte.» |
| 5, 7, 18, 28, 38 | **Opiniones y preguntas frecuentes solo en la Home.** Las páginas de servicio y de localidad no llevan FAQ; el campo `faqs` desaparece de las colecciones y la puerta de indexación deja de exigir FAQs locales. *(Localidades: revertido en v2.3, vuelven las FAQ.)* |
| 28 | En las páginas de localidad, los servicios se nombran sin la localidad («Cambio de cerraduras», no «Cambio de cerraduras en Alcorcón»). |
| 10 | Migas: `padding-top: 5px; padding-bottom: 25px; text-align: center`. |
| 22 | Pie: `padding-top: 60px` y el perfil de Madrid de fondo. |
| 6 | Nueva sección «Quiénes Somos» (`#quienes-somos`) con el texto del cliente sobre el emblema de la Victoria Alada. |
| 14, 19, 42 | FAQ de la Home con microdatos schema.org `FAQPage` (en el HTML; el JSON-LD sigue sin `FAQPage`). Dos preguntas nuevas del cliente, entre ellas el **tiempo medio de llegada a urgencias en Madrid: 20 a 30 minutos** (dato declarado por la empresa; es la única cifra de llegada publicada). |
| 15, 16 | **Datos legales nuevos:** titular CerrajerosMadrid.Madrid · Calle Benito Gutiérrez 17, 28008 Madrid · info@cerrajerosmadrid.madrid · 912 918 462 · cerrajerosmadrid.madrid. Sustituyen a los de §16 (y al teléfono legal de §15). El cliente no ha facilitado NIF (`TODO-CLIENTE`). |
| 23, 24 | **Logotipos definitivos** (`src/assets/marca/`): horizontal en la cabecera, vertical en el pie, emblema circular en la portada, «Quiénes Somos», CTA final, 404, favicon e iconos. Sustituyen al emblema provisional en SVG. |
| 23 | **Perfil de Madrid**: la ilustración dorada del cliente (`marca/skyline-original.webp`), pasada a SVG de 5 tonos con potrace (`npm run skyline`), sustituye al perfil de bloques en la portada y en el pie. |
| Anexo C | Dominio confirmado: `https://cerrajerosmadrid.madrid` (datos legales del cliente). |

## Resumen de cambios v2

| § | Cambio |
|---|---|
| 2, 10, 33, 36 | Hubs reales `/servicios/` y `/cerrajeros/`: los breadcrumbs ya no apuntan a páginas inexistentes |
| 6, 17, 22 | Mapa solo en la Home y en el hub de zonas, con «clic para cargar»; fuera del footer |
| 23, 33 | `tailwind.config.mjs` sustituido por `src/styles/global.css` con `@theme` (Tailwind 4) |
| 23 | Paleta «Victoria Alada» (obsidiana, oro, plata, blanco) y reglas de contraste (valores calculados) |
| 13 | Sitemap: sin `changefreq`/`priority`, `lastmod` real, `noindex` filtrado |
| 14 | JSON-LD: `Locksmith` + `Service` con `provider`; sin expectativas de `FAQPage` |
| 6 | Hero que empieza por el problema; H1 «Cerrajeros en Madrid 24 horas» |
| 20 | Barra móvil sin `backdrop-blur`, con espacio inferior reservado; solo «Llamar» (no hay WhatsApp) |
| 15, 18, 19 | Reseñas: 4,9 · 40 en el perfil de Google, con 6 reseñas literales; insignias con prueba |
| 27, 28, 38 | Criterio de cobertura: cerrajero propio dentro de cada zona |
| 3, 4, 5, 37, 38, 34 | Colección `casos`, puerta de indexación, ficha por localidad, muestra mínima |
| 6, 39 | Triaje «¿Qué te ha pasado?» |
| 6, 40 | «Cómo trabajamos» (presupuesto sin compromiso y garantía); la web no publica precios |
| 41 | Medición de llamadas y Search Console |
| 23 | Motivos visuales con sentido (perfil de llave, micro-interacción, mapa tipo metro) |
| 42 | Reglas de redacción |
| 25, 43 | Criterios de aceptación automáticos y objetivos de rendimiento |
| 21, 24, 33 | Menores: navegación a hubs, fuentes autoalojadas, 404, favicons y manifest |
| 31 | Eliminado (sin redirecciones) |

## Datos aportados por la empresa (v2)

- Teléfono comercial: 912 918 462 (sin cambios, §15).
- WhatsApp: la empresa no tiene. No mostrar ni enlazar WhatsApp.
- Reseñas: 4,9 de media y 40 reseñas en Google (datos del perfil a 2026-10-05). Perfil: https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8. Seis reseñas literales en §18.
- Cobertura: las 16 localidades son zonas donde la empresa tiene un cerrajero propio dentro de la zona: «uno de nuestros cerrajeros» (§27).
- Precios: la empresa decide no publicarlos en la web (§40).
- Garantía: el cliente ha pedido que se redacte una propuesta (Anexo B).
- Muestra mínima viable: §34.

---

## 0. Objetivo del proyecto

Construir una web en **Astro + Tailwind CSS** para **Cerrajeros Madrid Openservi**, orientada a:

- SEO local y transaccional.
- Alta conversión.
- Excelente velocidad y Core Web Vitals.
- Arquitectura escalable.
- Buena experiencia móvil.
- Imagen de marca premium, profesional y alejada de las plantillas genéricas de cerrajería.

La primera versión debe dejar **muy potente la Home** y preparar técnicamente las páginas de servicios y localidades para desarrollarlas y enriquecerlas posteriormente.

Los textos e imágenes podrán mejorarse progresivamente. No hay que sobrecargar la primera versión con contenido artificial o repetitivo.

---

# 1. PRINCIPIOS SEO FUNDAMENTALES

## 1.1. Evitar canibalización

La Home debe concentrar la intención general y transaccional:

- Cerrajeros Madrid
- Cerrajero urgente Madrid
- Cerrajeros 24 horas Madrid
- Apertura de puertas
- Servicio de cerrajería urgente

No crear inicialmente páginas independientes para:

- `/urgencias`
- `/apertura-de-puertas-madrid`

La Home debe ser la URL principal para estas búsquedas.

Las páginas de servicios deben centrarse únicamente en su servicio concreto.

Las páginas de localidades deben centrarse exclusivamente en la búsqueda local correspondiente.

---

# 2. ARQUITECTURA DE URL

Usar una estructura limpia y escalable.

```text
/
├── /servicios/
│   ├── /cambio-de-cerraduras-madrid/
│   └── /instalacion-de-cerrojos-madrid/
│
├── /cerrajeros/
│   ├── /alcala-de-henares/
│   ├── /alcorcon/
│   ├── /aravaca/
│   ├── /barajas/
│   ├── /boadilla-del-monte/
│   ├── /coslada/
│   ├── /getafe/
│   ├── /las-rozas/
│   ├── /leganes/
│   ├── /majadahonda/
│   ├── /mostoles/
│   ├── /pozuelo-de-alarcon/
│   ├── /pinto/
│   ├── /rivas-vaciamadrid/
│   ├── /villaviciosa-de-odon/
│   └── /collado-villalba/
│
├── /aviso-legal/
├── /politica-de-privacidad/
└── /politica-de-cookies/
```

### Estructura de Astro recomendada

```text
src/
├── components/
├── layouts/
├── content/
│   ├── localidades/
│   └── servicios/
├── pages/
│   ├── index.astro
│   ├── cerrajeros/
│   │   └── [localidad].astro
│   ├── servicios/
│   │   └── [servicio].astro
│   └── ...
```

Usar `getStaticPaths()` para generar las páginas dinámicas.

## [CAMBIO v2] Hubs reales

`/servicios/` y `/cerrajeros/` no son solo carpetas de la URL: son páginas reales (hubs, §36), porque los breadcrumbs (§10) enlazan a ellas. Estructura de páginas de Astro resultante:

```text
src/pages/
├── index.astro
├── servicios/
│   ├── index.astro        ← hub [NUEVO v2]
│   └── [servicio].astro
├── cerrajeros/
│   ├── index.astro        ← hub [NUEVO v2]
│   └── [localidad].astro
├── 404.astro              ← [NUEVO v2]
└── ...
```

---

# 3. IMPORTANT: NO CREAR DOORWAY PAGES

Las páginas de localidades NO deben ser clones con únicamente el nombre de la localidad cambiado.

Aunque todas compartan el mismo componente Astro, cada localidad debe disponer de datos propios.

Ejemplo de estructura de datos:

```ts
{
  slug: "alcorcon",
  name: "Alcorcón",
  seoTitle: "...",
  seoDescription: "...",
  intro: "...",
  zones: [...],
  barrios: [...],
  services: [...],
  localLandmark: "...",
  image: "...",
  faqs: [...],
  nearby: [...]
}
```

El diseño y el template pueden ser compartidos, pero el contenido relevante debe ser realmente diferencial.

Cada localidad debería poder incorporar progresivamente:

- Introducción propia.
- Zonas/barrios o áreas de cobertura reales.
- Servicios relevantes.
- Información de atención local.
- Referencias geográficas cuando sean útiles y auténticas.
- Fotografía propia.
- FAQs específicas.
- Enlaces a servicios relacionados.
- Enlaces a localidades cercanas.

NO inventar datos locales únicamente para incluir keywords.

## [CAMBIO v2] Campos añadidos al modelo de localidad

Además de los campos de v1, cada localidad incorpora:

```ts
{
  status: "draft" | "ready",     // puerta de indexación (§5); por defecto "draft"
  cerrajeroPropio: true,         // declarado por la empresa (§27)
  tipoPresencia: "cerrajero del equipo",  // «uno de nuestros cerrajeros» (confirmado por el cliente)
  observacionesLocales: [...],   // experiencia real del cerrajero de la zona (§38)
  updatedAt: "AAAA-MM-DD"        // fecha real de modificación (§13)
}
```

Los trabajos reales no se incrustan en la localidad: se enlazan por referencia desde la colección `casos` (§37). La ficha completa está en §38.

---

# 4. CONTENT MANAGEMENT / DATOS

Preferencia: separar completamente:

### Presentación

Astro + Tailwind + componentes.

### Datos

Localidades, servicios, SEO, fotografías, FAQs, etc.

### Contenido

Textos de cada página.

Se recomienda utilizar **Astro Content Collections** o una estructura equivalente de contenido tipado.

Ejemplo:

```text
src/content/
├── localidades/
│   ├── alcorcon.md
│   ├── getafe.md
│   ├── leganes.md
│   └── ...
│
└── servicios/
    ├── cambio-de-cerraduras-madrid.md
    └── instalacion-de-cerrojos-madrid.md
```

Esto permitirá ampliar o modificar contenido posteriormente sin tocar la estructura visual.

## [CAMBIO v2] Colecciones y datos adicionales

```text
src/content/
├── localidades/
├── servicios/
└── casos/            ← «Trabajos reales» (§37)

src/data/
├── site.ts           ← empresa, teléfono, URLs, perfil de Google (§15, §16)
├── resenas.ts        ← recuento y reseñas reales (§18)
└── situaciones.ts    ← triaje «¿Qué te ha pasado?» (§39)
```

Las colecciones se definen según la API vigente de Content Collections de la versión de Astro instalada (§33).

---

# 5. INDEXACIÓN PROGRESIVA [CAMBIO v2]

La arquitectura puede quedar preparada desde el primer día, pero NO indexar páginas que todavía estén prácticamente vacías.

Una localidad preparada únicamente con:

```text
H1
Cerrajeros Alcorcón
+
2 párrafos genéricos
```

no debe considerarse una landing SEO terminada.

Mientras una página no disponga de suficiente contenido único y útil, debe poder mantenerse en `noindex`.

El sistema debe permitir activar la indexación cuando la página esté realmente preparada.

## Mecanismo: puerta de indexación [NUEVO v2]

Cada localidad (y, si se desea, cada servicio) declara en su frontmatter:

```text
status: draft | ready      # por defecto: draft
```

| Estado | Meta robots | Sitemap | Enlaces internos |
|---|---|---|---|
| `draft` | `noindex, follow` | Fuera | Ninguno hacia ella desde páginas indexables (el hub puede nombrar la localidad como texto, sin enlace) |
| `ready` | `index, follow` | Dentro | Sí |

### Mínimos para `ready` (localidad)

Orientativos y ajustables en `src/lib/gate.ts`:

1. `cerrajeroPropio: true` (declarado por la empresa, §27).
2. ≥ 1 caso real verificado asociado a la localidad (§37).
3. Introducción propia, escrita solo con datos de la ficha (§38), sin relleno.
4. ≥ 2 FAQs locales procedentes de preguntas reales.
5. `seoTitle` y `seoDescription` propios.

### Comprobación

La comprobación se ejecuta dentro del propio build (`src/lib/gate.ts`, llamada desde `getStaticPaths` de la plantilla de localidad): una sola fuente de verdad con el esquema real. Si una página está en `ready` y no cumple los mínimos, el build falla e indica qué campo falta. Si falta material, la página se queda en `draft`: no se promociona «para rellenar».

### Reglas

- No bloquear en `robots.txt` las páginas `noindex`: si se bloquean, el buscador no puede leer la etiqueta `noindex` (de memoria; comprobar en la documentación de Google).
- La puerta decide también qué entra en el sitemap (§13) y qué enlaces internos se pintan (§9, §36).

---

# 6. HOME PAGE [CAMBIO v2]

Archivo:

```text
src/pages/index.astro
```

## Objetivo

La Home debe ser la página SEO y comercial más potente del proyecto.

### H1 [CAMBIO v2]

```text
Cerrajeros en Madrid 24 horas
```

Debe aparecer muy pronto en la página.

No utilizar una etiqueta o globo decorativo antes del H1 únicamente para crear apariencia visual.

El H1 es corto y humano. Las palabras clave completas viven en el `<title>` y en la meta description. Metadata sugerida (ajustable):

```text
seoTitle: Cerrajeros Madrid 24 Horas | Apertura de Puertas | Openservi
seoDescription: Cerrajeros en Madrid 24 horas: apertura de puertas, cambio de cerraduras y cerrojos de seguridad. Cerrajeros propios en 16 zonas. Llama al 912 918 462.
```

---

## Estructura recomendada de la Home

Las secciones H2 llevan un `id` estable para poder enlazarlas desde los hubs (§36): `que-te-ha-pasado`, `apertura-de-puertas`, `cambio-de-cerraduras`, `instalacion-de-cerrojos`, `cerrajero-urgente-24-horas`, `como-trabajamos`, `trabajos-reales`, `zonas`, `opiniones`, `faq`.

### Hero [CAMBIO v2: empieza por el problema]

Quien busca a las 3 de la madrugada necesita saber en 5 segundos que lo atienden ahora.

Orden del contenido:

1. H1: «Cerrajeros en Madrid 24 horas».
2. Subtítulo: «¿Te has quedado fuera de casa? Llámanos.»
3. Teléfono visible como texto enlazado (`tel:+34912918462`, «912 918 462») y botón grande de llamada (altura mínima 48 px), con `data-cta="hero"` (§41).
4. Línea de confianza con pruebas (§19): «Cerrajeros propios en 16 zonas · 4,9 en Google (40 opiniones) · Servicio 24 horas · Presupuesto sin compromiso · Garantía por escrito». Las cifras salen de `resenas.media` y `resenas.total`.
5. Imagen real de calidad cuando esté disponible (candidata a LCP: `fetchpriority="high"`, sin lazy loading; §25).

Reglas:

- En móvil, el teléfono y el botón se ven sin hacer scroll en un viewport de 360 × 640.
- La imagen no debe empujar el CTA fuera de la primera pantalla.
- Sin precios (decisión del cliente, §40) y sin tiempo de llegada mientras la empresa no lo mida. Cualquier otra promesa, solo si es real (§19).

### H2 [NUEVO v2]

```text
¿Qué te ha pasado?
```

Triaje de situaciones (§39).

### H2

```text
Cerrajeros en Madrid
```

Explicar de forma natural el servicio general.

### H2

```text
Apertura de Puertas
```

Explicar el servicio y su intención transaccional sin crear una URL independiente.

### H2

```text
Cambio de Cerraduras
```

Enlace a la página específica del servicio.

### H2

```text
Instalación de Cerrojos de Seguridad
```

Enlace a la página específica del servicio.

### H2

```text
Cerrajero Urgente 24 Horas
```

Integrado en la Home, no como landing independiente.

### H2 [NUEVO v2]

```text
Cómo trabajamos
```

Proceso de trabajo y garantía, sin precios (§40).

### H2 [NUEVO v2]

```text
Trabajos reales
```

Selección de casos reales (§37). Solo se pinta si hay ≥ 3 casos verificados.

### H2 [CAMBIO v2]

```text
Zonas donde trabajamos
```

Enlace a las localidades `ready`. Explicar el criterio: son zonas donde hay un cerrajero propio dentro de la zona (§27). Incluye el mapa esquemático (§23) y el mapa de Google con «clic para cargar» (§17).

### H2 [CAMBIO v2]

```text
Opiniones de clientes
```

Reseñas reales, sin inventar datos (§18): «4,9 · 40 opiniones en Google» con enlace al perfil y tarjetas con reseñas literales.

### H2

```text
Preguntas frecuentes
```

FAQs útiles y orientadas a resolver dudas reales.

### Footer [CAMBIO v2]

- Datos de contacto.
- Información legal.
- Enlaces de servicios.
- Enlaces de localidades.

Sin mapa en el footer (§17 y §22).

---

# 7. PÁGINAS DE SERVICIO

## `/servicios/cambio-de-cerraduras-madrid/`

H1:

```text
Cambio de Cerraduras en Madrid
```

Enfoque exclusivo:

- Cambio de cerraduras.
- Cuándo conviene sustituir una cerradura.
- Tipologías.
- Seguridad.
- Proceso.
- Transparencia.
- Preguntas frecuentes.
- CTA telefónico.

No convertir esta página en otra Home de "cerrajeros Madrid".

---

## `/servicios/instalacion-de-cerrojos-madrid/`

H1:

```text
Instalación de Cerrojos de Seguridad en Madrid
```

Enfoque exclusivo:

- Cerrojos.
- Seguridad.
- Tipos.
- Instalación.
- Casos de uso.
- Preguntas frecuentes.
- CTA telefónico.

---

# 8. IMÁGENES

El proyecto dispone de muchas fotografías reales.

Preparar desde el principio un sistema de imágenes real y no depender de simples placeholders como arquitectura definitiva.

Las imágenes deben poder gestionarse mediante datos:

```ts
image: ...
alt: ...
caption: ...
```

Utilizar el sistema de imágenes optimizadas de Astro cuando sea posible.

Cada servicio puede empezar con las imágenes disponibles y ampliarse posteriormente.

Las localidades deberían poder tener imágenes propias cuando existan.

### ALT

Los atributos `alt` deben describir realmente la imagen.

NO hacer:

```text
alt="cerrajeros alcorcon"
```

cuando eso no describa lo que aparece en la fotografía.

Preferir algo del estilo:

```text
alt="Cerrajero realizando el cambio de una cerradura"
```

según el contenido real de la imagen.

## [CAMBIO v2] Trabajos reales y relación de aspecto

Las fotografías de trabajos reales entran por la colección `casos` (§37): una foto + tipo de trabajo + zona + qué se hizo. Usar la misma relación de aspecto (p. ej. 4:3) en las galerías y un pie de foto con los datos del trabajo (tipo · zona · fecha, si se conoce).

---

# 9. INTERLINKING

No crear una enorme nube de enlaces idénticos.

Usar tres niveles:

## Home → Localidades

Enlazar las localidades relevantes desde la Home.

## Localidad → Servicios

Ejemplo:

```text
Cambio de cerraduras en Alcorcón
Instalación de cerrojos de seguridad
```

## Localidad → Localidades cercanas

Enlaces contextuales a zonas próximas cuando tenga sentido.

También puede existir un componente final:

```text
Zonas de Cobertura
```

pero debe ser visualmente limpio y nunca parecer un tag cloud SEO.

Los anchors deben ser descriptivos.

Preferir:

```text
Cambio de cerraduras en Alcorcón
```

sobre:

```text
Ver servicio
```

---

# 10. BREADCRUMBS

Añadir breadcrumbs visualmente discretos.

Ejemplo:

```text
Inicio
›
Cerrajeros
›
Alcorcón
```

Servicio:

```text
Inicio
›
Servicios
›
Cambio de cerraduras
```

Preparar también `BreadcrumbList` mediante JSON-LD.

## [CAMBIO v2] Hubs

Los tramos intermedios («Cerrajeros», «Servicios») enlazan a los hubs `/cerrajeros/` y `/servicios/` (§36), que existen como páginas reales. El último tramo no es un enlace.

---

# 11. SEO METADATA

Cada página debe tener metadata propia.

No generar títulos idénticos cambiando únicamente la localidad.

Cada página debe poder definir:

```ts
seoTitle
seoDescription
canonical
ogImage
```

Ejemplo:

```text
seoTitle: "Cerrajeros Alcorcón 24 Horas | Openservi"
```

La descripción debe ser específica para la localidad.

La Home tendrá metadata orientada a la intención general de Madrid.

Las páginas de servicios tendrán metadata centrada exclusivamente en su servicio.

---

# 12. CANONICAL

Añadir canonical absoluto en todas las URLs indexables.

Evitar:

- URLs duplicadas.
- Parámetros indexables innecesarios.
- Variaciones de trailing slash inconsistentes.
- Duplicados entre versiones equivalentes.

---

# 13. SITEMAP Y ROBOTS

Configurar desde el principio:

```text
/sitemap-index.xml
/robots.txt
```

Usar integración de sitemap de Astro.

El sitemap debe incluir solamente URLs que deban indexarse.

## [CAMBIO v2] Reglas del sitemap

- No configurar `changefreq` ni `priority`: Google los ignora [1].
- `lastmod` solo con la fecha real de modificación de cada página (`updatedAt` del contenido). Si una página no tiene fecha fiable, omitir `lastmod`. Nunca un `lastmod` global con la fecha del build [1].
- Filtrar con `filter` todas las URLs con `status: draft` (§5) y cualquier otra URL no indexable.
- `robots.txt`: `User-agent: *`, `Allow: /` y la línea `Sitemap:` con la URL absoluta de `sitemap-index.xml`. No bloquear páginas `noindex` (§5).

---

# 14. STRUCTURED DATA / JSON-LD [CAMBIO v2]

Preparar JSON-LD real y coherente con la empresa. No inventar atributos.

## Entidad del negocio (Home)

- `@type`: `Locksmith` (subtipo de `LocalBusiness`). De memoria; comprobar en schema.org.
- `@id` estable (p. ej. `https://<dominio>/#business`). Todas las páginas que lo referencian usan ese mismo `@id`.
- Propiedades: `name`, `url`, `telephone` (`+34912918462`), `areaServed` (las localidades `ready` y «Madrid»), `openingHoursSpecification` (24 horas, todos los días), `image`, `logo` (si existe) y `sameAs` (perfil de Google: https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8).
- `address` y `geo`: **decisión pendiente (`TODO-CLIENTE`)**. Por defecto NO publicar `streetAddress` ni `geo`: el único domicilio conocido es el social (§16). No inventar coordenadas. Comprobar en la documentación vigente de Google qué propiedades exige el marcado de negocio local.

## Servicios

- Páginas de servicio: `Service` con `provider: { "@id": ".../#business" }`, `serviceType`, `name`, `description`, `url` y `areaServed`.
- Páginas de localidad: `Service` con `provider` por `@id` y `areaServed: { "@type": "City", "name": "<Localidad>" }`.

## Migas

`BreadcrumbList` en todas las páginas (§10).

## No hacer

- No usar `AggregateRating` ni `Review` (§18).
- No esperar efectos visibles de `FAQPage`: Google restringió esos resultados en 2023 y, según prensa especializada, los ha retirado en 2026 [2]. Las FAQ se publican como HTML visible; el marcado no es necesario.

---

# 15. TELÉFONOS

## Teléfono comercial / servicio

```text
912 918 462
```

Este es el número que debe utilizarse como CTA principal de la web.

Formato `tel:`:

```text
tel:+34912918462
```

## Teléfono del Aviso Legal

```text
675 259 819
```

Este número pertenece a la información legal y no debe confundirse con el teléfono comercial del servicio.

## [CAMBIO v2] WhatsApp

La empresa no tiene WhatsApp. No mostrar, enlazar ni preparar botones o mensajes de WhatsApp. El único canal de contacto comercial de la web es el teléfono.

---

# 16. DATOS LEGALES

Utilizar exclusivamente estos datos en el texto legal:

```text
Company Name:
JIREH CAPITAL PARTNERS SL

NIF:
B22969398

Registered Address:
Paseo de la Estación, 33 - 28904 - Getafe (Madrid)

Email:
solucionabba@gmail.com

Contact Phone:
675259819
```

NO incluir nombres comerciales en el texto del Aviso Legal.

---

# 17. GOOGLE MAPS [CAMBIO v2]

El mapa es principalmente un elemento de confianza y localización.

No debe tratarse como la pieza principal de posicionamiento.

## Dónde se muestra

- Solo en la Home (sección «Zonas donde trabajamos») y en el hub `/cerrajeros/` (§36).
- No en el footer ni en el resto de páginas. El footer muestra los datos de contacto en texto.

## Cómo se carga: «clic para cargar»

- No existe ningún `<iframe>` en el HTML inicial. Se pinta un bloque propio (placeholder estático, sin peso) con un botón «Ver mapa».
- Al pulsarlo, un script mínimo inserta el iframe facilitado por el cliente (se conserva el `src`; se añade `title` por accesibilidad):

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914875.9598179081!2d-3.81602975!3d40.525282000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42295d634f1d77%3A0x36f7862aa131e1bf!2sCerrajeros%20Madrid%20Openservi%20Baratos!5e1!3m2!1ses!2ses!4v1791193222054!5m2!1ses!2ses"
width="100%"
height="300"
style="border:0; border-radius:12px;"
allowfullscreen=""
loading="lazy"
referrerpolicy="strict-origin-when-cross-origin"
title="Mapa de Cerrajeros Madrid Openservi">
</iframe>
```

- Bajo el placeholder, un enlace de texto «Abrir en Google Maps» al perfil de Google (`resenas.perfilUrl`, §18).

## Nota de marca

El mapa embebido muestra el nombre del perfil de Google, «Cerrajeros Madrid Openservi **Baratos**», que choca con la dirección «premium» de §23. Decisión del cliente (`TODO-CLIENTE`): mostrar el mapa tal cual, o dejar solo el enlace al perfil. El placeholder propio no muestra ese nombre hasta que el usuario pulsa «Ver mapa».

---

# 18. REVIEWS [CAMBIO v2]

Crear componente:

```text
src/components/Reviews.astro
```

## Fuente de datos (aportada por la empresa)

Las reseñas están en el perfil de Google (Maps):

- Perfil: https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8
- Valoración media: **4,9** y número de reseñas: **40** (datos del perfil a 2026-10-05, facilitados por el cliente; actualizar `datosAl` cuando cambien).
- Textos: 6 reseñas literales copiadas del perfil (abajo). No inventar ni retocar ninguna.

Datos en `src/data/resenas.ts`:

```ts
export const resenas = {
  fuente: 'Google',
  perfilUrl: 'https://maps.app.goo.gl/bqpm2kbzrnbY4dzp8',
  total: 40,
  media: 4.9,
  datosAl: '2026-10-05',  // fecha de los datos del perfil; actualizar cuando cambien
  // Textos literales copiados del perfil de Google (aportados por el cliente). No editar.
  items: [
    { autor: 'Lidía Poveda', texto: 'Buenos cerrajeros por la zona, dan presupuesto antes de hacer nada para que no haya sorpresas, actúan con honestidad, no como otros. He cambiado de casa y les he llamado para cambiar las cerraduras y llaves de la casa y el trastero. Buenos precios, trabajan rápido y como decía, sin sorpresas.' },
    { autor: 'Vicky Barcos', texto: 'Mi experiencia con los cerrajeros de OpenServi ha sido la mejor. El cerrajero que vino a casa, un profesional y amable, llegó realmente rápido a mi casa, y de forma muy eficaz y profesional, arregló el problema en la cerradura sin causar daño alguno a la puerta.' },
    { autor: 'Miriam Fernandez', texto: 'Servicio súper profesional y rápido cuando me han instalado una puerta acorazada. Los cerrajeros de Openservi fueron muy amables y la puerta quedó perfecta. Muy buen trabajo y buen precio. Relación calidad-precio muy buena. Les agradezco mucho y los recomiendo.' },
    { autor: 'Ramón Juárez Nieto', texto: 'Recién entramos en nuestro nuevo piso de alquiler y llamé a estos cerrajeros para cambiar la cerradura, hablé con mi casero y me recomendó cambiar la cerradura. Todo fue muy bien, trabajo rápido y barato, y al ser los nuevos inquilinos ya estamos tranquilos y seguros con nueva cerradura. Para trabajos de este tipo yo los recomiendo.' },
    { autor: 'Olga Montalbo', texto: 'Llamé a esta empresa de cerrajería 24 horas y me tuvieron que cambiar el bombín de la puerta, pero me la abrieron, llegaron rápido y pude dormir dentro de casa, porque perdí las llaves, la puerta estaba cerrada con todas las vueltas de cuando me fui y era de noche. Muchas gracias por vuestro trabajo que además fue económico.' },
    { autor: 'Marta Alonso', texto: 'Llamé a los cerrajeros de Openservi para instalar en mi empresa cerraduras de alta seguridad. Todas cerraduras de seguridad electrónicas, manejan primeras marcas. Hacen un trabajo fino que te da tranquilidad tanto a tí como a los empleados a la hora de entrar y salir de a empresa cada dia. Un acierto llamar a Openservi' },
  ],
};
```

## Qué se muestra

- Siempre: «4,9 · 40 opiniones en Google» y un enlace «Ver las opiniones en Google Maps» al perfil (nueva pestaña, `rel="noopener"`). Las cifras salen de `resenas.media` y `resenas.total`.
- La media se muestra como texto («4,9 de 5»). Las estrellas, si se usan, son decorativas (`aria-hidden`).
- Con ≥ 3 reseñas en `items`: tarjetas con texto literal y autor (hasta 6). Sin fecha: Google solo ofrece fechas relativas («hace 2 años») que caducan. Con menos de 3, no se pintan tarjetas.
- Nunca editar, traducir ni «mejorar» el texto de una reseña (se respetan también sus erratas). Se puede recortar con «…».
- Usar solo reseñas completas: no las que el perfil muestra truncadas («… Más»), ni las dos reseñas con texto idéntico (autores «climatize SL» y «Emilio Orestes Olivares»).

## Prohibido

- Inventar reseñas, valoraciones o cifras.
- Datos estructurados `AggregateRating` o `Review`: Google no muestra estrellas para reseñas que el propio negocio publica sobre sí mismo [3].
- Estrellas o puntuación sin una `media` real.

El bloque debe estar diseñado para transmitir confianza, no para engañar al buscador.

---

# 19. EEAT / TRUST [CAMBIO v2]

Crear componente:

```text
src/components/EEATBadges.astro
```

El componente muestra ventajas reales y verificables.

Principio: **afirmación + prueba**. Cada insignia enlaza a su prueba; sin prueba, no se muestra.

| Insignia | Prueba (destino del enlace) |
|---|---|
| «Cerrajeros propios en 16 zonas» | Hub `/cerrajeros/` (§36), que explica el criterio de cobertura (§27) |
| «4,9 · 40 opiniones en Google» | Perfil de Google (§18); solo mientras `resenas.total` > 0 |
| «Servicio 24 horas» | Sección «Cerrajero Urgente 24 Horas» de la Home |
| «Presupuesto sin compromiso» | Sección «Cómo trabajamos» (§40) |
| «Garantía por escrito» | Bloque de garantía (Anexo B); solo si la empresa confirma la política |

«Atención profesional» (propuesta de v1) no tiene prueba enlazable: no mostrarla salvo que la empresa aporte una.

IMPORTANTE:

No utilizar como afirmaciones definitivas:

```text
Llegada en 20-30 minutos
Técnicos certificados
Garantía de 6 meses
```

salvo que la empresa pueda demostrar que son datos reales y aplicables.

No inventar credenciales, tiempos o garantías.

---

# 20. MOBILE CTA [CAMBIO v2]

Crear:

```text
src/components/MobileStickyCall.astro
```

Solo visible en móvil.

Concepto:

```css
block md:hidden
fixed bottom-4 left-4 right-4 z-50
```

Diseño:

- Floating pill, `rounded-full`.
- Fondo **semiopaco sólido** (p. ej. obsidiana profunda al 95 %). **No usar `backdrop-blur`**: en un elemento fijo puede encarecer el renderizado en móviles modestos (interpretación, no medido).
- Borde/acento cobre.
- Icono de teléfono.
- CTA claro.

Contenido:

```text
LLAMAR: 912 918 462
```

Detalles:

- `href="tel:+34912918462"`, `aria-label="Llamar al 912 918 462"` y `data-cta="sticky"` (§41).
- Texto blanco sobre obsidiana (contraste 17,74:1; §23).
- **Espacio reservado:** el contenido y el footer no deben quedar tapados. Añadir en móvil un `padding-bottom` al final de la página igual a la altura de la barra más `env(safe-area-inset-bottom)`.
- **Un solo botón.** La empresa no tiene WhatsApp (§15): no añadir botón de WhatsApp.

Debe parecer un elemento integrado y premium, no una barra publicitaria agresiva.

---

# 21. HEADER

Crear:

```text
src/components/Header.astro
```

Debe contener:

- Logo.
- Navegación.
- Acceso a servicios.
- CTA telefónico.
- Diseño premium.
- Excelente experiencia móvil.

Evitar menús excesivamente complejos.

## [CAMBIO v2] Navegación

La navegación enlaza a los hubs: «Servicios» (`/servicios/`) y «Zonas» (`/cerrajeros/`). El CTA telefónico lleva `data-cta="header"` (§41).

---

# 22. FOOTER [CAMBIO v2]

Crear:

```text
src/components/Footer.astro
```

Incluir:

- Teléfono comercial.
- Servicios.
- Localidades relevantes (solo `ready`, con anchors descriptivos).
- Información legal.
- Aviso Legal.
- Privacidad.
- Cookies.
- Datos de JIREH CAPITAL PARTNERS SL.

**Sin mapa en el footer** (§17): evita cargarlo en todas las páginas.

---

# 23. DISEÑO VISUAL

La dirección visual debe alejarse de los clichés de cerrajería.

## Paleta

```css
--color-deep-green: #064E3B;
--color-deep-green-dark: #022C22;
--color-copper: #C28E0E;
--color-copper-alt: #D97706;
--color-onyx: #18181B;
--color-alabaster: #FAFAFA;
```

Concepto:

- Verde noche profundo.
- Cobre/champagne.
- Blanco alabastro.
- Negro ónix.

NO utilizar la combinación típica:

```text
azul eléctrico + amarillo chillón
```

La estética debe transmitir:

- Seguridad.
- Profesionalidad.
- Serenidad.
- Calidad.
- Confianza.
- Servicio premium.

## [CAMBIO v2.1] Paleta «Victoria Alada» (sustituye la paleta de arriba)

El diseño gira alrededor del logotipo del cliente: ángel dorado con una llave y rótulo en plata (borrador en `marca/logo-victoria-alada-borrador.webp`). La paleta verde/cobre de v1 queda sustituida por:

| Token | Valor | Uso |
|---|---|---|
| Obsidiana | `#111827` | Fondo principal |
| Obsidiana profunda | `#030712` | Cabecera, pie, portada, bandas de contraste |
| Oro imperial | `#D4AF37` | Acentos, botones e insignias |
| Oro vivo | `#F59E0B` | Degradado y estados hover |
| Plata | `#E2E8F0` | Texto sobre oscuro, rótulo |
| Plata 2 | `#94A3B8` | Texto secundario sobre oscuro, bordes |
| Blanco | `#FFFFFF` | Secciones de lectura |
| Oro texto (derivado) | `#8B7324` | Solo para detalles dorados legibles sobre blanco |
| Pizarra (derivado) | `#475569` | Texto secundario sobre blanco |

## [CAMBIO v2.1] Tokens en Tailwind 4 (`@theme`)

En Tailwind 4 los tokens se declaran en CSS con `@theme` (`src/styles/global.css`), no con `tailwind.config.mjs`, que v4 no aplica salvo que se cargue con `@config` (§33).

## [CAMBIO v2.1] Reglas de contraste

Valores calculados con la fórmula de contraste WCAG 2.x (2026-10-05). AA = 4,5:1 texto normal, 3:1 texto grande.

| Combinación | Contraste | Texto normal (AA) |
|---|---|---|
| Blanco sobre obsidiana | 17,74:1 | Sí |
| Plata sobre obsidiana | 14,39:1 | Sí |
| Oro sobre obsidiana profunda | 9,57:1 | Sí |
| Oro sobre obsidiana | 8,44:1 | Sí |
| Obsidiana sobre oro (texto de botón) | 8,44:1 | Sí |
| Oro vivo sobre obsidiana | 8,26:1 | Sí |
| Plata 2 sobre obsidiana | 6,92:1 | Sí |
| Obsidiana sobre blanco | 17,74:1 | Sí |
| Oro texto `#8B7324` sobre blanco | 4,59:1 | Sí |
| Plata 2 sobre blanco | 2,56:1 | No |
| Oro vivo sobre blanco | 2,15:1 | No |
| Oro sobre blanco / blanco sobre oro | 2,10:1 | No |

Reglas:

- Botones primarios: degradado oro con texto obsidiana. Prohibido texto blanco sobre oro.
- Sobre fondos oscuros vale todo el texto de la paleta.
- Sobre blanco: texto obsidiana; lo secundario en pizarra `#475569`; los detalles dorados en `#8B7324`. Nunca oro ni plata 2 como texto sobre blanco.

## [NUEVO v2] Motivos visuales con sentido

1. **Perfil de cortes de una llave** como separador de secciones: SVG inline, `aria-hidden`, color `currentColor` (oro sobre obsidiana; oro texto sobre blanco). Componente `KeyCutDivider.astro`.
2. **Micro-interacción CSS en el botón de llamada** (sin JS): al pasar el ratón o con `:focus-visible`, los «pines» del icono se alinean. Con `prefers-reduced-motion: reduce`, sin animación. Componente `CallButton.astro`.
3. **Mapa de cobertura estilo plano de metro** (`ZonasMapa.astro`): SVG inline sin dependencias. Cada localidad `ready` es un enlace; las `draft` se muestran como texto sin enlace. Agrupación esquemática orientativa, no a escala: Oeste (Aravaca, Pozuelo de Alarcón, Majadahonda, Las Rozas, Boadilla del Monte, Villaviciosa de Odón, Collado Villalba), Sur (Alcorcón, Móstoles, Leganés, Getafe, Pinto) y Este (Barajas, Coslada, Rivas-Vaciamadrid, Alcalá de Henares). No implica distancias ni tiempos de llegada. Incluye una lista de enlaces equivalente en HTML para accesibilidad y rastreo.
4. **Fotos reales con la misma relación de aspecto** y pie con datos del trabajo (§8, §37).

---

# 24. TIPOGRAFÍA

Headings:

```text
Cabinet Grotesk
```

Body:

```text
DM Sans
```

Priorizar rendimiento.

Cargar únicamente pesos necesarios.

Evitar cargas innecesarias de fuentes.

## [CAMBIO v2] Carga de fuentes

- Autoalojar las fuentes en WOFF2 (sin peticiones a CDN de terceros), con subconjunto latino que incluya los caracteres del español (á é í ó ú ñ ü ¿ ¡).
- Cargar solo los pesos necesarios y usar `font-display: swap`.
- Precargar (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) únicamente la fuente de los títulos.
- Definir una fuente de reserva con métricas ajustadas para reducir el desplazamiento de layout.

## [CAMBIO v2.1] Fuentes disponibles

Cabinet Grotesk no se puede obtener de npm (es de Fontshare). Mientras la empresa no aporte sus archivos WOFF2, se usan dos fuentes OFL autoalojadas:

- **Michroma** (ancha, como el «MADRID» del logotipo): H1, rótulos y marca.
- **DM Sans** (variable, normal e itálica): texto, H2–H4 y «OpenServi».

Para pasar a Cabinet Grotesk: copiar sus WOFF2 a `public/fuentes/` y cambiar `--f-marca` / `--font-marca` en `global.css`.

---

# 25. RENDIMIENTO / ASTRO

Objetivo:

- HTML estático siempre que sea posible.
- JavaScript mínimo.
- No hidratar componentes que no lo necesiten.
- Imágenes optimizadas.
- Lazy loading donde corresponda.
- Evitar librerías pesadas.
- Evitar animaciones innecesarias.
- HTML semántico.
- CSS limpio.

La web debe aprovechar al máximo la arquitectura de Astro.

## [CAMBIO v2] Objetivos medibles

- LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1, medidos en móvil y evaluados en el percentil 75 [5].
- La imagen del LCP lleva `fetchpriority="high"` y no `loading="lazy"`; el resto de imágenes, lazy loading.
- JavaScript permitido: «clic para cargar» del mapa (§17), mejora opcional del triaje (§39) y `track.ts` (§41). Nada más sin justificación.
- Verificación automática: §43.

---

# 26. SEO TÉCNICO

Desde la primera versión:

- `<html lang="es">`
- `<title>` único por página.
- `<meta name="description">`.
- Canonical.
- Open Graph.
- Twitter/X cards.
- `robots` correctamente configurado.
- Sitemap.
- Robots.txt.
- JSON-LD.
- Breadcrumbs.
- Jerarquía correcta de H1/H2/H3.
- Enlaces internos rastreables.
- URLs limpias.
- Imágenes optimizadas.
- `alt` realista.
- No generar contenido duplicado innecesario.

---

# 27. LOCALIDADES INICIALES [CAMBIO v2]

## Criterio de cobertura

Estas 16 localidades están en la web porque en cada una la empresa tiene un **cerrajero propio dentro de la zona** (dato aportado por la empresa). Es la razón de ser de cada página y debe explicarse con claridad:

- Una localidad solo tiene página si hay cerrajero propio en la zona. Sin cerrajero propio no se crea página.
- Confirmado por el cliente: es **uno de nuestros cerrajeros** (un cerrajero de la empresa), no un local ni una oficina. No usar «delegación», «oficina», «sede» ni «tienda».
- En la web se formula así: etiqueta corta «Cerrajero propio en <Localidad>»; frase larga «Uno de nuestros cerrajeros trabaja en <Localidad>».
- No afirmar nada más sobre ese cerrajero (años, formación, tiempos, nombre) sin un dato aportado por la empresa.

## Localidades

Preparar estas 16 localidades:

```text
Alcalá de Henares
Alcorcón
Aravaca
Barajas
Boadilla del Monte
Coslada
Getafe
Las Rozas
Leganés
Majadahonda
Móstoles
Pozuelo de Alarcón
Pinto
Rivas-Vaciamadrid
Villaviciosa de Odón
Collado Villalba
```

Cada página seguirá el mismo sistema técnico, pero deberá aceptar contenido propio.

Cada localidad nace en `status: draft` y pasa a `ready` cuando cumple los mínimos de §5.

---

# 28. TEMPLATE DE LOCALIDAD [CAMBIO v2]

Archivo:

```text
src/pages/cerrajeros/[localidad].astro
```

Estructura inicial:

1. Breadcrumb (con el hub `/cerrajeros/`, §10).
2. H1.
3. Hero o bloque introductorio, con la línea «Cerrajero propio en <Localidad>» (§27).
4. Imagen real cuando esté disponible.
5. Introducción local (escrita solo con la ficha, §38).
6. Servicios.
7. Información de cobertura.
8. Zonas/barrios relevantes si existen datos reales.
9. **Trabajos reales en <Localidad>** (colección `casos`, §37) [NUEVO v2].
10. FAQ local.
11. Enlaces a servicios.
12. Enlaces a localidades cercanas (solo `ready`, §5).
13. CTA telefónico.
14. Footer.

No obligar a utilizar exactamente el mismo número de párrafos para todas las localidades.

Secciones condicionales: si no hay datos reales para una sección, la sección no se pinta.

---

# 29. TEMPLATE DE SERVICIO

Archivo:

```text
src/pages/servicios/[servicio].astro
```

La página debe poder definir:

```text
title
seoTitle
seoDescription
intro
benefits
process
images
faqs
relatedServices
```

No duplicar la Home.

---

# 30. FOTOGRAFÍA Y CONTENIDO FUTURO

La primera versión debe quedar preparada para incorporar posteriormente:

- Más fotografías reales.
- Textos más extensos.
- Casos reales.
- Información específica de barrios.
- Nuevas FAQs.
- Nuevos servicios.
- Nuevas localidades.

No generar contenido largo artificial solamente para llenar huecos.

La prioridad es:

**calidad > cantidad**

## [CAMBIO v2] Cómo entra el material real

Fotos y casos reales: colección `casos` (§37). Información de barrios y de cada zona: ficha por localidad (§38). Ningún contenido nuevo se genera sin material aportado por la empresa.

---

# 31. REDIRECCIONES [ELIMINADO v2]

Decisión del cliente: no se contemplan redirecciones. No implementar mapa de 301 ni nada relacionado.

---

# 32. COMPONENTES PRINCIPALES

Crear como mínimo:

```text
src/components/
├── Header.astro
├── Footer.astro
├── EEATBadges.astro
├── Reviews.astro
├── MobileStickyCall.astro
├── Breadcrumbs.astro
├── InterlinkingGrid.astro
├── SEO.astro
└── LocalBusinessSchema.astro
```

Componentes adicionales pueden añadirse cuando simplifiquen el mantenimiento.

---

# 33. DELIVERABLES [CAMBIO v2]

Generar inicialmente:

```text
src/styles/global.css                     ← sustituye a tailwind.config.mjs (Tailwind 4: @import "tailwindcss" + @theme, §23)

src/layouts/Layout.astro

src/components/Header.astro
src/components/Footer.astro
src/components/EEATBadges.astro
src/components/Reviews.astro
src/components/MobileStickyCall.astro
src/components/Breadcrumbs.astro
src/components/InterlinkingGrid.astro
src/components/SEO.astro
src/components/LocalBusinessSchema.astro
src/components/Triage.astro               [NUEVO v2] (§39)
src/components/ComoTrabajamos.astro       [NUEVO v2] (§40)
src/components/TrabajosReales.astro       [NUEVO v2] (§37)
src/components/MapaCargaBajoDemanda.astro [NUEVO v2] (§17)
src/components/ZonasMapa.astro            [NUEVO v2] (§23)
src/components/KeyCutDivider.astro        [NUEVO v2] (§23)
src/components/CallButton.astro           [NUEVO v2] (§23, §41)

src/pages/index.astro
src/pages/servicios/index.astro           [NUEVO v2] hub (§36)
src/pages/servicios/[servicio].astro
src/pages/cerrajeros/index.astro          [NUEVO v2] hub (§36)
src/pages/cerrajeros/[localidad].astro
src/pages/404.astro                       [NUEVO v2] con CTA telefónico

src/content/localidades/*
src/content/servicios/*
src/content/casos/*                       [NUEVO v2] (§37)

src/data/site.ts
src/data/resenas.ts                       [NUEVO v2] (§18)
src/data/situaciones.ts                   [NUEVO v2] (§39)

src/lib/gate.ts                           [NUEVO v2] (§5)
src/lib/track.ts                          [NUEVO v2] (§41)

scripts/seo-audit.mjs                     [NUEVO v2] (§43)
scripts/inventario-fotos.mjs              [NUEVO v2] (§34)

public/ favicons + site.webmanifest       [NUEVO v2]
```

Crear además la configuración necesaria para:

- Sitemap.
- Robots.
- Assets.
- Imágenes optimizadas.
- Metadata.
- JSON-LD.

Versiones de referencia (registro npm, consultado el 2026-10-05): `astro` 7.3.5 · `tailwindcss` 4.3.3 · `@astrojs/sitemap` 3.7.4. Con Tailwind 4 se usa el plugin oficial de Vite (`@tailwindcss/vite`; de memoria). Confirmar siempre con la documentación oficial vigente al instalar.

---

# 34. PRIORIDADES DE IMPLEMENTACIÓN [CAMBIO v2]

## Fase 0: inventario de material real [NUEVO v2]

Antes de escribir contenido de localidades:

- `scripts/inventario-fotos.mjs` lista las fotos disponibles y cuenta cuántas hay por localidad según el nombre de archivo (`localidad_tipo_aaaa-mm.jpg`) o la carpeta, y genera `inventario.md`.
- La empresa completa `casos.csv` con: archivo · localidad · tipo (`apertura`, `cambio-cerradura`, `cerrojo`, `bombin`, `alta-seguridad`, `otro`) · barrio (opcional) · qué se hizo (1–3 frases reales) · fecha (opcional). Fila incompleta = no hay caso.
- A partir de `casos.csv` se generan los ficheros de `src/content/casos/`, con `verificado: true` solo para filas aportadas por la empresa. Nunca se completan ni se embellecen los textos.

## Fase 1: lanzamiento mínimo viable (la «muestra mínima») [CAMBIO v2]

Construir:

- Home.
- Diseño visual.
- Header.
- Hero.
- CTA.
- EEAT.
- Servicios.
- Cobertura.
- Reviews (recuento + enlace; tarjetas solo con reseñas reales cargadas).
- FAQ.
- Footer.
- SEO técnico.
- Schema.
- Sitemap.
- Arquitectura de datos.
- Hubs `/servicios/` y `/cerrajeros/` (§36).
- Triaje (§39) y «Cómo trabajamos» (§40).
- Puerta de indexación (§5) y auditoría (§43).

Se publica únicamente lo que cumple los mínimos:

- 2 páginas de servicio (cambio de cerraduras e instalación de cerrojos).
- Páginas legales (§16, sin cambios).
- Localidades: solo las que pasen la puerta (§5). Si todavía no pasa ninguna, el hub `/cerrajeros/` lista las 16 zonas como texto, sin enlaces a las `draft`.

## Fase 2: localidades por lotes [CAMBIO v2]

Sustituye a «rellenar localidades con contenido único»: ese contenido sale de la ficha (§38) y de los casos reales (§37), no de texto genérico.

- Lote 1: las 4 localidades con más material en el inventario (orientativo; el cliente puede cambiar la selección).
- Lotes siguientes: 4 localidades por lote.
- Una localidad pasa a `ready` cuando la empresa aporta su ficha y ≥ 1 caso real.

## Fase 3

Añadir más fotografías y casos reales por localidad y servicio.

## Fase 4

Ampliar servicios y localidades según oportunidades SEO reales (consultas reales por URL en Search Console, §41).

---

# 35. CRITERIO GENERAL

El proyecto debe sentirse como una empresa real de cerrajería profesional, no como una colección de landing pages SEO.

Cada decisión debe responder a esta prioridad:

```text
1. Usuario
2. Conversión
3. Calidad y confianza
4. SEO
5. Escalabilidad técnica
```

El SEO debe estar integrado en la arquitectura y en el contenido, no ser una capa de texto artificial colocada encima del diseño.

La Home debe ser la pieza principal.

Las páginas de servicio deben ser especialistas.

Las páginas de localidad deben ser realmente locales.

Y toda la arquitectura debe permitir crecer sin rehacer el proyecto.

---

# 36. HUBS: `/servicios/` Y `/cerrajeros/` [NUEVO v2]

Los breadcrumbs (§10) enlazan a estos hubs. Deben existir como páginas reales, indexables y con contenido útil; no son listas de enlaces vacías. Resúmenes breves redactados para el hub: no copiar párrafos de la Home ni de las páginas de servicio.

## `/servicios/`: servicios de cerrajería

Archivo: `src/pages/servicios/index.astro`

- H1 propio (p. ej. «Servicios de cerrajería en Madrid»); `seoTitle` y `seoDescription` propios.
- Resumen de cada servicio, con anchor descriptivo:
  - Apertura de puertas → `/#apertura-de-puertas` (v1 §1 mantiene este servicio en la Home).
  - Cambio de cerraduras → `/servicios/cambio-de-cerraduras-madrid/`.
  - Instalación de cerrojos de seguridad → `/servicios/instalacion-de-cerrojos-madrid/`.
  - Cerrajero urgente 24 horas → `/#cerrajero-urgente-24-horas`.
- Bloque «Cómo trabajamos» (§40), con el mismo componente que la Home.
- CTA telefónico.

## `/cerrajeros/`: zonas de servicio

Archivo: `src/pages/cerrajeros/index.astro`

- H1 propio (p. ej. «Zonas de servicio: cerrajeros en Madrid y alrededores»); `seoTitle` y `seoDescription` propios.
- Explicación del criterio de cobertura (§27): en cada zona hay un cerrajero propio.
- Mapa de cobertura esquemático (`ZonasMapa`, §23) y mapa de Google con «clic para cargar» (§17).
- Lista de localidades: las `ready` con enlace («Cerrajeros en Alcorcón»); las `draft` solo como texto, sin enlace (§5).
- CTA telefónico.

---

# 37. COLECCIÓN `casos`: «TRABAJOS REALES» [NUEVO v2]

Objetivo: hacer única cada página de localidad sin inventar nada, aprovechar las fotografías reales (§8) y demostrar experiencia de primera mano.

Por qué: Google considera spam («doorway abuse») las páginas creadas para posicionar consultas semejantes (por ejemplo, regiones o ciudades) que llevan a una página intermedia menos útil [4]. Los casos reales aportan contenido distinto y verificable en cada localidad.

## Esquema (orientativo; adaptar a la API vigente de Content Collections)

```ts
casos: {
  localidad: reference('localidades'),
  tipo: 'apertura' | 'cambio-cerradura' | 'cerrojo' | 'bombin' | 'alta-seguridad' | 'otro',
  barrio?: string,
  fecha?: Date,          // solo si se conoce
  foto: image(),         // foto real
  alt: string,           // describe lo que se ve (§8)
  resumen: string,       // 1–3 frases REALES aportadas por la empresa
  verificado: true       // la empresa confirma que es un trabajo real
}
```

## Reglas

- Un caso = una foto real + tipo + barrio o localidad + qué se hizo.
- Sin `verificado: true`, no se publica. Nunca inventar, completar ni «mejorar» un caso. Si falta el texto, el caso no se publica.
- Cada página de localidad muestra los casos que la referencian (`TrabajosReales.astro`).
- La Home muestra una selección (hasta 6) solo si hay ≥ 3 casos verificados; si no, la sección no se pinta.
- El `alt` describe lo que se ve (p. ej. «Cerradura de seguridad instalada en una puerta blindada»), nunca «cerrajeros <localidad>» (§8).
- Pie de foto con los datos del trabajo: tipo · zona · fecha (si se conoce).
- Todas las fotos con la misma relación de aspecto.

---

# 38. FICHA DE DATOS POR LOCALIDAD [NUEVO v2]

La ficha la rellena la empresa, no un modelo de lenguaje. El texto de la página se escribe solo con lo que contiene la ficha. Campo vacío = sección que no se pinta. No rellenar huecos con texto genérico.

| Campo | Contenido |
|---|---|
| `cerrajeroPropio` | `true` / `false`: cerrajero propio dentro de la zona (declarado por la empresa; `true` en las 16) |
| `tipoPresencia` | Confirmado por el cliente: «uno de nuestros cerrajeros» (un cerrajero de la empresa; no un local) |
| `barrios` | Barrios o zonas que se atienden (los reales) |
| `observacionesLocales` | Tipos de puertas y cerraduras más frecuentes en la zona, según la experiencia real del cerrajero |
| casos | 1–3 casos con foto (§37) |
| `faqs` | Preguntas reales de clientes de la zona, con su respuesta |
| `tiempoLlegada` | Solo si la empresa lo mide; si no, vacío (no se muestra) |
| `image` / `imageAlt` | Foto propia de la zona, con `alt` descriptivo |
| `nearby` | Localidades próximas (cada una con cerrajero propio) |

---

# 39. TRIAJE «¿QUÉ TE HA PASADO?» [NUEVO v2]

Bloque de la Home justo después del Hero. Componente `Triage.astro`; datos en `src/data/situaciones.ts`.

- 5 situaciones: «Me he quedado fuera de casa» (llaves dentro o perdidas), «La cerradura falla, está bloqueada o se ha roto la llave», «Han intentado forzar mi puerta», «Me mudo o ha cambiado el inquilino» (quiero cambiar la cerradura) y «Quiero más seguridad en mi casa o negocio».
- Cada una con una respuesta corta en tres bloques: **Qué hacer ahora**, **Qué haremos nosotros**, **Qué tener a mano**; y un botón de llamada.
- Implementación: HTML estático con anclas o `<details>` (rastreable y accesible). El JS es solo una mejora opcional; sin JS debe funcionar igual.
- «Qué haremos nosotros» describe únicamente lo que la empresa hace de verdad (revisión de la puerta y la cerradura; presupuesto sin compromiso antes de empezar). Sin tiempos ni promesas.
- En la situación de intento de robo, incluir «Si hay peligro, llama al 112».
- Es una hipótesis de conversión: se mide con `data-cta="triage-<situacion>"` (§41).
- Los textos son un borrador editable: la empresa los revisa antes de publicar.
- La lista parte de los temas que se repiten en las reseñas reales del perfil (llaves dentro o perdidas, cambio de cerradura por alquiler o mudanza, intento de robo, seguridad de casa o negocio). Google marca entre los temas: «puerta» (21), «precio» (13), «seguridad» (10), «negocio» (6), «económico» (5), «alquilado» (3) y «susto» (2).

---

# 40. CÓMO TRABAJAMOS [NUEVO v2]

Componente `ComoTrabajamos.astro`. Aparece en la Home (H2 «Cómo trabajamos», `id="como-trabajamos"`) y en el hub `/servicios/` (§36).

## Sin precios (decisión del cliente)

La web no publica precios: ni tablas de tarifas, ni «desde X €», ni importes por hora o por servicio, en ninguna página, FAQ ni texto. La auditoría (§43) lo comprueba. Lo que sí se explica es cómo se trabaja y cómo se presupuesta.

## Pasos (solo afirmaciones respaldadas)

1. Llamas al 912 918 462 y cuentas qué ha pasado.
2. Te explicamos el trabajo y el presupuesto, sin compromiso, antes de empezar.
3. Uno de nuestros cerrajeros realiza el trabajo.
4. Recibes la factura con la garantía por escrito (solo si la empresa adopta la política del Anexo B).

El texto completo de la garantía va en un `<details>` dentro de esta misma sección.

Esta sección es la prueba enlazable de las insignias «Presupuesto sin compromiso» y «Garantía por escrito» (§19).

---

# 41. MEDICIÓN [NUEVO v2]

Sin medición no se puede optimizar.

## Eventos de llamada

- Todo enlace `tel:` lleva `data-cta` con el bloque de origen: `header`, `hero`, `sticky`, `triage-<situacion>`, `faq`, `zona-<slug>`, `servicio-<slug>` o `footer`.
- Un único módulo, `src/lib/track.ts`, registra el clic de llamada con `{ cta, pagina }`. Hasta que la empresa elija herramienta de analítica (`TODO-CLIENTE`), el módulo no carga ningún script de terceros.
- Eventos adicionales: clic en «Ver mapa» y clic en el enlace al perfil de Google.

## Search Console

- Verificar la propiedad (DNS, o meta de verificación configurable en `site.ts`).
- Enviar `/sitemap-index.xml`.
- Revisar las consultas por URL para detectar canibalización entre la Home y las páginas de servicio o de localidad.

---

# 42. REGLAS DE REDACCIÓN [NUEVO v2]

- Prohibido sin prueba: «los mejores», «líderes», «técnicos certificados», «llegamos en X minutos» (cualquier tiempo de llegada), «garantía de X meses» (salvo que la empresa defina `garantiaMeses`), «años de experiencia» sin dato aportado y cualquier superlativo.
- La primera frase de cada sección es la respuesta directa a lo que el usuario busca.
- Concreto antes que adjetivos: datos, procesos y ejemplos reales.
- Cada afirmación comprobable enlaza a su prueba (§19).
- No reutilizar textos entre dominios propios ni entre localidades (ni plantillas de texto con el nombre cambiado).
- No publicar precios ni importes (decisión del cliente, §40).

---

# 43. CRITERIOS DE ACEPTACIÓN AUTOMÁTICOS [NUEVO v2]

Scripts de `package.json`:

```text
build:         astro build                    (incluye la puerta de indexación, §5)
audit:         node scripts/seo-audit.mjs
audit:strict:  node scripts/seo-audit.mjs --strict      (para producción)
```

`audit` se ejecuta tras `build` y falla si:

- hay `<title>` o `<meta name="description">` duplicados, ausentes o vacíos;
- una página no tiene exactamente un `<h1>`;
- falta un `canonical` absoluto o no apunta a la propia URL (en páginas indexables);
- hay una URL `noindex` en el sitemap, o un enlace interno desde una página indexable hacia una página `noindex` o 404;
- hay imágenes sin `alt`;
- aparece `lorem`, `TODO`, `XXX` o `{{` en el HTML publicado;
- aparece alguna expresión prohibida de §42 (p. ej. «técnicos certificados», «llegamos en»);
- el sitemap contiene `changefreq` o `priority`;
- el JSON-LD no es válido o incluye `AggregateRating` o `Review`;
- un enlace `tel:` apunta a un número distinto de `+34912918462` (el teléfono del Aviso Legal solo aparece en las páginas legales);
- aparece el símbolo «€» o un importe en euros en el HTML publicado (la web no publica precios; excluir las páginas legales);
- en modo `--strict`: queda algún `TODO-CLIENTE` sin resolver.

Objetivos de rendimiento (móvil; Core Web Vitals en el percentil 75) [5]:

- LCP ≤ 2,5 s · INP ≤ 200 ms · CLS ≤ 0,1.
- La imagen del LCP lleva `fetchpriority="high"` y no `loading="lazy"`.

---

# ANEXO A. Registro de errores de v1 (resueltos en v2)

| # | Dónde (v1) | Error | Resolución en v2 |
|---|---|---|---|
| E1 | §2, §10, §33 | Los breadcrumbs enlazan a `/cerrajeros/` y `/servicios/`, que no existen como páginas ni figuran en los deliverables | Hubs reales (§36) |
| E2 | §6, §17, §22 | El footer lleva mapa, pero §17 pide evitar cargarlo en todas las páginas | Mapa solo en Home y hub, con clic para cargar; footer sin mapa |
| E3 | §17 y §23 | El iframe facilitado muestra el nombre «…Baratos», que choca con la dirección «premium» | Decisión pendiente (§17) |
| E4 | §33 | `tailwind.config.mjs`: Tailwind 4 se configura en CSS con `@theme` (de memoria) | `src/styles/global.css` |
| E5 | §23 | Pares de color sin contraste AA: cobre/verde 3,32:1, cobre/alabastre 2,81:1, blanco/cobre 2,93:1 | Reglas de contraste (§23) |
| E6 | §13 | Sin reglas de sitemap: Google ignora `changefreq` y `priority` y usa `lastmod` solo si es fiable [1] | §13 |
| E7 | §14 | `LocalBusiness` genérico, sin `Service`/`provider`; riesgo de añadir `FAQPage` sin efecto visible [2] | §14 |
| E8 | §5 | Indexación progresiva sin mecanismo | `status` + comprobación dentro del build (§5) |
| E9 | §34 | Fases 2–3: «contenido único» sin decir con qué | `casos`, ficha y muestra mínima (§34, §37, §38) |
| E10 | §20 | `backdrop-blur-xl` en un elemento fijo y sin espacio inferior reservado | §20 |
| E11 | §6, §18 | H2 «Opiniones» fijo aunque no haya reseñas cargadas | Recuento + enlace; tarjetas condicionales (§18) |
| E12 | §19 | Insignias sin prueba (p. ej. «Atención profesional») | Afirmación + prueba (§19) |
| E13 | §27 | Sin criterio para elegir las 16 localidades | Cerrajero propio en la zona (§27) |
| E14 | Global | Sin medición ni criterios de aceptación | §41, §43 |

---

# ANEXO B. Garantía por escrito: borrador de política propuesta

> **Estado: BORRADOR.** Es una política propuesta a petición del cliente, **no un hecho existente**. Solo se publica si la empresa se compromete a cumplirla en cada trabajo: en el parte o en la factura debe figurar la garantía. La duración la decide la empresa (`garantiaMeses` en `site.ts`, por defecto `null`). Si no se define, el texto no menciona ningún plazo.

Texto para la web (Home, dentro de «Cómo trabajamos», en un `<details>`):

**Garantía por escrito**

Cada trabajo incluye garantía por escrito. En el parte o en la factura del servicio figura la garantía aplicable, con sus condiciones.

**Qué cubre.** Los defectos de la mano de obra y de los materiales que hemos instalado nosotros.

**Qué no cubre.** Los daños por mal uso, por manipulaciones de terceros posteriores al servicio y por el desgaste normal. Tampoco los elementos que no hemos instalado nosotros.

**Cómo reclamar.** Llama al 912 918 462 e indica la dirección y la fecha del servicio.

Variante si `garantiaMeses` está definido: la primera frase pasa a «…con sus condiciones y su duración: {garantiaMeses} meses desde la fecha de la factura.», donde `{garantiaMeses}` es el valor de la variable.

---

# ANEXO C. Datos y decisiones pendientes (`TODO-CLIENTE`)

1. **Reseñas:** cargados 4,9 · 40 y 6 reseñas literales (§18). Actualizar `datosAl` cuando cambien; el cliente puede sustituir o ampliar las 6 elegidas (solo reseñas completas).
2. **Garantía:** confirmar la política del Anexo B y, si se desea, la duración.
3. **Schema:** qué dirección se publica (`address` / `geo`). Por defecto, ninguna.
4. **Imagen y mapa:** el nombre del perfil incluye «Baratos» y varias reseñas dicen «barato» o «económico» (Google marca «precio» 13 veces y «económico» 5 entre los temas), mientras que v1 §23 pide estética «premium». Decidir qué cuenta la web para que Home y reseñas digan lo mismo, y si el mapa se muestra con ese nombre o se deja solo el enlace al perfil.
5. **Analítica:** herramienta elegida (§41).
6. **Dominio definitivo** (`site` en la configuración de Astro). Supuesto: `https://cerrajerosmadrid.madrid`, por el nombre del repositorio.
7. **Tiempo de llegada:** no se muestra mientras la empresa no lo mida.
8. **Lote 1 de localidades** (§34): confirmar o cambiar la selección.
9. **Coherencia teléfono–web:** la web promete presupuesto sin compromiso antes de empezar (§40). Una reseña pública del perfil critica que, al preguntar el precio por teléfono, no se lo dieron. Quien atienda el 912 918 462 debe poder explicar cómo se presupuesta.

Resuelto por el cliente (ya incorporado):

- «Cerrajero propio» = uno de nuestros cerrajeros (§27).
- Precios: la web no los publica (§40).
- WhatsApp: no hay (§15).
- Redirecciones: no se contemplan (§31).

Fuera del alcance de v2 (no aprobado): v2 mantiene v1 en la página propia de «Apertura de puertas» (v1 §1 la deja en la Home) y en el orden de los H2 de la Home.

---

# ANEXO D. Fuentes y estado de verificación

Fuentes consultadas mediante búsqueda web (las páginas oficiales no se pudieron abrir desde el entorno de trabajo):

- [1] Google Search Central, «Build and submit a sitemap»: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- [2] Search Engine Journal, retirada de los resultados enriquecidos de FAQ: https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
- [3] Google Search Central Blog (2019), reseñas «self-serving»: https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
- [4] Google, «Spam policies» (doorway abuse): https://developers.google.com/search/docs/essentials/spam-policies
- [5] web.dev, Core Web Vitals: https://web.dev/articles/vitals (los umbrales coincidían en varios resultados de búsqueda).

Verificado directamente:

- Versiones del registro npm (2026-10-05): `astro` 7.3.5, `tailwindcss` 4.3.3, `@astrojs/sitemap` 3.7.4.
- Contrastes de §23: calculados con la fórmula WCAG 2.x el 2026-10-05.

Aportado por el cliente (no contrastado por mí: el perfil de Google no se pudo abrir desde el entorno de trabajo):

- Reseñas de §18 (4,9 · 40 y los 6 textos), copiadas del perfil el 2026-10-05.
- Cobertura de §27 (cerrajero propio dentro de cada zona).

No verificado (de memoria; comprobar en la documentación oficial antes de implementar):

- Configuración de Tailwind 4 (`@import "tailwindcss"`, `@theme`, `@tailwindcss/vite`).
- Existencia del tipo `Locksmith` en schema.org.
- Propiedades que exige Google para el marcado de negocio local.
- No bloquear páginas `noindex` en `robots.txt`.
- Umbral WCAG de «texto grande» (24 px, o 18,66 px en negrita).
