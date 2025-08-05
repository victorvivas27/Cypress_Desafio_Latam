class AdopcionPage {
    visit() {
        cy.visit('https://adopcion-react-typescript-ia-semana.vercel.app/')
    }

    elementos = {
        loginLink: () => cy.get('a[href="/login"]'),
        email: () => cy.get('#email'),
        password: () => cy.get('#password'),
        loginBtn: () => cy.get('#login_btn'),
        registerLink: () => cy.get('a[href="/register"]'),
        userName: () => cy.get('#username'),
        registerBtn: () => cy.get('#register_btn'),
        saludoUsuario: () => cy.get('span.text-gray-700'),
        mensajeError: () => cy.get('.text-red-500')
    }

    clickLoginLink() {
        this.elementos.loginLink().click()
    }

    inputEmail(email) {
        this.elementos.email().type(email)
    }

    inputPassword(password) {
        this.elementos.password().type(password)
    }

    clickLoginBtn() {
        this.elementos.loginBtn().click()
    }
    clickRegisterLink() {
        this.elementos.registerLink().click()
    }
    inputUserName(userName) {
        this.elementos.userName().type(userName)
    }
    clickRegisterBtn() {
        this.elementos.registerBtn().click()
    }


    login(email, password) {
        this.clickLoginLink()
        this.inputEmail(email)
        this.inputPassword(password)
        this.clickLoginBtn()
    }

    registro(userName, email, password) {
        this.clickRegisterLink()
        this.inputUserName(userName)
        this.inputEmail(email)
        this.inputPassword(password)
        this.clickRegisterBtn()

    }

}
export default new AdopcionPage();