# Offline-first y sincronización — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir la estrategia de funcionamiento del sistema cuando no hay conectividad, así como el mecanismo de sincronización con el backend cuando la red vuelve a estar disponible.

## 2. Principios
- La captura de datos debe poder realizarse aunque no haya conexión.
- La experiencia debe ser consistente tanto online como offline.
- Los cambios deben sincronizarse de forma segura y con trazabilidad.
- Los conflictos deben resolverse de forma determinista.

## 3. Estrategia propuesta

### 3.1 Captura local
- El frontend almacena cambios locales en una cola persistente.
- Las operaciones se registran con marca de tiempo y estado.
- El usuario puede seguir trabajando aunque la red esté caída.

### 3.2 Sincronización
- Cuando la conexión regrese, el cliente envía los cambios pendientes.
- El backend valida, persiste y responde con el resultado.
- El cliente actualiza su estado local según la respuesta.

### 3.3 Manejo de conflictos
- Se prioriza la última versión válida confirmada.
- Si existen conflictos, se registran para revisión.
- Las operaciones críticas deben dejar auditoría.

## 4. Consideraciones técnicas
- Reintentos automáticos de envío.
- Identificación de cambios por entidad y operación.
- Integración con la tabla de cola de sincronización.

## 5. Recomendación de cierre
Este documento debe mantenerse alineado con el modelo de datos y con la arquitectura de componentes.
