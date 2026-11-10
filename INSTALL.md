# Instrucciones de instalación (para agentes de IA)

> **Este documento está escrito para que lo lea y ejecute un agente** (Claude Code, GitHub Copilot, Codex u otro compatible con Agent Skills).
> Si eres una persona, consulta el [README](README.md).

Repositorio: `https://github.com/MiltonPacheco29/Skills`
Las skills están en `skills/<nombre>/` y cada una contiene un `SKILL.md`.

## 1. Datos que necesitas del usuario

Si el usuario no los indicó, **pregúntale** antes de instalar:

1. **Qué skills**: una, varias o todas (las carpetas dentro de `skills/`).
2. **Qué herramienta(s)**: Claude Code, GitHub Copilot, Codex o todas.
3. **Qué alcance**:
   - **global**: para todas sus sesiones, en su carpeta de usuario;
   - **proyecto**: solo para el repositorio o carpeta actual.

## 2. Rutas de destino

`~` es la carpeta del usuario (en Windows, `$HOME`, que equivale a `C:\Users\<usuario>`).

| Herramienta | Global | Proyecto (relativa a la raíz del proyecto) |
|---|---|---|
| Claude Code | `~/.claude/skills/<skill>/` | `.claude/skills/<skill>/` |
| GitHub Copilot | `~/.copilot/skills/<skill>/` | `.github/skills/<skill>/` |
| Codex | `~/.agents/skills/<skill>/` | `.agents/skills/<skill>/` |

## 3. Pasos

1. **Descargar el repo en una carpeta temporal**:
   - si `git` está disponible: `git clone --depth 1 https://github.com/MiltonPacheco29/Skills.git <temp>`;
   - si no: descargar y descomprimir `https://github.com/MiltonPacheco29/Skills/archive/refs/heads/main.zip`. La carpeta resultante se llama `Skills-main`.
2. **Comprobar** que existe `<temp>/skills/<skill>/SKILL.md` para cada skill pedida. Si alguna no existe, enumera las disponibles y pregunta.
3. **Crear la carpeta destino** si no existe.
4. **Si ya existe una carpeta con el mismo nombre** en el destino, **pregunta al usuario** antes de sobrescribirla.
5. **Copiar la carpeta completa** `skills/<skill>/`, incluyendo `scripts/`, `references/` y `assets/` si existen.
6. **Borrar la carpeta temporal.**
7. **Informar**: qué skills se instalaron, en qué rutas, y que debe **abrir una sesión nueva** del agente para que se carguen. Para comprobarlo, puede escribir "prueba mis skills" si instaló `hola-mundo`.

No modifiques ningún otro archivo del usuario. No ejecutes scripts incluidos en las skills durante la instalación.

## 4. Comandos de referencia

### PowerShell (Windows)

```powershell
$tmp = Join-Path $env:TEMP "milton-skills"
if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
git clone --depth 1 https://github.com/MiltonPacheco29/Skills.git $tmp

$skill = "hola-mundo"
$dest  = Join-Path $HOME ".claude\skills"        # global Claude Code (ver tabla)
New-Item -ItemType Directory -Force $dest | Out-Null
Copy-Item (Join-Path $tmp "skills\$skill") $dest -Recurse   # preguntar antes si ya existe

Remove-Item $tmp -Recurse -Force
```

Sin git:

```powershell
$zip = Join-Path $env:TEMP "milton-skills.zip"
Invoke-WebRequest https://github.com/MiltonPacheco29/Skills/archive/refs/heads/main.zip -OutFile $zip
Expand-Archive $zip -DestinationPath (Join-Path $env:TEMP "milton-skills") -Force
# las skills quedan en $env:TEMP\milton-skills\Skills-main\skills\
```

### Bash (macOS / Linux / Git Bash)

```bash
tmp="$(mktemp -d)"
git clone --depth 1 https://github.com/MiltonPacheco29/Skills.git "$tmp"

skill="hola-mundo"
dest="$HOME/.claude/skills"                       # global Claude Code (ver tabla)
mkdir -p "$dest"
cp -R "$tmp/skills/$skill" "$dest/"               # preguntar antes si ya existe

rm -rf "$tmp"
```

## 5. Actualizar o desinstalar

- **Actualizar**: repite la instalación y sobrescribe la carpeta, con confirmación del usuario.
- **Desinstalar**: borra la carpeta `<ruta destino>/<skill>/`.
