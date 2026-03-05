let auth = {
    Authorization: 'Basic VGVzdFVzZXI5MTI6SXtEUld9VnJsKjZq',
  };

describe('Employees API - Delete', () => {
    let createdEmployeeId = null;
    let createdUsername = null;

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
          createdEmployeeId = postResponse.body.id;
          expect(postResponse.status).to.eq(200);

          cy.request({
            method: 'GET',
            url: '/api/Employees',
            headers: auth
          }).then((getResponse) => {
            const employee = getResponse.body.find(emp => emp.id === createdEmployeeId);
            expect(employee).to.exist;
           // createdEmployeeId = employee.id;
           // createdUsername = employee.username;
          });
        });
      });

    it('DELETE existing employee returns 200 and remmoves it from list', () => {
        cy.request({
          method: 'DELETE',
          url: `/api/Employees/${createdEmployeeId}`,
          headers: auth,
          failOnStatusCode: false

        }).then((deleteResponse) => {
          cy.log('Delete response body:', deleteResponse.body);
          expect(deleteResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: '/api/Employees',
          headers: auth
        }).then((getResponse) => {
          const stillExists = getResponse.body.some(emp => emp.id === createdEmployeeId);
          expect(stillExists).to.be.false;
        });
        
      });

      it('DELETE existing employee returns 200 and GET for deleted employee fails and returns 400', () => {
        cy.request({
          method: 'DELETE',
          url: `/api/Employees/${createdEmployeeId}`,
          headers: auth,
          failOnStatusCode: false
          
        }).then((deleteResponse) => {
          cy.log('Delete response body:', deleteResponse.body);
          expect(deleteResponse.status).to.eq(200);
        });
    
        cy.request({
          method: 'GET',
          url: `/api/Employees/${createdEmployeeId}`,
          headers: auth,
          failOnStatusCode: false

        }).then((getResponse) => {
            cy.log(getResponse.body)
          expect(getResponse.status).to.eq(400)
          
        });
        
      });

      
})

describe('API Tests - DELETE - No Setup', () =>{
    it('DELETE on bad or invalid Employee ID returns appropriate status (404, 405, 200)', () => {
        const fakeId = '00000000-0000-0000-0000-000000000000';
    
        cy.request({
          method: 'DELETE',
          url: `/api/Employees/${fakeId}`,
          headers: auth,
          failOnStatusCode: false
        }).then((response) => {
          cy.log('Delete non-existent response:', response.status, response.body);
          expect(response.status).to.be.oneOf([200, 404, 405]); 
        });
      });
})