# Plan de Sprints — EmbryoApp

Versión: 1.0  
Estado: Activo  
Duración total: 6 semanas (3 sprints de 2 semanas cada uno)  
Inicio estimado: 2026-07-07

---

## Cómo leer este documento

Cada sprint tiene **dos semanas**. Cada semana tiene tareas concretas con:
- La **historia de usuario** que cubre
- Qué **skill invocar** en Claude
- El **mensaje exacto** que debes escribirle a Claude
- La **rama Git** que debes usar
- Cómo saber que esa semana está **terminada**

Antes de cada tarea: crear la rama. Al terminar: commit + merge a `develop` + push.

---

## Resumen general

| Sprint | Semanas | Qué se construye | Historias |
|---|---|---|---|
| Sprint 1 | 1 y 2 | Autenticación + Gestión de programas | HU-001 a HU-005 |
| Sprint 2 | 3 y 4 | Entidades clínicas + Actividades | HU-006 a HU-008 |
| Sprint 3 | 5 y 6 | Offline + Sincronización + QA | HU-009 a HU-010 |

---

---

# SPRINT 1 — Base operativa

**Objetivo:** El usuario puede iniciar sesión y gestionar programas reproductivos desde una interfaz real conectada al backend.

---

## Semana 1 — Autenticación completa

**Historias de usuario:** HU-001 (iniciar sesión) y HU-002 (cerrar sesión)

---

### Tarea 1.1 — Backend de autenticación

**Qué se construye:**
- Entidad `User` en el dominio
- Contrato `IUserRepository`
- Caso de uso `LoginUseCase` (valida credenciales y devuelve JWT)
- Caso de uso `LogoutUseCase`
- Servicio `AuthService` (firma y verifica tokens JWT)
- Repositorio `UserPrismaRepository`
- Controlador `AuthController`
- Rutas `POST /auth/login` y `POST /auth/logout`
- Middleware de autenticación para rutas protegidas

**Skill a usar:** `Backend Engineer`

**Mensaje a Claude:**
```
Actúa como Backend Engineer.

Implementa el módulo de autenticación del backend de EmbryoApp siguiendo Clean Architecture.

Necesito:
1. Entidad User en domain/entities/
2. Contrato IUserRepository en domain/repositories/
3. LoginUseCase en application/use-cases/ (valida email/password, retorna JWT)
4. LogoutUseCase en application/use-cases/ (invalida sesión)
5. AuthService en application/services/ (firma y verifica JWT)
6. UserPrismaRepository en infrastructure/repositories/ (implementa IUserRepository con Prisma)
7. AuthController en presentation/http/controllers/
8. Rutas POST /auth/login y POST /auth/logout en presentation/http/routes/
9. Middleware de autenticación JWT para proteger rutas

El schema de Prisma ya tiene el modelo User. Usa los principios SOLID y Clean Code.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-001-backend-auth
```

**Commit al terminar:**
```bash
git commit -m "feat(auth): implementar backend de autenticación con JWT"
```

---

### Tarea 1.2 — Frontend de autenticación

**Qué se construye:**
- Página `LoginPage` (formulario email + contraseña)
- Contexto `AuthContext` (estado global del usuario autenticado)
- Hook `useAuth` (login, logout, usuario actual)
- Configuración de rutas protegidas
- Cliente HTTP con token en cabecera Authorization
- Redirección tras login/logout

**Skill a usar:** `Frontend Engineer`

**Mensaje a Claude:**
```
Actúa como Frontend Engineer.

Implementa el módulo de autenticación del frontend de EmbryoApp.

Necesito:
1. Página LoginPage en presentation/pages/ con formulario de email y contraseña
2. AuthContext en application/ para gestionar el estado del usuario autenticado
3. Hook useAuth en application/hooks/ con funciones login() y logout()
4. Configuración de rutas protegidas en App.tsx (redirige al login si no hay sesión)
5. Actualizar el http-client.ts para enviar el JWT en el header Authorization
6. Redirección automática: si ya está autenticado → dashboard; si no → login

Usa Tailwind para los estilos. Mantén los componentes simples y reutilizables.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-001-frontend-auth
```

**Commit al terminar:**
```bash
git commit -m "feat(auth): implementar pantalla de login y contexto de autenticación"
```

