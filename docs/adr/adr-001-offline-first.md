# ADR-001: Adoptar una arquitectura offline-first como requisito principal del MVP

- Estado: Aprobado
- Fecha: 2026-07-01
- Versión: 0.1.0

## Contexto
EmbryoApp está orientado a usuarios que operan en entornos rurales, con conectividad limitada o intermitente. Los procesos de seguimiento reproductivo implican capturas en campo y operaciones críticas que no pueden depender de una conexión estable en todo momento.

## Decisión
Se adoptará una arquitectura offline-first como requisito principal del MVP. El sistema debe permitir que los usuarios registren, consulten y modifiquen información sin conexión, y sincronizar los cambios cuando la conectividad vuelva.

## Justificación
Esta decisión es estratégica por tres razones:
1. Mejora la utilidad real del producto en condiciones del mundo real.
2. Reduce el riesgo de pérdida de información en entornos con red limitada.
3. Aumenta la confianza del usuario en la solución operativa.

## Consecuencias positivas
- Mejor experiencia de uso en campo.
- Menor dependencia de conectividad.
- Mayor robustez operativa.
- Mejor alineación con el problema del negocio.

## Consecuencias negativas
- Mayor complejidad de diseño en sincronización y control de conflictos.
- Requiere más esfuerzo en almacenamiento local y consistencia de datos.
- Implica considerar el problema offline desde las primeras etapas del diseño.

## Alternativas consideradas
- Diseñar un sistema únicamente online.
- Implementar soporte offline como una mejora posterior.
- Delegar la captura en papel y sincronizar manualmente.

## Decisión de seguimiento
La arquitectura, el diseño de componentes, el modelo de datos y la estrategia de sincronización deben alinearse con este principio. Cualquier cambio que afecte esta decisión deberá actualizar este ADR.
