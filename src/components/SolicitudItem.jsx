const prioridadEstilos = {
  baja: { color: '#8A948F', etiqueta: 'Baja' },
  media: { color: '#D98A0B', etiqueta: 'Media' },
  alta: { color: '#C8321E', etiqueta: 'Alta' },
}

const estadoEstilos = {
  pendiente: 'bg-[#FDE8E6] text-[#912018]',
  'en proceso': 'bg-[#DCEBF7] text-[#175C8F]',
  resuelta: 'bg-[#DDF2E4] text-[#176B3A]',
}

const estados = ['pendiente', 'en proceso', 'resuelta']

const formatearTiempoRelativo = (fecha) => {
  const segundos = (new Date(fecha).getTime() - Date.now()) / 1000

  if (Math.abs(segundos) < 60) return 'ahora'

  const unidades = [
    { unidad: 'year', segundos: 31536000 },
    { unidad: 'month', segundos: 2592000 },
    { unidad: 'week', segundos: 604800 },
    { unidad: 'day', segundos: 86400 },
    { unidad: 'hour', segundos: 3600 },
    { unidad: 'minute', segundos: 60 },
  ]
  const { unidad, segundos: segundosPorUnidad } =
    unidades.find((item) => Math.abs(segundos) >= item.segundos) ??
    unidades[unidades.length - 1]

  return new Intl.RelativeTimeFormat('es', { numeric: 'auto' }).format(
    Math.round(segundos / segundosPorUnidad),
    unidad,
  )
}

function SolicitudItem({ solicitud, onEliminarSolicitud, onCambiarEstado }) {
  const etiquetaEstado =
    solicitud.estado === 'en proceso'
      ? 'En proceso'
      : solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)
  const prioridad = prioridadEstilos[solicitud.prioridad]
  const iniciales = solicitud.solicitante
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((parte) => parte.charAt(0))
    .join('')
    .toUpperCase()
  const esPrioridadAbierta =
    solicitud.prioridad === 'alta' && solicitud.estado !== 'resuelta'

  return (
    <article
      className={`request-row relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-[#EEECE6] px-3 py-3 transition-colors last:border-b-0 hover:bg-[#F9F8F5] sm:px-4 md:grid-cols-[84px_minmax(0,1fr)_88px_108px_36px] md:gap-3 md:py-3 ${
        solicitud.estado === 'resuelta' ? 'bg-[#FBFAF7]' : 'bg-white'
      } ${esPrioridadAbierta ? 'before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-[#C8321E]' : ''}`}
      role="row"
    >
      <div
        className={`order-1 min-w-0 font-mono text-[10px] tabular-nums md:order-none ${
          solicitud.estado === 'resuelta' ? 'text-[#8A948F]' : 'text-[#56635D]'
        }`}
        role="cell"
      >
        {solicitud.id}
      </div>

      <div className="order-3 col-span-2 min-w-0 md:order-none md:col-span-1" role="cell">
        <h3
          className={`truncate text-[11px] font-semibold leading-4 ${
            solicitud.estado === 'resuelta'
              ? 'text-[#6A7571]'
              : 'text-[#1C2623]'
          }`}
          title={solicitud.titulo}
        >
          {solicitud.titulo}
        </h3>
        <div className="mt-1 flex min-w-0 items-center gap-1.5">
          <span
            aria-hidden="true"
            className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#E8EEEA] text-[8px] font-semibold text-[#466157]"
          >
            {iniciales}
          </span>
          <span
            className={`truncate text-[9px] ${
              solicitud.estado === 'resuelta'
                ? 'text-[#8A948F]'
                : 'text-[#59645F]'
            }`}
          >
            {solicitud.solicitante}
          </span>
          <span aria-hidden="true" className="text-[9px] text-[#B0B5B1]">
            ·
          </span>
          <time
            className="shrink-0 text-[9px] text-[#8A948F]"
            dateTime={solicitud.fecha}
          >
            {formatearTiempoRelativo(solicitud.fecha)}
          </time>
        </div>
      </div>

      <div
        className="order-2 inline-flex items-center gap-1.5 md:order-none"
        role="cell"
      >
        <span
          className="size-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: prioridad.color }}
        />
        <span
          className={`text-[10px] font-medium ${
            solicitud.estado === 'resuelta'
              ? 'text-[#8A948F]'
              : 'text-[#4E5954]'
          }`}
        >
          {prioridad.etiqueta}
        </span>
      </div>

      <div className="order-4 min-w-0 md:order-none" role="cell">
        <label className="sr-only" htmlFor={`estado-${solicitud.id}`}>
          Cambiar estado de {solicitud.titulo}
        </label>
        <span className="relative inline-flex max-w-full items-center">
          <select
            className={`h-6 max-w-full appearance-none rounded-full border-0 py-0 pl-2.5 pr-6 text-[9px] font-medium outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-[#0F766E]/30 ${estadoEstilos[solicitud.estado]}`}
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
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-1.5 size-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m7 10 5 5 5-5"
            />
          </svg>
        </span>
        <span className="sr-only">{etiquetaEstado}</span>
      </div>

      <div className="order-5 flex justify-end md:order-none" role="cell">
        <button
          aria-label={`Eliminar solicitud ${solicitud.titulo}`}
          className="inline-flex size-7 items-center justify-center rounded-md text-[#8A948F] transition-colors hover:bg-[#FDE8E6] hover:text-[#912018] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8321E]/30"
          onClick={() => onEliminarSolicitud(solicitud.id)}
          title="Eliminar solicitud"
          type="button"
        >
          <svg
            aria-hidden="true"
            className="size-3.5"
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
    </article>
  )
}

export default SolicitudItem
