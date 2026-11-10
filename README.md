# Skills de Milton

Colección personal de **Agent Skills** para **Claude Code**, **GitHub Copilot** y **Codex**. Una sola copia de cada skill funciona en las tres herramientas, porque todas siguen el estándar abierto `SKILL.md`.

[![validate](https://github.com/MiltonPacheco29/Skills/actions/workflows/validate.yml/badge.svg)](https://github.com/MiltonPacheco29/Skills/actions/workflows/validate.yml)
[![Licencia: MIT](https://img.shields.io/badge/licencia-MIT-blue.svg)](LICENSE)

---

## Instalación rápida

Elige el **alcance**:
- **global**: disponible en todas tus sesiones y proyectos;
- **proyecto**: solo en el repositorio donde lo instales.

### Opción 1: pídeselo a tu agente

Copia este prompt en Claude Code, Copilot o Codex:

```text
Lee https://github.com/MiltonPacheco29/Skills/blob/main/INSTALL.md y sigue sus
instrucciones para instalar la skill hola-mundo de forma global para Claude Code
en esta máquina.
```

Puedes cambiarle tres cosas:
- la skill: `hola-mundo` → otra skill o *todas las skills*;
- el alcance: *de forma global* → *en este proyecto*;
- la herramienta: *Claude Code* → *GitHub Copilot*, *Codex* o *todas las herramientas*.

El agente descarga el repo, copia las carpetas a la ruta correcta y te dice qué instaló.

### Opción 2: con `npx`

Solo necesitas [Node.js](https://nodejs.org). `npx skills` ejecuta la CLI abierta [`skills`](https://github.com/vercel-labs/skills) sin instalarla. Lo que hace:
1. Descarga este repo.
2. Detecta las carpetas que tienen un `SKILL.md`.
3. Te pregunta qué skills, para qué agentes y con qué alcance.
4. Las copia a las rutas correctas.

```bash
# Interactivo (te pregunta todo)
npx skills add MiltonPacheco29/Skills

# Global, en vez del proyecto actual
npx skills add MiltonPacheco29/Skills -g

# Una skill concreta y agentes concretos
npx skills add MiltonPacheco29/Skills --skill hola-mundo -a claude-code -a github-copilot -a codex
```

> Ejecuta `npx skills --help` para ver todas las opciones disponibles en tu versión.

Para comprobar que funciona, abre una sesión nueva del agente y escribe **"prueba mis skills"**.

---

## Catálogo de skills

| Skill | Descripción | Claude | Copilot | Codex | Versión | Actualizada |
|---|---|:-:|:-:|:-:|---|---|
| [`hola-mundo`](skills/hola-mundo/SKILL.md) | Verifica que tus skills están instaladas | ⚠️ | ⚠️ | ⚠️ | 1.0.0 | 2026-11-10 |

✅ = probada en esa herramienta · ⚠️ = sin probar todavía

---

## Dónde se instalan

`~` es tu carpeta de usuario (en Windows, `C:\Users\<usuario>`).

| Herramienta | Global | Proyecto |
|---|---|---|
| Claude Code | `~/.claude/skills/<skill>/` | `.claude/skills/<skill>/` |
| GitHub Copilot (CLI, cloud agent, VS Code agent mode) | `~/.copilot/skills/<skill>/` | `.github/skills/<skill>/` |
| Codex CLI | `~/.agents/skills/<skill>/` | `.agents/skills/<skill>/` |

## Actualizar y desinstalar

| Acción | Con `npx` | Con el agente |
|---|---|---|
| Ver instaladas | `npx skills list` | "¿qué skills tengo instaladas?" |
| Buscar actualizaciones | `npx skills check` | — |
| Actualizar | `npx skills update` | Repite el prompt de instalación |
| Desinstalar | `npx skills remove <skill>` | "desinstala la skill `<skill>`" (borra su carpeta) |

---

## Crear o modificar una skill (flujo del dueño)

**Estructura de una skill:**

```
skills/<nombre-skill>/
├── SKILL.md        # obligatorio (frontmatter + instrucciones)
├── scripts/        # opcional
├── references/     # opcional
└── assets/         # opcional
```

**Reglas para el frontmatter:**
- `name` debe ser igual al nombre de la carpeta, en kebab-case.
- `description` dice qué hace la skill y **cuándo** usarla (máx. 1024 caracteres).
- `metadata.version` sigue SemVer.

Parte de la [plantilla](templates/SKILL.template.md).

### Añadir una skill
1. Copia `templates/SKILL.template.md` a `skills/<nombre>/SKILL.md` y rellénalo.
2. Ejecuta `node scripts/validate.mjs`.
3. Pruébala en local: `npx skills add . --skill <nombre>`.
4. Añade una fila al **Catálogo**, en orden alfabético, con versión `1.0.0`, la fecha de hoy y ✅/⚠️ por herramienta.
5. Haz commit con `feat(<nombre>): add skill para ...` y push.

### Modificar una skill
1. Sube `metadata.version`:
   - **MAJOR**: cambia el comportamiento;
   - **MINOR**: nueva capacidad;
   - **PATCH**: arreglo o redacción.
2. En el **Catálogo**, actualiza **Versión** y **Actualizada** (y la descripción y los ✅ si cambiaron).
3. Haz commit con `feat|fix|docs(<nombre>): ...`.

### Eliminar una skill
Borra la carpeta y su fila del catálogo, y haz commit con `chore(<nombre>): remove skill`.

### Convención de commits

| Caso | Mensaje |
|---|---|
| Skill nueva | `feat(nombre-skill): add skill para X` |
| Nueva capacidad | `feat(nombre-skill): soporta Y` |
| Arreglo | `fix(nombre-skill): corrige Z` |
| Solo redacción | `docs(nombre-skill): aclara ejemplos` |
| Cambio que rompe | `feat(nombre-skill)!: ...` + `BREAKING CHANGE: ...` |
| README / INSTALL | `docs(readme): ...` / `docs(install): ...` |
| CI / validación | `ci: ...` |

Reglas:
- Un commit por skill.
- El cambio, la versión y la fila del catálogo van en el mismo commit.

---

## Contribuir

Este repo es de **solo lectura** para terceros: cualquiera puede verlo, clonarlo e instalar las skills, pero solo el dueño puede modificar `main`. Si tienes una sugerencia, abre un **Issue** o un **Pull Request desde un fork**.

## Licencia

[MIT](LICENSE)
