# Alcance funcional detallado del MVP — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir con mayor precisión qué funcionalidades formarán parte del MVP de EmbryoApp y cuáles quedarán fuera para mantener el producto viable, vendible y sostenible.

## 2. Principios de delimitación del MVP
- Priorizar valor inmediato para usuarios clave.
- Enfocarse en tareas repetitivas y críticas del proceso reproductivo.
- Evitar complejidad administrativa o financiera no esencial.
- Mantener un producto claro, útil y fácil de adoptar.

## 3. Funcionalidades incluidas en el MVP

### 3.1 Gestión de programas
- Crear, editar, consultar y cerrar programas.
- Asignar estado del programa.
- Asociar observaciones y notas por programa.
- Visualizar resumen del programa.

### 3.2 Gestión de entidades
- Crear y editar donantes, receptoras, pacientes y embriones.
- Asociar entidades a un programa.
- Consultar entidades desde la vista del programa.

### 3.3 Gestión de actividades
- Crear actividades clínicas con fecha, tipo y descripción.
- Actualizar estado de cada actividad.
- Visualizar agenda o lista cronológica de actividades.

### 3.4 Autenticación y permisos básicos
- Registro e inicio de sesión.
- Roles básicos de acceso.
- Restricción de acceso a datos por rol.

### 3.5 Trabajo offline
- Captura de datos sin conexión.
- Lectura de datos ya sincronizados sin conexión.
- Sincronización posterior al recuperar conectividad.

### 3.6 Reportes básicos
- Vista de resumen general.
- Filtros por estado, fecha o cliente.
- Exportación simple de reportes.

## 4. Funcionalidades excluidas del MVP
- Facturación y contabilidad.
- Gestión financiera completa.
- Inventario integral de finca.
- Integraciones complejas con terceros.
- IA predictiva o analítica avanzada.
- Módulos de comercio o marketplace.
- Gestión completa de la operación agrícola global.

## 5. Casos de uso principales del MVP

### 5.1 Crear un programa reproductivo
- Un usuario autorizado ingresa a la aplicación.
- Crea un nuevo programa con datos básicos.
- Asocia las entidades requeridas.
- Programa actividades y guarda el registro.

### 5.2 Actualizar un programa en campo
- Un usuario en campo registra información sin conexión.
- Modifica estados o agrega notas.
- La información se sincroniza cuando vuelve la conexión.

### 5.3 Consultar estado del programa
- Un usuario revisa el estado general del programa.
- Visualiza actividades pendientes y observaciones.
- Toma decisiones operativas basadas en la información disponible.

## 6. Criterios de aceptación del MVP
- El usuario puede crear, modificar y consultar un programa desde la interfaz principal.
- El usuario puede registrar entidades y actividades sin depender de procesos externos.
- El sistema conserva información cuando no hay conexión.
- La información sincroniza correctamente al recuperarse la conectividad.
- El sistema aplica permisos básicos sin exponer datos no autorizados.

## 7. Riesgos de alcance
- Incluir demasiadas funcionalidades operativas puede retrasar el lanzamiento.
- Permitir demasiados roles o permisos puede complicar la implementación injustificadamente.
- Tratar de cubrir toda la clínica o la finca desde el inicio diluye el valor del producto.

## 8. Recomendación de cierre
Este documento debe usarse como frontera de implementación del MVP y como base para la arquitectura, el diseño de datos y la experiencia de usuario.