---

### Criterio de fin de Semana 1

- [ ] `POST /auth/login` devuelve JWT con credenciales válidas
- [ ] `POST /auth/login` rechaza credenciales inválidas
- [ ] El frontend muestra el formulario de login
- [ ] Tras login exitoso redirige al dashboard
- [ ] Las rutas protegidas redirigen al login si no hay sesión
- [ ] Logout elimina la sesión y redirige al login
- [ ] Ambas ramas mergeadas a `develop` y pusheadas

---

## Semana 2 — Gestión de programas

**Historias de usuario:** HU-003 (crear programa), HU-004 (listar programas), HU-005 (cambiar estado)

---

### Tarea 2.1 — Backend de programas

**Qué se construye:**
- Entidad `Program` en dominio
- Contrato `IProgramRepository`
- Casos de uso: `CreateProgramUseCase`, `GetProgramsUseCase`, `UpdateProgramStatusUseCase`
- Repositorio `ProgramPrismaRepository`
- Controlador `ProgramController`
- Rutas: `POST /programs`, `GET /programs`, `PATCH /programs/:id/status`

**Skill a usar:** `Backend Engineer`

**Mensaje a Claude:**
```
Actúa como Backend Engineer.

Implementa el módulo de gestión de programas reproductivos en el backend de EmbryoApp.

Necesito:
1. Entidad Program en domain/entities/ con sus reglas de negocio (estado válido, fechas correctas)
2. Contrato IProgramRepository en domain/repositories/
3. CreateProgramUseCase en application/use-cases/
4. GetProgramsUseCase en application/use-cases/ (con filtro opcional por estado)
5. UpdateProgramStatusUseCase en application/use-cases/
6. ProgramPrismaRepository en infrastructure/repositories/
7. ProgramController en presentation/http/controllers/
8. Rutas protegidas por JWT:
   - POST /programs → crear programa
   - GET /programs → listar programas de la organización
   - PATCH /programs/:id/status → cambiar estado

Todos los endpoints deben estar protegidos con el middleware de autenticación del Sprint anterior.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-003-backend-programs
```

**Commit al terminar:**
```bash
git commit -m "feat(programs): implementar CRUD de programas reproductivos"
```

---

### Tarea 2.2 — Frontend de programas

**Qué se construye:**
- Página `DashboardPage` con lista de programas
- Componente `ProgramCard` (muestra código, nombre, estado, fecha)
- Página o modal `CreateProgramPage` con formulario
- Hook `usePrograms` (obtener lista, crear, cambiar estado)
- Navegación entre pantallas

**Skill a usar:** `Frontend Engineer`

**Mensaje a Claude:**
```
Actúa como Frontend Engineer.

Implementa el módulo de gestión de programas en el frontend de EmbryoApp.

Necesito:
1. DashboardPage en presentation/pages/ que lista los programas del usuario
2. Componente ProgramCard en presentation/components/ (muestra nombre, código, estado con color según estado)
3. Formulario para crear un programa nuevo (puede ser una página o un modal)
4. Hook usePrograms en application/hooks/ con funciones: getPrograms(), createProgram(), updateStatus()
5. Botón para cambiar el estado de un programa directamente desde la tarjeta
6. Navegación: login → dashboard → detalle del programa

Los estados del programa son: PLANIFICADO, EN_CURSO, PAUSADO, COMPLETADO, CANCELADO.
Cada estado debe tener un color diferente en la interfaz.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-003-frontend-programs
```

**Commit al terminar:**
```bash
git commit -m "feat(programs): implementar dashboard y gestión de programas"
```

---

### Criterio de fin de Semana 2 / Sprint 1

- [ ] Se puede crear un programa con datos básicos desde la interfaz
- [ ] El dashboard muestra la lista de programas con su estado
- [ ] Se puede cambiar el estado de un programa
- [ ] Los cambios persisten en la base de datos
- [ ] Todas las rutas requieren autenticación
- [ ] Ambas ramas mergeadas a `develop` y pusheadas
- [ ] Etiqueta de versión creada: `git tag v0.1.0-sprint1`

---

---

# SPRINT 2 — Seguimiento clínico

**Objetivo:** El veterinario puede registrar los participantes del programa (donantes, receptoras, embriones) y programar actividades clínicas con seguimiento de estado.

