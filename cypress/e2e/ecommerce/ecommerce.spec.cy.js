let login = {}
let registro = {}
let producto = {}
let categoria = {}
let orden = {}


describe('Visiatando site Ecommerce', () => {
    before(() => {
        cy.viewport(1920, 1080)
        cy.clearAllCookies
        cy.clearLocalStorage
        cy.fixture('ecommerce-fixture/ecommerce.json').then((data) => {
            registro = data.registro
            login = data.login
            producto = data.producto
            categoria = data.categoria
            orden = data.orden
        })

    })
    beforeEach(() => {
        cy.visit('https://ecommerce-js-test.vercel.app/')

    })
    afterEach(() => {

    })
    after(() => {

    })

    it('1)Validar registro,validar compra Mens Cotton Jacket', () => {
        const { fullName, email, password, confirmPassword } = registro;
        cy.get('a[href="/register"]').click();
        cy.get('#name').type(fullName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#confirmPassword').type(confirmPassword);
        cy.get('button[type="submit"]').click()
        cy.get('span.font-medium').should('have.text', `Hello, ${fullName}`)
        cy.get('#product_3 > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(2)').click()
        cy.get('a[href="/cart"]').click()
        cy.contains('Proceed to Checkout').click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Thank you for your purchase! Total: $55.99');
        });

    })
    it('2)Validar login,validar compra Mens Casual Slim Fit', () => {
        const { fullName, email, password } = login;
        cy.get('a[href="/login"]').click();
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click()
        cy.get('span.font-medium').should('have.text', `Hello, ${fullName}`)
        cy.get('button.flex:nth-child(4) > span:nth-child(2)').should('have.text', 'Logout')
        cy.get('#product_4 > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > button:nth-child(2)').click();
        cy.get('a[href="/cart"]').click()
        cy.contains('Proceed to Checkout').click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Thank you for your purchase! Total: $15.99');
        });
        cy.get('button.flex:nth-child(4) > span:nth-child(2)').click()

    })
    it('3)Validar consulta Fjallraven,login,validar compra', () => {
        const { email, password } = login;
        const { Fjallraven } = producto
        cy.get('input.w-full').type(Fjallraven)
        cy.get('#product_1').click()
        cy.contains('Login to Purchase').click()
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click()
        cy.get('a[href="/cart"]').click()
        cy.contains('Proceed to Checkout').click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Thank you for your purchase! Total: $109.95');
        });
        cy.get('button.flex:nth-child(4) > span:nth-child(2)').click()
    })

    it.only('4)Validar consulta Fjallraven, login,validar compra 5 productos', () => {
        const { email, password } = login;
        const { Fjallraven } = producto
        cy.get('input.w-full').type(Fjallraven)
        cy.get('#product_1').click()
        /* cy.get('.space-x-4 > .flex > :nth-child(3)').each(($el) => {
            for (let i = 0; i < 4; i++) {
                cy.wrap($el).click();
                cy.wait(1000);
            }
        }); */

        Cypress._.times(4, () => {
            cy.get('.lucide.lucide-plus').click();
            cy.wait(1000);
        })

        cy.contains('Login to Purchase').click()
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click()
        cy.get('a[href="/cart"]').click()
        cy.contains('Proceed to Checkout').click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Thank you for your purchase! Total: $549.75');
        });
        cy.get('button.flex:nth-child(4) > span:nth-child(2)').click()
    })


    it('5)Validar categoria, buscar menor precio,login ,comprar ', () => {
        const { email, password } = login;
        const { electronics } = categoria
        const { priceLowToHigh } = orden
        cy.get('select.pl-10').select(electronics);
        cy.get('select.px-4').select(priceLowToHigh);
        cy.get('#product_9').click()
        cy.contains('Login to Purchase').click()
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('button[type="submit"]').click()
        cy.get('a[href="/cart"]').click()
        cy.contains('Proceed to Checkout').click()
        cy.on('window:alert', (text) => {
            expect(text).to.equal('Thank you for your purchase! Total: $64.00');
        });
        cy.get('button.flex:nth-child(4) > span:nth-child(2)').click()
    })
})