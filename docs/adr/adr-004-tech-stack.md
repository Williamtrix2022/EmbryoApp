# ADR-004: Adopción del stack técnico del MVP

- Estado: Aprobado
- Fecha: 2026-07-01
- Versión: 0.1.0

## Contexto
El plan de implementación (`implementation/implementation-plan.md`) propuso un stack preliminar para el MVP, pendiente de aprobación formal antes de iniciar desarrollo. El proyecto requiere un stack capaz de soportar Clean Architecture, operación offline-first (ADR-001) y un modelo SaaS B2B (ADR-003), manteniendo la complejidad acotada para un equipo pequeño.

## Decisión
Se adopta el siguiente stack técnico para el MVP:

- **Frontend**: React + TypeScript + Vite, Tailwind CSS, empaquetado como Progressive Web App.
- **Backend**: Node.js + Express + TypeScript.
- **Persistencia**: PostgreSQL, accedido mediante Prisma como ORM y capa de mapeo del Repository Pattern.
- **Autenticación**: JWT con expiración y renovación controlada, contraseñas con hash seguro (bcrypt).
- **Almacenamiento offline (cliente)**: IndexedDB, con una cola de sincronización que refleja `sync_queue` del modelo de datos.
- **Monorepo**: workspaces npm (`backend/`, `frontend/`) en un único repositorio.

## Justificación
1. React + Vite + TypeScript ofrece un entorno maduro para PWA con buen soporte offline (service workers) y tipado estático alineado con Clean Code.
2. Express mantiene el backend simple y explícito para un MVP, evitando la sobre-ingeniería que ADR de arquitectura de alto nivel advierte evitar.
3. PostgreSQL soporta integridad referencial y consultas relacionales requeridas por `architecture/data-model.md`.
4. Prisma facilita mantener el Repository Pattern con migraciones versionadas y tipado end-to-end.
5. JWT es suficiente para el modelo de roles y permisos descrito en `architecture/security.md` sin requerir infraestructura adicional de sesiones.
6. Un monorepo con workspaces simplifica la coordinación de contratos compartidos (tipos de API) sin introducir microservicios innecesarios.

## Consecuencias positivas
- Stack ampliamente adoptado, con soporte y documentación abundante.
- Tipado compartido entre frontend y backend reduce errores de integración.
- Prisma acelera la implementación del modelo de datos ya definido.

## Consecuencias negativas
- IndexedDB y la cola de sincronización requieren diseño cuidadoso de resolución de conflictos (ver `architecture/offline-sync.md`).
- Express requiere disciplina manual de capas, ya que no impone Clean Architecture como NestJS.

## Alternativas consideradas
- NestJS en lugar de Express: descartado para el MVP por mayor curva de entrada y estructura más rígida de la necesaria en esta etapa.
- MongoDB en lugar de PostgreSQL: descartado por la necesidad de integridad referencial fuerte entre programas, entidades y actividades.
- Repositorios separados para frontend y backend: descartado para simplificar la coordinación en un equipo pequeño.

## Decisión de seguimiento
Toda nueva dependencia significativa o cambio de stack debe actualizar este ADR. La estructura de carpetas del repositorio debe reflejar Clean Architecture según `architecture/high-level-architecture.md`.