---

## Semana 3 — Entidades del programa

**Historia de usuario:** HU-006 (registrar entidades asociadas al programa)

---

### Tarea 3.1 — Backend de entidades

**Qué se construye:**
- Entidad `ProgramEntity` en dominio
- Contrato `IProgramEntityRepository`
- Casos de uso: `CreateEntityUseCase`, `GetEntitiesByProgramUseCase`
- Repositorio `ProgramEntityPrismaRepository`
- Controlador `EntityController`
- Rutas: `POST /programs/:id/entities`, `GET /programs/:id/entities`

**Skill a usar:** `Backend Engineer`

**Mensaje a Claude:**
```
Actúa como Backend Engineer.

Implementa el módulo de entidades del programa en el backend de EmbryoApp.

Los tipos de entidad son: DONANTE, RECEPTORA, PACIENTE, EMBRION (ya definidos en el schema Prisma).

Necesito:
1. Entidad ProgramEntity en domain/entities/
2. Contrato IProgramEntityRepository en domain/repositories/
3. CreateEntityUseCase en application/use-cases/
4. GetEntitiesByProgramUseCase en application/use-cases/ (con filtro opcional por tipo)
5. ProgramEntityPrismaRepository en infrastructure/repositories/
6. EntityController en presentation/http/controllers/
7. Rutas protegidas:
   - POST /programs/:programId/entities → registrar entidad
   - GET /programs/:programId/entities → listar entidades del programa

Validar que el programa existe antes de registrar una entidad.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-006-backend-entities
```

**Commit al terminar:**
```bash
git commit -m "feat(entities): implementar registro de entidades por programa"
```

---

### Tarea 3.2 — Frontend de entidades

**Qué se construye:**
- Página `ProgramDetailPage` (vista completa del programa con sus entidades)
- Componente `EntityList` (lista con filtro por tipo)
- Formulario para agregar entidad (nombre, tipo, referencia externa)
- Hook `useEntities`

**Skill a usar:** `Frontend Engineer`

**Mensaje a Claude:**
```
Actúa como Frontend Engineer.

Implementa el módulo de entidades del programa en el frontend de EmbryoApp.

Necesito:
1. ProgramDetailPage en presentation/pages/ que muestre el detalle del programa
   - Datos del programa (nombre, estado, fechas)
   - Lista de entidades agrupadas por tipo (donantes, receptoras, pacientes, embriones)
   - Botón para agregar nueva entidad
2. Componente EntityList en presentation/components/ con filtro por tipo
3. Formulario AddEntityForm con campos: nombre, tipo de entidad, referencia externa (opcional)
4. Hook useEntities en application/hooks/ con getEntities() y addEntity()
5. Navegación desde el DashboardPage hacia ProgramDetailPage al hacer clic en un programa

Cada tipo de entidad (DONANTE, RECEPTORA, PACIENTE, EMBRION) debe mostrarse con un ícono o badge diferente.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-006-frontend-entities
```

**Commit al terminar:**
```bash
git commit -m "feat(entities): implementar detalle de programa con gestión de entidades"
```

---

### Criterio de fin de Semana 3

- [ ] Se puede registrar entidades (donante, receptora, etc.) en un programa
- [ ] La vista de detalle del programa muestra sus entidades agrupadas por tipo
- [ ] Se puede filtrar entidades por tipo desde la interfaz
- [ ] Ambas ramas mergeadas a `develop` y pusheadas

---

## Semana 4 — Actividades clínicas

**Historias de usuario:** HU-007 (programar actividades) y HU-008 (actualizar estado de actividad)

---

### Tarea 4.1 — Backend de actividades

**Qué se construye:**
- Entidad `Activity` en dominio
- Contrato `IActivityRepository`
- Casos de uso: `CreateActivityUseCase`, `UpdateActivityStatusUseCase`, `GetActivitiesByProgramUseCase`
- Repositorio `ActivityPrismaRepository`
- Controlador `ActivityController`
- Rutas: `POST /programs/:id/activities`, `GET /programs/:id/activities`, `PATCH /activities/:id/status`

**Skill a usar:** `Backend Engineer`

