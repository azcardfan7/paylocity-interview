let auth = {
    Authorization: 'Basic VGVzdFVzZXI5MTM6fU51J0M2bmExQE5o',
  }

describe('Employees API - GET', () =>{
    const randomNumber = Math.floor(Math.random() * 1000000);
    const newEmployee = {
        firstName: 'Brett',
        lastName: `Smith${randomNumber}`,
        username: `brett${randomNumber}`
      };

    it('GET Returns 200 and List of employees', () => {
        cy.request({
            method: 'GET',
            url: '/api/Employees',
            headers: auth,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            
        })
    })

    it('GET/{id} returns 200 for valid ID', () => {
        let employeeId = null
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: newEmployee,

        }).then((response) =>{
            cy.log(response.body)
            employeeId = response.body.id;
            expect(response.status).to.eq(200)
        }).then(() => {
            cy.request({
                method: 'GET',
                url: `/api/Employees/${employeeId}`,
                headers: auth,
                failOnStatusCode: false,

            }).then((response) => {
                cy.log(response.body);
                expect(response.status).to.eq(200);
                expect(response.body.id).to.eq(employeeId);
            })
        }).then(() => {
            cy.cleanupEmployee(employeeId);
        })
    
    })

    it('GET/{id} returns 404 for invalid ID', () => {
        let employeeId = '00000000-0000-0000-0000-000000000000'
        cy.request({
            method: 'GET',
            url: `/api/Employees/${employeeId}`,
            headers: auth,
            failOnStatusCode: false,

        }).then((response) => {
            expect(response.status).to.eq(404);
        })
    })

    it('GET Returns 401 AUTH error without Auth header', () => {
        cy.request({
            method: 'GET',
            url: '/api/Employees',
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.title).to.eq('Unauthorized');
        })
    })

    it('GET Returns 400 Bad Request with an invalid auth header token', () => {
        cy.request({
            method: 'GET',
            url: '/api/Employees',
            headers: {
                Authorization: 'Basic 42ff39832fdasfaw4983'
            },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
        })
    })
})