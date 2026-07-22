import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    getAllUsers: jest.fn(),
    getUser: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  // Shared test data
  const mockUsers = [
    {
      user_id: 1,
      username: 'admin',
      user_type: 'superuser',
      hash_password: 'hashedpassword',
    },
    {
      user_id: 2,
      username: 'fernando',
      user_type: 'admin',
      hash_password: 'hashedpassword2',
    },
  ];

  const mockUser = {
    user_id: 1,
    username: 'admin',
    user_type: 'superuser',
    hash_password: 'hashedpassword',
  };

  const mockCreateUserDto = {
    username: 'newuser',
    user_type: 'admin',
    hash_password: 'hashedpassword',
  };

  const mockUpdateUserDto = {
    username: 'updateduser',
    user_type: 'admin',
    hash_password: 'updatedhashedpassword',
  };

  const mockUpdatedUser = {
    user_id: 1,
    ...mockUpdateUserDto,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Controller exists
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 2. GET /user
  it('should return all users with optional limit', async () => {
    // Mock the service method to return the mock users
    mockUserService.getAllUsers.mockResolvedValue(mockUsers);
    // Call the controller method with a limit of 1
    const result = await controller.getAllUsers('1');
    // Assert that the service method was called with the correct limit
    expect(mockUserService.getAllUsers)
      .toHaveBeenCalledWith({
        limit: 1,
      });
    // Assert that the result matches the mock users
    expect(result).toEqual(mockUsers);

  });

  // 3. GET /user/:id
  it('should return a user by ID', async () => {
    // Mock the service method to return the mock user
    mockUserService.getUser
      .mockResolvedValue(mockUser);
    // Call the controller method with an ID of '1'
    const result = await controller.getUser('1');
    // Assert that the service method was called with the correct ID
    expect(mockUserService.getUser)
      .toHaveBeenCalledWith({
        id: 1,
      });
    // Assert that the result matches the mock user
    expect(result).toEqual(mockUser);
  });

  // 4. POST /user
  it('should create a new user', async () => {
    // Mock the service method to return the mock created user
    mockUserService.createUser.mockResolvedValue(mockCreateUserDto);
    // Call the controller method with the mock create user DTO
    const result = await controller.createUser(
      mockCreateUserDto
    );
    // Assert that the service method was called with the correct DTO
    expect(mockUserService.createUser)
      .toHaveBeenCalledWith(
        mockCreateUserDto
      );
    // Assert that the result matches the mock created user
    expect(result).toEqual(mockCreateUserDto);
  });

  // 5. PATCH /user/:id
  it('should update a user', async () => {
    // Mock the service method to return the mock updated user
    mockUserService.updateUser.mockResolvedValue(mockUpdatedUser);
    // Call the controller method with an ID of '1' and the mock update user DTO
    const result = await controller.updateUser(
      '1',
      mockUpdateUserDto
    );
    // Assert that the service method was called with the correct ID and DTO
    expect(mockUserService.updateUser)
      .toHaveBeenCalledWith(
        1,
        mockUpdateUserDto
      );
    // Assert that the result matches the mock updated user
    expect(result).toEqual(mockUpdatedUser);
  });

  // 6. DELETE /user/:id
  it('should delete a user', async () => {
    // Mock the service method to return undefined (void)
    mockUserService.deleteUser.mockResolvedValue(undefined);
    // Call the controller method with an ID of '1'
    const result = await controller.deleteUser('1');
    // Assert that the service method was called with the correct ID
    expect(mockUserService.deleteUser)
      .toHaveBeenCalledWith({
        id: 1,
      });
    // Assert that the result is undefined (void)
    expect(result).toBeUndefined();
  });

});