**Mensaje a Claude:**
```
Actúa como Backend Engineer.

Implementa el módulo de actividades clínicas en el backend de EmbryoApp.

Los tipos de actividad son: SINCRONIZACION_FOLICULAR, ASPIRACION_FOLICULAR, TRANSFERENCIA_EMBRION, DIAGNOSTICO_GESTACION, OTRO.
Los estados son: PENDIENTE, COMPLETADA, ATRASADA, CANCELADA.

Necesito:
1. Entidad Activity en domain/entities/ con regla: una actividad COMPLETADA no puede volver a PENDIENTE
2. Contrato IActivityRepository en domain/repositories/
3. CreateActivityUseCase en application/use-cases/
4. UpdateActivityStatusUseCase en application/use-cases/
5. GetActivitiesByProgramUseCase en application/use-cases/ (ordenadas por fecha)
6. ActivityPrismaRepository en infrastructure/repositories/
7. ActivityController en presentation/http/controllers/
8. Rutas protegidas:
   - POST /programs/:programId/activities → crear actividad
   - GET /programs/:programId/activities → listar actividades del programa
   - PATCH /activities/:activityId/status → actualizar estado
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-007-backend-activities
```

**Commit al terminar:**
```bash
git commit -m "feat(activities): implementar gestión de actividades clínicas"
```

---

### Tarea 4.2 — Frontend de actividades

**Qué se construye:**
- Sección de actividades dentro de `ProgramDetailPage`
- Componente `ActivityList` (lista cronológica con estado visual)
- Formulario para crear actividad (tipo, fecha, notas, asignado a)
- Botones para cambiar estado desde la lista
- Hook `useActivities`

**Skill a usar:** `Frontend Engineer`

**Mensaje a Claude:**
```
Actúa como Frontend Engineer.

Implementa el módulo de actividades clínicas en el frontend de EmbryoApp.

Necesito:
1. Agregar sección de Actividades en ProgramDetailPage
   - Lista cronológica de actividades con su tipo, fecha y estado
   - Botón por actividad para marcarla como COMPLETADA o CANCELADA
   - Formulario para agregar nueva actividad
2. Componente ActivityList en presentation/components/
   - Cada actividad muestra: tipo (ícono), fecha programada, estado (badge de color)
   - Estados: PENDIENTE (gris), COMPLETADA (verde), ATRASADA (rojo), CANCELADA (negro)
3. Formulario AddActivityForm con: tipo de actividad (select), fecha (date picker), notas opcionales
4. Hook useActivities en application/hooks/ con getActivities(), addActivity(), updateStatus()

Las actividades deben aparecer en orden cronológico ascendente por fecha.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-007-frontend-activities
```

**Commit al terminar:**
```bash
git commit -m "feat(activities): implementar lista y gestión de actividades clínicas"
```

---

### Criterio de fin de Semana 4 / Sprint 2

- [ ] Se puede crear actividades clínicas en un programa con fecha y tipo
- [ ] Las actividades se muestran en orden cronológico
- [ ] Se puede marcar una actividad como completada o cancelada
- [ ] El cambio de estado persiste en la base de datos
- [ ] Ambas ramas mergeadas a `develop` y pusheadas
- [ ] Etiqueta de versión: `git tag v0.2.0-sprint2`

---

---

# SPRINT 3 — Offline y valor ejecutivo

**Objetivo:** El sistema funciona en campo sin internet. Los datos se sincronizan automáticamente al recuperar la conexión.

---

## Semana 5 — Captura offline

**Historia de usuario:** HU-009 (registrar información sin conexión)

---

### Tarea 5.1 — Configurar IndexedDB y Service Worker

**Qué se construye:**
- Configuración de PWA con Vite PWA plugin (Service Worker con Workbox)
- Base de datos local IndexedDB usando Dexie.js
- Tablas locales para: programas, entidades, actividades
- Cola de sincronización local (`sync_queue`)

**Skill a usar:** `Software Architect` primero, luego `Frontend Engineer`

**Mensaje a Claude (paso 1 — Arquitectura):**
```
Actúa como Software Architect.

Necesito diseñar la estrategia offline-first para EmbryoApp en el frontend.

El sistema debe:
1. Guardar datos localmente en IndexedDB cuando no hay conexión
2. Leer datos desde IndexedDB si no hay conexión (cache-first)
3. Encolar operaciones pendientes (crear, editar) cuando no hay internet
4. Sincronizar la cola cuando vuelve la conexión

Propón la estructura de archivos para infrastructure/offline/ y qué librerías usar.
Considera que ya usamos Vite + React + TypeScript.
```

