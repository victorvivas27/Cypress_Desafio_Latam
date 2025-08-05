
Cypress.Commands.add('login', (email, password) => {
    cy.get('a[href="/login"]').click();
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('registro', (fullName, email, password, confirmPassword) => {
    cy.get('a[href="/register"]').click();
    cy.get('#name').type(fullName);
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.get('#confirmPassword').type(confirmPassword);
    cy.get('button[type="submit"]').click()
});

Cypress.Commands.add('comprar', () => {
    cy.get('a[href="/cart"]').click()
    cy.contains('Proceed to Checkout').click()
})
Cypress.Commands.add('logout', () => {
    cy.get('button.flex:nth-child(4) > span:nth-child(2)').click()
})