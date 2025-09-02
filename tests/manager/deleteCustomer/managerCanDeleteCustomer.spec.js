import { test } from '@playwright/test';
import { AddCustomerPage} from '../../../src/pages/manager/AddCustomerPage';
import { faker } from '@faker-js/faker';

const customer = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postCode: faker.location.zipCode(),
};

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  

  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.open();

  await addCustomerPage.fillFirstName(customer.firstName);
  await addCustomerPage.fillLastName(customer.lastName);
  await addCustomerPage.fillPostCode(customer.postCode);
  await addCustomerPage.clickAddCustomerButton();
});

test('Assert manager can delete customer', async ({ page }) => {
  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
  const addCustomerPage = new AddCustomerPage(page);

  await addCustomerPage.clickCustomersButton();

  await addCustomerPage.clickDeleteRowWithCustomer(customer.firstName);
  await addCustomerPage.assertCustomerRowIsHidden(customer.firstName);
  await page.reload();
  await addCustomerPage.assertCustomerRowIsHidden(customer.firstName);
});
