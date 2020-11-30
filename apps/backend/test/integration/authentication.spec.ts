import {Test, TestingModule} from '@nestjs/testing';
import {AppModule} from '../../src/app.module';
import {ConfigService} from '../../src/config/config.service';
import {DatabaseService} from '../../src/database/database.service';
import {
  BAD_LOGIN_AUTHENTICATION,
  CREATE_USER_DTO_TEST_OBJ,
  LOGIN_AUTHENTICATION
} from '../constants/users-test.constant';
import {IntegrationSpecHelper} from './helpers/integration-spec.helper';
import {LogInPage} from './pages/log-in.page';
import {UploadNexusPage} from './pages/upload-nexus.page';
import {LogInVerifier} from './verifiers/log-in.verifier';
import {NavbarVerifier} from './verifiers/navbar.verifier';
import {ToastVerifier} from './verifiers/toast.verifier';
import {UploadNexusVerifier} from './verifiers/upload-nexus.verifier';

describe('Authentication', () => {
  let databaseService: DatabaseService;
  let configService: ConfigService;
  let appUrl: string;
  let integrationSpecHelper: IntegrationSpecHelper;

  const logInPage = new LogInPage();
  const logInVerifier = new LogInVerifier();
  const toastVerifier = new ToastVerifier();
  const navbarVerifier = new NavbarVerifier();
  const uploadNexusPage = new UploadNexusPage();
  const uploadNexusVerifier = new UploadNexusVerifier();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [DatabaseService, ConfigService]
    }).compile();

    databaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    configService = moduleFixture.get<ConfigService>(ConfigService);

    appUrl = `http://localhost:${configService.get('PORT') || '3000'}`;

    integrationSpecHelper = new IntegrationSpecHelper(appUrl);
  });

  beforeEach(async () => {
    await page.goto(appUrl);
  });

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await databaseService.cleanAll();
  });

  describe('Login Form', () => {
    it('authenticates a user with valid credentials', async () => {
      // Scenario Description: A user successfully authenticates with username and
      // password. The navbar is checked for the presence of correct buttons and title
      await integrationSpecHelper.addUser(CREATE_USER_DTO_TEST_OBJ);
      await logInPage.loginSuccess(page, LOGIN_AUTHENTICATION);
      await uploadNexusVerifier.verifyNexusLoaded(page);
    });

    it('fails to authenticate a user with an incorrect password', async () => {
      // Scenario Description: If a user fails to authenticate they will be brought back
      // to the login form with an error.
      await integrationSpecHelper.addUser(CREATE_USER_DTO_TEST_OBJ);
      await logInPage.loginFailure(page, BAD_LOGIN_AUTHENTICATION);
      await logInVerifier.verifyLoginFormPresent(page);
      await toastVerifier.verifyErrorPresent(
        page,
        'Incorrect Username or Password'
      );
    });

    it('fails to find a user that does not exist', async () => {
      // Scenario Description: If a user is not found in the database an error toast will
      // be shown to the user.
      await logInPage.loginFailure(page, CREATE_USER_DTO_TEST_OBJ);
      await logInVerifier.verifyLoginFormPresent(page);
      await toastVerifier.verifyErrorPresent(
        page,
        'Incorrect Username or Password'
      );
    });
  });

  describe('Logout Button', () => {
    it('logs a user out', async () => {
      // Scenario Description: After successfully authenticating and then clicking log out
      // the user should see an empty log in page.
      await integrationSpecHelper.addUser(CREATE_USER_DTO_TEST_OBJ);
      await logInPage.loginSuccess(page, LOGIN_AUTHENTICATION);
      await uploadNexusVerifier.verifyNexusLoaded(page);
      await uploadNexusPage.switchToTab(page, 'database');
      await navbarVerifier.verifyLogout(page);
      await logInPage.logout(page);
      await logInVerifier.verifyLoginFormPresent(page);
    });
  });

  afterAll(async () => {
    await page.evaluate(() => {
      localStorage.clear();
    });
    await databaseService.closeConnection();
  });
});
