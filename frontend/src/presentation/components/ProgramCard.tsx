import { useNavigate } from 'react-router-dom';
import {
  Program,
  ProgramStatus,
  STATUS_BADGE,
  STATUS_LABELS,
  STATUS_TRANSITION_BUTTON,
  STATUS_TRANSITIONS,
} from '../../domain/types/program.types';

interface Props {
  program: Program;
  onStatusChange: (id: string, status: ProgramStatus) => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ProgramCard({ program, onStatusChange }: Props) {
  const navigate = useNavigate();
  const nextStatuses = STATUS_TRANSITIONS[program.status];

  return (
    <article className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      {/* Encabezado: código + estado */}
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-mono font-semibold text-slate-600">
          {program.code}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_BADGE[program.status]}`}
        >
          {STATUS_LABELS[program.status]}
        </span>
      </div>

      {/* Nombre del programa */}
      <div>
        <h3 className="font-semibold text-slate-900 leading-tight">{program.name}</h3>
        <p className="mt-1 text-xs text-slate-400">
          Inicio: {formatDate(program.startDate)}
          {program.estimatedEndDate && (
            <> &nbsp;·&nbsp; Fin estimado: {formatDate(program.estimatedEndDate)}</>
          )}
        </p>
      </div>

      {/* Notas (si existen) */}
      {program.notes && (
        <p className="text-sm text-slate-500 line-clamp-2">{program.notes}</p>
      )}

      {/* Acciones */}
      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
        {/* Botones de transición de estado */}
        {nextStatuses.map((next) => (
          <button
            key={next}
            onClick={() => onStatusChange(program.id, next)}
            className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition ${STATUS_TRANSITION_BUTTON[next]}`}
          >
            → {STATUS_LABELS[next]}
          </button>
        ))}

        {/* Spacer */}
        <div className="ml-auto">
          <button
            onClick={() => navigate(`/programs/${program.id}`, { state: { program } })}
            className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </article>
  );
}
