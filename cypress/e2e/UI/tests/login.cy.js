import { loginPage } from '../pages/login';

describe('Login Tests', () => {
    beforeEach(() => {
        loginPage.visit();
    })
    
    it('Takes you to the benefits dashboard on successful login', () => {
        loginPage.validLogin();
        cy.url().should('include', '/Benefits');
    })

    it('Shows error message on failed login attempt with bad password', () => {
        loginPage.typeUsername(loginPage.credentials.username);
        loginPage.typePassword('invalidPassword');
        loginPage.clickLogin();
        loginPage.errorMessageVisible();
        loginPage.getErrorMessageText().should('contain', 'The specified username or password is incorrect');
    })

    it('Removes whitespace from username field and allows login', () => {
        loginPage.typeUsername(`   ${loginPage.credentials.username}   `);
        loginPage.typePassword(loginPage.credentials.password);
        loginPage.clickLogin();
        cy.url().should('include', '/Benefits');
    })

    it('Removes whitespace from password field and allows login', () => {
        loginPage.typeUsername(loginPage.credentials.username);
        loginPage.typePassword(`   ${loginPage.credentials.password}   `);
        loginPage.clickLogin();
        cy.url().should('include', '/Benefits');
    })

    it('Shows appropriate error message when username is left blank', () => {
        loginPage.typePassword(loginPage.credentials.password);
        loginPage.clickLogin();
        loginPage.errorMessageVisible();
        loginPage.getErrorMessageText().should('contain', 'The Username field is required.');
    })

    it('Shows appropriate error message when password is left blank', () => {
        loginPage.typeUsername(loginPage.credentials.username);
        loginPage.clickLogin();
        loginPage.errorMessageVisible();
        loginPage.getErrorMessageText().should('contain', 'The Password field is required.');
    })
})