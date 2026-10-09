# Proyecto Base: Pruebas de Regresión Visual (VRT) con BackstopJS

[BackstopJS](https://github.com/garris/BackstopJS) automatiza la regresión visual: toma capturas de
pantalla de una lista de escenarios (páginas y estados), las compara con un conjunto de imágenes de
referencia aprobadas y genera un reporte con las diferencias. Usa Puppeteer o Playwright para
controlar el navegador.

Este módulo contiene la configuración base de BackstopJS y un escenario de ejemplo que pueden usar
como punto de partida para comparar versiones de la aplicación del proyecto.

## Requisitos

- Node.js 24 (`lts/krypton`). El módulo incluye un `.nvmrc`, por lo que pueden usar `nvm use`.
- npm (incluido con Node.js).
- Navegador: al instalar, Puppeteer (dependencia de BackstopJS) descarga Chrome for Testing en
  `~/.cache/puppeteer`.

## Instalación

Desde la **raíz del repositorio** del proyecto:

```bash
npm run backstopjs:install
```

`backstopjs:prepare` existe por consistencia con los demás módulos, pero no hace nada: el navegador
se descarga durante la instalación.

> [!IMPORTANT]
> Instalen siempre desde la raíz. `backstopjs:install` deja las dependencias del módulo en su propia
> carpeta `node_modules`, aisladas de los demás módulos. Un `npm install` dentro de la carpeta del
> módulo instala en la raíz del repositorio y modifica el `package-lock.json` raíz sin ese aislamiento.

## Ejecución

| Acción | Desde la raíz | Desde `vrt/misw-4103-backstopjs` |
|---|---|---|
| Capturar las imágenes de referencia | `npm run backstopjs:reference` | `npm run reference` |
| Capturar y comparar contra la referencia | `npm run backstopjs:test` | `npm test` |
| Aprobar el último resultado como nueva referencia | `npm run backstopjs:approve` | `npm run approve` |
| Abrir el último reporte | `npm run backstopjs:ui` | `npm run test:ui` |

El flujo habitual es: `reference` una vez (o cuando cambie la versión base), `test` en cada
comparación, y `approve` solo cuando las diferencias encontradas sean cambios esperados.

## Estructura

```plaintext
misw-4103-backstopjs/
├── .nvmrc
├── package.json
├── abp.cjs                     # lee la configuración de la aplicación bajo pruebas (.env)
├── backstop.js                 # configuración de BackstopJS
├── backstop_scenarios.json     # lista de escenarios a comparar
└── backstop_data/
    └── scripts/                # onBefore.js y onReady.js (se ejecutan en cada escenario) y
                                # stackblitz-register.js (solo el del ejemplo)
```

Al ejecutar se generan, dentro de `backstop_data/`, `bitmaps_reference/`, `bitmaps_test/`,
`html_report/` y `ci_report/` (todas en el `.gitignore`).

## Configuración

La URL de las dos versiones y el administrador de la aplicación bajo pruebas (ABP) están en el
archivo `.env` de la raíz del repositorio, el mismo que usa `npm run abp:up` para desplegar Ghost. No
los copien en el módulo: `abp.cjs` lee ese archivo. Las variables disponibles son `ABP_URL` (versión
base), `ABP_RC_URL` (versión nueva), `ABP_ADMIN_NAME`, `ABP_ADMIN_EMAIL` y `ABP_ADMIN_PASSWORD`. Una
variable de entorno con el mismo nombre tiene prioridad sobre el `.env`; fuera de un repositorio del
proyecto (sin `.env`) se usan los valores por defecto de `abp.cjs`.

Los scripts de `backstop_data/scripts/` la leen con `require("../../abp.cjs")`, por ejemplo para
iniciar sesión antes de la captura; el script que genere `backstop_scenarios.json` puede usar
`ABP_URL` y `ABP_RC_URL` de la misma forma.

- **`backstop.js`**:
  - `viewports`: tamaños de pantalla en los que se captura cada escenario (por defecto 750×400).
  - `scenarios`: se cargan desde `backstop_scenarios.json`.
  - `onBeforeScript` / `onReadyScript`: scripts de `backstop_data/scripts/` que se ejecutan antes de
    cargar la página y cuando está lista (por ejemplo, para iniciar sesión o cerrar un aviso).
  - `report`: reporte HTML (`browser`, se abre al terminar `test`) y reporte JUnit XML (`CI`, en
    `backstop_data/ci_report/`).
  - `engine`: `puppeteer`, con `--no-sandbox` para poder ejecutarse en contenedores.
- **`backstop_scenarios.json`**: cada escenario define `label`, `url` (versión a probar),
  `referenceUrl` (versión de referencia), selectores a capturar u ocultar, interacciones previas
  (`clickSelector`, `hoverSelector`), el umbral de diferencia `misMatchThreshold` (en %) y, si lo
  necesita, un `onReadyScript` propio en lugar de `onReady.js`.

> [!IMPORTANT]
> La regresión visual debe estar automatizada: escriban un script que genere
> `backstop_scenarios.json` (por ejemplo, con `referenceUrl` en `ABP_URL` y `url` en `ABP_RC_URL`)
> antes de ejecutar `reference` y `test`.

## Ejemplo incluido

Un escenario sobre la página de registro del demo
[angular-6-registration-login-example](https://angular-6-registration-login-example.stackblitz.io) alojado en StackBlitz (no la ABP), con la misma URL
como referencia y como prueba. Su `onReadyScript`, `stackblitz-register.js`, inicia el proyecto en
StackBlitz y llena el formulario con el nombre, el correo y la contraseña de `ABP_ADMIN_*`: muestra
cómo usar las credenciales del `.env` sin resolver las pruebas del proyecto. `reference` captura la
página y `test` la vuelve a capturar y compara con un umbral de 0,1 %; como las dos capturas siguen
los mismos pasos, la prueba pasa. Para ver una diferencia, cambien un valor del formulario en el
script (por ejemplo, el nombre) y ejecuten `test` de nuevo.

## Solución de problemas

- **`Could not find Chrome (ver. …)`**: la descarga del navegador no se ejecutó durante la
  instalación; ejecuten `npx puppeteer browsers install chrome` desde la carpeta del módulo.
- **`npm warn deprecated puppeteer@22…`**: BackstopJS 6.3.25 (su última versión) depende de
  Puppeteer 22; la advertencia es esperada.
- **Las capturas de referencia y de prueba difieren en todo el texto**: se tomaron en sistemas
  operativos distintos (las fuentes se dibujan diferente). Tomen ambas en el mismo entorno.
- **Linux ARM64**: Chrome for Testing no tiene versión para esa plataforma; instalen Chromium del
  sistema y definan `PUPPETEER_EXECUTABLE_PATH` (por ejemplo `/usr/bin/chromium`).
- **Advertencia `EBADENGINE`**: están usando una versión de Node.js anterior a la 24.

## Referencias

- [BackstopJS](https://github.com/garris/BackstopJS)
- [Configuración de escenarios](https://github.com/garris/BackstopJS#advanced-scenarios)
