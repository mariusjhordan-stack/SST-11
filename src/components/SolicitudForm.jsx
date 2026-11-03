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
    `mt-1 w-full rounded-md border bg-white px-3 py-2 text-xs text-[#1C2623] outline-none transition placeholder:text-[#9AA39F] focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 ${
      errores[nombre]
        ? 'border-[#C8321E] focus:border-[#C8321E] focus:ring-[#C8321E]/10'
        : 'border-[#DDD9CF]'
    }`

  return (
    <section className="rounded-md border border-[var(--border)] bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#E4F1ED] text-[#0F766E]">
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
              d="M12 5v14m7-7H5"
            />
          </svg>
        </span>
        <div>
          <h2 className="text-sm font-semibold text-[#1C2623]">
            Registrar solicitud
          </h2>
          <p className="mt-0.5 text-[10px] leading-4 text-[#7B8581]">
            Completa los datos para crear un caso.
          </p>
        </div>
      </div>

      <form className="space-y-3" onSubmit={enviarSolicitud}>
        <div>
          <label className="text-[10px] font-medium text-[#48534E]" htmlFor="titulo">
            Asunto <span className="text-[#C8321E]">*</span>
          </label>
          <input
            autoComplete="off"
            className={claseCampo('titulo')}
            id="titulo"
            maxLength={90}
            name="titulo"
            onChange={actualizarCampo}
            placeholder="Ej. Acceso al sistema"
            required
            value={campos.titulo}
          />
          {errores.titulo && (
            <p className="mt-1 text-[10px] text-[#C8321E]" role="alert">
              {errores.titulo}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-[10px] font-medium text-[#48534E]"
            htmlFor="descripcion"
          >
            Descripción <span className="text-[#C8321E]">*</span>
          </label>
          <textarea
            className={`${claseCampo('descripcion')} min-h-20 resize-y`}
            id="descripcion"
            maxLength={500}
            name="descripcion"
            onChange={actualizarCampo}
            placeholder="Describe brevemente el problema..."
            required
            rows={4}
            value={campos.descripcion}
          />
          {errores.descripcion && (
            <p className="mt-1 text-[10px] text-[#C8321E]" role="alert">
              {errores.descripcion}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-[10px] font-medium text-[#48534E]"
            htmlFor="solicitante"
          >
            Solicitante <span className="text-[#C8321E]">*</span>
          </label>
          <input
            autoComplete="name"
            className={claseCampo('solicitante')}
            id="solicitante"
            maxLength={80}
            name="solicitante"
            onChange={actualizarCampo}
            placeholder="Nombre y apellido"
            required
            value={campos.solicitante}
          />
          {errores.solicitante && (
            <p className="mt-1 text-[10px] text-[#C8321E]" role="alert">
              {errores.solicitante}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-1.5 text-[10px] font-medium text-[#48534E]">
            Prioridad
          </legend>
          <div className="grid grid-cols-3 gap-1 rounded-md border border-[#DDD9CF] bg-[#F7F6F2] p-1">
            {[
              { valor: 'baja', etiqueta: 'Baja', color: '#8A948F' },
              { valor: 'media', etiqueta: 'Media', color: '#D98A0B' },
              { valor: 'alta', etiqueta: 'Alta', color: '#C8321E' },
            ].map((prioridad) => (
              <label
                className={`flex cursor-pointer items-center justify-center gap-1 rounded-[4px] px-1.5 py-1.5 text-[10px] transition-colors ${
                  campos.prioridad === prioridad.valor
                    ? 'bg-white font-semibold text-[#1C2623] shadow-[0_1px_2px_rgba(28,38,35,0.09)]'
                    : 'text-[#6A7571] hover:text-[#1C2623]'
                }`}
                htmlFor={`prioridad-${prioridad.valor}`}
                key={prioridad.valor}
              >
                <input
                  checked={campos.prioridad === prioridad.valor}
                  className="sr-only"
                  id={`prioridad-${prioridad.valor}`}
                  name="prioridad"
                  onChange={actualizarCampo}
                  type="radio"
                  value={prioridad.valor}
                />
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: prioridad.color }}
                />
                {prioridad.etiqueta}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#0F766E] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0B625B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2 active:translate-y-px"
          type="submit"
        >
          Registrar
          <svg
            aria-hidden="true"
            className="size-3.5"
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
        <p className="text-center text-[9px] leading-4 text-[#8A948F]">
          Los campos con * son obligatorios.
        </p>
      </form>
    </section>
  )
}

export default SolicitudForm
