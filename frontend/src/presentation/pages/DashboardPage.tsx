import { useEffect, useState } from 'react';
import { useAuth } from '../../application/hooks/use-auth';
import { usePrograms } from '../../application/hooks/use-programs';
import { ProgramStatus, STATUS_LABELS } from '../../domain/types/program.types';
import CreateProgramModal from '../components/CreateProgramModal';
import ProgramCard from '../components/ProgramCard';

const ROLE_LABELS: Record<string, string> = {
  ADMINISTRADOR: 'Administrador',
  VETERINARIO: 'Veterinario',
  OPERADOR: 'Operador',
  LECTOR: 'Lector',
};

const STATUS_FILTERS: Array<{ label: string; value: ProgramStatus | undefined }> = [
  { label: 'Todos', value: undefined },
  { label: STATUS_LABELS.PLANIFICADO, value: 'PLANIFICADO' },
  { label: STATUS_LABELS.EN_CURSO, value: 'EN_CURSO' },
  { label: STATUS_LABELS.PAUSADO, value: 'PAUSADO' },
  { label: STATUS_LABELS.COMPLETADO, value: 'COMPLETADO' },
  { label: STATUS_LABELS.CANCELADO, value: 'CANCELADO' },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { programs, isLoading, error, getPrograms, createProgram, updateStatus, clearError } =
    usePrograms();

  const [activeFilter, setActiveFilter] = useState<ProgramStatus | undefined>(undefined);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    void getPrograms();
  }, [getPrograms]);

  const handleFilterChange = (status: ProgramStatus | undefined) => {
    setActiveFilter(status);
    void getPrograms(status);
  };

  const visiblePrograms =
    activeFilter === undefined
      ? programs
      : programs.filter((p) => p.status === activeFilter);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <span className="text-sm font-bold text-white">E</span>
            </div>
            <span className="font-semibold text-slate-900">EmbryoApp</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900">{user?.fullName}</p>
              <p className="text-xs text-slate-500">
                {user ? (ROLE_LABELS[user.role] ?? user.role) : ''}
              </p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-red-300 hover:text-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {/* Título y botón de crear */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Programas reproductivos</h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {programs.length} {programs.length === 1 ? 'programa' : 'programas'} registrados
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <span>+</span> Nuevo programa
          </button>
        </div>

        {/* Banner de error */}
        {error && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            <span>{error}</span>
            <button onClick={clearError} className="ml-4 font-medium hover:underline">
              Cerrar
            </button>
          </div>
        )}

        {/* Filtros por estado */}
        <div className="mt-6 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => handleFilterChange(f.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                activeFilter === f.value
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Contenido */}
        {isLoading ? (
          <div className="mt-12 text-center text-sm text-slate-400">Cargando programas...</div>
        ) : visiblePrograms.length === 0 ? (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="font-medium text-slate-700">
              {activeFilter
                ? `No hay programas con estado "${STATUS_LABELS[activeFilter]}"`
                : 'Aún no hay programas registrados'}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {!activeFilter && 'Haz clic en "Nuevo programa" para comenzar'}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onStatusChange={(id, status) => void updateStatus(id, status)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal de creación */}
      {showCreateModal && (
        <CreateProgramModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={createProgram}
        />
      )}
    </div>
  );
}
