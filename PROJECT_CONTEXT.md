# Contexto del Proyecto y Componentes

## 1) Contexto General

Este repositorio contiene una interfaz SaaS B2B orientada a gestión comercial asistida por IA para Cirumed.
La aplicación principal visible está en:

- `SaaS B2B AI Interface Design/`

La raíz también tiene configuración Vite/React, pero el bundle de UI que se trabaja día a día está dentro de la carpeta anterior.

## 2) Stack Técnico

- React 18
- Vite 6
- React Router (`createBrowserRouter`)
- Tailwind CSS v4 (vía `@tailwindcss/vite`)
- Radix UI (muchos componentes base)
- MUI (dependencias disponibles)
- Recharts (gráficos en Analytics)
- Lucide React (iconografía)

## 3) Estructura Principal

- `SaaS B2B AI Interface Design/src/main.tsx`: entrypoint de React.
- `SaaS B2B AI Interface Design/src/app/App.tsx`: monta `RouterProvider`.
- `SaaS B2B AI Interface Design/src/app/routes.tsx`: define rutas y páginas.
- `SaaS B2B AI Interface Design/src/app/components/`: componentes de negocio/pantallas.
- `SaaS B2B AI Interface Design/src/app/components/ui/`: componentes reutilizables (design system local).
- `SaaS B2B AI Interface Design/src/styles/`: estilos globales, fuentes, tema y Tailwind.

## 4) Rutas de la Aplicación

Definidas en `src/app/routes.tsx`:

- `/` -> `Dashboard`
- `/conversations` -> `Conversations`
- `/conversations/:id` -> `LeadDetail`
- `/pipeline` -> `Pipeline`
- `/knowledge` -> `KnowledgeBase`
- `/analytics` -> `Analytics`

Todas estas rutas cuelgan de `DashboardLayout`, que contiene sidebar, topbar y `<Outlet />`.

## 5) Componentes de Negocio (Pantallas)

- `Dashboard.tsx`
  - KPIs ejecutivos.
  - Recomendaciones IA.
  - Actividad reciente y métricas del día.
  - Importa el README del proyecto como texto (`?raw`) para mostrar un resumen.

- `Conversations.tsx`
  - Lista de conversaciones con prioridad/score.
  - Vista de chat simulada.
  - Navegación al detalle del lead.

- `LeadDetail.tsx`
  - Ficha de lead (score, probabilidad, valor estimado).
  - Timeline de eventos.
  - Checklist inteligente y recomendaciones.

- `Pipeline.tsx`
  - Vista de pipeline por etapas.
  - Tarjetas de oportunidades por etapa.
  - Métricas agregadas del funnel.

- `KnowledgeBase.tsx`
  - Fuentes de conocimiento del sistema IA.
  - Estado de entrenamiento por tópicos.
  - Insights y playbooks.

- `Analytics.tsx`
  - Gráficos de funnel, performance IA, distribución de productos y horarios.
  - Obstáculos principales y recomendaciones accionables.

## 6) Componentes Reutilizables

La carpeta `src/app/components/ui/` concentra componentes base reutilizables (`button`, `card`, `badge`, `dialog`, `table`, `tabs`, etc.).
Para cambios de UI consistentes, conviene priorizar modificaciones aquí antes que repetir ajustes en cada pantalla.

También existe:

- `src/app/components/figma/ImageWithFallback.tsx`: helper de imagen con fallback visual ante error de carga.

## 7) Contenido y Fuentes de Texto

- El proyecto usa texto mayoritariamente embebido dentro de componentes TSX.
- Se usa Markdown como fuente dinámica en:
  - `Dashboard.tsx` -> `import projectReadme from "../../../README.md?raw";`
- No hay actualmente un JSON de contenido en `src/` para copy centralizado.

## 8) Configuración Relevante

- `vite.config.ts` (raíz y app anidada):
  - Mantiene `react()` y `tailwindcss()` como plugins obligatorios.
  - Alias `@` -> `./src`.
  - `assetsInclude` limitado a `**/*.svg` y `**/*.csv`.
- En la app anidada existe `figmaAssetResolver` para imports `figma:asset/*`.

## 9) Comandos de Trabajo

### App principal (recomendada)

```bash
cd "SaaS B2B AI Interface Design"
npm install
npm run dev
```

### Build

```bash
cd "SaaS B2B AI Interface Design"
npm run build
```

### Root

En la raíz existe script de build, pero no script `dev`:

```bash
npm run build
```

## 10) Notas Operativas

- `external-context/` contiene material de referencia (presentaciones, PDFs, assets), no la app runtime.
- `AGENTS.md` y `ATTRIBUTIONS.md` están en local pero ignorados por Git según `.gitignore`.
