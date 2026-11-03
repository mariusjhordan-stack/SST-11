import { useMemo, useState } from 'react'
import FiltrosSolicitudes from './components/FiltrosSolicitudes.jsx'
import ListaSolicitudes from './components/ListaSolicitudes.jsx'
import SolicitudForm from './components/SolicitudForm.jsx'

const filtros = ['Todas', 'Pendientes', 'En proceso', 'Resueltas']

const solicitudesIniciales = [
  {
    id: 'SOL-1048',
    titulo: 'No puedo conectarme a la red Wi-Fi',
    descripcion:
      'La computadora se desconecta de la red de la oficina cada pocos minutos. Ya reinicié el equipo y sigue ocurriendo.',
    solicitante: 'María González',
    prioridad: 'alta',
    estado: 'pendiente',
    fecha: '2026-10-28T14:35:00.000Z',
  },
  {
    id: 'SOL-1047',
    titulo: 'Instalación de herramientas de diseño',
    descripcion:
      'Necesito actualizar el software de diseño para poder abrir los archivos del nuevo proyecto.',
    solicitante: 'Andrés Rojas',
    prioridad: 'media',
    estado: 'en proceso',
    fecha: '2026-10-27T16:10:00.000Z',
  },
  {
    id: 'SOL-1046',
    titulo: 'Restablecimiento de contraseña',
    descripcion:
      'No podía ingresar al portal interno. El acceso quedó restablecido y ya puedo iniciar sesión.',
    solicitante: 'Camila Torres',
    prioridad: 'baja',
    estado: 'resuelta',
    fecha: '2026-10-25T11:20:00.000Z',
  },
]

const obtenerEstado = (filtro) => {
  const estadosPorFiltro = {
    Pendientes: 'pendiente',
    'En proceso': 'en proceso',
    Resueltas: 'resuelta',
  }

  return estadosPorFiltro[filtro]
}

function App() {
  const [solicitudes, setSolicitudes] = useState(solicitudesIniciales)
  const [filtroActual, setFiltroActual] = useState('Todas')

  const solicitudesFiltradas = useMemo(() => {
    const estado = obtenerEstado(filtroActual)
    return estado
      ? solicitudes.filter((solicitud) => solicitud.estado === estado)
      : solicitudes
  }, [filtroActual, solicitudes])

  const conteos = useMemo(
    () => ({
      Todas: solicitudes.length,
      Pendientes: solicitudes.filter(
        (solicitud) => solicitud.estado === 'pendiente',
      ).length,
      'En proceso': solicitudes.filter(
        (solicitud) => solicitud.estado === 'en proceso',
      ).length,
      Resueltas: solicitudes.filter(
        (solicitud) => solicitud.estado === 'resuelta',
      ).length,
    }),
    [solicitudes],
  )

  const agregarSolicitud = (datosSolicitud) => {
    const nuevaSolicitud = {
      ...datosSolicitud,
      id: `SOL-${crypto.randomUUID()}`,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
    }

    setSolicitudes((solicitudesActuales) => [
      nuevaSolicitud,
      ...solicitudesActuales,
    ])
    setFiltroActual('Todas')
  }

  const eliminarSolicitud = (id) => {
    setSolicitudes((solicitudesActuales) =>
      solicitudesActuales.filter((solicitud) => solicitud.id !== id),
    )
  }

  const cambiarEstado = (id, nuevoEstado) => {
    setSolicitudes((solicitudesActuales) =>
      solicitudesActuales.map((solicitud) =>
        solicitud.id === id
          ? { ...solicitud, estado: nuevoEstado }
          : solicitud,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            aria-label="Mesa Clara, inicio"
            className="flex items-center gap-3"
            href="#inicio"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm shadow-emerald-900/15">
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 13.5V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7.5M4 13.5h3l2 3h6l2-3h3M4 13.5v4.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4.5M9 8h6"
                />
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold tracking-tight text-slate-900">
                Mesa Clara
              </span>
              <span className="block text-xs text-slate-500">
                Soporte técnico
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-800">
              Centro de ayuda activo
            </span>
          </div>
        </div>
      </header>

      <main
        className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8"
        id="inicio"
      >
        <section className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Mesa de servicio
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Solicitudes de soporte
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Registra un problema y sigue su atención en un solo lugar.
            </p>
          </div>

          <div
            aria-label={`${conteos.Todas} solicitudes en total`}
            className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-900/[0.025]"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
                />
              </svg>
            </span>
            <span>
              <span className="block text-xl font-bold leading-5 tabular-nums text-slate-900">
                {conteos.Todas}
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                {conteos.Todas === 1 ? 'solicitud registrada' : 'solicitudes registradas'}
              </span>
            </span>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <section aria-labelledby="lista-titulo" className="min-w-0">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  className="text-lg font-semibold tracking-tight text-slate-900"
                  id="lista-titulo"
                >
                  Seguimiento de casos
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Consulta y actualiza el estado de cada solicitud.
                </p>
              </div>
              <FiltrosSolicitudes
                filtros={filtros}
                filtroActual={filtroActual}
                conteos={conteos}
                onSetFiltro={setFiltroActual}
              />
            </div>

            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              filtroActual={filtroActual}
              onEliminarSolicitud={eliminarSolicitud}
              onCambiarEstado={cambiarEstado}
            />
          </section>

          <aside className="lg:sticky lg:top-6">
            <SolicitudForm onAgregarSolicitud={agregarSolicitud} />
            <div className="mt-4 flex gap-3 rounded-2xl border border-sky-100 bg-sky-50/80 p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-sky-700 shadow-sm">
                <svg
                  aria-hidden="true"
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16v-4m0-4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </span>
              <p className="text-xs leading-5 text-sky-900/80">
                <span className="font-semibold text-sky-950">
                  ¿Necesitas ayuda urgente?
                </span>{' '}
                Selecciona prioridad alta para que el equipo pueda identificar
                rápidamente los casos críticos.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default App