**Mensaje a Claude (paso 2 — Implementación):**
```
Actúa como Frontend Engineer.

Implementa la capa offline de EmbryoApp según la arquitectura diseñada.

Necesito:
1. Instalar y configurar vite-plugin-pwa con Workbox en vite.config.ts
2. Configurar IndexedDB con Dexie.js en infrastructure/offline/
   - Tablas: programs, entities, activities, syncQueue
3. OfflineStorage service que permite leer y escribir datos localmente
4. Hook useNetworkStatus para detectar si hay o no conexión (navigator.onLine + eventos)
5. Modificar los hooks usePrograms, useEntities, useActivities para:
   - Si hay conexión: usar la API y guardar resultado en IndexedDB
   - Si no hay conexión: leer desde IndexedDB y encolar cambios en syncQueue
6. Indicador visual en la UI que muestre "Sin conexión" cuando no hay internet
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-009-offline-storage
```

**Commit al terminar:**
```bash
git commit -m "feat(offline): implementar almacenamiento local con IndexedDB y PWA"
```

---

### Criterio de fin de Semana 5

- [ ] La app puede instalarse como PWA (ícono en pantalla de inicio)
- [ ] Con conexión desactivada se pueden ver los programas cargados previamente
- [ ] Con conexión desactivada se puede crear un programa (queda en cola local)
- [ ] La barra de estado muestra "Sin conexión" cuando no hay internet
- [ ] Rama mergeada a `develop` y pusheada

---

## Semana 6 — Sincronización y QA final

**Historia de usuario:** HU-010 (sincronizar cambios cuando vuelva la conexión)

---

### Tarea 6.1 — Backend de sincronización

**Qué se construye:**
- Endpoint `POST /sync` que recibe la cola de operaciones pendientes
- Procesa cada operación en orden (CREATE, UPDATE, DELETE)
- Responde con resultado por operación (éxito/error)

**Skill a usar:** `Backend Engineer`

**Mensaje a Claude:**
```
Actúa como Backend Engineer.

Implementa el endpoint de sincronización en el backend de EmbryoApp.

El frontend enviará un arreglo de operaciones pendientes con esta estructura:
{
  entityType: "program" | "entity" | "activity",
  entityId: string,
  operation: "CREATE" | "UPDATE" | "DELETE",
  payload: object,
  createdAt: string
}

Necesito:
1. SyncUseCase en application/use-cases/ que procese cada operación en orden
2. SyncController en presentation/http/controllers/
3. Ruta protegida: POST /sync
4. La respuesta debe indicar qué operaciones se procesaron bien y cuáles fallaron
5. Registrar en AuditLog cada operación sincronizada

El modelo SyncQueueItem ya existe en el schema de Prisma.
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-010-backend-sync
```

**Commit al terminar:**
```bash
git commit -m "feat(sync): implementar endpoint de sincronización de cola offline"
```

---

### Tarea 6.2 — Frontend de sincronización

**Qué se construye:**
- `SyncService` que detecta recuperación de conexión y envía la cola
- Indicador visual de sincronización (spinner o badge)
- Notificación al usuario cuando la sync termina

**Skill a usar:** `Frontend Engineer`

**Mensaje a Claude:**
```
Actúa como Frontend Engineer.

Implementa el servicio de sincronización automática en el frontend de EmbryoApp.

Necesito:
1. SyncService en infrastructure/offline/ que:
   - Escucha el evento window.online
   - Cuando detecta conexión, lee la syncQueue de IndexedDB
   - Envía las operaciones pendientes al endpoint POST /sync
   - Marca cada operación como sincronizada o con error en IndexedDB
2. Hook useSyncStatus que expone: isSyncing, pendingCount, lastSyncAt
3. Componente SyncIndicator en presentation/components/ que muestra:
   - Ícono de nube con check si está todo sincronizado
   - Spinner si está sincronizando
   - Número de cambios pendientes si no hay conexión
4. Agregar SyncIndicator en el header principal de la app
```

