import {ArgumentMetadata, BadRequestException} from '@nestjs/common';
import {
  CREATE_USER_DTO_TEST_OBJ,
  CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD,
  UPDATE_USER_DTO_TEST_OBJ,
  UPDATE_USER_DTO_TEST_WITHOUT_PASSWORD,
  UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS
} from '../../test/constants/users-test.constant';
import {
  checkLength,
  hasClasses,
  noRepeats,
  PasswordComplexityPipe
} from './password-complexity.pipe';

describe('PasswordComplexityPipe', () => {
  let passwordComplexityPipe: PasswordComplexityPipe;
  let metaData: ArgumentMetadata;

  beforeEach(() => {
    passwordComplexityPipe = new PasswordComplexityPipe();
  });

  it('should make sure that the passwords-complexity pipe is defined', () => {
    expect(passwordComplexityPipe).toBeDefined();
  });

  describe('Helper Function Tests', () => {
    describe('checkLength', () => {
      it('should fail because the password has less than 15 characters', () => {
        expect(checkLength('ShortPassword')).toBeFalsy();
      });
      it('should pass because the password has more than 15 characters', () => {
        expect(checkLength('LongerTestPassword')).toBeTruthy();
      });
    });

    describe('hasClasses', () => {
      it('should fail because the password does not contain a special character', () => {
        expect(hasClasses('Testpasswordwithoutspecialchar7')).toBeFalsy();
      });

      it('should fail because the password does not contain a number', () => {
        expect(hasClasses('Testpasswordwithoutnumber$')).toBeFalsy();
      });

      it('should fail because the password does not contain an uppercase letter', () => {
        expect(hasClasses('testpasswordwithoutuppercase7$')).toBeFalsy();
      });

      it('should fail because the password does not contain a lowercase letter', () => {
        expect(hasClasses('TESTPASSWORDWITHOUTLOWERCASE7$')).toBeFalsy();
      });

      it('should pass because the password has all character classes and is at least 15 characters', () => {
        expect(hasClasses('Atestpassword7$')).toBeTruthy();
      });
    });

    describe('noRepeats', () => {
      it('should fail because there is more than 3 consecutive repeating lowercase characters in the password', () => {
        expect(noRepeats('aaaa')).toBeFalsy();
      });

      it('should fail because there is more than 3 lowercase characters back-to-back in the password', () => {
        expect(noRepeats('test')).toBeFalsy();
      });

      it('should fail because there is more than 3 consecutive repeating uppercase characters in the password', () => {
        expect(noRepeats('AAAA')).toBeFalsy();
      });

      it('should fail because there is more than 3 uppercase characters back-to-back in the password', () => {
        expect(noRepeats('TEST')).toBeFalsy();
      });

      it('should fail because there is more than 3 consecutive repeating numbers in the password', () => {
        expect(noRepeats('7777')).toBeFalsy();
      });

      it('should fail because there is more than 3 numbers back-to-back in the password', () => {
        expect(noRepeats('1078')).toBeFalsy();
      });

      it('should fail because there is more than 3 consecutive repeating numbers in the password', () => {
        expect(noRepeats('$$$$')).toBeFalsy();
      });

      it('should fail because there is more than 3 special characters back-to-back in the password', () => {
        expect(noRepeats('!@#$')).toBeFalsy();
      });

      it('should fail because there is more than 3 consecutive white spaces in the password', () => {
        expect(noRepeats('spa    ce')).toBeFalsy();
      });

      it('should pass because the password meets all the minimum requirements', () => {
        expect(noRepeats('aaaBBB111$$$')).toBeTruthy();
      });
    });
  });

  /* Tests the complexity of a user's password and that when it meets the requirements of:
    15 characters or longer, at least 1 uppercase letter, lowercase letter, number, special character,
    the password meets the requirements of not containing more than three consecutive repeating
    characters, and it contains no more than four repeating characters from the same character class,
    the same dto object will be returned*/
  describe('Test Valid Password', () => {
    it('should return the same CreateUserDto', () => {
      expect(
        passwordComplexityPipe.transform(CREATE_USER_DTO_TEST_OBJ, metaData)
      ).toEqual(CREATE_USER_DTO_TEST_OBJ);
    });

    it('should return the same UpdateUserDto', () => {
      expect(
        passwordComplexityPipe.transform(UPDATE_USER_DTO_TEST_OBJ, metaData)
      ).toEqual(UPDATE_USER_DTO_TEST_OBJ);
    });

    it('should return UpdateUserDto if password fields are null', () => {
      expect(
        passwordComplexityPipe.transform(
          UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS,
          metaData
        )
      ).toEqual(UPDATE_USER_DTO_WITHOUT_PASSWORD_FIELDS);
    });
  });

  /* Tests that when a password does not meet all the minimum requirements,
    a BadRequestException is thrown */
  describe('Test Invalid Password', () => {
    it('should throw a BadRequestException for CreateUserDto with missing password', () => {
      expect(() =>
        passwordComplexityPipe.transform(
          CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD,
          metaData
        )
      ).toThrowError(BadRequestException);
      expect(() =>
        passwordComplexityPipe.transform(
          CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD,
          metaData
        )
      ).toThrowError('Password must be of type string');
    });

    it('should throw a BadRequestException for UpdateUserDto with missing password', () => {
      expect(() =>
        passwordComplexityPipe.transform(
          UPDATE_USER_DTO_TEST_WITHOUT_PASSWORD,
          metaData
        )
      ).toThrowError(BadRequestException);
      expect(() =>
        passwordComplexityPipe.transform(
          UPDATE_USER_DTO_TEST_WITHOUT_PASSWORD,
          metaData
        )
      ).toThrowError('Password must be of type string');
    });
  });
});
