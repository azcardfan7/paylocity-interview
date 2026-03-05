import { loginPage } from '../pages/login';
import { dashBoard } from '../pages/dashboard';

describe('Dashboard UI Tests', () => {
    let intialCount;

    beforeEach(() => {
        loginPage.visit();
        loginPage.validLogin();
        cy.url().should('include', '/Benefits');
        dashBoard.getRowCount().then(count => {
            intialCount = count;
            cy.log(`Initial row count: ${intialCount}`);
        })
    })

    it('Add employee adds to the table and increases the row count', () => {
        dashBoard.clickAddEmployeeButton();
        dashBoard.enterAddEmployeeInfo('John', 'Doe', 2);
        dashBoard.clickAddEmployeeModalAddButton();

        dashBoard.waitForModalToClose();
        cy.reload(); 
        cy.contains('td', 'John', { timeout: 15000 })
            .should('be.visible');

        dashBoard.getRowCount().then(currentCount => {
                cy.log(`Current row count: ${currentCount}`);
                expect(currentCount).to.eq(intialCount + 1);
            });
    })

    it('Edits employee information and the updated information is reflected in the table', () => {
        let capturedId;
        let ranNum;
        let ranNumDep;

        dashBoard.getRowByIndex(0)
            .find('td')
            .first()
            .invoke('text')
            .then(text => {
            capturedId = text.trim();
            cy.log(`→ Captured ID: ${capturedId}`);

            return dashBoard.getRowByIndex(0)
                .find('[data-action="edit"], button.edit, .fa-edit, [aria-label*="edit"]')
                .click();
            }).then(() => {
            return Cypress.Promise.all([
                dashBoard.elements.editEmployeeFirstNameInput().invoke('val'),
                dashBoard.elements.editEmployeeLastNameInput().invoke('val'),
                dashBoard.elements.editEmployeeDependentsInput().invoke('val')
            ]);
            }).then(([fname, lname, deps]) => {
                cy.log(`Original → ${fname} ${lname} (${deps} deps)`);

                ranNum    = Math.floor(Math.random() * 100);
                ranNumDep = Math.floor(Math.random() * 30);

                dashBoard.enterUpdateEmployeeInfo(
                    `newFirstName${ranNum}`,
                    `newLastName${ranNum}`,
                    ranNumDep
                );

                return dashBoard.clickUpdateEmployeeModalSaveButton();
            })
            .then(() => dashBoard.waitForModalToClose())
            .then(() => {
            cy.log(`Captured ID after save: ${capturedId}`);
            cy.reload();
            })
            .then(() => {
            return cy.get('#employeesTable tbody tr', { timeout: 15000 })
                .should('have.length.greaterThan', 0);
            })
            .then(() => {
                dashBoard.getCellInfo(capturedId, 1).should('have.text', `newFirstName${ranNum}`);
                dashBoard.getCellInfo(capturedId, 2).should('have.text', `newLastName${ranNum}`);                
                dashBoard.getCellInfo(capturedId, 3).should('have.text', `${ranNumDep}`);
            });
    });

    it('Deletes an employee and the employee is removed from the table and row count decreases', () => {
        let capturedId; 
        dashBoard.getRowByIndex(0)
        .find('td')
        .first()
        .invoke('text')     
        .then(text => {
            capturedId = text.trim();
            cy.log(`Captured ID for deletion: ${capturedId}`);
            dashBoard.deleteEmployee(capturedId);   
        })
        .then(() => dashBoard.waitForModalToClose())
        .then(() => {
            cy.reload();
            cy.contains('td', capturedId, { timeout: 15000 }).should('not.exist');
            dashBoard.getRowCount().then(currentCount => {
                cy.log(`Current row count after deletion: ${currentCount}`);
                expect(currentCount).to.eq(intialCount - 1);
            });
        });
    })
    
    it('Cancels an edit and returns to the table without saving changes', () => {
        dashBoard.getRowByIndex(0).find('[data-action="edit"], button.edit, .fa-edit, [aria-label*="edit"]')
                .click();
        dashBoard.clickUpdateEmployeeModalCancelButton();
        dashBoard.waitForModalToClose();
    })

    it('Cancels an add and returns to the table without saving changes', () => {
        dashBoard.clickAddEmployeeButton();
        dashBoard.clickAddEmployeeModalCancelButton();
        dashBoard.waitForModalToClose();
    })

    it('Clicking logout returns you to the login page', () => {
        dashBoard.clickLogout();
        cy.url().should('include', '/Account/LogIn');
    })  
})