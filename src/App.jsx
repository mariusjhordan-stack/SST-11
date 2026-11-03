import { useMemo, useState } from 'react'
import FiltrosSolicitudes from './components/FiltrosSolicitudes.jsx'
import ListaSolicitudes from './components/ListaSolicitudes.jsx'
import ResumenGraficos from './components/ResumenGraficos.jsx'
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

const calendario = (() => {
  const hoy = new Date()
  const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 6)

  return {
    hoy,
    semana: Array.from({ length: 7 }, (_, indice) => {
      const fecha = new Date(inicio)
      fecha.setDate(inicio.getDate() + indice)

      return {
        fecha,
        etiqueta: new Intl.DateTimeFormat('es', { weekday: 'short' })
          .format(fecha)
          .replace('.', ''),
        esHoy: indice === 6,
      }
    }),
  }
})()

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

  const resumenGraficos = useMemo(() => {
    return {
      estados: [
        { nombre: 'Pendiente', valor: conteos.Pendientes, color: '#C8321E' },
        { nombre: 'En proceso', valor: conteos['En proceso'], color: '#397FAE' },
        { nombre: 'Resuelta', valor: conteos.Resueltas, color: '#2F8A52' },
      ],
      prioridades: [
        {
          nombre: 'Alta',
          valor: solicitudes.filter((solicitud) => solicitud.prioridad === 'alta')
            .length,
          color: '#C8321E',
        },
        {
          nombre: 'Media',
          valor: solicitudes.filter((solicitud) => solicitud.prioridad === 'media')
            .length,
          color: '#D98A0B',
        },
        {
          nombre: 'Baja',
          valor: solicitudes.filter((solicitud) => solicitud.prioridad === 'baja')
            .length,
          color: '#8A948F',
        },
      ],
      ultimosSieteDias: calendario.semana.map((dia) => ({
          etiqueta: dia.etiqueta,
          valor: solicitudes.filter((solicitud) => {
            const fechaSolicitud = new Date(solicitud.fecha)
            return (
              fechaSolicitud.getFullYear() === dia.fecha.getFullYear() &&
              fechaSolicitud.getMonth() === dia.fecha.getMonth() &&
              fechaSolicitud.getDate() === dia.fecha.getDate()
            )
          }).length,
          esHoy: dia.esHoy,
        })),
    }
  }, [conteos, solicitudes])

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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] lg:grid lg:grid-cols-[224px_minmax(0,1fr)]">
      <aside className="border-b border-[#31443D] bg-[var(--sidebar)] px-4 py-4 text-[#C5D1CC] lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-b-0 lg:px-3.5 lg:py-6">
        <a
          aria-label="Mesa Clara, inicio"
          className="flex w-fit items-center gap-2.5"
          href="#inicio"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-[#2DB5A3] text-[#12231E]">
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
            <span className="block text-sm font-semibold tracking-tight text-white">
              Mesa Clara
            </span>
            <span className="block text-[11px] text-[#8FA39B]">
              Andina · TI
            </span>
          </span>
        </a>

        <FiltrosSolicitudes
          filtros={filtros}
          filtroActual={filtroActual}
          conteos={conteos}
          onSetFiltro={setFiltroActual}
        />

        <div className="mt-6 hidden border-t border-[#31443D] pt-4 lg:mt-auto lg:block">
          <div className="flex items-center gap-2.5 px-1">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#31443D] text-[11px] font-semibold text-[#D8E3DE]">
              MS
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-[#E3EAE7]">
                Mesa de servicio
              </span>
              <span className="block text-[10px] text-[#8FA39B]">
                Área de TI
              </span>
            </span>
          </div>
        </div>
      </aside>

      <main
        className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 xl:px-9"
        id="inicio"
      >
        <div className="mx-auto max-w-[1500px]">
          <header className="mb-6 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#0F766E]">
                Andina Logística / Tecnología
              </p>
              <h1 className="text-[25px] font-semibold tracking-[-0.035em] text-[#1C2623] sm:text-[28px]">
                Solicitudes de soporte
              </h1>
              <p className="mt-1.5 text-xs text-[#6A7571]">
                {new Intl.DateTimeFormat('es', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format(calendario.hoy)}
              </p>
            </div>
            <a
              className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md bg-[#0F766E] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#0B625B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 sm:self-auto"
              href="#nueva-solicitud"
            >
              <svg
                aria-hidden="true"
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m7-7H5"
                />
              </svg>
              Nueva solicitud
            </a>
          </header>

          <ResumenGraficos resumen={resumenGraficos} />

          <div className="mt-5 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
            <ListaSolicitudes
              solicitudes={solicitudesFiltradas}
              filtroActual={filtroActual}
              onEliminarSolicitud={eliminarSolicitud}
              onCambiarEstado={cambiarEstado}
              totalSolicitudes={solicitudes.length}
            />
            <aside className="xl:sticky xl:top-5" id="nueva-solicitud">
              <SolicitudForm onAgregarSolicitud={agregarSolicitud} />
              <div className="mt-3 flex gap-2.5 rounded-md border border-[#DCE5E1] bg-[#EAF1EE] p-3.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-white text-[#0F766E]">
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
                <p className="text-[11px] leading-[1.55] text-[#52655D]">
                  <span className="font-semibold text-[#263B33]">
                    Atención prioritaria
                  </span>
                  <br />
                  Marca prioridad alta para que el equipo identifique los casos
                  críticos.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
