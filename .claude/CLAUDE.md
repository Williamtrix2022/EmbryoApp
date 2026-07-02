# EmbryoApp — Guía de contexto para Claude

## Qué es este proyecto

EmbryoApp es una **Progressive Web App SaaS** para gestionar programas de transferencia de embriones bovinos. Funciona **sin conexión a Internet** (Offline First). El objetivo es venderlo como producto comercial, priorizando calidad sobre velocidad.

---

## Usuarios del sistema

| Rol | Qué hace |
|---|---|
| Administrador | Gestiona la organización, usuarios y configuración |
| Veterinario | Crea y ejecuta programas reproductivos |
| Trabajador | Registra actividades en campo |
| Propietario | Consulta reportes y estado general |

---

## Stack tecnológico

**Frontend** — `frontend/`
- React + TypeScript + Vite + Tailwind CSS (PWA)

**Backend** — `backend/`
- Node.js + Express + TypeScript
- Prisma ORM + PostgreSQL
- JWT para autenticación

**Offline** — IndexedDB (en el navegador)

---

## Arquitectura

Clean Architecture con capas bien separadas:
- `domain/` — entidades y contratos (sin dependencias externas)
- `application/` — casos de uso y servicios
- `infrastructure/` — implementaciones concretas (BD, HTTP, auth)
- `presentation/` — controladores HTTP (backend) y páginas/componentes (frontend)

Principios: SOLID, DRY, KISS, YAGNI, Clean Code.

---

## Flujo de trabajo con Git

Usamos **Git Flow**. Las ramas son:

| Rama | Para qué |
|---|---|
| `main` | Código en producción (estable) |
| `develop` | Integración de features completadas |
| `feature/nombre` | Cada historia de usuario o tarea |
| `release/x.x.x` | Preparación de una versión para producción |
| `hotfix/nombre` | Correcciones urgentes en producción |

**Flujo típico por tarea:**
```
git checkout develop
git checkout -b feature/hu-001-login
# ... implementar ...
git add <archivos>
git commit -m "feat(auth): implementar endpoint de login"
git checkout develop
git merge feature/hu-001-login
git branch -d feature/hu-001-login
```

---

## Convenciones de commits

Formato: `tipo(alcance): descripción corta`

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Cambio solo en documentación |
| `refactor` | Reorganización sin cambio de comportamiento |
| `style` | Formato, espacios, sin cambio de lógica |
| `test` | Agregar o corregir pruebas |
| `build` | Cambios en dependencias o configuración de build |
| `ci` | Cambios en pipelines de CI/CD |

Ejemplos válidos:
- `feat(auth): agregar endpoint POST /auth/login`
- `fix(programs): corregir validación de fecha de inicio`
- `docs(backlog): actualizar estado del sprint 1`

---

## Cómo trabajar por sprint

Cada sprint tiene historias de usuario (HU). El flujo es:

1. **Empezar**: crear rama `feature/hu-XXX-nombre` desde `develop`
2. **Implementar**: backend primero, luego frontend
3. **Validar**: que la HU cumple sus criterios de aceptación
4. **Documentar**: actualizar docs si hay decisión nueva
5. **Merge**: fusionar a `develop`
6. **Guardar**: hacer push a GitHub

**Estado del backlog**: ver `docs/backlog/backlog-inicial.md`

---

## Cómo usar las Skills (roles del equipo)

Los archivos en `skills/` definen roles. Se usan diciéndole a Claude en qué modo trabajar:

| Skill | Cuándo pedírsela a Claude |
|---|---|
| `product-manager` | "¿Qué debería entrar en el sprint?" / "Define los criterios de aceptación" |
| `software-architect` | "¿Cómo diseño este módulo?" / "Necesito un ADR" |
| `database-architect` | "Modifica el schema de Prisma" / "Agrega una nueva entidad" |
| `backend-engineer` | "Implementa el endpoint X" / "Crea el caso de uso Y" |
| `frontend-engineer` | "Crea la pantalla de login" / "Implementa este componente" |
| `ux-designer` | "Diseña el flujo de creación de programa" / "Cómo debería verse X" |
| `qa-engineer` | "Define las pruebas para esta HU" / "Valida que esto funciona" |
| `devops` | "Configura el despliegue" / "Prepara el entorno de producción" |
| `documentation-manager` | "Documenta lo que hicimos" / "Actualiza el README" |
| `technical-mentor` | "Explícame este concepto" / "Revisa la calidad de este código" |

Ejemplo de uso:
> "Actúa como Backend Engineer e implementa el caso de uso de login siguiendo Clean Architecture."

---

## Documentación

Toda funcionalidad nueva debe tener en `docs/`:
- Historia de Usuario con criterios de aceptación
- ADR si hay decisión de arquitectura
- Actualización del backlog con el estado real

La documentación vive en `docs/`. Ver `docs/README.md` para la estructura completa.

---

## Objetivo principal

Construir un software comercial listo para vender.
No escribir código rápido. Priorizar calidad sobre velocidad.
