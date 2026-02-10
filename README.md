# CRUCE Hub

CRUCE Hub es el centro interno de documentacion y control operativo de CRUCE.
Su objetivo es centralizar conocimiento tecnico (VTEX IO, componentes custom, integraciones, servicios y procesos) en un formato versionado, consultable y extensible.

## Objetivo del producto

- Unificar documentacion tecnica en Markdown/MDX.
- Facilitar navegacion, busqueda y mantenimiento de conocimiento.
- Exponer ese conocimiento a otras apps/LLMs via MCP (VTEX Brain).
- Incorporar gradualmente herramientas de control (estado de integraciones, salud de repositorios, CI/CD).

## Principios no negociables

- App 100% privada de uso corporativo.
- No indexable publicamente.
- Acceso protegido con autenticacion obligatoria.
- Seguridad y control de acceso por encima de SEO.

## Contexto operativo

- Infraestructura self-hosted en AWS.
- Un unico server (Ubuntu + Kubernetes).
- 1 replica por defecto.
- Trafico esperado bajo/medio.

Este contexto favorece simplicidad operativa, costos predecibles y arquitectura incremental.

## Estrategia de contenido para esta version

### Opcion elegida: Dinamica (GitLab en runtime)

Para esta version, la documentacion se cargara de forma dinamica desde GitLab.

- Flujo:
  - La app consulta contenido en runtime desde APIs de GitLab.
  - Renderizado Markdown/MDX dentro de CRUCE Hub.
  - Cache de cliente con TanStack Query para mejorar UX y reducir requests repetidos.
- Motivo de negocio:
  - Contenido siempre actualizado sin depender de rebuild/deploy por cada cambio documental.

Nota:
- Las APIs concretas de GitLab seran definidas por CRUCE (pendiente de entrega).

## Decision recomendada (MVP actual)

Implementar **enfoque dinamico** desde el inicio:

1. Integrar autenticacion con Better Auth (requerida para todo acceso).
2. Consumir docs desde GitLab en runtime.
3. Cachear respuestas en cliente con TanStack Query.
4. Publicar en infraestructura actual (1 replica) con observabilidad minima.

## Alcance funcional por fases

## Fase 1 - Documentacion Privada (MVP)

- Autenticacion obligatoria para toda la app (Better Auth).
- Ingesta dinamica de docs desde GitLab.
- Render Markdown/MDX.
- Estructura por categorias:
  - VTEX IO
  - Componentes custom
  - Integraciones
  - Servicios
  - Procesos internos
- Paginas:
  - Home del hub
  - Listado por categoria
  - Pagina de documento
- UI base con Shadcn/ui para acelerar construccion.

Criterio de exito:
- Usuarios autenticados encuentran y consultan documentacion actualizada en pocos clics.

## Fase 2 - VTEX Brain (MCP Server Basico)

- Crear servidor MCP que exponga herramientas para consulta de docs:
  - `list_docs`
  - `get_doc`
  - `search_docs`
- Fuente inicial: contenido de GitLab (via capa de acceso definida por CRUCE).
- Control de acceso basico por token interno.

Criterio de exito:
- Una app/LLM externa puede consultar documentacion de CRUCE con contexto confiable.

## Fase 3 - Control Operativo

- Dashboard de estado de integraciones.
- Estado de CI/CD por repositorio.
- Alertas basicas de fallas recientes.

Criterio de exito:
- Visibilidad centralizada del estado tecnico sin revisar multiples herramientas.

## Fase 4 - Expansiones de fuentes y conocimiento

- Integraciones futuras:
  - Google Drive (suite Google de CRUCE: Drive/Docs y relacionados).
  - ClickUp.
- Evolucion de VTEX Brain:
  - Indexacion semantica (RAG).
  - Relaciones entre documentos/repos (GraphRAG).
  - Respuestas contextualizadas por area/proyecto.

Criterio de exito:
- Recuperacion mas precisa y cobertura de conocimiento multi-fuente.

## Arquitectura inicial propuesta

- Frontend/App: TanStack Start + TanStack Router + TanStack Query.
- UI: Shadcn/ui + Tailwind CSS v4.
- Auth: Better Auth (modo inicial sin DB).
- Fuente docs: GitLab en runtime.
- Parser/renderer: Markdown + MDX.
- MCP: `@modelcontextprotocol/sdk` en servicio separado (o ruta dedicada).
- Deploy: contenedor en Kubernetes (1 replica).

## Better Auth - estrategia por etapas

Etapa 1 (ahora):
- Setup sin base de datos para acelerar arranque del MVP privado.

Etapa 2 (posterior):
- Migracion a PostgreSQL para persistencia avanzada, auditoria y escalabilidad funcional.

## Integracion de Shadcn/ui

Pendiente de setup inicial.

Checklist sugerido:
1. Configurar prerequisitos de Tailwind + aliases.
2. Inicializar Shadcn/ui.
3. Instalar componentes base:
   - `button`, `card`, `input`, `dropdown-menu`, `dialog`, `sheet`, `tabs`, `badge`, `separator`.
4. Definir sistema visual base (tokens, tipografia, espaciado).

## Estructura inicial de carpetas (propuesta)

```txt
src/
  routes/
    index.tsx
    docs/
      index.tsx
      $slug.tsx
    status/
      index.tsx
  features/
    docs/
      components/
      lib/
      types/
    status/
    mcp/
```

## Riesgos y mitigaciones

- Dependencia de APIs externas (GitLab y futuras integraciones):
  - Mitigar con timeouts, retries, caching y manejo de errores robusto.
- Crecimiento desordenado de docs:
  - Mitigar con convenciones de frontmatter y taxonomia fija.
- Dependencia de una sola replica:
  - Mitigar con backups + health checks + estrategia de restore.

## Seguridad minima recomendada

- Autenticacion obligatoria para toda ruta interna.
- No exponer endpoints/documentos sin control de acceso.
- Secretos via variables de entorno (nunca en repo).
- Rate limit y logging para endpoints MCP.

## KPIs de adopcion (MVP)

- Numero de documentos accesibles en el hub.
- Tiempo medio para encontrar documentacion relevante.
- Consultas MCP exitosas vs fallidas.
- Frecuencia de actualizacion de contenido visible.

## Proximos pasos inmediatos

1. Definir contrato de APIs GitLab para lectura de docs (tu equipo provee endpoints).
2. Configurar Better Auth en modo inicial sin DB.
3. Instalar y configurar Shadcn/ui.
4. Implementar rutas base de documentacion (`/docs`, `/docs/$slug`) con carga dinamica.
5. Crear primera version de MCP server con `list_docs` y `get_doc`.
