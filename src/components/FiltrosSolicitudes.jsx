function FiltrosSolicitudes({ filtros, filtroActual, conteos, onSetFiltro }) {
  return (
    <div
      aria-label="Filtrar solicitudes por estado"
      className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-100/80 p-1"
      role="group"
    >
      {filtros.map((filtro) => {
        const seleccionado = filtroActual === filtro

        return (
          <button
            aria-pressed={seleccionado}
            className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/15 sm:px-3.5 ${
              seleccionado
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                : 'text-slate-500 hover:bg-white/70 hover:text-slate-800'
            }`}
            key={filtro}
            onClick={() => onSetFiltro(filtro)}
            type="button"
          >
            {/* La selección vuelve a App, donde cambia el filtro y se calcula la lista visible. */}
            {filtro}
            <span
              className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${
                seleccionado
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'bg-slate-200/70 text-slate-500'
              }`}
            >
              {conteos[filtro]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default FiltrosSolicitudes
