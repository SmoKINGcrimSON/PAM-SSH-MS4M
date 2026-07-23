import { Test, TestingModule } from '@nestjs/testing';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';

describe('ServerController', () => {
  let controller: ServerController;

  const mockServerService = {
    getAllServers: jest.fn(),
    getServer: jest.fn(),
    createServer: jest.fn(),
    updateServer: jest.fn(),
    deleteServer: jest.fn(),
  };

  // Shared test data
  const mockServers = [
    {
      server_id: 1,
      hostname: 'asdasd',
      ip_address: 'superuser',
      ssh_port: 'hashedpassword',
      mine_name: 'asdasd',
      server_password: 'hashedpassword',
    },
    {
      server_id: 2,
      hostname: 'asdasdasdasd',
      ip_address: 'admin',
      ssh_port: 'hashedpassword2',
      mine_name: 'asdasd2',
      server_password: 'hashedpassword2',
    },
  ];

  const mockServer = {
    server_id: 1,
    hostname: 'asdasd',
    ip_address: 'superuser',
    ssh_port: 'hashedpassword',
    mine_name: 'asdasd',
    server_password: 'hashedpassword',
  };

  const mockCreateServerDto = {
    hostname: 'newserver',
    ip_address: 'admin',
    ssh_port: 22,
    mine_name: 'newmine',
    server_password: 'hashedpassword',
  };

  const mockUpdateServerDto = {
    hostname: 'updateduser',
    server_password: 'updatedhashedpassword',
  };

  const mockUpdatedServer = {
    server_id: 1,
    ...mockUpdateServerDto,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerController],
      providers: [
        {
          provide: ServerService,
          useValue: mockServerService,
        },
      ],
    }).compile();

    controller = module.get<ServerController>(ServerController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1. Controller exists
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 2. GET /server
  it('should return all servers with optional limit', async () => {
    // Mock the service method to return the mock users
    mockServerService.getAllServers.mockResolvedValue(mockServers);
    // Call the controller method with a limit of 1
    const result = await controller.getAllServers('1');
    // Assert that the service method was called with the correct limit
    expect(mockServerService.getAllServers)
      .toHaveBeenCalledWith({
        limit: 1,
      });
    // Assert that the result matches the mock users
    expect(result).toEqual(mockServers);

  });

  // 3. GET /server/:id
  it('should return a server by ID', async () => {
    mockServerService.getServer
      .mockResolvedValue(mockServer);
    // Call the controller method with an ID of '1'
    const result = await controller.getServer('1');
    // Assert that the service method was called with the correct ID
    expect(mockServerService.getServer)
      .toHaveBeenCalledWith({
        id: 1,
      });
    // Assert that the result matches the mock server
    expect(result).toEqual(mockServer);
  });

  // 4. POST /server
  it('should create a new server', async () => {
    // Mock the service method to return the mock created server
    mockServerService.createServer.mockResolvedValue(mockCreateServerDto);
    // Call the controller method with the mock create server DTO
    const result = await controller.createServer(
      mockCreateServerDto
    );
    // Assert that the service method was called with the correct DTO
    expect(mockServerService.createServer)
      .toHaveBeenCalledWith(
        mockCreateServerDto
      );
    // Assert that the result matches the mock created server
    expect(result).toEqual(mockCreateServerDto);
  });

  // 5. PATCH /server/:id
  it('should update a server', async () => {
    // Mock the service method to return the mock updated server
    mockServerService.updateServer.mockResolvedValue(mockUpdatedServer);
    // Call the controller method with an ID of '1' and the mock update server DTO
    const result = await controller.updateServer(
      '1',
      mockUpdateServerDto
    );
    // Assert that the service method was called with the correct ID and DTO
    expect(mockServerService.updateServer)
      .toHaveBeenCalledWith(
        1,
        mockUpdateServerDto
      );
    // Assert that the result matches the mock updated server
    expect(result).toEqual(mockUpdatedServer);
  });

  // 6. DELETE /server/:id
  it('should delete a server', async () => {
    mockServerService.deleteServer.mockResolvedValue(undefined);

    const result = await controller.deleteServer('1');

    expect(mockServerService.deleteServer).toHaveBeenCalledWith({ id: 1 });

    expect(result).toBeUndefined();
    });

});