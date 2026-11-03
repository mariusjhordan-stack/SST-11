function FiltrosSolicitudes({ filtros, filtroActual, conteos, onSetFiltro }) {
  return (
    <nav aria-label="Cola de trabajo" className="mt-5 lg:mt-10">
      <p className="mb-2 px-1 text-[9px] font-semibold tracking-[0.14em] text-[#8FA39B] lg:px-2">
        COLA DE TRABAJO
      </p>
      <div
        aria-label="Filtrar solicitudes por estado"
        className="grid grid-cols-2 gap-1 pb-0.5 sm:grid-cols-4 lg:flex lg:flex-col"
        role="group"
      >
        {filtros.map((filtro) => {
          const seleccionado = filtroActual === filtro

          return (
            <button
              aria-pressed={seleccionado}
              className={`inline-flex min-h-9 min-w-0 items-center justify-between gap-2 rounded-md px-2.5 text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DB5A3] lg:w-full ${
                seleccionado
                  ? 'bg-[#23362F] font-medium text-white'
                  : 'text-[#C5D1CC] hover:bg-[#1E3029] hover:text-white'
              }`}
              key={filtro}
              onClick={() => onSetFiltro(filtro)}
              type="button"
            >
              <span className="inline-flex items-center gap-2">
                {seleccionado && (
                  <span className="size-1.5 rounded-full bg-[#2DB5A3]" />
                )}
                {!seleccionado && <span className="size-1.5" />}
                {filtro}
              </span>
              <span
                className={`font-mono text-[10px] tabular-nums ${
                  seleccionado ? 'text-[#C5D1CC]' : 'text-[#8FA39B]'
                }`}
              >
                {conteos[filtro]}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default FiltrosSolicitudes
