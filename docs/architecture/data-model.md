# Modelo de datos — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir la estructura persistente del sistema EmbryoApp, alineada con el diseño de dominio, los requisitos del MVP y la necesidad de soportar operaciones offline-first y trazabilidad.

## 2. Principios de diseño del modelo de datos
- Mantener integridad referencial y consistencia operativa.
- Soportar trazabilidad de cambios críticos.
- Preparar el modelo para sincronización y operaciones offline.
- Evitar redundancia innecesaria y complejidad prematura.

## 3. Entidades principales

### 3.1 organizations
Representa a la organización, finca, clínica o empresa que gestiona programas.

Campos sugeridos:
- id
- name
- organization_type
- status
- created_at
- updated_at

### 3.2 users
Representa a los usuarios del sistema.

Campos sugeridos:
- id
- organization_id
- full_name
- email
- password_hash
- role
- status
- created_at
- updated_at

### 3.3 programs
Representa un programa reproductivo.

Campos sugeridos:
- id
- organization_id
- code
- name
- status
- start_date
- estimated_end_date
- notes
- created_at
- updated_at

### 3.4 program_entities
Representa las entidades asociadas a un programa.

Campos sugeridos:
- id
- program_id
- entity_type
- name
- external_reference
- status
- created_at
- updated_at

### 3.5 activities
Representa las actividades clínicas programadas para un programa.

Campos sugeridos:
- id
- program_id
- activity_type
- scheduled_date
- completed_date
- status
- notes
- assigned_to_user_id
- created_at
- updated_at

### 3.6 observations
Representa notas o observaciones registradas sobre programas o entidades.

Campos sugeridos:
- id
- program_id
- entity_id
- author_user_id
- content
- created_at
- updated_at

### 3.7 audit_logs
Representa eventos críticos para trazabilidad.

Campos sugeridos:
- id
- entity_type
- entity_id
- action
- performed_by_user_id
- created_at
- metadata

### 3.8 sync_queue
Representa cambios pendientes por sincronizar.

Campos sugeridos:
- id
- entity_type
- entity_id
- operation
- payload
- status
- created_at
- updated_at

## 4. Relaciones principales
- organizations 1:N users
- organizations 1:N programs
- programs 1:N activities
- programs 1:N observations
- programs 1:N program_entities
- users 1:N audit_logs
- users 1:N observations

## 5. Consideraciones de diseño para offline-first
- Los cambios generados en cliente deben registrarse en la cola de sincronización.
- El sistema debe poder reintentar sincronización de forma segura.
- Los conflictos deben resolverse con reglas claras y preferiblemente deterministas.

## 6. Reglas de integridad sugeridas
- No deben existir actividades sin un programa asociado.
- No deben existir observaciones sin autor válido.
- Los estados deben restringirse a un conjunto controlado de valores.
- Cada cambio relevante debe dejar rastro en audit_logs.

## 7. Recomendación de cierre
Este modelo debe servir como base para la implementación de persistencia y para la futura evolución del sistema. Debe actualizarse cuando cambien las reglas del negocio o la arquitectura.
