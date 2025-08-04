

describe('Acceso al site y envio del formulario', () => {

  it('Llenar formulario y enviarlo validar mensaje de confirmacion', () => {
    cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/')
    cy.get('input[name="name"]').type('Juan');
    cy.get('input[name="email"]').type('juan@gmail.com');
    cy.get('#message').type('Hola');
    cy.get('#fotos').select('Los Roques')
    cy.get('#notificaciones').check();
    //cy.get('#notificaciones').uncheck();
    cy.get('#enviar_formulario').click();
    cy.get('.contactenos').contains('Formulario enviado!').should('be.visible');
  })

  it('Formulario con email invalido validar boton visible ', () => {
    cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/')
    cy.get('input[name="name"]').type('Juan');
    cy.get('input[name="email"]').type('juan@');
    cy.get('#enviar_formulario').should('be.visible');
    cy.get('.contactenos').contains('Formulario enviado!').should('not.exist');
  })

  it('Validar obligatoriedad de los campos', () => {
    cy.visit('https://ljcl79.github.io/primera-pagina-ia-taller-adl/')
    cy.get('input[name="name"]').clear();
    cy.get('input[name="email"]').clear();
    cy.get('#message').clear();
    cy.get('#enviar_formulario').click();
    cy.get('#enviar_formulario').should('be.visible');
  })
})







