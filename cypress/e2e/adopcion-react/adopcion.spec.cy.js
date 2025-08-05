import AdopcionPage from '../../page/adopcion-page/adopcion-page.js'

let login = {}
let loginInbvalido;
let registro = {}
let registroInvalido = {}

describe('Visitando el sitio: pruebas de login y registro', () => {
    before(() => {
        cy.fixture('adopcion-fixture/usuarios.json').then((usuarios) => {
            login = usuarios.usuarioValido
            loginInbvalido = usuarios.usuarioInvalido
            registro = usuarios.registro
            registroInvalido = usuarios.registroInvalido
        });
    });

    after(() => {
    });


    beforeEach(() => {
        AdopcionPage.visit()
    });

    afterEach(() => {
    });

    it('1) Validar login de usuario y acceso al detalle de la mascota', () => {
        AdopcionPage.login(login.email, login.password)
        AdopcionPage.elementos.saludoUsuario().should('have.text', `Hola, ${login.userName}`)
        cy.get(`#pet_${login.petIdLuna}`).click()
        cy.get('.text-4xl').should('have.text', 'Luna')
        cy.url().should('include', `/pets/${login.petIdLuna}`);

    })

    it('2) Validar login inválido', () => {
        AdopcionPage.login(loginInbvalido.email, loginInbvalido.password)
        AdopcionPage.elementos.mensajeError().should('have.text', loginInbvalido.mensajeError)
        cy.get('[data-cy="login_btn"]').should('be.visible')
    });



    it('3) Validar registro y acceder al detalle de la mascota llamada Bella', () => {
        const { userName, email, password, petIdBella } = registro
        AdopcionPage.registro(userName, email, password)
        AdopcionPage.elementos.saludoUsuario().should('have.text', `Hola, ${userName}!`)
        cy.url().should('not.include', '/register');
        cy.get(`#pet_${petIdBella}`).click()
        cy.url().should('include', `/pets/${petIdBella}`);
        cy.get('.text-4xl').should('have.text', 'Bella')
    });




    it('4) Validar registro con datos incorrectos', () => {
        const { userName, email, password } = registroInvalido
        AdopcionPage.registro(userName, email, password)
        cy.url().should('include', '/register');
        AdopcionPage.elementos.mensajeError().should('have.text', registroInvalido.mensajeError)

    });


    it('5) Validar Acceder a cada mascota', () => {
        cy.fixture('adopcion-fixture/pets.json').then((pets) => {
            pets.forEach((pet) => {

                cy.get(`#pet_${pet.id}`).click();
                cy.go('back');
                cy.wait(1000);
                cy.get(`#pet_${pet.id}`).should('exist');

            });
        });
    })

});