let auth = {
    Authorization: 'Basic VGVzdFVzZXI5MTM6fU51J0M2bmExQE5o',
  };

  let employeeId = null;

  describe('Employees API - PUT', () => {
    let createdEmployeeId = null;
    let createdUsername = null;
    let originalEmployee = null;
    let originalBenefitCost = null;

    beforeEach(() => {
        const randomNumber = Math.floor(Math.random() * 1000000);
        const newEmployee = {
          firstName: 'Brett',
          lastName: `Smith${randomNumber}`,
          username: `user${randomNumber}`,
          dependants: 0
        };
    
        cy.request({
          method: 'POST',
          url: '/api/Employees',
          headers: auth,
          body: newEmployee,
          failOnStatusCode: false
        }).then((postResponse) => {
          expect(postResponse.status).to.eq(200);

          cy.request({
            method: 'GET',
            url: '/api/Employees',
            headers: auth
          }).then((getResponse) => {
            const employee = getResponse.body.find(emp => emp.username === 'TestUser912');//I'd change this once the username was actually working
            expect(employee).to.exist;
            createdEmployeeId = employee.id;
            createdUsername = employee.username;
            originalEmployee = employee;
            originalBenefitCost = employee.benefitsCost;
          });
        });
      });

    afterEach(() =>{
      cy.cleanupEmployee(createdEmployeeId);
    })

    it('updates dependants and salary and reflects changes in GET', () => {
        const updatedEmployee = {
          id: createdEmployeeId,
          firstName: originalEmployee.firstName, 
          lastName: originalEmployee.lastName,
          username: originalEmployee.username,
          dependants: 5,
          salary: 75000.00
        };
    
        cy.request({
          method: 'PUT',
          url: '/api/Employees',
          headers: auth,
          body: updatedEmployee,
          failOnStatusCode: false
        }).then((putResponse) => {
          cy.log('PUT response body:', putResponse.body);
          expect(putResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: '/api/Employees',
          headers: auth
        }).then((getResponse) => {
          const updated = getResponse.body.find(emp => emp.id === createdEmployeeId);
          expect(updated).to.exist;
    
          expect(updated.dependants).to.eq(5);
          expect(updated.salary).to.eq(75000.00);    
        });
      });

      it('updates to Employee lastname reflects changes in GET', () => {
        const updatedEmployee = {
          id: createdEmployeeId,
          firstName: originalEmployee.firstName, 
          lastName: 'lastNameChanged',
          username: originalEmployee.username,
        };
    
        cy.request({
          method: 'PUT',
          url: '/api/Employees',
          headers: auth,
          body: updatedEmployee,
          failOnStatusCode: false
        }).then((putResponse) => {
          cy.log('PUT response body:', putResponse.body);
          expect(putResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: '/api/Employees',
          headers: auth
        }).then((getResponse) => {
          const updated = getResponse.body.find(emp => emp.id === createdEmployeeId);
          cy.log(getResponse);
          expect(updated).to.exist;
    
          expect(updated.lastName).to.eq('lastNameChanged');
    
        });
      });

      it('updates to Employee firstName reflects changes in GET', () => {
        const updatedEmployee = {
          id: createdEmployeeId,
          firstName: 'ChangedFirstName', 
          lastName: originalEmployee.lastName,
          username: originalEmployee.username,
        };
    
        cy.request({
          method: 'PUT',
          url: '/api/Employees',
          headers: auth,
          body: updatedEmployee,
          failOnStatusCode: false
        }).then((putResponse) => {
          cy.log('PUT response body:', putResponse.body);
          expect(putResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: '/api/Employees',
          headers: auth
        }).then((getResponse) => {
          const updated = getResponse.body.find(emp => emp.id === createdEmployeeId);
          cy.log(getResponse);
          expect(updated).to.exist;
    
          expect(updated.firstName).to.eq('ChangedFirstName');
    
        });
      });

      //not sure on if we want usernames to be changed, I'd assume not
      it('updates to Employee username should maintain the original username', () => {
        const updatedEmployee = {
          id: createdEmployeeId,
          firstName: originalEmployee.firstName, 
          lastName: originalEmployee.lastName,
          username: 'newUserName',
        };
    
        cy.request({
          method: 'PUT',
          url: '/api/Employees',
          headers: auth,
          body: updatedEmployee,
          failOnStatusCode: false
        }).then((putResponse) => {
          cy.log('PUT response body:', putResponse.body);
          expect(putResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: '/api/Employees',
          headers: auth
        }).then((getResponse) => {
          const updated = getResponse.body.find(emp => emp.id === createdEmployeeId);
          cy.log(getResponse);
          expect(updated).to.exist;
    
          expect(updated.username).to.eq(originalEmployee.username);
    
        });
      });
           

      it('updates dependants and salary with negative numbers and shows appropriate error(400)', () => {
        const updatedEmployee = {
          id: createdEmployeeId,
          firstName: originalEmployee.firstName, 
          lastName: originalEmployee.lastName,
          username: originalEmployee.username,
          dependants: -5,
          salary: -75000.00
        };
    
        cy.request({
          method: 'PUT',
          url: '/api/Employees',
          headers: auth,
          body: updatedEmployee,
          failOnStatusCode: false
        }).then((putResponse) => {
          cy.log('PUT response body:', putResponse.body);
          expect(putResponse.status).to.eq(400);
        });
        
      });



  })