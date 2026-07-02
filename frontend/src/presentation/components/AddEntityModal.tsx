import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  AddEntityInput,
  ENTITY_TYPES,
  ENTITY_TYPE_LABELS,
  EntityType,
} from '../../domain/types/entity.types';

interface Props {
  onClose: () => void;
  onAdd: (input: AddEntityInput) => Promise<boolean>;
}

const INITIAL: AddEntityInput = {
  entityType: 'DONANTE',
  name: '',
  externalReference: '',
};

export default function AddEntityModal({ onClose, onAdd }: Props) {
  const [form, setForm] = useState<AddEntityInput>(INITIAL);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    const input: AddEntityInput = {
      entityType: form.entityType,
      name: form.name.trim(),
      ...(form.externalReference?.trim() ? { externalReference: form.externalReference.trim() } : {}),
    };
    const ok = await onAdd(input);
    setIsSubmitting(false);
    if (ok) {
      onClose();
    }
  };

  const set = (field: keyof AddEntityInput, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Registrar entidad</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-5">
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
          )}

          {/* Tipo de entidad */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Tipo de entidad <span className="text-red-500">*</span>
            </label>
            <select
              value={form.entityType}
              onChange={(e) => set('entityType', e.target.value as EntityType)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            >
              {ENTITY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {ENTITY_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </div>

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Nombre / Identificador <span className="text-red-500">*</span>
            </label>
            <input
              ref={nameRef}
              type="text"
              placeholder="Ej: Vaca Estrella, Toro Alfa"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              maxLength={200}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Referencia externa */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Referencia externa{' '}
              <span className="text-xs font-normal text-slate-400">(arete, código interno)</span>
            </label>
            <input
              type="text"
              placeholder="Ej: ATG-001"
              value={form.externalReference}
              onChange={(e) => set('externalReference', e.target.value)}
              maxLength={100}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder-slate-300 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Botones */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Registrando…' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
