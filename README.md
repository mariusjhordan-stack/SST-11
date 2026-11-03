# Mesa Clara · Sistema de gestión de solicitudes

Aplicación de soporte técnico construida con React, Vite y Tailwind CSS. Permite
crear solicitudes, asignarles prioridad, filtrar por estado y actualizar o
eliminar cada caso.

## Iniciar el proyecto

```sh
npm install
npm run dev
```

Para validar la compilación y el estilo del código:

```sh
npm run build
npm run lint
```

## Estructura y flujo de props

- `src/App.jsx` mantiene `solicitudes` y `filtroActual`, calcula la lista visible
  y define `agregarSolicitud`, `eliminarSolicitud`, `cambiarEstado` y `setFiltro`.
- `src/components/SolicitudForm.jsx` controla los campos y llama
  `onAgregarSolicitud(datos)` para subir la solicitud a `App`.
- `src/components/FiltrosSolicitudes.jsx` recibe los filtros y sus conteos, y
  llama `onSetFiltro(filtro)` cuando el usuario elige uno.
- `src/components/ListaSolicitudes.jsx` recibe las solicitudes filtradas y
  reenvía cada solicitud y los callbacks a su componente hermano
  `SolicitudItem`.
- `src/components/SolicitudItem.jsx` muestra una tarjeta y comunica cambios o
  eliminaciones al padre mediante `onCambiarEstado(id, estado)` y
  `onEliminarSolicitud(id)`.

El estado se mantiene localmente en `App`; no se usa Context API ni una librería
externa de estado. Las solicitudes iniciales son datos de demostración y los
cambios se conservan en memoria durante la sesión.
