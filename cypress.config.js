import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    //baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {


    },
    /**
     * 🎥 Graba un video de la ejecución completa de las pruebas (cypress run).
          Ideal para revisar qué pasó cuando una prueba falla en CI.
     */
    video: true,
    /**
     * 🗜️ Comprime el video para que pese menos.
        * 0 = sin compresión
         * 32 = compresión alta (recomendado en CI)
         * Cuanto más alto, más liviano el video.
     */
    videoCompression: 32,
    /**
     * 📸 Toma una captura de pantalla automática si una prueba falla durante el cypress run.
      *Muy útil para depurar errores visuales.
     */
    screenshotOnRunFailure: true,
    /**
     * ⏱️ Tiempo máximo (en ms) que Cypress esperará por comandos como 
     * .get(), .click(), .type() antes de fallar.
     * 👉 8000 ms = 8 segundos.
     */
    //defaultCommandTimeout: 8000,
    /**
     * 🌐 Tiempo máximo (en ms) para que una página termine de cargar (cy.visit()) antes de fallar.
     * 👉 60000 ms = 1 minuto. Útil si la app carga lento.
     */
    //pageLoadTimeout: 60000,
    /**
     * 🔄 Tiempo máximo (en ms) para esperar que una petición XHR o fetch comience a responder.
     * 👉 15000 ms = 15 segundos.
     */
    //requestTimeout: 15000,
    /**
     * ⏳ Tiempo máximo (en ms) para esperar la respuesta completa de una petición XHR o fetch.
     * 👉 15000 ms = 15 segundos.
     */
    //responseTimeout: 15000,
    /**
     * 📏 Tamaño del viewport (ancho y alto) para las pruebas.
     */
    viewportWidth: 1920,
    /**
     * 📐 Tamaño del viewport (ancho y alto) para las pruebas.
     */
    viewportHeight: 1080,
    /**
     * 🔁 Reintenta automáticamente una prueba que haya fallado.
     * Útil para tests "flaky" que fallan ocasionalmente por razones externas.
     * runMode: reintentos cuando se corre con "cypress run"
     * openMode: reintentos cuando se corre con "cypress open"
     */
   /*  retries: {
      runMode: 2,
      openMode: 0,
    }, */
    projectId: "5pum4k",
  },
});
