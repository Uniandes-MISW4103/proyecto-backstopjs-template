# Proyecto Base: VRT con BackstopJs

BackstopJs es un framework utilizado para realizar pruebas de regresión visual. Ofrece una interfaz intuitiva, al igual que posible integraciones con Playwright y Puppeteer.

Este repositorio cuenta con la configuración base de Backstop para la automatización de VRT para el proyecto del curso. Para mayor información, consultar la [documentación oficial](https://github.com/garris/BackstopJS) de la herramienta

## Requisitos Básicos

- Node.js (versión 22 o superior). Recomendamos utilizar la versión `lts/jod`.
- npm para la gestión de dependencias.

## Instalación

Desde la **raíz del repositorio**:

```bash
npm run backstopjs:install
```

O bien, desde el directorio del módulo:

```bash
npm install
```

## Ejecución de Pruebas

Desde la **raíz del repositorio**:

```bash
# Capturar imágenes de referencia (primera ejecución o al actualizar la base)
npm run backstopjs:reference
```

```bash
# Ejecución de las pruebas de regresión visual
npm run backstopjs:test
```

```bash
# Aprobación de resultados (actualización de referencia a partir de los resultados del test)
npm run backstopjs:approve
```

```bash
# Abrir el último reporte HTML generado
npm run backstopjs:ui
```

**Nota:** En la primera ejecución del proyecto deben capturar primero las imágenes base con `backstopjs:reference` y luego ejecutar `backstopjs:test`. El comando `backstopjs:approve` se usa para reemplazar las imágenes de referencia con los resultados del último test.

## Configuración

1. **`backstop.js`**: Este archivo contiene la configuración principal de Backstop. En este caso, se define el `id`, las dimensiones (`vierports`), y los escenarios de prueba (`scenarios`):

   ```javascript
   id: "backstop",
   /** Actualice las dimensiones antes de ejecutar las pruebas de regresión */
   viewports: [
       {
       label: "browser",
       width: 750,
       height: 400,
       },
   ],
   scenarios: [],
   ...
   ```

2. **`backstop_scenarios.json`**: Archivo con la lista de escenarios de comparación para la regresión visual. **Importante**: deben implementar un script que genere la lista de escenarios

> [!IMPORTANT]
> **Importante:** Recuerden que la ejecución de pruebas de regresión visual debe ser automatizada! Es decir, se espera que implementen un script para configurar la lista de escenarios antes de ejecutar las pruebas (tanto para el _setup_ de imágenes base como referencia, como para las imágenes de prueba)

Asegúrate de revisar y personalizar estas configuraciones según las necesidades de tu proyecto.
