# Arquitectura de alto nivel — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir la estructura general del sistema EmbryoApp para que el producto sea escalable, mantenible, seguro y capaz de operar en modo offline-first.

## 2. Principios arquitectónicos
- Clean Architecture como guía principal de organización.
- Separación clara entre presentación, aplicación, dominio e infraestructura.
- Diseño orientado a cambios incrementales.
- Enfoque en seguridad, trazabilidad y confiabilidad.
- Compatibilidad con operación en entornos con conectividad limitada.

## 3. Visión general de la arquitectura
EmbryoApp se estructurará como una aplicación SaaS compuesta por:
- una aplicación web progresiva para usuarios de escritorio y móvil,
- una API backend para lógica de negocio y acceso a datos,
- una capa de persistencia para almacenamiento estructurado,
- una estrategia de sincronización offline-first para capturas locales,
- un modelo de seguridad basado en autenticación, autorización y auditoría.

## 4. Capas propuestas

### 4.1 Capa de presentación
Responsable de la experiencia del usuario.

Componentes esperados:
- Frontend web progresivo.
- Interfaces de gestión de programas, entidades y actividades.
- Módulo de autenticación.
- Módulo de visualización de estado y reportes básicos.

### 4.2 Capa de aplicación
Responsable de coordinar casos de uso y orquestar lógica de negocio.

Componentes esperados:
- Servicios de casos de uso.
- Coordinadores de sincronización.
- Servicios de validación y autorización.
- Servicios de notificación y eventos internos.

### 4.3 Capa de dominio
Responsable de las reglas del negocio y del modelo conceptual del producto.

Componentes esperados:
- Entidades del dominio.
- Reglas de negocio.
- Políticas de estado y validación.
- Objetos de valor y agregados relevantes.

### 4.4 Capa de infraestructura
Responsable de la integración con tecnologías externas y recursos persistentes.

Componentes esperados:
- API backend.
- Base de datos relacional.
- Sistema de almacenamiento local para modo offline.
- Servicios de autenticación y sesiones.
- Servicios de sincronización y manejo de conflictos.

## 5. Propuesta de componentes principales

### 5.1 Frontend
- Interfaz web progresiva.
- Soporte para uso en móvil y escritorio.
- Manejo de estado local para datos recientemente capturados.
- Interfaz para sincronización manual o automática.

### 5.2 Backend API
- Expone endpoints para gestión de programas, entidades y actividades.
- Implementa lógica de negocio y validaciones.
- Gestiona permisos y control de acceso.
- Coordina operaciones de persistencia y sincronización.

### 5.3 Base de datos
- Almacenamiento relacional para información principal del sistema.
- Apoyo a auditoría, trazabilidad y consultas operativas.
- Diseño preparado para crecimiento y normalización.

### 5.4 Capa offline-first
- Almacenamiento local temporal o persistente en el cliente.
- Captura de datos sin conexión.
- Cola de cambios pendientes para sincronización.
- Manejo de conflictos y reconciliación.

### 5.5 Seguridad
- Autenticación basada en credenciales seguras.
- Autorización por rol y permisos.
- Protección de endpoints y manejo de sesiones.
- Registro de eventos sensibles para auditoría.

## 6. Consideraciones clave de arquitectura
- La arquitectura debe permitir trabajar con conectividad limitada sin comprometer la utilidad del sistema.
- La separación de capas debe ser suficientemente clara para permitir cambios sin acoplamiento excesivo.
- El diseño debe soportar un MVP bien delimitado, pero con capacidad de crecimiento.
- El sistema debe prepararse para futuras integraciones sin reescribir el núcleo.

## 7. Riesgos arquitectónicos a evitar
- Acoplar el frontend directamente a la base de datos o a lógica de negocio compleja.
- Resolver el problema offline como una capa ad hoc sin diseño claro.
- Implementar un backend monolítico excesivamente rígido desde el inicio sin posibilidad de evolución.
- Sobre-ingenierizar con microservicios innecesarios para el MVP.

## 8. Componentes principales del sistema
Detalle de los componentes que implementan las capas anteriores.

### 8.1 Frontend App
- Renderizar pantallas y flujos de negocio.
- Capturar datos del usuario.
- Gestionar estado de UI.
- Interactuar con el backend y la capa local offline.

### 8.2 Authentication Module
- Inicio de sesión.
- Gestión de sesiones.
- Control de roles y permisos.
- Validación de identidad.

### 8.3 Program Management Module
- Crear, editar y consultar programas.
- Cambiar estados del programa.
- Registrar observaciones y notas.
- Mostrar resúmenes operativos.

### 8.4 Entity Management Module
- Crear y editar donantes, receptoras, pacientes y embriones.
- Asociar entidades a programas.
- Mantener referencias y relaciones.

### 8.5 Activity Scheduling Module
- Crear actividades.
- Actualizar estados.
- Visualizar agenda y alertas básicas.

### 8.6 Sync and Offline Module
- Captura local de datos.
- Cola de cambios pendientes.
- Reintento y reconciliación.
- Resolución de conflictos básicos.

### 8.7 API Layer
- Recibir solicitudes del cliente.
- Ejecutar casos de uso.
- Validar entrada y salida.
- Delegar en servicios de dominio.

### 8.8 Domain Services
- Validar estados.
- Aplicar lógica del dominio.
- Coordinar operaciones complejas.
- Mantener consistencia del negocio.

### 8.9 Repository Layer
- Persistir entidades.
- Consultar datos.
- Aislar el dominio de la infraestructura de base de datos.

### 8.10 Relaciones entre componentes
- El Frontend App consume los módulos de negocio y la API Layer.
- Authentication Module apoya el acceso a todos los módulos del sistema.
- Program Management Module, Entity Management Module y Activity Scheduling Module dependen de Domain Services.
- Sync and Offline Module interactúa con el frontend y con la API para ofrecer consistencia entre cliente y servidor.
- Repository Layer es utilizada por los servicios de dominio y la API.

### 8.11 Principios de diseño de componentes
- Bajo acoplamiento entre módulos.
- Alta cohesión dentro de cada componente.
- Interfaces claras para interacción entre capas.
- Posibilidad de reemplazar componentes de infraestructura sin afectar el dominio.

## 9. Recomendación de cierre
Esta arquitectura debe tomarse como referencia inicial y actualizarse con los documentos posteriores de datos, API, seguridad y sincronización.
