# AGENTS.md

## Proyecto
Esta carpeta contiene una aplicación frontend con imágenes, textos, archivos Markdown, JSON y componentes de interfaz.

## Objetivo principal
Modificar la interfaz sin romper la estructura actual de la aplicación.

## Instrucciones para Codex
- Antes de modificar, revisar la estructura del proyecto.
- Identificar framework, rutas, componentes y archivos de configuración.
- No eliminar imágenes, textos, JSON ni Markdown sin autorización.
- Mantener la línea visual existente salvo que se indique lo contrario.
- Priorizar cambios en componentes reutilizables.
- Si existen archivos de contenido en JSON o Markdown, usarlos como fuente de textos antes de hardcodear contenido.
- No cambiar dependencias sin explicar por qué.
- Después de modificar, indicar archivos cambiados y cómo probar la app.

## Comandos esperados
- Revisar package.json para detectar si se usa npm, pnpm o yarn.
- Ejecutar build/lint/test solo si existen scripts definidos.



# AGENTS

This repository contains a small Vite + React workspace and a nested UI project.

## Workspace structure
- Root package: `package.json`, `vite.config.ts`, `pnpm-workspace.yaml`.
- Nested app: `SaaS B2B AI Interface Design/` with its own `package.json`, `vite.config.ts`, `src/app/`, and `README.md`.

## Key conventions
- The root workspace is a Vite React project using `@vitejs/plugin-react` and `@tailwindcss/vite`.
- The nested project is the main UI bundle and includes the visible React app under `SaaS B2B AI Interface Design/src/app/`.
- Both Vite configs include `react()` and `tailwindcss()` plugins; do not remove those plugins.
- Root `vite.config.ts` defines alias `@` → `./src`.
- `assetsInclude` is intentionally limited to raw asset types (`**/*.svg`, `**/*.csv`) and should not be extended to `.css`, `.tsx`, or `.ts`.

## Setup and commands
- Root build: `pnpm install` then `pnpm build`.
- Nested app development: `cd "SaaS B2B AI Interface Design" && npm install && npm run dev`.

## What agents should know
- There is no existing `AGENTS.md`, `.github/copilot-instructions.md`, or agent-specific guidance in this repository.
- The nested app is the primary UX project; changes to UI and page behavior should generally target `SaaS B2B AI Interface Design/src/app/`.
- If the user asks for component or layout changes, prefer the nested app files and respect the existing React/Tailwind/Radix/MUI patterns.
- There are no test or lint scripts defined in the root or nested `package.json` files.

## References
- [Nested app README](./SaaS%20B2B%20AI%20Interface%20Design/README.md)