**Rama Git:**
```bash
git checkout develop
git checkout -b feature/hu-010-frontend-sync
```

**Commit al terminar:**
```bash
git commit -m "feat(sync): implementar sincronización automática al recuperar conexión"
```

---

### Tarea 6.3 — QA del MVP completo

**Qué valida:** Que todas las historias de usuario de los 3 sprints funcionan correctamente de punta a punta.

**Skill a usar:** `QA Engineer`

**Mensaje a Claude:**
```
Actúa como QA Engineer.

Necesito validar el MVP completo de EmbryoApp antes de considerarlo listo.

Revisa y dame un checklist completo para verificar manualmente:
1. HU-001: Login con credenciales válidas e inválidas
2. HU-002: Logout y protección de rutas
3. HU-003: Crear un programa reproductivo
4. HU-004: Listar programas con filtros
5. HU-005: Cambiar estado de un programa
6. HU-006: Registrar entidades (donante, receptora, embrión)
7. HU-007: Programar actividades con fecha y tipo
8. HU-008: Actualizar estado de una actividad
9. HU-009: Registrar datos sin conexión
10. HU-010: Sincronizar al recuperar conexión

Para cada HU incluye: pasos de prueba, resultado esperado y casos de error a verificar.
```

---

### Criterio de fin de Semana 6 / Sprint 3 / MVP

- [ ] La sincronización se ejecuta automáticamente al recuperar internet
- [ ] El indicador visual de sync funciona en los tres estados (ok, syncing, offline)
- [ ] Checklist de QA completo pasado sin errores críticos
- [ ] Todas las ramas mergeadas a `develop`
- [ ] Merge de `develop` a `main`
- [ ] Etiqueta de versión final: `git tag v1.0.0-mvp`
- [ ] Push de `main` y el tag: `git push origin main --tags`

---

---

# Referencia rápida de Skills por tipo de tarea

| Tipo de tarea | Skill | Mensaje base |
|---|---|---|
| Diseñar cómo hacer algo | `Software Architect` | "Actúa como Software Architect. Necesito diseñar..." |
| Cambiar el schema de BD | `Database Architect` | "Actúa como Database Architect. Agrega/modifica..." |
| Implementar API o caso de uso | `Backend Engineer` | "Actúa como Backend Engineer. Implementa el endpoint..." |
| Crear pantalla o componente | `Frontend Engineer` | "Actúa como Frontend Engineer. Implementa la pantalla..." |
| Diseñar cómo se ve o fluye algo | `UX Designer` | "Actúa como UX Designer. Diseña el flujo de..." |
| Definir qué va en el sprint | `Product Manager` | "Actúa como Product Manager. Define los criterios..." |
| Verificar que algo funciona | `QA Engineer` | "Actúa como QA Engineer. Revisa si esto cumple..." |
| Configurar deploy o infraestructura | `DevOps` | "Actúa como DevOps. Configura el despliegue en..." |
| Documentar una decisión | `Documentation Manager` | "Actúa como Documentation Manager. Documenta..." |
| Entender o revisar algo | `Technical Mentor` | "Actúa como Technical Mentor. Explícame..." |

---

# Comandos Git reutilizables por sprint

```bash
# Empezar una tarea nueva
git checkout develop
git checkout -b feature/nombre-de-la-tarea

# Guardar el trabajo del día sin terminar
git add .
git commit -m "wip(módulo): descripción de lo avanzado"

# Terminar y fusionar
git checkout develop
git merge feature/nombre-de-la-tarea
git push origin develop
git branch -d feature/nombre-de-la-tarea

# Marcar fin de sprint
git tag v0.1.0-sprint1
git push origin --tags
```

---

# Estado de avance

Actualizar este bloque al terminar cada semana.

| Semana | Contenido | Estado |
|---|---|---|
| Semana 1 | Autenticación (HU-001, HU-002) | ✅ Completada |
| Semana 2 | Programas (HU-003, HU-004, HU-005) | Pendiente |
| Semana 3 | Entidades (HU-006) | Pendiente |
| Semana 4 | Actividades (HU-007, HU-008) | Pendiente |
| Semana 5 | Offline (HU-009) | Pendiente |
| Semana 6 | Sincronización + QA (HU-010) | Pendiente |
