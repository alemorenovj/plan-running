# Plan de running — Alejandro & Valentina

Sitio estático de una sola página: plan semanal de movilidad, fuerza, prevención y drills de carrera, con rutinas antes/después de cada sesión y una biblioteca de teoría. Todo en un solo `index.html` (sin dependencias, sin build).

## Ver en local
Abre `index.html` en el navegador, o levanta un server simple:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Desplegar en Vercel
No necesita configuración: es HTML estático en la raíz.

1. Sube este repo a GitHub (ver abajo).
2. Entra a https://vercel.com → **Add New… → Project** → **Import** el repo.
3. Framework Preset: **Other**. Root Directory: `/`. Deja Build & Output en blanco.
4. **Deploy**. Vercel te da la URL (ej. `plan-running.vercel.app`).

Cada `git push` a `main` vuelve a desplegar solo.

## Subir a GitHub (con git, ya inicializado)
```bash
# crea el repo vacío en github.com (sin README), luego:
git remote add origin https://github.com/TU_USUARIO/plan-running.git
git branch -M main
git push -u origin main
```

## Cómo actualizar (flujo automatizado)

El contenido lo genera el Clon (Fable + subagentes). Para actualizar:
1. Pides el cambio al Clon.
2. El Clon edita `index.html`, hace `commit` y `push` a este repo.
3. Vercel redespliega solo (~10 s). Solo refrescas la URL.

Contexto y decisiones del proyecto viven en el Clon Digital: `Running/MEMORIA_RUNNING.md`.
