


const baseUrl = 'https://ecommerce-js-test.vercel.app/'
const rutaJson = 'ecommerce-mock/product-mock.json'
const apiProducts = 'https://fakestoreapi.com/products'
describe('Carga de producto', () => {
    before(() => {
        cy.viewport(1920, 1080)
    })
    it('Carga de fixtures', () => {
        cy.intercept('GET', apiProducts, {
            fixture: rutaJson

        }).as('getProducts')
        cy.visit(baseUrl)
        /**
         * Valida lo que trae del la respuesta
         */
        cy.wait('@getProducts').its('response.body').should('have.length', 22)

        /**
         * Valida lo que muestra al usuario
         */
        cy.get('.product-card').should('have.length', 22)

    })
    /**
     * Datos quemados
     */
    it('Carga con objeto literal', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 200,
            body: [{
                "id": 22,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                "category": "men's clothing",
                "image": "https://www.porta.com.py/uploads/que-tamano-deben-tener-las-imagenes-de-productos-en-un-ecommerce-1721240264.jpg",
                "rating": {
                    "rate": 4.1,
                    "count": 259
                }
            }]
        }).as('getObjectsProducts');
        cy.visit(baseUrl)
        cy.wait('@getObjectsProducts').its('response.statusCode').should('eq', 200)


    })
    it('Error al cargar datos de la API', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 500,
        }).as('getApiError')
        cy.visit(baseUrl)
        cy.wait('@getApiError')
        cy.get('.text-lg').should('have.text', 'Error: Error general de la API')

    })
    it('Retorno OK,si datos', () => {
        cy.intercept('GET', apiProducts, {
            statusCode: 200,
        }).as('getApiError')
        cy.visit(baseUrl)
        cy.wait('@getApiError')
        cy.get('.text-lg').should('have.text', "Error: Unexpected end of JSON input")

    })
    it('Producto no valido', () => {
        cy.intercept('GET', `${apiProducts}/**`, {
            statusCode: 200

        }).as('getInvalidProduct')
        cy.visit(baseUrl)
        cy.wait('@getInvalidProduct')
        cy.get('#product_1').click()
        cy.get('.text-center > .text-xl').should('have.text', 'Product not found')


    })
    it('Debería mostrarse un error por ID de producto no válido', () => {
        cy.intercept('GET', `${apiProducts}/**`, (req) => {
            const productId = req.url.split('/').pop();
            if (productId === '1') {
                req.reply({ statusCode: 404, body: { error: 'ID producto invalido' } })
            } else {
                req.continue()
            }

        }).as('dynamicProductCheck')

        cy.visit(baseUrl)
        cy.wait('@dynamicProductCheck')
        cy.get('#product_1').click()
        cy.get('.text-center > .text-xl').should('have.text', 'Product not found')
    })

    it.only('Debería mostrarse el spinner de caragando producto', () => {
        cy.intercept('GET', apiProducts, (req) => {
            Cypress.log({ name: 'Cargando productos', message: 'Esperando respuesta' })
            req.reply({
                fixture: rutaJson,
                delay: 2000
            })
        }).as('slowProducts')
        cy.log('hola')
        cy.visit(baseUrl)
        cy.get('.animate-spin').should('be.visible')
        cy.wait('@slowProducts')
        cy.get('.animate-spin').should('not.exist')
        cy.get('.product-card').should('have.length.greaterThan', 0)

    })
})