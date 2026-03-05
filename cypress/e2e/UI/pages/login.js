class LoginPage {
    elements = {
        usernameInput: () => cy.get('#Username'),
        passwordInput: () => cy.get('#Password'),
        loginButton: () => cy.get('body > div > main > div > div > form > button'),
        errorMessage: () => cy.get('body > div > main > div > div > form > div.text-danger.validation-summary-errors')
    }

    //Move to github actions or similar way to set them at runtime 
    credentials ={
        username: 'TestUser913',
        password: "}Nu'C6na1@Nh"
    }

    visit() {
        cy.visit('/Account/Login');
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    errorMessageVisible() {
        this.elements.errorMessage().should('be.visible');
    }

    getErrorMessageText() {
        return this.elements.errorMessage().invoke('text');
    }

    validLogin(){
        this.elements.usernameInput().type(this.credentials.username);
        this.elements.passwordInput().type(this.credentials.password);
        this.elements.loginButton().click();
    }


}

export const loginPage = new LoginPage();

