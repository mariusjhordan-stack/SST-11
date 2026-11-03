import SolicitudItem from './SolicitudItem.jsx'

function ListaSolicitudes({
  solicitudes,
  filtroActual,
  onEliminarSolicitud,
  onCambiarEstado,
  totalSolicitudes = solicitudes.length,
}) {
  return (
    <section
      aria-label="Lista de solicitudes"
      className="min-w-0 overflow-hidden rounded-md border border-[var(--border)] bg-white"
    >
      <div className="flex flex-col gap-3 border-b border-[#E8E5DD] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <div>
          <h2 className="text-xs font-semibold text-[#28332F]">
            {filtroActual === 'Todas' ? 'Todas las solicitudes' : filtroActual}
          </h2>
          <p className="mt-0.5 text-[10px] text-[#7B8581]">
            Revisa el detalle y actualiza cada caso.
          </p>
        </div>
        <label className="relative block w-full sm:max-w-[220px]">
          <span className="sr-only">Buscar solicitud</span>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#8A948F]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="m16 16 4 4" />
          </svg>
          <input
            className="h-8 w-full rounded-md border border-[#E3E0D8] bg-white pl-8 pr-2.5 text-[10px] text-[#1C2623] outline-none placeholder:text-[#9AA39F] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10"
            placeholder="Buscar solicitud..."
            type="search"
          />
        </label>
      </div>

      <div
        className="hidden grid-cols-[84px_minmax(0,1fr)_88px_108px_36px] items-center gap-3 border-b border-[#E8E5DD] bg-[#F8F7F3] px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#7B8581] md:grid"
        role="row"
      >
        <span role="columnheader">ID</span>
        <span role="columnheader">Asunto</span>
        <span role="columnheader">Prioridad</span>
        <span role="columnheader">Estado</span>
        <span className="sr-only" role="columnheader">
          Acción
        </span>
      </div>

      {solicitudes.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-[#F1F1EC] text-[#7B8581]">
            <svg
              aria-hidden="true"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7h8M8 11h5m-8 9 2.5-3H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14Z"
              />
            </svg>
          </span>
          <h3 className="mt-3 text-xs font-semibold text-[#29332F]">
            {filtroActual === 'Todas'
              ? 'Aún no hay solicitudes'
              : `No hay solicitudes ${filtroActual.toLowerCase()}`}
          </h3>
          <p className="mx-auto mt-1 max-w-xs text-[10px] leading-4 text-[#7B8581]">
            {filtroActual === 'Todas'
              ? 'Las solicitudes registradas aparecerán aquí.'
              : 'Prueba con otro filtro o registra una nueva solicitud.'}
          </p>
        </div>
      ) : (
        <div role="table" aria-label="Solicitudes registradas">
          {solicitudes.map((solicitud) => (
            <SolicitudItem
              key={solicitud.id}
              solicitud={solicitud}
              onEliminarSolicitud={onEliminarSolicitud}
              onCambiarEstado={onCambiarEstado}
            />
          ))}
        </div>
      )}

      <footer className="flex items-center justify-between border-t border-[#E8E5DD] bg-[#FBFAF7] px-3.5 py-2.5 text-[9px] text-[#7B8581] sm:px-4">
        <span>
          Mostrando{' '}
          <span className="font-mono font-medium tabular-nums text-[#46534D]">
            {solicitudes.length}
          </span>{' '}
          de{' '}
          <span className="font-mono font-medium tabular-nums text-[#46534D]">
            {totalSolicitudes}
          </span>{' '}
          solicitudes
        </span>
        <span className="font-mono tabular-nums">
          {solicitudes.length === 0 ? '—' : `01–${String(solicitudes.length).padStart(2, '0')}`}
        </span>
      </footer>
    </section>
  )
}

export default ListaSolicitudes
