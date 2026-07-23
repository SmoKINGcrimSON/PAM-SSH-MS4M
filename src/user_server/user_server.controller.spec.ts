import { Test, TestingModule } from '@nestjs/testing';
import {UserServerController} from './user_server.controller';
import {UserServerService} from './user_server.service';

describe('UserServerController', () => {
    let controller: UserServerController;

    const mockUserServerService = {
        getAllUserServers: jest.fn(),
        getMyUsersInOneServer: jest.fn(),
        createUserServer: jest.fn(),
        updateUserServer: jest.fn(),
        deleteUserServer: jest.fn(),
    };

    // Shared test data
    const mockUserServers = [
        {
            user_id: 1,
            server_id: 1,
            ssh_username: 'user1',
            encrypted_password: 'hashedpassword1',
        },
        {
            user_id: 2,
            server_id: 2,
            ssh_username: 'user2',
            encrypted_password: 'hashedpassword2',
        },
    ];

    const mockCreateUserServerDto = {
        user_id: 1,
        server_id: 1,
        ssh_username: 'user1',
        encrypted_password: 'hashedpassword1',
    };

    const mockUpdateUserServerDto = {
        user_id: 1,
        server_id: 1,
        ssh_username: 'updateduser',
        encrypted_password: 'updatedhashedpassword',
    };

    const mockUpdatedUserServer = {
        user_id: 1,
        server_id: 1,
        ssh_username: 'updateduser',
        encrypted_password: 'updatedhashedpassword',
    };

    const mockDeleteUserServerDto = {
        user_id: 1,
        server_id: 1,
        ssh_username: 'user1',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [UserServerController],
        providers: [
            {
            provide: UserServerService,
            useValue: mockUserServerService,
            },
        ],
        }).compile();

        controller = module.get<UserServerController>(UserServerController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // 1. GET /UserServer
    it('should return all user-servers with optional limit', async () => {
        // Mock the service method to return the mock users
        mockUserServerService.getAllUserServers.mockResolvedValue(mockUserServers);
        // Call the controller method with a limit of 1
        const result = await controller.getAllUserServers('1');
        // Assert that the service method was called with the correct limit
        expect(mockUserServerService.getAllUserServers)
        .toHaveBeenCalledWith({
            limit: 1,
        });
        // Assert that the result matches the mock user-servers
        expect(result).toEqual(mockUserServers);
    });

    //2. CREATE /UserServer
    it('should create a new user-server', async () => {
        // Mock the service method to return the mock created user-server
        mockUserServerService.createUserServer.mockResolvedValue(mockCreateUserServerDto);
        // Call the controller method with the mock create user-server DTO
        const result = await controller.createUserServer(mockCreateUserServerDto);
        // Assert that the service method was called with the correct DTO
        expect(mockUserServerService.createUserServer).toHaveBeenCalledWith(mockCreateUserServerDto);
        // Assert that the result matches the mock created user-server
        expect(result).toEqual(mockCreateUserServerDto);
    });

    //3. UPDATE /UserServer
    it('should update a user-server', async () => {
        // Mock the service method to return the mock updated user-server
        mockUserServerService.updateUserServer.mockResolvedValue(mockUpdatedUserServer);
        // Call the controller method with the mock update user-server DTO
        const result = await controller.updateUserServer(mockUpdateUserServerDto);
        // Assert that the service method was called with the correct DTO
        expect(mockUserServerService.updateUserServer).toHaveBeenCalledWith(mockUpdateUserServerDto);
        // Assert that the result matches the mock updated user-server
        expect(result).toEqual(mockUpdatedUserServer);
    });

    //4. DELETE /UserServer
    it('should delete a user-server', async () => {
        // Mock the service method to return undefined (void)
        mockUserServerService.deleteUserServer.mockResolvedValue(undefined);
        // Call the controller method with the mock delete user-server DTO
        const result = await controller.deleteUserServer(mockDeleteUserServerDto);
        // Assert that the service method was called with the correct DTO
        expect(mockUserServerService.deleteUserServer).toHaveBeenCalledWith(mockDeleteUserServerDto);
        // Assert that the result is undefined (void)
        expect(result).toBeUndefined();
    });
});