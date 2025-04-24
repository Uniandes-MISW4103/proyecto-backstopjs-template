# Proyecto Base: VRT con BackstopJs

BackstopJs es un framework utilizado para realizar pruebas de regresión visual. Ofrece una interfaz intuitiva, al igual que posible integraciones con Playwright y Puppeteer.

Este repositorio cuenta con la configuración base de Backstop para la automatización de VRT para el proyecto del curso. Para mayor información, consultar la [documentación oficial](https://github.com/garris/BackstopJS) de la herramienta

## Requisitos Básicos

- Node.js (versión 20 o superior). Recomendamos utilizar la versión `lts/iron`.
- npm o yarn para la gestión de dependencias.

## Instalación

Instala las dependencias necesarias utilizando npm:

```bash
npm install
```

## Ejecución de Pruebas

Dado que se utiliza un archivo JavaScript para la configuración de la herramienta, en el archivo **package.json** se definieron los siguientes comandos

```bash
# Ejecución de las pruebas de regresión visual utilizando el archivo backstop.js
npm run test
```

```bash
# Aprobación de resultados (actualización de referencia) utilizando el archivo backstop.js
npm run approve
```

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
