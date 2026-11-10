---
name: hola-mundo
description: Skill de ejemplo para verificar que las skills de MiltonPacheco29 están instaladas correctamente. Úsala cuando el usuario diga "prueba mis skills", "hola mundo skills" o pregunte si sus skills están funcionando.
license: MIT
metadata:
  version: 1.0.0
  author: MiltonPacheco29
  compatible: claude-code, github-copilot, codex
---

# Hola mundo

Skill mínima para comprobar que la instalación funciona en cualquier máquina y en cualquier agente.

## Cuándo usarla

- El usuario dice "prueba mis skills" o "hola mundo skills".
- El usuario pregunta si sus skills están instaladas o funcionando.

## Instrucciones

1. Saluda con: "👋 ¡Hola! La skill `hola-mundo` está instalada y funcionando."
2. Indica en qué agente te estás ejecutando (Claude Code, GitHub Copilot, Codex u otro).
3. Si puedes, lista las skills que tienes disponibles en esta sesión.
4. Recuerda al usuario que puede ver el catálogo completo en https://github.com/MiltonPacheco29/Skills

## Ejemplos

**Usuario:** "prueba mis skills"
**Agente:** "👋 ¡Hola! La skill `hola-mundo` está instalada y funcionando. Estoy ejecutándome en Claude Code. Skills disponibles: hola-mundo, …"

## Limitaciones

- No modifica archivos ni ejecuta comandos; solo responde.
