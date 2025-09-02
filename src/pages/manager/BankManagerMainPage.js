import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerPage = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountPage = page.getByRole('button', { name: 'Open Account' });
    this.customersPage = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerPage).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountPage).toBeVisible();
  }

  async assertCustomersButtonIsVisible() {
    await expect(this.customersPage).toBeVisible();
  }
}
