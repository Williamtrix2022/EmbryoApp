# Plan de implementación inicial — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir la preparación mínima necesaria para comenzar el desarrollo del MVP de EmbryoApp sin perder disciplina técnica, claridad de alcance ni trazabilidad.

## 2. Áreas de preparación antes del desarrollo

### 2.1 Stack técnico definitivo
Aprobado formalmente en [ADR-004: Adopción del stack técnico del MVP](../adr/adr-004-tech-stack.md): React + TypeScript + Vite (frontend), Node.js + Express + TypeScript (backend), PostgreSQL + Prisma (persistencia), JWT (autenticación), IndexedDB (offline), monorepo con workspaces npm.

### 2.2 ADRs de implementación
- Stack principal: [ADR-004](../adr/adr-004-tech-stack.md).
- Modelo de ramas: [ADR-005: Git Flow](../adr/adr-005-git-flow.md).
- Pendientes de formalizar cuando se implementen: patrón de sincronización offline (detalle en `architecture/offline-sync.md`), estrategia de despliegue y manejo de secretos por entorno.

### 2.3 Backlog inicial de desarrollo
El backlog debe priorizar el MVP en entregas pequeñas y comprobables.

#### Backlog inicial sugerido
1. Autenticación y acceso.
2. Gestión de programas.
3. Gestión de entidades.
4. Gestión de actividades.
5. Notas y observaciones.
6. Sincronización offline.
7. Reportes básicos.

El detalle completo del backlog inicial se encuentra en [docs/backlog/backlog-inicial.md](backlog/backlog-inicial.md).

### 2.4 Preparación del repositorio
- Crear estructura de carpetas por capas.
- Definir convención de commits.
- Definir flujo Git Flow.
- Preparar pipeline básico de CI.
- Definir políticas de revisión.

### 2.5 Plan de entregas por fases
#### Fase 1 — Base operativa
- Autenticación.
- Gestión de programas.
- Roles básicos.

#### Fase 2 — Operación clínica y seguimiento
- Entidades del programa.
- Actividades.
- Observaciones.

#### Fase 3 — Conectividad y valor ejecutivo
- Sincronización offline.
- Reportes básicos.
- Calidad y estabilidad.

### 2.6 UX inicial y pantallas críticas
Se debe acordar una primera versión de interfaz para las pantallas más críticas:
- Login
- Dashboard de programas
- Detalle de programa
- Gestión de entidades
- Agenda de actividades

### 2.7 Criterios de calidad y pruebas
- Qué funcionalidades se consideran terminadas.
- Qué pruebas deben cubrirse antes de entregar.
- Qué se considera aceptable en términos de rendimiento, usabilidad y seguridad.

## 3. Recomendación de ejecución
Se recomienda iniciar con una primera entrega muy concreta: autenticación + creación y listado de programas. Esa entrega permite validar el flujo completo sin sobrecargar el primer sprint.

## 4. Criterios de entrada para desarrollo
Se considera que el proyecto está listo para comenzar desarrollo cuando:
- el stack técnico esté aprobado,
- el backlog inicial esté priorizado,
- el repositorio esté preparado,
- la primera historia de usuario esté completamente definida,
- y la documentación base esté alineada con la implementación.
