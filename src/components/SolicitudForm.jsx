import { useState } from 'react'

const camposIniciales = {
  titulo: '',
  descripcion: '',
  solicitante: '',
  prioridad: 'media',
}

function SolicitudForm({ onAgregarSolicitud }) {
  const [campos, setCampos] = useState(camposIniciales)
  const [errores, setErrores] = useState({})

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target
    setCampos((camposActuales) => ({ ...camposActuales, [name]: value }))
    setErrores((erroresActuales) => ({ ...erroresActuales, [name]: '' }))
  }

  const enviarSolicitud = (evento) => {
    evento.preventDefault()

    const formulario = evento.currentTarget
    const camposVacios = Object.fromEntries(
      ['titulo', 'descripcion', 'solicitante']
        .filter((nombre) => !campos[nombre].trim())
        .map((nombre) => [nombre, 'Este campo es obligatorio.']),
    )

    setErrores(camposVacios)

    if (!formulario.checkValidity() || Object.keys(camposVacios).length > 0) {
      formulario.reportValidity()
      return
    }

    // El callback sube los datos a App, que se encarga de asignar id, fecha y estado.
    onAgregarSolicitud({
      titulo: campos.titulo.trim(),
      descripcion: campos.descripcion.trim(),
      solicitante: campos.solicitante.trim(),
      prioridad: campos.prioridad,
    })
    setCampos(camposIniciales)
    setErrores({})
    formulario.reset()
  }

  const claseCampo = (nombre) =>
    `mt-1.5 w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm shadow-slate-900/[0.02] outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 ${
      errores[nombre]
        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/10'
        : 'border-slate-200'
    }`

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
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
              d="M12 5v14m7-7H5"
            />
          </svg>
        </span>
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Nueva solicitud
          </h2>
          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            Cuéntanos qué necesitas y te ayudaremos.
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={enviarSolicitud}>
        <div>
          <label className="text-xs font-semibold text-slate-700" htmlFor="titulo">
            Título <span className="text-rose-500">*</span>
          </label>
          <input
            autoComplete="off"
            className={claseCampo('titulo')}
            id="titulo"
            maxLength={90}
            name="titulo"
            onChange={actualizarCampo}
            placeholder="Ej. No puedo acceder al sistema"
            required
            value={campos.titulo}
          />
          {errores.titulo && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {errores.titulo}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-xs font-semibold text-slate-700"
            htmlFor="descripcion"
          >
            Descripción <span className="text-rose-500">*</span>
          </label>
          <textarea
            className={`${claseCampo('descripcion')} min-h-28 resize-y`}
            id="descripcion"
            maxLength={500}
            name="descripcion"
            onChange={actualizarCampo}
            placeholder="Describe el problema y los pasos que ya intentaste..."
            required
            rows={4}
            value={campos.descripcion}
          />
          {errores.descripcion && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {errores.descripcion}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-xs font-semibold text-slate-700"
            htmlFor="solicitante"
          >
            Nombre del solicitante <span className="text-rose-500">*</span>
          </label>
          <input
            autoComplete="name"
            className={claseCampo('solicitante')}
            id="solicitante"
            maxLength={80}
            name="solicitante"
            onChange={actualizarCampo}
            placeholder="Tu nombre y apellido"
            required
            value={campos.solicitante}
          />
          {errores.solicitante && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {errores.solicitante}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-xs font-semibold text-slate-700"
            htmlFor="prioridad"
          >
            Prioridad
          </label>
          <select
            className={`${claseCampo('prioridad')} cursor-pointer`}
            id="prioridad"
            name="prioridad"
            onChange={actualizarCampo}
            value={campos.prioridad}
          >
            <option value="baja">Baja · Puede esperar</option>
            <option value="media">Media · Afecta mi trabajo</option>
            <option value="alta">Alta · Necesito atención pronto</option>
          </select>
        </div>

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-600/25 active:translate-y-px"
          type="submit"
        >
          Enviar solicitud
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
              d="M5 12h14m-6-6 6 6-6 6"
            />
          </svg>
        </button>
        <p className="text-center text-[11px] leading-4 text-slate-400">
          Los campos marcados con * son obligatorios.
        </p>
      </form>
    </section>
  )
}

export default SolicitudForm
