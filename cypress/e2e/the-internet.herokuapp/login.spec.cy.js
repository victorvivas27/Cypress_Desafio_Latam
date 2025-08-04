
describe.only('Acceso al site y envio del formulario', () => {

    it('Llenar formulario y enviarlo validar mensaje de confirmacion', () => {
        cy.visit('https://the-internet.herokuapp.com/login')
        cy.get('input[name="username"]').type('tomsmith');
        cy.get('input[name="password"]').type('SuperSecretPassword!');
        cy.get('.radius').click();
        cy.get('.flash').contains('You logged into a secure area!').should('be.visible');
        cy.get('.flash').should('include.text', 'logged into a secure area');
        cy.get('.flash', { timeout: 5000 }).should('contain.text', 'You logged into a secure area!');
        //cy.get('a[href="/logout"]').click();
        cy.contains('Logout').click();
      })
})