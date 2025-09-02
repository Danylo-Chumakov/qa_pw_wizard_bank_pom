import { expect } from '@playwright/test';
import { faker, th } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.locator('button.btn.btn-default');
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersTable = page.locator('table.table-bordered.table-striped');
    this.customersInfo = this.customersTable.locator('tbody tr');
    this.currencyInput = page.getByTestId('currency');
    this.selectCustomer = page.getByTestId('userSelect');
    this.searchCustoer = page.getByPlaceholder('Search Customer');
  }

  getCustomerRow(index = 0) {
    let row;
    if (index === -1) {
      row = this.customersInfo.last();
    } else {
      row = this.customersInfo.nth(index);
    }
    return {
      firstName: row.locator('td').nth(0),
      lastName: row.locator('td').nth(1),
      postCode: row.locator('td').nth(2),
      accountNumber: row.locator('td').nth(3),
      deleteButton: row.locator('td').nth(4).getByRole('button').first(),
    };
  }

  async getCustomerByName(customerName) {
  const row = this.customersInfo.filter({ hasText: customerName }).first();

  await expect(row).toBeVisible({ timeout: 5000 });

  return {
    firstName: row.locator('td').nth(0),
    lastName: row.locator('td').nth(1),
    postCode: row.locator('td').nth(2),
    accountNumber: row.locator('td').nth(3),
    deleteButton: row.locator('td').nth(4).getByRole('button').first(),
  };
}

  getCustomerRowLocator(customerName = this.fillingCustomerInfo.firstName) {
    return this.customersInfo.filter({ 
      hasText: customerName 
    }).first();
  }

  getSelectedCurrencyValue() {
    return this.currencyInput.locator('option:checked');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async openAccount() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async openCustomers() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/list',
    );
  }

  async fillFirstName(filledName) {
    await this.firstNameInput.fill(filledName);
  }

  async fillLastName(filledName) {
    await this.lastNameInput.fill(filledName);
  }

  async fillPostCode(filledName) {
    await this.postCodeInput.fill(filledName);
  }

  async clickAddCustomerButton() {
    this.page.once('dialog', dialog => dialog.accept());
    await this.addCustomerButton.click();
  }

  async clickCustomersButton() {
    await this.customersButton.click();
  }

  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }

  async assertFirstNameInTheLastRowIs(filledName) {
    await expect(this.getCustomerRow(-1).firstName).toHaveText(filledName);
  }

  async assertLastNameInTheLastRowIs(filledName) {
    await expect(this.getCustomerRow(-1).lastName).toHaveText(filledName);
  }

  async assertPostCodeInTheLastRowIs(filledName) {
    await expect(this.getCustomerRow(-1).postCode).toHaveText(filledName);
  }

  async assertAccountNumberInTheLastRowIsEmpty() {
    await expect(this.getCustomerRow(-1).accountNumber).toHaveText('');
  }

  async assertAccountNumberIsNotEmpty(filledName) {
    const customer = await this.getCustomerByName(filledName);
    await expect(customer.accountNumber).not.toHaveText('');
  }

  async clickDeleteRowWithCustomer(filledName) {
    const customer = await this.getCustomerByName(filledName);
    await customer.deleteButton.click();
  }

  async assertCustomerRowIsVisibe(filledName) {
    const customerRow = this.getCustomerRowLocator(filledName);
    await expect(customerRow).toBeVisible();
  }

  async assertCustomerRowIsHidden(filledName) {
    const customerRow = this.getCustomerRowLocator(filledName);
    await expect(customerRow).toBeHidden();
  }

  async assertCustomerRowDoesNotExist(filledName) {
    const customerRow = this.getCustomerRowLocator(filledName);
    await expect(customerRow).toHaveCount(0);
  }

  async selectCurrency (currency) {
    await this.currencyInput.selectOption(currency);
  }

  async assertSelectedCurrency(value) {
    await expect(this.getSelectedCurrencyValue()).toHaveText(value);
  }

  async selectCustomerPlate(customer) {
    await this.selectCustomer.selectOption(customer);
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async fillSearchCustomer(searchCustomer) {
    await this.searchCustoer.fill(searchCustomer);
  }

  async assertCustomerTableRowCount(expectedCount) {
    const count = await this.customersInfo.count();
    await expect(count).toBe(expectedCount);
  }
}

