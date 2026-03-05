class Dashboard{
    elements = {
        logoutLink: () => cy.contains('a', 'Log Out'),
        addEmployeeButton: () => cy.get('#add'),
        benefitsTable: () => cy.get('#employeesTable'),
        benefitsTableRows: () => cy.get('tbody'),
        addEmployeeFirstNameInput: () => cy.get('#firstName'),
        addEmployeeLastNameInput: () => cy.get('#lastName'),
        addEmployeeDependentsInput: () => cy.get('#dependants'),
        addEmployeeCancelButton: () => cy.get('#employeeModal > div > div > div.modal-footer > button.btn.btn-secondary'),
        addEmployeeAddButton: () => cy.get('#addEmployee'),
        editEmployeeFirstNameInput: () => cy.get('#firstName'),
        editEmployeeLastNameInput: () => cy.get('#lastName'),
        editEmployeeDependentsInput: () => cy.get('#dependants'),
        editEmployeeCancelButton: () => cy.get('#employeeModal > div > div > div.modal-footer > button.btn.btn-secondary'),
        editEmployeeSaveButton: () => cy.get('#updateEmployee'),
        deleteEmployeeCancelButton: () => cy.get('#deleteModal > div > div > div.modal-footer > button.btn.btn-secondary'),
        deleteEmployeeDeleteButton: () => cy.get('#deleteEmployee'),
        employeeModal: () => cy.get('#employeeModal'),
    }


    clickEditButton(id){
        cy.contains('td', id)
        .parent('tr')
        .find('.fa-edit')
        .click();
    }

    clickDeleteButton(id){
        cy.contains('td', id)
        .parent('tr')
        .find('.fa-times')
        .click();
    }

    clickLogout(){
        this.elements.logoutLink().click();
    }   

    getIdFromRow(index){
        return this.elements.benefitsTableRows().find('tr').eq(index).find('td').eq(0).invoke('text');
    }

    clickAddEmployeeButton(){
        this.elements.addEmployeeButton().click();
    }

    clickAddEmployeeModalAddButton(){
        this.elements.addEmployeeAddButton().click();
    }

    clickAddEmployeeModalCancelButton(){
        this.elements.addEmployeeCancelButton().click();
    }

    clickUpdateEmployeeModalSaveButton(){
        this.elements.editEmployeeSaveButton().click();
    }

    clickUpdateEmployeeModalCancelButton(){
        this.elements.editEmployeeCancelButton().click();
    }

    getRowById(id) {
        const searchId = String(id).trim();

        return cy.contains('tbody td', searchId, {
            matchCase: false,
            timeout: 20000
        })
        .closest('tr')
        .should('exist')
        .should('be.visible');
    }

    getCellInfo(id, index){
        return this.getRowById(id)
        .find('td')
        .eq(index)
        .should('be.visible');
    }

    getIdFromRow($row){        
        return cy.wrap($row)
            .find('td')
            .first()
            .invoke('text')
            .then(text => text.trim());
    }

    getRowByIndex(index){
        return this.elements.benefitsTableRows()
            .find('tr')
            .eq(index)
            .should('be.visible');
    }   


    enterAddEmployeeInfo(firstName, lastName, dependents){
        this.elements.addEmployeeFirstNameInput().type(firstName);
        this.elements.addEmployeeLastNameInput().type(lastName);
        this.elements.addEmployeeDependentsInput().type(dependents);
    }

    enterUpdateEmployeeInfo(firstName, lastName, dependents){
        this.elements.editEmployeeFirstNameInput().clear().type(firstName);
        this.elements.editEmployeeLastNameInput().clear().type(lastName);
        this.elements.editEmployeeDependentsInput().clear().type(dependents);
    }

    deleteEmployee(id){
        this.clickDeleteButton(id);
        this.elements.deleteEmployeeDeleteButton().click();
    }

    getRowCount(){
        return this.elements.benefitsTableRows().find('tr').its('length');
    }

    waitForModalToClose(timeout = 10000){ 
        cy.get('#employeeModal', { timeout })
            .should('not.be.visible');
    }

}

export const dashBoard = new Dashboard();
