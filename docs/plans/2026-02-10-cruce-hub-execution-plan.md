# CRUCE Hub - Plan de ejecucion

Fecha: 2026-02-10

## Estado actual (post-cleanup)

- Base TanStack Start limpia sin demos.
- Rutas activas:
  - `/`
  - `/login`
  - `/mcp`
  - `/api/auth/$`
- Better Auth integrado a nivel API + cliente.
- Home con bloqueo basico de sesion a nivel UI.
- `robots.txt` bloqueando indexacion (`Disallow: /`).

## Objetivo del siguiente sprint

Convertir la base limpia en un MVP privado funcional de documentacion dinamica desde GitLab.

## Fase 1 - Auth privada real (prioridad alta)

1. Endurecer el flujo de autenticacion
- Desactivar registro publico (solo login).
- Definir politica de alta de usuarios (manual/seed/admin).

2. Proteger rutas de forma robusta
- Implementar guard de servidor para contenido interno.
- Mantener `login` como unica ruta publica de UI.

3. Definir variables de entorno de auth
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (si aplica en deploy)

4. Validacion
- Pruebas manuales: no autenticado -> siempre redirige a `/login`.
- Sesion valida -> acceso a rutas privadas.

## Fase 2 - UI base con Shadcn/ui

1. Inicializar Shadcn/ui.
2. Instalar componentes base:
- `button`, `card`, `input`, `form`, `badge`, `separator`, `sheet`, `tabs`, `skeleton`.
3. Crear layout base de CRUCE Hub:
- Header
- Sidebar de secciones
- Area de contenido

## Fase 3 - Docs dinamicas desde GitLab (MVP core)

1. Definir contrato de APIs GitLab (provisto por CRUCE)
- listado de documentos
- detalle de documento
- metadata (categoria, titulo, ultima actualizacion)

2. Crear cliente de integracion
- `src/features/docs/lib/gitlab-client.ts`
- manejo de errores, timeout y retries basicos

3. Construir capa de datos con TanStack Query
- query keys estables
- staleTime/cacheTime segun uso
- estados loading/error vacio

4. Rutas de docs
- `/docs`
- `/docs/$slug`

5. Render markdown/mdx
- parse + saneamiento
- componentes base de contenido

## Fase 4 - MCP VTEX Brain v0

1. Reemplazar tool `ping` por tools reales:
- `list_docs`
- `get_doc`
- `search_docs`

2. Conectar MCP a la misma capa de acceso documental.
3. Agregar auth para endpoint MCP (token interno).
4. Logging minimo de requests y errores.

## Fase 5 - Operacion y seguridad minima

1. Health checks de app y MCP.
2. Configuracion de logs estructurados.
3. Secretos por entorno (sin hardcode).
4. Checklist deploy Kubernetes (1 replica).

## Definition of Done del MVP

- App privada con autenticacion obligatoria funcional.
- Documentacion dinamica desde GitLab navegable por UI.
- Endpoint MCP operativo con al menos `list_docs` y `get_doc`.
- Deploy funcional en entorno self-hosted.

## Backlog siguiente (no MVP)

- Integracion Google Drive.
- Integracion ClickUp.
- RAG/GraphRAG para VTEX Brain.
- Dashboard de estado de integraciones y CI/CD.

## Prompt recomendado para abrir el proximo chat

"Continuemos con el plan en `docs/plans/2026-02-10-cruce-hub-execution-plan.md`. Empecemos por Fase 1 (Auth privada real): desactivar signup publico, proteger rutas en server y dejar `/login` como unica ruta publica. Implementa cambios y valida con build/test." 
