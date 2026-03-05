let auth = {
    Authorization: 'Basic VGVzdFVzZXI5MTM6fU51J0M2bmExQE5o',
  }
let employeeId = null;

describe('Employees API - POST', () =>{
    const randomNumber = Math.floor(Math.random() * 1000000);
    const newEmployee = {
        firstName: 'Brett',
        lastName: `Smith${randomNumber}`,
        username: `brett${randomNumber}`
      };

    

    it('POST Returns success on adding new employee with all valid fields', () =>{

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
            cy.cleanupEmployee(employeeId);
        })
    })
    

    it('POST Returns success on adding new employee with all valid fields and special characters in firstName', () =>{

        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: 'Brett`specialchar',
                lastName: `Smith${randomNumber}`,
                username: `brett${randomNumber}`,
              }

        }).then((response) =>{
            cy.log(response.body)
            employeeId = response.body.id;
            expect(response.status).to.eq(200)
        }).then(() => {
            cy.cleanupEmployee(employeeId);
        })
    })

    it('POST Returns success on adding new employee with all valid fields - including dependants', () =>{
        const employeeWithDepends ={
            newEmployee,
            dependants: Math.floor(Math.random() * 33)
        }
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
            cy.cleanupEmployee(employeeId);
        })

    })

    it('POST Returns success on adding new employee with all valid fields - including salary', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: 'Brett',
                lastName: `Smith${randomNumber}`,
                username: `brett${randomNumber}`,
                salary: 34222
              }

        }).then((response) =>{
            cy.log(response.body)
            employeeId = response.body.id;
            expect(response.status).to.eq(200)
        }).then(() => {
            cy.cleanupEmployee(employeeId);
        })

    })

    it('POST Returns 401 Error when no auth header provided', () =>{
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            body: newEmployee,
            failOnStatusCode: false
        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(401)
            expect(response.body.title).to.eq('Unauthorized');
        })
    })

    //not sure which code we want here
    it('POST Returns 400, 411, 415 Error when no body provided', () =>{
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.be.oneOf([400, 411, 415])
        })
    })

    it('POST Returns failure(400) on adding new employee without firstName', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                lastName: `Smith${randomNumber}`,
                username: `brett${randomNumber}`,
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })
    it('POST Returns failure(400) on adding new employee without lastName', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                username: `brett${randomNumber}`,
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee without userName', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee with negative dependants', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
                userName: `user${randomNumber}`,
                dependants: -30
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee with too many dependants', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
                userName: `user${randomNumber}`,
                dependants: 55
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee with string for dependants', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
                userName: `user${randomNumber}`,
                dependants: "tons"
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee with string for salary', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
                userName: `user${randomNumber}`,
                salary: "money"
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

    it('POST Returns failure(400) on adding new employee with negative salary', () =>{
        const employeeWithDepends ={
            newEmployee,
            salary: Math.floor(randomNumber)
        }
        cy.request({
            method: 'POST',
            url: '/api/Employees',
            headers: auth,
            body: {
                firstName: `Smith${randomNumber}`,
                lastName: `brett${randomNumber}`,
                userName: `user${randomNumber}`,
                salary: -14930
              },
              failOnStatusCode: false

        }).then((response) =>{
            cy.log(response.body)
            expect(response.status).to.eq(400)
        })

    })

})