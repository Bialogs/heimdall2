import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import * as consts from '../../src/test.constants';
import { ConfigModule } from '../../src/config/config.module';
import { ConfigService } from '../../src/config/config.service';

describe("UsersService Unit Tests", () => {
    let usersService: UsersService;
    let module: TestingModule;
    // Used for the remove() function
    let userID: number;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        dialect: 'postgres',
                        host: configService.get('DATABASE_HOST') || "127.0.0.1",
                        port: Number(configService.get('DATABASE_PORT')) || 5432,
                        username: configService.get('DATABASE_USERNAME') || "postgres",
                        password: configService.get('DATABASE_PASSWORD') || "",
                        database: configService.get('DATABASE_NAME') || `heimdall-server-${configService.get('NODE_ENV').toLowerCase()}`,
                        models: [User],
                    }),
                }),
                SequelizeModule.forFeature([User])
            ],
            providers: [UsersService,],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
    });

    // Checks to make sure the exists function throws exception for non-existant user
    it("should throw NotFoundException from exists function", () => {
        expect(() => { usersService.exists(consts.NULL_USER) }).toThrow("User with given id not found");
    });

    describe("Create function", () => {
        // Tests the create function
        it("should create", async () => {
            const user = await usersService.create(consts.CREATE_USER_DTO_TEST_OBJ);
            userID = user.id;

            expect(user.email).toEqual(consts.USER_ONE_DTO.email);
            expect(user.firstName).toEqual(consts.USER_ONE_DTO.firstName);
            expect(user.lastName).toEqual(consts.USER_ONE_DTO.lastName);
            expect(user.title).toEqual(consts.USER_ONE_DTO.title);
            expect(user.organization).toEqual(consts.USER_ONE_DTO.organization);

            /* The id of the test constant is undefined, so if 
                create is successful, the id's should not be equal */
            let idFlag: boolean;
            if (user.id != consts.USER_ONE_DTO.id)
                idFlag = false;
            expect(idFlag).toBe(false);

            // If create is successful, these two values should not be equal
            let updateFlag: boolean;
            if (user.updatedAt.valueOf() != consts.USER_ONE_DTO.updatedAt.valueOf())
                updateFlag = false;
            expect(updateFlag).toBe(false);
        });
    });

    describe("FindAll function", () => {
        // Tests the findAll function
        it("should findAll", async () => {
            const userdtoArray = await usersService.findAll();

            expect(userdtoArray[userdtoArray.length-1].email).toEqual(consts.USER_DTO_ARRAY[0].email);
            expect(userdtoArray[userdtoArray.length-1].firstName).toEqual(consts.USER_DTO_ARRAY[0].firstName);
            expect(userdtoArray[userdtoArray.length-1].lastName).toEqual(consts.USER_DTO_ARRAY[0].lastName);
            expect(userdtoArray[userdtoArray.length-1].title).toEqual(consts.USER_DTO_ARRAY[0].title);
            expect(userdtoArray[userdtoArray.length-1].organization).toEqual(consts.USER_DTO_ARRAY[0].organization);

            /* Expect that the dates equals each other for the createdAt value. Can't just see
                if the createdAt equal eachother due to time created being off by a couple of seconds */
            expect(userdtoArray[userdtoArray.length-1].createdAt.getDate()).toEqual(consts.USER_DTO_ARRAY[0].createdAt.getDate());

            /* The id of the test constant is undefined, so if 
                findAll is successful, the id's should not be equal */
            let idFlag: boolean;
            if (userdtoArray[userdtoArray.length-1].id != consts.USER_ONE_DTO.id)
                idFlag = false;
            expect(idFlag).toBe(false);
        });
    });

    describe("FindById function", () => {
        // Tests the findById function
        it("should findById", async () => {
            const user = await usersService.findById(userID);

            expect(user.email).toEqual(consts.USER_ONE_DTO.email);
            expect(user.firstName).toEqual(consts.USER_ONE_DTO.firstName);
            expect(user.lastName).toEqual(consts.USER_ONE_DTO.lastName);
            expect(user.title).toEqual(consts.USER_ONE_DTO.title);
            expect(user.organization).toEqual(consts.USER_ONE_DTO.organization);

            /* Expect that the dates equals each other for the createdAt value. Can't just see
                if the createdAt equal eachother due to time created being off by a couple of seconds */
            expect(user.createdAt.getDate()).toEqual(consts.USER_ONE_DTO.createdAt.getDate());

            /* The id of the test constant is undefined, so if 
                findById is successful, the id's should not be equal */
            let idFlag: boolean;
            if (user.id != consts.USER_ONE_DTO.id)
                idFlag = false;
            expect(idFlag).toBe(false);
        });
    });

    describe("FindByEmail function", () => {
            // Tests the findByEmail function
            it("should findByEmail", async () => {
                const user = await usersService.findByEmail(consts.TEST_USER.email)

                expect(user.email).toEqual(consts.USER_ONE_DTO.email);
                expect(user.firstName).toEqual(consts.USER_ONE_DTO.firstName);
                expect(user.lastName).toEqual(consts.USER_ONE_DTO.lastName);
                expect(user.title).toEqual(consts.USER_ONE_DTO.title);
                expect(user.organization).toEqual(consts.USER_ONE_DTO.organization);

                /* Expect that the dates equals each other for the createdAt value. Can't just see
                    if the createdAt equal eachother due to time created being off by a couple of seconds */
                expect(user.createdAt.getDate()).toEqual(consts.USER_ONE_DTO.createdAt.getDate());

                /* The id of the test constant is undefined, so if 
                    findByEmail is successful, the id's should not be equal */
                let idFlag: boolean;
                if (user.id != consts.USER_ONE_DTO.id)
                    idFlag = false;
                expect(idFlag).toBe(false);
            });
        });

        describe("Update function", () => {
            // Tests the update function (Successful update)
            it("should update everything", async () => {
                const updatedUser = await usersService.update(userID, consts.UPDATE_USER_DTO_TEST_OBJ);

                expect(updatedUser.email).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.email);
                expect(updatedUser.firstName).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.firstName);
                expect(updatedUser.lastName).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.lastName);
                expect(updatedUser.title).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.title);
                expect(updatedUser.organization).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.organization);

                // If create is successful, these two values should not be equal
                let updateFlag: boolean;
                if (updatedUser.updatedAt.valueOf() != consts.USER_ONE_DTO.updatedAt.valueOf())
                    updateFlag = false;
                expect(updateFlag).toBe(false);
            });

            // Tests the update function (Fail update)
            it("should fail the update (throw UnauthorizedException)", async () => {
                expect(async () => { await usersService.update(userID, consts.UPDATE_FAILURE_USER_DTO_TEST_OBJ) })
                    .rejects.toThrow();
            });
        });


        describe("Remove function", () => {
            // Tests the remove function (Fail remove)
            it("should fail remove (throw UnauthorizedException)", async () => {
                expect(async () => { await usersService.remove(userID, consts.DELETE_FAILRE_USER_DTO_TEST_OBJ) })
                    .rejects.toThrow();
            });

            // Tests the remove function (Successful remove)
            it("should remove", async () => {
                const removedUser = await usersService.remove(userID, consts.DELETE_USER_DTO_TEST_OBJ);
                expect(removedUser.email).toEqual(consts.UPDATE_USER_DTO_TEST_OBJ.email);
            });
        });

        afterAll(async () => {
            module.close();
        });
    })
