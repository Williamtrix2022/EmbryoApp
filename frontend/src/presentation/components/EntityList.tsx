import { useState } from 'react';
import {
  ENTITY_TYPES,
  ENTITY_TYPE_AVATAR,
  ENTITY_TYPE_BADGE,
  ENTITY_TYPE_INITIAL,
  ENTITY_TYPE_PLURAL,
  ENTITY_TYPE_TAB_ACTIVE,
  Entity,
  EntityType,
} from '../../domain/types/entity.types';

interface Props {
  entities: Entity[];
  canAdd: boolean;
  onAddEntity: () => void;
}

export default function EntityList({ entities, canAdd, onAddEntity }: Props) {
  const [activeType, setActiveType] = useState<EntityType | null>(null);

  const countByType = ENTITY_TYPES.reduce<Record<EntityType, number>>(
    (acc, t) => {
      acc[t] = entities.filter((e) => e.entityType === t).length;
      return acc;
    },
    { DONANTE: 0, RECEPTORA: 0, PACIENTE: 0, EMBRION: 0 },
  );

  const filtered = activeType ? entities.filter((e) => e.entityType === activeType) : entities;

  return (
    <section className="flex flex-col gap-4">
      {/* Tabs de tipo */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveType(null)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
            activeType === null
              ? 'border-slate-400 bg-slate-100 text-slate-800'
              : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
          }`}
        >
          Todos ({entities.length})
        </button>
        {ENTITY_TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
              activeType === t
                ? ENTITY_TYPE_TAB_ACTIVE[t]
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            {ENTITY_TYPE_PLURAL[t]} ({countByType[t]})
          </button>
        ))}

        {canAdd && (
          <button
            onClick={onAddEntity}
            className="ml-auto rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            + Agregar entidad
          </button>
        )}
      </div>

      {/* Lista de entidades */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white py-12 text-center">
          <p className="text-sm text-slate-400">
            {activeType
              ? `No hay ${ENTITY_TYPE_PLURAL[activeType].toLowerCase()} registradas`
              : 'No hay entidades registradas'}
          </p>
          {canAdd && (
            <button
              onClick={onAddEntity}
              className="mt-3 text-sm font-medium text-emerald-600 hover:underline"
            >
              Registrar primera entidad
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entity) => (
            <div
              key={entity.id}
              className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
            >
              {/* Avatar con inicial */}
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${ENTITY_TYPE_AVATAR[entity.entityType]}`}
              >
                {ENTITY_TYPE_INITIAL[entity.entityType]}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-1">
                  <p className="truncate text-sm font-semibold text-slate-900">{entity.name}</p>
                  <span
                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${ENTITY_TYPE_BADGE[entity.entityType]}`}
                  >
                    {entity.entityType === 'EMBRION' ? 'Embrión' : entity.entityType.charAt(0) + entity.entityType.slice(1).toLowerCase()}
                  </span>
                </div>
                {entity.externalReference && (
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    Ref: {entity.externalReference}
                  </p>
                )}
                <p
                  className={`mt-1 text-xs font-medium ${
                    entity.status === 'ACTIVA' ? 'text-emerald-600' : 'text-slate-400'
                  }`}
                >
                  {entity.status === 'ACTIVA' ? 'Activa' : 'Inactiva'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
