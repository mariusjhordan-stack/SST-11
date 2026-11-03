function ResumenGraficos({ resumen }) {
  const totalEstados = resumen.estados.reduce(
    (total, estado) => total + estado.valor,
    0,
  )
  const totalSemana = resumen.ultimosSieteDias.reduce(
    (total, dia) => total + dia.valor,
    0,
  )
  const maxPrioridad = Math.max(
    1,
    ...resumen.prioridades.map((prioridad) => prioridad.valor),
  )
  const maxDia = Math.max(
    1,
    ...resumen.ultimosSieteDias.map((dia) => dia.valor),
  )
  const circunferencia = 2 * Math.PI * 31

  const segmentos = resumen.estados.map((estado, indice) => {
    const longitud =
      totalEstados === 0 ? 0 : (estado.valor / totalEstados) * circunferencia
    const valorAnterior = resumen.estados
      .slice(0, indice)
      .reduce((total, anterior) => total + anterior.valor, 0)
    const desplazamiento =
      totalEstados === 0 ? 0 : (valorAnterior / totalEstados) * circunferencia

    return { ...estado, longitud, desplazamiento }
  })

  return (
    <section
      aria-label="Resumen de solicitudes"
      className="grid gap-3 md:grid-cols-3"
    >
      <article className="rounded-md border border-[var(--border)] bg-white p-4">
        <div className="mb-3">
          <h2 className="text-xs font-semibold text-[#28332F]">Por estado</h2>
          <p className="mt-0.5 text-[10px] text-[#7B8581]">
            Distribución de solicitudes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative size-[86px] shrink-0">
            <svg
              aria-label={`${totalEstados} solicitudes`}
              className="size-full -rotate-90"
              role="img"
              viewBox="0 0 80 80"
            >
              <circle
                cx="40"
                cy="40"
                r="31"
                fill="none"
                stroke="#EEECE6"
                strokeWidth="10"
              />
              {segmentos.map((segmento) => (
                <circle
                  key={segmento.nombre}
                  cx="40"
                  cy="40"
                  r="31"
                  fill="none"
                  stroke={segmento.color}
                  strokeDasharray={`${segmento.longitud} ${circunferencia}`}
                  strokeDashoffset={-segmento.desplazamiento}
                  strokeWidth="10"
                />
              ))}
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold tabular-nums text-[#1C2623]">
              {totalEstados}
            </span>
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            {resumen.estados.map((estado) => (
              <div
                className="flex items-center justify-between gap-2 text-[10px]"
                key={estado.nombre}
              >
                <span className="inline-flex items-center gap-1.5 text-[#59645F]">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: estado.color }}
                  />
                  {estado.nombre}
                </span>
                <span className="font-mono font-medium tabular-nums text-[#29332F]">
                  {estado.valor}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-md border border-[var(--border)] bg-white p-4">
        <div className="mb-3">
          <h2 className="text-xs font-semibold text-[#28332F]">Por prioridad</h2>
          <p className="mt-0.5 text-[10px] text-[#7B8581]">
            Solicitudes según nivel de atención
          </p>
        </div>
        <div className="space-y-3.5 pt-1">
          {resumen.prioridades.map((prioridad) => (
            <div className="grid grid-cols-[44px_minmax(0,1fr)_22px] items-center gap-2" key={prioridad.nombre}>
              <span className="text-[10px] text-[#59645F]">
                {prioridad.nombre}
              </span>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#F0EEE9]">
                <div
                  className="h-full rounded-full transition-[width] duration-200"
                  style={{
                    width: `${(prioridad.valor / maxPrioridad) * 100}%`,
                    backgroundColor: prioridad.color,
                  }}
                />
              </div>
              <span className="text-right font-mono text-[10px] font-medium tabular-nums text-[#29332F]">
                {prioridad.valor}
              </span>
            </div>
          ))}
        </div>
      </article>

      <article className="rounded-md border border-[var(--border)] bg-white p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div>
            <h2 className="text-xs font-semibold text-[#28332F]">
              Recibidas en los últimos 7 días
            </h2>
            <p className="mt-0.5 text-[10px] text-[#7B8581]">
              Ingresos diarios
            </p>
          </div>
          <span className="font-mono text-sm font-semibold tabular-nums text-[#1C2623]">
            {totalSemana}
          </span>
        </div>
        <div className="flex h-[76px] items-end justify-between gap-2 border-b border-[#EEECE6] px-1">
          {resumen.ultimosSieteDias.map((dia) => (
            <div
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
              key={dia.etiqueta}
              title={`${dia.etiqueta}: ${dia.valor} solicitudes`}
            >
              <span className="font-mono text-[9px] tabular-nums text-[#7B8581]">
                {dia.valor || ''}
              </span>
              <span
                className={`w-full max-w-5 rounded-t-sm transition-[height] duration-200 ${
                  dia.esHoy ? 'bg-[#0F766E]' : 'bg-[#B9C9C2]'
                }`}
                style={{
                  height: `${dia.valor === 0 ? 3 : Math.max((dia.valor / maxDia) * 43, 7)}px`,
                }}
              />
              <span
                className={`pb-1 text-[9px] capitalize ${
                  dia.esHoy ? 'font-semibold text-[#0F766E]' : 'text-[#7B8581]'
                }`}
              >
                {dia.etiqueta}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default ResumenGraficos
