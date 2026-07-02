# Diseño de dominio — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir el modelo conceptual del negocio de EmbryoApp para que el sistema represente correctamente los procesos, entidades y reglas del dominio de programas de transferencia de embriones bovinos.

## 2. Contexto del dominio
EmbryoApp soporta la gestión operativa de programas de transferencia de embriones en entornos donde intervienen fincas, veterinarios, clínicas y empresas de reproducción. El sistema debe ayudar a organizar, rastrear y controlar actividades críticas y estados de programas con alta trazabilidad.

## 3. Objetos de dominio principales

### 3.1 ProgramaReproductivo
Representa una iniciativa o ciclo operativo específico de transferencia de embriones.

Atributos sugeridos:
- identificador único
- nombre o código del programa
- estado
- fecha de inicio
- fecha estimada de finalización
- observaciones generales
- organización asociada

Reglas de negocio sugeridas:
- Un programa debe tener un estado válido.
- Un programa debe poder estar asociado a una o más entidades del proceso.
- Un programa debe poder registrar actividades y notas.

### 3.2 EntidadParticipante
Representa a cualquier actor o sujeto involucrado en el programa.

Subtipos sugeridos:
- Donante
- Receptora
- Paciente
- Embrion
- Cliente o propietario

Atributos sugeridos:
- identificador único
- tipo de entidad
- datos básicos de identificación
- estado de participación
- observaciones

Reglas de negocio sugeridas:
- Una entidad debe pertenecer a un programa o a una relación del mismo.
- La misma entidad no debería duplicarse innecesariamente.

### 3.3 ActividadClinica
Representa una tarea o evento clínico asociado al programa.

Atributos sugeridos:
- identificador único
- tipo de actividad
- fecha programada
- fecha real de ejecución
- estado
- responsable
- observaciones

Reglas de negocio sugeridas:
- Toda actividad debe pertenecer a un programa.
- Una actividad puede estar pendiente, completada, atrasada o cancelada.

### 3.4 Nota o Observación
Representa un registro narrativo o contextual del proceso.

Atributos sugeridos:
- identificador único
- contenido
- fecha de creación
- autor
- contexto asociado

Reglas de negocio sugeridas:
- Una observación debe estar vinculada a un programa o entidad concreta.
- Debe poder consultarse en forma cronológica.

### 3.5 Organización o Cliente
Representa la entidad jurídica o operativa que contrata o gestiona el programa.

Atributos sugeridos:
- identificador único
- nombre
- tipo de organización
- estado de relación

Reglas de negocio sugeridas:
- Una organización puede gestionar varios programas.
- Debe poder asociarse a múltiples usuarios y permisos.

## 4. Relaciones de dominio
- Un ProgramaReproductivo está asociado a una Organización.
- Un ProgramaReproductivo contiene varias EntidadParticipante.
- Un ProgramaReproductivo contiene varias ActividadClinica.
- Un ProgramaReproductivo contiene varias Notas u Observaciones.
- Una EntidadParticipante puede estar vinculada a múltiples programas según el caso de uso.

## 5. Reglas de negocio clave
- El estado del programa debe reflejar el avance operativo real.
- Las actividades deben poder visualizarse en orden temporal.
- Los cambios relevantes deben quedar trazados para auditoría.
- La información de campo debe poder registrarse incluso sin conexión.

## 6. Supuestos y límites del diseño
- El MVP no necesita modelar la totalidad de la operación agrícola.
- El sistema no debe intentar cubrir procesos financieros completos.
- El dominio se limita a la gestión operativa y trazabilidad de programas reproductivos.

## 7. Recomendación de cierre
Este documento debe servir como base para el diseño de datos, la arquitectura de software y la experiencia de usuario. Debe mantenerse actualizado cuando cambien reglas o procesos del negocio.
