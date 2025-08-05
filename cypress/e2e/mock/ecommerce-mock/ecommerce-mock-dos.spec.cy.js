
const baseUrl = 'https://ecommerce-js-test.vercel.app/'
const apiProducts = 'https://fakestoreapi.com/products'
describe('Visiatando site Ecommerce', () => {
    before(() => {
        cy.clearAllCookies
        cy.clearLocalStorage
    })
    /**
     * ==================================================================================
     */
    it('1) Validar respuesta Array vacío con status 200', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 200,
            body: []
        }).as('arrayVacio');
        cy.visit(baseUrl);
        cy.wait('@arrayVacio')
            .its('response.statusCode')
            .should('eq', 200);
        cy.wait(2000);
        cy.get('.py-8 > .text-center > .text-xl')
            .should('have.text', 'Ningún producto disponible.');
    });

    /**
     * =================================================================================
     */

    it('2)Validar recurso no valido status "404"', () => {
        cy.intercept('GET', `${apiProducts}/**`, {
            statusCode: 404,
        }).as('recursoNoValido');
        cy.visit(baseUrl);
        cy.get('#product_8').click();
        cy.wait('@recursoNoValido')
            .its('response.statusCode')
            .should('eq', 404);
        cy.wait(2000);
        cy.get('.text-center > .text-xl')
            .should('have.text', 'Product not found');
    });

    /**
     * =================================================================================
     */

    it('3) Validar error general del servidor status "500"', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 500
        }).as('errorServer');
        cy.visit(baseUrl);
        cy.wait('@errorServer')
            .its('response.statusCode')
            .should('eq', 500);
        cy.wait(2000);
        cy.get('.text-lg')
            .should('have.text', 'Error: Error general de la API');
    });

    /**
     * =================================================================================
     */

    it('4) Validar servicio no disponible status "503"', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 503
        }).as('servicioNoDisponible');
        cy.visit(baseUrl);
        cy.wait('@servicioNoDisponible')
            .its('response.statusCode')
            .should('eq', 503);
        cy.wait(2000);
        cy.get('.text-lg')
            .should('have.text', 'Error: Servicio no disponible');
    });
    /**
     * =================================================================================
     */

    it('5)Validar codigo de error status "(codigo)', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 429
        }).as('getProducts');
        cy.visit(baseUrl);
        cy.wait('@getProducts')
            .its('response.statusCode')
            .should('eq', 429);
        cy.wait(2000);
        cy.get('.text-lg')
            .should('have.text', 'Error: Código de error: (429)');
    })
})