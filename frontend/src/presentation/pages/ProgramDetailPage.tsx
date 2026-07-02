import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEntities } from '../../application/hooks/use-entities';
import { Program, STATUS_BADGE, STATUS_LABELS } from '../../domain/types/program.types';
import AddEntityModal from '../components/AddEntityModal';
import EntityList from '../components/EntityList';

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const program = (location.state as { program?: Program } | null)?.program;

  const { entities, isLoading, error, getEntities, addEntity } = useEntities(id ?? '');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    if (id) {
      void getEntities();
    }
  }, [id, getEntities]);

  // Sin programa en el estado (acceso directo por URL)
  if (!program) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-sm text-slate-500">No se encontró información del programa.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    );
  }

  const canAdd = program.status === 'PLANIFICADO' || program.status === 'EN_CURSO';

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-sm text-slate-500 transition hover:text-slate-800"
          >
            ← Volver
          </button>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-900">Detalle del programa</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Tarjeta de información del programa */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-600">
                {program.code}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${STATUS_BADGE[program.status]}`}
              >
                {STATUS_LABELS[program.status]}
              </span>
            </div>
          </div>

          <h1 className="mt-3 text-xl font-bold text-slate-900">{program.name}</h1>

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>Inicio: {formatDate(program.startDate)}</span>
            {program.estimatedEndDate && (
              <span>Fin estimado: {formatDate(program.estimatedEndDate)}</span>
            )}
          </div>

          {program.notes && (
            <p className="mt-3 rounded-lg bg-slate-50 px-4 py-3 text-sm italic text-slate-600">
              {program.notes}
            </p>
          )}
        </div>

        {/* Sección de entidades */}
        <div className="rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
          <h2 className="mb-5 text-base font-semibold text-slate-800">Entidades del programa</h2>

          {isLoading && (
            <div className="py-12 text-center text-sm text-slate-400">Cargando entidades…</div>
          )}

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          {!isLoading && (
            <EntityList
              entities={entities}
              canAdd={canAdd}
              onAddEntity={() => setShowAddModal(true)}
            />
          )}
        </div>
      </main>

      {showAddModal && (
        <AddEntityModal onClose={() => setShowAddModal(false)} onAdd={addEntity} />
      )}
    </div>
  );
}
