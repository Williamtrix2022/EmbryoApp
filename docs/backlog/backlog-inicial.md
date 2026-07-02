# Backlog inicial — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Priorizar las primeras historias de usuario del MVP para poder iniciar desarrollo con un alcance claro, medible y alineado con la propuesta de valor.

## 2. Criterios de priorización
- Alto impacto para el usuario principal.
- Valor claro y medible.
- Riesgo técnico controlado.
- Posibilidad de entregarse en una iteración breve.

## 3. Historias de usuario priorizadas

### EPIC 1 — Autenticación y acceso

#### HU-001: Iniciar sesión en la plataforma
Como usuario autorizado, quiero iniciar sesión de forma segura para acceder a los programas y datos de mi organización.

Criterios de aceptación:
- El usuario puede iniciar sesión con correo y contraseña válidos.
- El sistema rechaza credenciales inválidas.
- El sistema protege el acceso a recursos no autorizados.
- La sesión se maneja de forma segura.

#### HU-002: Cerrar sesión
Como usuario autenticado, quiero cerrar sesión para proteger la información de la cuenta.

Criterios de aceptación:
- El usuario puede cerrar sesión desde la interfaz.
- La sesión se invalida correctamente.

### EPIC 2 — Gestión de programas

#### HU-003: Crear un programa reproductivo
Como veterinario o gestor operativo, quiero crear un programa reproductivo para registrar el trabajo que se va a ejecutar.

Criterios de aceptación:
- El usuario puede crear un programa con datos básicos obligatorios.
- El programa queda guardado correctamente.
- El sistema muestra el programa recién creado en la lista principal.

#### HU-004: Consultar programas existentes
Como usuario autorizado, quiero ver la lista de programas para conocer el estado general de la operación.

Criterios de aceptación:
- La lista muestra programas existentes con estado y datos básicos.
- El usuario puede filtrar por estado o fecha.

#### HU-005: Actualizar el estado de un programa
Como usuario autorizado, quiero cambiar el estado de un programa para reflejar el avance operativo.

Criterios de aceptación:
- El sistema permite actualizar el estado del programa.
- El cambio queda persistido y visible.

### EPIC 3 — Gestión de entidades

#### HU-006: Registrar entidades asociadas al programa
Como usuario del sistema, quiero registrar entidades como donantes, receptoras o pacientes para reflejar los participantes del programa.

Criterios de aceptación:
- El usuario puede crear entidades asociadas a un programa.
- La entidad queda visible desde el detalle del programa.

### EPIC 4 — Gestión de actividades

#### HU-007: Programar actividades clínicas
Como usuario del sistema, quiero programar actividades clínicas para mantener el seguimiento del plan operativo.

Criterios de aceptación:
- El sistema permite crear actividades con fecha y tipo.
- Las actividades quedan asociadas al programa correspondiente.

#### HU-008: Actualizar estado de una actividad
Como usuario del sistema, quiero marcar una actividad como pendiente, completada o atrasada para reflejar el estado real del proceso.

Criterios de aceptación:
- El usuario puede actualizar el estado de una actividad.
- El cambio se refleja en la vista del programa.

### EPIC 5 — Operación offline y sincronización

#### HU-009: Capturar información sin conexión
Como usuario en campo, quiero registrar información aunque no haya conectividad para no detener la operación.

Criterios de aceptación:
- El sistema permite guardar cambios sin conexión.
- La información queda disponible localmente.

#### HU-010: Sincronizar cambios cuando vuelva la conexión
Como usuario del sistema, quiero sincronizar los cambios pendientes cuando la red esté disponible para mantener la información actualizada.

Criterios de aceptación:
- El sistema envía cambios pendientes al backend cuando hay conexión.
- El usuario recibe confirmación del resultado de sincronización.

## 4. Sprints recomendados

### Sprint 1 — Base operativa
- HU-001: Iniciar sesión
- HU-002: Cerrar sesión
- HU-003: Crear un programa reproductivo
- HU-004: Consultar programas existentes
- HU-005: Actualizar el estado de un programa

### Sprint 2 — Seguimiento clínico
- HU-006: Registrar entidades asociadas al programa
- HU-007: Programar actividades clínicas
- HU-008: Actualizar estado de una actividad

### Sprint 3 — Offline y valor ejecutivo
- HU-009: Capturar información sin conexión
- HU-010: Sincronizar cambios cuando vuelva la conexión

## 5. Estado de avance
- [ ] Sprint 1 — Base operativa (HU-001 a HU-005)
- [ ] Sprint 2 — Seguimiento clínico (HU-006 a HU-008)
- [ ] Sprint 3 — Offline y valor ejecutivo (HU-009 a HU-010)

## 6. Recomendación de cierre
Este backlog debe servir como entrada para la primera iteración de desarrollo y debe actualizarse continuamente a medida que se valide el producto.
