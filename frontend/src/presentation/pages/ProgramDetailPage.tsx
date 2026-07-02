import { useNavigate, useParams } from 'react-router-dom';

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800"
          >
            ← Volver
          </button>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-900">Detalle del programa</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12 text-center">
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white px-6 py-16">
          <p className="font-mono text-xs text-slate-400 mb-4">ID: {id}</p>
          <h2 className="text-lg font-semibold text-slate-800">Detalle del programa</h2>
          <p className="mt-2 text-sm text-slate-500">
            Entidades clínicas y actividades estarán disponibles en la Semana 3 del sprint.
          </p>
        </div>
      </main>
    </div>
  );
}
