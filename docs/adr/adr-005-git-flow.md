# ADR-005: Uso de Git Flow como modelo de desarrollo

- Estado: Aprobado
- Fecha: 2026-07-01
- Versión: 0.1.0

## Contexto
El proyecto requiere un flujo de ramas ordenado que permita trabajo incremental, revisión previa a la integración y separación clara entre desarrollo en curso y versiones estables, tal como establece `governance/team-operating-model.md`.

## Decisión
Se adopta Git Flow como modelo de ramas:

- `main`: código en producción.
- `develop`: integración continua del proyecto.
- `feature/*`: nuevas funcionalidades, creadas desde `develop`.
- `release/*`: preparación de versiones antes de pasar a `main`.
- `hotfix/*`: correcciones urgentes sobre `main`.

Los commits siguen la convención de Commits Convencionales (`feat`, `fix`, `docs`, `refactor`, `style`, `test`, `build`, `ci`).

## Justificación
Git Flow ofrece un modelo predecible para coordinar releases y correcciones urgentes en un producto SaaS comercial, separando el trabajo en curso de las versiones desplegadas.

## Consecuencias positivas
- Historial de cambios trazable y auditable.
- Separación clara entre trabajo en desarrollo y versiones estables.
- Compatible con revisión obligatoria por Pull Request antes de integrar a `develop` o `main`.

## Consecuencias negativas
- Mayor sobrecarga de ramas que un trunk-based development simple.
- Requiere disciplina del equipo para no trabajar directamente sobre `main` o `develop`.

## Alternativas consideradas
- Trunk-based development: descartado por la necesidad de separar releases estables de trabajo en curso en las primeras fases del producto.
- GitHub Flow (solo `main` + `feature/*`): descartado porque el proyecto anticipa releases versionadas explícitas.

## Decisión de seguimiento
El repositorio debe inicializarse con `main` y `develop`. Ninguna funcionalidad debe integrarse directamente a `main` sin pasar por `release/*` o `hotfix/*`.
