Given(/^there is a document "([^"]*)" with the field "([^"]*)" set to (\d+) in collection "([^"]*)"$/, (id, field, value, collection) => {
  cy.task('db:update', { collection, id, field, value })
});

Then(/^the count (\d+) is in the element "([^"]*)"$/, (count, field) => {
  cy.get(field).contains(count);
});

Then(/^there is a document "([^"]*)" with the json "([^"]*)" in collection "([^"]*)"$/, (doc, json, collection) => {
  cy.readFile(json).then((data) => cy.task('db:update:project', { collection, doc, data }));
});