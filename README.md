# paylocity-interview

After cloning run **_npm install_** in your terminal window to get all dependent packages

To Run Cypress enter in the terminal: **_npx cypress open_**

Choose ***E2E Testing*** and select your browser then select the test suite you wish to run

To Run ALL API Tests without the Cypress UI: **_npx cypress run --spec "cypress/e2e/api/\*.cy.js"_**  
To Run ALL UI Tests without the Cypress UI: **_npx cypress run --spec "cypress/e2e/UI/\*.cy.js"_**
