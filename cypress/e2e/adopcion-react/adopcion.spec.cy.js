

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
        cy.visit('https://adopcion-react-typescript-ia-semana.vercel.app/')


    });

    afterEach(() => {
    });

    it('1) Validar login de usuario y acceso al detalle de la mascota', () => {
        cy.get('a[href="/login"]').click()
        cy.get('#email').type(login.email)
        cy.get('#password').type(login.password)
        cy.get('#login_btn').click()
        cy.get('span.text-gray-700').should('have.text', 'Hola, user1!')
        cy.get(`#pet_${login.petIdLuna}`).click()
        cy.get('.text-4xl').should('have.text', 'Luna')
        cy.url().should('include', `/pets/${login.petIdLuna}`);

    })

    it('2) Validar login inválido', () => {
        cy.get('a[href="/login"]').click()
        cy.get('#email').type(loginInbvalido.email)
        cy.get('#password').type(loginInbvalido.password)
        cy.get('#login_btn').click()
        cy.get('.text-red-500').should('have.text', 'Credenciales inválidas. Inténtalo de nuevo.')
        cy.get('[data-cy="login_btn"]').should('be.visible')

    });


    it('3) Validar registro y acceder al detalle de la mascota llamada Bella', () => {
        const { userName, email, password, petIdBella } = registro
        cy.get('#link_register').click()
        cy.get('#username').type(userName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#register_btn').click()
        cy.get('span.text-gray-700').should('have.text', `Hola, ${userName}!`)
        cy.url().should('not.include', '/register');
        cy.get(`#pet_${petIdBella}`).click()
        cy.url().should('include', `/pets/${petIdBella}`);
        cy.get('.text-4xl').should('have.text', 'Bella')


    });


    it('4) Validar registro con datos incorrectos', () => {

        const { userName, email, password } = registroInvalido
        cy.get('#link_register').click()
        cy.get('#username').type(userName)
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#register_btn').click()
        cy.url().should('include', '/register');
        cy.get('.text-red-500').should('have.text', 'El correo electrónico ya está registrado o hubo un error.')


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