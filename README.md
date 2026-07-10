# 🧇 Nederlands! 🇪🇸→🇧🇪

Curso de neerlandés (flamenco) gratuito y de código abierto para hispanohablantes que viven o se
mudan a Flandes, Bélgica. Adaptado del proyecto hermano
[nederlands-voor-brazilianen](https://github.com/Cloesick/nederlands-voor-brazilianen) (versión para
brasileños), reutilizando el mismo motor de curso probado.

## Qué incluye
- Lecciones CEFR (A1 en adelante) con frases alineadas por colores entre neerlandés y español (mismo
  tipo de palabra = mismo estilo en los dos idiomas)
- Ejercicios estilo Babbel: opción múltiple, escuchar, completar, ordenar, emparejar
- Flashcards con repetición espaciada
- PWA instalable, funciona offline
- Sin registro, progreso guardado solo en el aparato

## Estado actual
Lanzamiento inicial con nivel A1 (2 lecciones: presentarse, artículos de/het). Se irá ampliando nivel
por nivel, igual que hizo la versión en portugués.

## Stack
Vanilla JS, sin build, sin framework. `/api` contiene funciones serverless de Vercel (Stripe +
Supabase) para el Premium opcional, aún no activado.

## Desarrollo local
```
python -m http.server 8000
```
Y abre `http://localhost:8000`.
