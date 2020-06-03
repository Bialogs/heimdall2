import { CreateUserDto } from "./users/dto/create-user.dto";
import { UpdateUserDto } from "./users/dto/update-user.dto";
import { DeleteUserDto } from "./users/dto/delete-user.dto";
import { User } from './users/user.model';
import { UserDto } from "./users/dto/user.dto";

export const ID: number = 7;

// @ts-ignore
export const TEST_USER: User = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    role: "user",
    title: "fake title",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    organization: "Fake Org",
    createdAt: new Date(),
    updatedAt: new Date()
}

// @ts-ignore
export const TEST_USER_WITHOUT_EMAIL: User = {
    firstName: "Test",
    lastName: "Dummy",
    role: "user",
    title: "fake title",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    organization: "Fake Org",
    createdAt: new Date(),
    updatedAt: new Date()
}

// @ts-ignore
export const TEST_USER_WITHOUT_FIRST_NAME: User = {
    email: "abc@yahoo.com",
    lastName: "Dummy",
    role: "user",
    title: "fake title",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    organization: "Fake Org",
    createdAt: new Date(),
    updatedAt: new Date()
}

// @ts-ignore
export const TEST_USER_WITHOUT_LAST_NAME: User = {
    email: "abc@yahoo.com",
    firstName: "Test",
    role: "user",
    title: "fake title",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    organization: "Fake Org",
    createdAt: new Date(),
    updatedAt: new Date()
}

// @ts-ignore
export const TEST_USER_WITHOUT_ORGANIZATION: User = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    role: "user",
    title: "fake title",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    createdAt: new Date(),
    updatedAt: new Date()
}

// @ts-ignore
export const TEST_USER_WITHOUT_TITLE: User = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    role: "user",
    // Encrypted password should match password, 'Letmein123'
    encryptedPassword: "$2b$14$qXq14f2Ttm/Sj2XiIQu3pub67ZkZ.vOalKSSjOiFCkvMZmn5y6Eiy",
    organization: "Fake Org",
    createdAt: new Date(),
    updatedAt: new Date()
}

export const NULL_USER: User = null;

// @ts-ignore
export const USER_ARRAY: User[] = [
    // @ts-ignore
    TEST_USER,
    // @ts-ignore
    TEST_USER_WITHOUT_FIRST_NAME,
];

export const CREATE_USER_DTO_TEST_OBJ: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

export const CREATE_USER_DTO_TEST_OBJ_WITH_UNMATCHING_PASSWORDS: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Password",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_FIRST_NAME: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_LAST_NAME: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_ORGANIZATION: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_TITLE: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_EMAIL_FIELD: CreateUserDto = {
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_INVALID_EMAIL_FIELD: CreateUserDto = {
    email: "NotAValidEmail",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_FIELD: CreateUserDto = {
    email: "abc@yahoo.com",
    passwordConfirmation: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

// @ts-ignore
export const CREATE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD_CONFIRMATION_FIELD: CreateUserDto = {
    email: "abc@yahoo.com",
    password: "Letmein123",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    organization: "Fake Org",
};

export const UPDATE_USER_DTO_TEST_OBJ: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_EMAIL: UpdateUserDto = {
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITH_INVALID_EMAIL: UpdateUserDto = {
    email: "NotAValidEmail",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_FIRST_NAME: UpdateUserDto = {
    email: "abc@yahoo.com",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_LAST_NAME: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_ORGANIZATION: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_TITLE: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_PASSWORD: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    passwordConfirmation: "Letmein123",
    currentPassword: "Letmein123"
};

// @ts-ignore
export const UPDATE_USER_DTO_TEST_WITHOUT_PASSWORD_CONFIRMATION: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    currentPassword: "Letmein123"
};

export const UPDATE_FAILURE_USER_DTO_TEST_OBJ: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein12",
    passwordConfirmation: "Letmein12",
    currentPassword: "Letmein12"
};

// @ts-ignore
export const UPDATE_USER_DTO_WITH_MISSING_CURRENT_PASSWORD_FIELD: UpdateUserDto = {
    email: "abc@yahoo.com",
    firstName: "Test",
    lastName: "Dummy",
    organization: "Fake Org",
    title: "fake title",
    password: "Letmein123",
    passwordConfirmation: "Letmein123",
};

export const DELETE_USER_DTO_TEST_OBJ: DeleteUserDto = {
    password: "Letmein123"
};

export const DELETE_FAILRE_USER_DTO_TEST_OBJ: DeleteUserDto = {
    password: "Letmein12"
};

// @ts-ignore
export const DELETE_USER_DTO_TEST_OBJ_WITH_MISSING_PASSWORD: DeleteUserDto = {};

// TEST_USER dto
export const USER_ONE_DTO = new UserDto(USER_ARRAY[0]);

export const USER_TWO_DTO = new UserDto(USER_ARRAY[1]);

export const USER_DTO_WITHOUT_EMAIL = new UserDto(TEST_USER_WITHOUT_EMAIL);

export const USER_DTO_WITHOUT_FIRST_NAME = new UserDto(TEST_USER_WITHOUT_FIRST_NAME);

export const USER_DTO_WITHOUT_LAST_NAME = new UserDto(TEST_USER_WITHOUT_LAST_NAME);

export const USER_DTO_WITHOUT_ORGANIZATION = new UserDto(TEST_USER_WITHOUT_ORGANIZATION);

export const USER_DTO_WITHOUT_TITLE = new UserDto(TEST_USER_WITHOUT_TITLE);

export const USER_DTO_ARRAY: UserDto[] = [USER_ONE_DTO, USER_TWO_DTO];

// export function usersServiceTestAssertions(user: UserDto) {
//     expect(user.email).toEqual(USER_ONE_DTO.email);
//     expect(user.firstName).toEqual(USER_ONE_DTO.firstName);
//     expect(user.lastName).toEqual(USER_ONE_DTO.lastName);
//     expect(user.title).toEqual(USER_ONE_DTO.title);
//     expect(user.organization).toEqual(USER_ONE_DTO.organization);

//     /* The id of the test constant is undefined, so if 
//         create is successful, the id's should not be equal */
//     let idFlag: boolean;
//     if (user.id != USER_ONE_DTO.id)
//         idFlag = false;
//     expect(idFlag).toBe(false);

//     // If create is successful, these two values should not be equal
//     let updateFlag: boolean;
//     if (user.updatedAt.valueOf() != USER_ONE_DTO.updatedAt.valueOf())
//         updateFlag = false;
//     expect(updateFlag).toBe(false);
// }
