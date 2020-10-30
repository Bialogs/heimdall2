import {Page} from 'puppeteer';

export class LogInPage {
  async loginSuccess(page: Page, user: any): Promise<void> {
    await expect(page).toFillForm('#login_form', {
      email: user.email,
      password: user.password
    });
    await Promise.all([
      page.waitForSelector('#uploadtab-local'),
      page.click('#login_button')
    ]);
  }

  async loginFailure(page: Page, user: any): Promise<void> {
    await expect(page).toFillForm('#login_form', {
      email: user.email,
      password: user.password
    });
    await Promise.all([
      page.waitForSelector('#info-snackbar'),
      page.click('#login_button')
    ]);
  }

  async logout(page: Page): Promise<void> {
    await Promise.all([
      page.waitForSelector('#logout_button'),
      page.click('#logout_button')
    ]);
  }

  async switchToRegister(page: Page): Promise<void> {
    await Promise.all([
      page.waitForSelector('#login_button'),
      page.click('#sign_up_button')
    ]);
  }

  async dismissToast(page: Page): Promise<void> {
    await Promise.all([
      page.waitForSelector('#info-snackbar'),
      page.click('#hide-snackbar')
    ]);
  }
}
