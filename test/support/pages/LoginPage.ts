export default class LoginPage {
  loginSuccess(user: {email: string; password: string}): void {
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
    cy.get('#login_button').click();
  }
  loginSuccessUserpass(username: string, password: string): void {
    cy.get('input[name=email]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('#login_button').click();
  }
}
