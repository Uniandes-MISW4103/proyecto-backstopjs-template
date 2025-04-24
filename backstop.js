const scenarios = require('./backstop_scenarios.json');
module.exports = {
  id: "backstop",
  /** Actualice las dimensiones antes de ejecutar las pruebas de regresión */
  viewports: [
    {
      label: "browser",
      width: 750,
      height: 400,
    },
  ],
  onBeforeScript: "puppet/onBefore.js",
  onReadyScript: "puppet/onReady.js",
  scenarios: scenarios,
  paths: {
    /**
     * Carpeta con las referencias base para la regresión visual
     * Recomendación: no modifique esta carpeta! Utilice los screenshots base
     * durante la primera ejecución de la herramienta y apruebe los cambios
     * para que Backstop actualice las referencias.
     */
    bitmaps_reference: "backstop_data/bitmaps_reference",
    bitmaps_test: "backstop_data/bitmaps_test",
    engine_scripts: "backstop_data/scripts",
    html_report: "backstop_data/html_report",
    ci_report: "backstop_data/ci_report",
  },
  report: ["browser"],
  engine: "puppeteer",
  engineOptions: {
    args: ["--no-sandbox"],
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false,
};
