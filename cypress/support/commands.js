Cypress.Commands.add('cleanupEmployee', (employeeId) => {
  if (!employeeId) {
    return;
  }

  cy.request({
    method: 'DELETE',
    url: `/api/Employees/${employeeId}`,
    headers: {
      Authorization: 'Basic VGVzdFVzZXI5MTM6fU51J0M2bmExQE5o',
    },
    failOnStatusCode: false,
  }).then((delResponse) => {
    expect(delResponse.status).to.eq(200);
  });
});