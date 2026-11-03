import SolicitudItem from './SolicitudItem.jsx'

function ListaSolicitudes({
  solicitudes,
  filtroActual,
  onEliminarSolicitud,
  onCambiarEstado,
}) {
  if (solicitudes.length === 0) {
    return (
      <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
          <svg
            aria-hidden="true"
            className="size-6"
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
        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          {filtroActual === 'Todas'
            ? 'Aún no hay solicitudes'
            : `No hay solicitudes ${filtroActual.toLowerCase()}`}
        </h3>
        <p className="mx-auto mt-1.5 max-w-xs text-sm leading-5 text-slate-500">
          {filtroActual === 'Todas'
            ? 'Cuando registres un caso, aparecerá aquí para que puedas darle seguimiento.'
            : 'Prueba con otro filtro o registra una nueva solicitud.'}
        </p>
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-3">
      {/* Cada tarjeta recibe su solicitud y los callbacks que ListaSolicitudes heredó de App. */}
      {solicitudes.map((solicitud) => (
        <SolicitudItem
          key={solicitud.id}
          solicitud={solicitud}
          onEliminarSolicitud={onEliminarSolicitud}
          onCambiarEstado={onCambiarEstado}
        />
      ))}
    </div>
  )
}

export default ListaSolicitudes
