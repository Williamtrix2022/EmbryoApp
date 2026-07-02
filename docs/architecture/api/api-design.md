# Diseño de API — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir los contratos de integración y la estructura de la API del sistema para que frontend, backend y procesos de sincronización trabajen con interfaces claras y consistentes.

## 2. Principios de diseño
- APIs claras, previsibles y versionables.
- Separación entre recursos de dominio y operaciones transversales.
- Uso de respuestas consistentes con manejo de errores explícito.
- Compatibilidad con operaciones offline-first.

## 3. Recursos principales

### 3.1 Autenticación
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh

### 3.2 Programas
- GET /programs
- GET /programs/:id
- POST /programs
- PATCH /programs/:id
- DELETE /programs/:id

### 3.3 Entidades
- GET /programs/:id/entities
- POST /programs/:id/entities
- PATCH /entities/:id
- DELETE /entities/:id

### 3.4 Actividades
- GET /programs/:id/activities
- POST /programs/:id/activities
- PATCH /activities/:id
- DELETE /activities/:id

### 3.5 Observaciones
- GET /programs/:id/observations
- POST /programs/:id/observations

### 3.6 Sincronización
- POST /sync/push
- GET /sync/status

## 4. Estilo de respuestas
- Respuestas exitosas con estructura estándar.
- Errores con código, mensaje y detalles opcionales.
- Soporte para paginación en listados grandes.

## 5. Consideraciones de seguridad
- Autenticación obligatoria en endpoints protegidos.
- Validación de permisos por rol.
- Protección contra entradas maliciosas.

## 6. Recomendación de cierre
Este documento debe actualizarse cuando cambien los contratos o la arquitectura de integración del sistema.
