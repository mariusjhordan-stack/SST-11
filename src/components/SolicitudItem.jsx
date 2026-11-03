const prioridadEstilos = {
  baja: 'bg-slate-100 text-slate-600 ring-slate-200',
  media: 'bg-amber-50 text-amber-800 ring-amber-200',
  alta: 'bg-rose-50 text-rose-700 ring-rose-200',
}

const estadoEstilos = {
  pendiente: 'bg-amber-50 text-amber-800',
  'en proceso': 'bg-sky-50 text-sky-800',
  resuelta: 'bg-emerald-50 text-emerald-800',
}

const estados = ['pendiente', 'en proceso', 'resuelta']

const formatearFecha = (fecha) =>
  new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(fecha))

function SolicitudItem({ solicitud, onEliminarSolicitud, onCambiarEstado }) {
  const etiquetaEstado =
    solicitud.estado === 'en proceso'
      ? 'En proceso'
      : solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/[0.025] transition hover:border-slate-300 hover:shadow-md hover:shadow-slate-900/[0.05] sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2.5 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ring-1 ring-inset ${prioridadEstilos[solicitud.prioridad]}`}
            >
              Prioridad {solicitud.prioridad}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${estadoEstilos[solicitud.estado]}`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  solicitud.estado === 'resuelta'
                    ? 'bg-emerald-500'
                    : solicitud.estado === 'en proceso'
                      ? 'bg-sky-500'
                      : 'bg-amber-500'
                }`}
              />
              {etiquetaEstado}
            </span>
          </div>
          <h3 className="break-words text-sm font-semibold leading-5 text-slate-900 sm:text-base">
            {solicitud.titulo}
          </h3>
          <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-5 text-slate-600">
            {solicitud.descripcion}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
              <svg
                aria-hidden="true"
                className="size-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.1a8.8 8.8 0 0 0 4.5-1.4 6 6 0 0 0-9.2-5.1M15 19.1v.1c0 .4 0 .8-.1 1.2A12 12 0 0 1 12 21c-3.3 0-6.3-1.3-8.5-3.4v-.2a6 6 0 0 1 11.4-2.7M15 19.1c0-1.6-.4-3.1-1.1-4.4M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              {solicitud.solicitante}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <time dateTime={solicitud.fecha}>{formatearFecha(solicitud.fecha)}</time>
            <span className="text-slate-300">·</span>
            <span className="font-mono text-[11px]">{solicitud.id}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
          <label className="sr-only" htmlFor={`estado-${solicitud.id}`}>
            Cambiar estado de {solicitud.titulo}
          </label>
          {/* El cambio de estado sube id y valor nuevos a App usando el callback por props. */}
          <select
            className="min-w-36 cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 outline-none transition hover:border-slate-300 focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-600/10"
            id={`estado-${solicitud.id}`}
            onChange={(evento) =>
              onCambiarEstado(solicitud.id, evento.target.value)
            }
            value={solicitud.estado}
          >
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado === 'en proceso'
                  ? 'En proceso'
                  : estado.charAt(0).toUpperCase() + estado.slice(1)}
              </option>
            ))}
          </select>
          {/* La tarjeta pide al padre que elimine por id, sin gestionar la lista por su cuenta. */}
          <button
            aria-label={`Eliminar solicitud ${solicitud.titulo}`}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-transparent text-slate-400 transition hover:border-rose-100 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/15"
            onClick={() => onEliminarSolicitud(solicitud.id)}
            title="Eliminar solicitud"
            type="button"
          >
            <svg
              aria-hidden="true"
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16m-10 4v6m4-6v6M5 7l1 13h12l1-13M9 7V4h6v3"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default SolicitudItem
