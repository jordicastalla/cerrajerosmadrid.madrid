# Casos reales («Trabajos reales», spec §37)

Este fichero no se publica (empieza por guion bajo). Cada caso es un `.md` en
esta carpeta, con una foto real en `src/assets/casos/` y este frontmatter:

```yaml
---
localidad: alcorcon              # slug de src/content/localidades
tipo: cambio-cerradura           # apertura | cambio-cerradura | cerrojo | bombin | alta-seguridad | otro
barrio: Parque Lisboa            # opcional, solo si es real
fecha: 2026-09-12                # opcional, solo si se conoce
foto: ../../assets/casos/alcorcon-cambio-cerradura-2026-09.jpg
alt: "Bombín de seguridad recién instalado en una puerta blindada"   # describe lo que se ve
resumen: "Cambio de bombín tras perder las llaves. Se instaló un bombín de seguridad y se entregaron llaves nuevas."  # 1–3 frases reales
verificado: true                 # la empresa confirma que es un trabajo real
---
```

Sin `verificado: true` no se publica. Nunca inventar, completar ni «mejorar» un caso.
