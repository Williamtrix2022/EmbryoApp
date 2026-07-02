# Seguridad y autenticación — EmbryoApp

Versión: 0.1.0
Estado: En revisión

## 1. Objetivo
Definir la estrategia de seguridad del sistema para proteger datos sensibles, controlar acceso y soportar auditoría.

## 2. Requisitos de seguridad
- Autenticación obligatoria para acceso al sistema.
- Autorización por rol y permisos.
- Protección de comunicaciones cuando exista red.
- Registro de eventos sensibles para trazabilidad.

## 3. Propuesta de control de acceso

### 3.1 Roles
- Administrador
- Veterinario
- Operador
- Lector

### 3.2 Permisos básicos
- Crear y editar programas
- Gestionar entidades
- Programar actividades
- Consultar reportes
- Administrar usuarios y roles

## 4. Medidas recomendadas
- Uso de hashes seguros para contraseñas.
- Tokens con expiración y renovación controlada.
- Validación estricta de entradas.
- Protección contra accesos no autorizados a endpoints.

## 5. Recomendación de cierre
Este documento debe acompañar la arquitectura general y actualizarse cada vez que cambien los requisitos de seguridad o los roles del sistema.
