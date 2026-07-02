# Modelo operativo del equipo — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir cómo trabajará el equipo de EmbryoApp para que el desarrollo sea ordenado, auditable, colaborativo y alineado con principios de ingeniería de software profesional.

## 2. Principios de trabajo
- No se desarrollará código sin documentación previa aprobada.
- Toda decisión importante debe registrarse en un ADR.
- Se trabajará con Git Flow.
- Todo cambio debe pasar por revisión antes de integrarse.
- La documentación debe mantenerse viva y actualizada.
- La calidad técnica tiene prioridad sobre velocidad sin criterio.

## 3. Flujo de trabajo

### 3.1 Inicio de una tarea
- El Product Manager define la necesidad y sus criterios de aceptación.
- El Software Architect valida viabilidad técnica y alcance.
- El responsable técnico prepara una propuesta breve si la tarea implica diseño no trivial.
- La documentación relacionada debe actualizarse si la tarea cambia requisitos o arquitectura.

### 3.2 Desarrollo
- Se crea una rama feature desde develop.
- El trabajo debe ser pequeño, claro y verificable.
- Se evita trabajar directamente sobre main.
- Si la tarea afecta arquitectura, seguridad o datos, debe documentarse antes de implementar.

### 3.3 Revisión
- Todo cambio debe pasar por Pull Request.
- El Code Review debe revisar calidad, claridad, alineación con requisitos y riesgos técnicos.
- QA valida criterios de aceptación antes de aprobar la integración.

### 3.4 Integración
- El merge debe hacerse solo tras revisión aprobada.
- La integración a develop debe ser consistente con el estado de documentación.
- Si la tarea es de alto impacto, debe actualizarse el ADR correspondiente.

## 4. Roles de decisión
- Product Manager: prioriza y define valor.
- Software Architect: define arquitectura y decisiones técnicas críticas.
- Technical Mentor: guía prácticas y calidad técnica.
- QA Engineer: valida calidad y riesgo funcional.
- DevOps: define despliegue, operación y entorno.
- Documentation Manager: asegura que la documentación viva permanezca alineada.

## 5. Reglas de documentación
- Todo documento de producto o arquitectura debe tener versión.
- Si cambia una decisión importante, debe actualizarse el documento afectado y el ADR relevante.
- La documentación debe revisarse cuando cambie el alcance, el diseño o la operación.

## 6. Reglas de calidad
- No se aceptan cambios sin pruebas o validación demostrable.
- No se implementan funcionalidades ambiguas.
- No se introduce complejidad innecesaria.
- Los defectos críticos deben documentarse y resolverse antes de avanzar.

## 7. Reglas de Git Flow
Ver [ADR-005: Uso de Git Flow como modelo de desarrollo](../adr/adr-005-git-flow.md) para el detalle de ramas y justificación.

## 8. Gestión de cambios y versionado
- Todo cambio significativo debe documentarse.
- Los cambios de arquitectura deben actualizar los ADRs correspondientes.
- Las versiones deben registrarse de forma explícita.
- Los cambios de alcance deben revisarse antes de implementarse.
- Se usa versionado semántico para entregables principales.
- La documentación mantiene versión independiente por artefacto cuando es necesario.

## 9. Recomendación de cierre
Este modelo operativo debe mantenerse como referencia del trabajo diario y actualizarse cuando el equipo detecte mejoras necesarias.
