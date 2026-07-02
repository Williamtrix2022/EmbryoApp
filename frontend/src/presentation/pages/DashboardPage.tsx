import { useAuth } from '../../application/hooks/use-auth';

const ROLE_LABELS: Record<string, string> = {
  ADMINISTRADOR: 'Administrador',
  VETERINARIO: 'Veterinario',
  OPERADOR: 'Operador',
  LECTOR: 'Lector',
};

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();

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
              <p className="text-xs text-slate-500">{user ? (ROLE_LABELS[user.role] ?? user.role) : ''}</p>
            </div>
            <button
              onClick={logout}
              disabled={isLoading}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-xl font-semibold text-slate-900">Programas reproductivos</h1>
        <p className="mt-1 text-sm text-slate-500">
          Sprint 2 — La gestión de programas estará disponible en la próxima iteración.
        </p>

        {/* Placeholder visual */}
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="font-medium text-slate-700">Aún no hay programas registrados</p>
          <p className="mt-1 text-sm text-slate-400">Podrás crearlos al completar el Sprint 2</p>
        </div>
      </main>
    </div>
  );
}
