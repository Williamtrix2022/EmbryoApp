# EmbryoApp

SaaS offline-first para gestionar programas de transferencia de embriones bovinos.

---

## Qué hace este sistema

Digitaliza el proceso reproductivo bovino: permite registrar programas, entidades (donantes, receptoras, embriones), actividades clínicas y observaciones. Funciona sin internet y sincroniza cuando hay conexión.

---

## Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React + TypeScript + Vite + Tailwind (PWA) |
| Backend | Node.js + Express + TypeScript |
| Base de datos | PostgreSQL + Prisma ORM |
| Autenticación | JWT |
| Offline | IndexedDB |

Ver decisiones en [docs/adr/](docs/adr/).

---

## Estructura del repositorio

```
EmbryoApp/
├── backend/          # API REST (Clean Architecture)
│   ├── prisma/       # Schema y migraciones de BD
│   └── src/
│       ├── domain/           # Entidades y contratos
│       ├── application/      # Casos de uso y servicios
│       ├── infrastructure/   # BD, auth, configuración
│       └── presentation/     # Controladores HTTP
├── frontend/         # App React (PWA)
│   └── src/
│       ├── domain/           # Tipos del dominio
│       ├── application/      # Hooks y lógica de UI
│       ├── infrastructure/   # HTTP client, offline
│       └── presentation/     # Páginas y componentes
├── docs/             # Documentación completa del proyecto
├── skills/           # Roles del equipo para guiar a Claude
└── .github/          # Pipelines de CI/CD
```

---

## Cómo arrancar el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Editar backend/.env con tu DATABASE_URL

# 3. Generar cliente de Prisma
cd backend && npx prisma generate

# 4. Correr el backend (en una terminal)
npm run dev:backend

# 5. Correr el frontend (en otra terminal)
npm run dev:frontend
```

---

## Flujo de trabajo

Usamos **Git Flow** con commits convencionales.

```bash
# Crear rama para una historia de usuario
git checkout develop
git checkout -b feature/hu-001-login

# Hacer commit al terminar
git commit -m "feat(auth): implementar login con JWT"

# Fusionar a develop cuando esté lista
git checkout develop
git merge feature/hu-001-login
```

Ver convenciones completas en [docs/adr/adr-005-git-flow.md](docs/adr/adr-005-git-flow.md).

---

## Estado del desarrollo

| Sprint | Contenido | Estado |
|---|---|---|
| Sprint 1 | Autenticación + Gestión de programas | No iniciado |
| Sprint 2 | Entidades + Actividades clínicas | No iniciado |
| Sprint 3 | Offline + Sincronización | No iniciado |

Ver detalle en [docs/backlog/backlog-inicial.md](docs/backlog/backlog-inicial.md).

---

## Documentación

Toda la documentación vive en [`docs/`](docs/README.md):
- Visión del producto
- Arquitectura y modelo de datos
- ADRs (decisiones técnicas)
- Backlog y sprints
- Estrategia de calidad y despliegue
