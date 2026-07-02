# Requisitos funcionales y no funcionales — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo del documento
Definir de forma clara y verificable los requisitos del sistema para el MVP de EmbryoApp, asegurando que el producto cubra las necesidades principales de los usuarios y pueda desarrollarse con calidad y trazabilidad.

## 2. Alcance del documento
Este documento cubre los requisitos funcionales y no funcionales del MVP inicial. No incluye funcionalidades futuras ni extensiones de negocio que no formen parte de la primera entrega.

## 3. Requisitos funcionales

### 3.1 Gestión de programas reproductivos
- El sistema debe permitir crear programas de transferencia de embriones con identificador único.
- El sistema debe permitir registrar el estado del programa: planificado, en curso, completado, cancelado o pausado.
- El sistema debe permitir asociar un programa a una finca, una clínica o una empresa de reproducción.
- El sistema debe permitir modificar los datos del programa durante su ciclo de vida.
- El sistema debe permitir registrar observaciones y notas asociadas a cada programa.

### 3.2 Gestión de entidades del programa
- El sistema debe permitir registrar donantes, receptoras, pacientes y embriones.
- El sistema debe permitir asociar entidades a un programa específico.
- El sistema debe permitir actualizar información básica de cada entidad.
- El sistema debe permitir consultar el historial de cambios relevantes de una entidad.

### 3.3 Programación de actividades clínicas
- El sistema debe permitir programar actividades clínicas por fecha y tipo.
- El sistema debe permitir marcar una actividad como completada, pendiente o atrasada.
- El sistema debe permitir adjuntar observaciones a cada actividad.
- El sistema debe permitir visualizar actividades en orden cronológico.

### 3.4 Autenticación y acceso
- El sistema debe permitir el acceso mediante credenciales seguras.
- El sistema debe diferenciar roles básicos: administrador, veterinario, operador y lector.
- El sistema debe restringir el acceso a información según permisos definidos.
- El sistema debe registrar eventos de acceso relevantes para auditoría.

### 3.5 Trabajo offline
- El sistema debe permitir capturar y editar información sin conexión a Internet.
- El sistema debe permitir visualizar datos ya descargados aunque no haya conectividad.
- El sistema debe sincronizar cambios cuando vuelva la conexión.
- El sistema debe resolver conflictos de sincronización de forma determinista y segura.

### 3.6 Reportes básicos
- El sistema debe permitir ver un resumen del estado general de los programas.
- El sistema debe permitir consultar programas por estado, fecha o cliente.
- El sistema debe permitir exportar reportes simples en formato estándar.

### 3.7 Auditoría y trazabilidad
- El sistema debe conservar un historial mínimo de cambios críticos.
- El sistema debe permitir identificar quién realizó un cambio y cuándo.
- El sistema debe mantener trazabilidad de estados y observaciones principales.

## 4. Requisitos no funcionales

### 4.1 Usabilidad
- La interfaz debe ser clara, simple y orientada a tareas críticas de operación.
- El sistema debe permitir que un usuario con poco entrenamiento complete tareas básicas sin ayuda externa.

### 4.2 Disponibilidad
- El sistema debe estar disponible para su uso en condiciones normales de operación.
- La experiencia offline debe ser soportada sin depender de conectividad permanente.

### 4.3 Seguridad
- El sistema debe proteger datos sensibles mediante autenticación robusta.
- Las credenciales deben manejarse de forma segura.
- El acceso a datos debe limitarse por rol y permisos.
- La información debe transmitirse de forma segura cuando exista conexión.

### 4.4 Rendimiento
- La interacción principal con un programa debe responder de forma aceptable en dispositivos estándar.
- La carga de datos básicos debe ser rápida en condiciones normales.

### 4.5 Confiabilidad
- El sistema debe manejar errores de red y sincronización sin perder información crítica.
- El sistema debe ser capaz de recuperar datos y estados después de interrupciones.

### 4.6 Mantenibilidad
- El sistema debe estar diseñado para evolucionar sin reescrituras completas.
- La arquitectura debe permitir cambios incrementales y pruebas consistentes.

### 4.7 Escalabilidad
- El sistema debe poder crecer en volumen de usuarios, programas y datos sin un rediseño inmediato.

## 5. Criterios de aceptación principales
- Un usuario autorizado puede crear y seguir un programa de transferencia desde el inicio hasta el estado final.
- Un usuario puede registrar entidades y actividades clínicas asociadas al programa.
- Un usuario puede operar de forma parcial sin conexión y sincronizar cuando la red vuelva.
- Un usuario con permisos restringidos no puede acceder a datos no autorizados.
- El sistema registra cambios críticos para auditoría y trazabilidad.

## 6. Riesgos y supuestos
- El funcionamiento offline es un requisito clave y debe considerarse en diseño desde el inicio.
- La calidad de los datos es crítica para la utilidad del sistema.
- La complejidad clínica y operativa debe mantenerse controlada para evitar sobre-ingeniería.
- La solución debe priorizar claridad operativa sobre funcionalidades administrativas secundarias.

## 7. Recomendación de cierre
Este documento debe servir como base para la arquitectura, el diseño de datos, la interfaz y la estrategia de pruebas. Su calidad determinará la solidez del desarrollo posterior.

## 8. Relación con otros documentos
- Se apoya en [docs/vision/product-vision.md](docs/vision/product-vision.md).
- Alimenta el diseño de dominio en [docs/architecture/domain-model.md](docs/architecture/domain-model.md).
- Sirve de entrada para la arquitectura de alto nivel en [docs/architecture/high-level-architecture.md](docs/architecture/high-level-architecture.md).
