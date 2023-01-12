import { Response, Request } from 'express';
import FishLogController from '../../src/controllers/fishLogController';
import FishLog from '../../src/database/entities/fishLog';
import { connection } from '../../src/database';
import { RequestWithUserRole } from '../../src/Interface/fishLogInterfaces';

const fishLogController = new FishLogController();
const fishMock = {
  _id: '3472417428',
  id: '61323c37dc4d0100225782f8',
  specie: 'aa',
  reviewed: false,
  createdBy: '61323c37dc4d0100225782f8',
};

const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  response.attachment = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test Create FishLog function', () => {
  it('should get a statusCode 200 providing species', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '1',
      species: 'aa',
      coordenates: {
        latitude: 1,
        longitude: 2,
      },
    };

    const response = mockResponse();
    jest
      .spyOn(fishLogRepository, 'save')
      .mockImplementationOnce(() =>
        Promise.resolve({ id: 'c465c64d-0820-49d8-bbdd-02bc3c05c545' })
      );
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 400', async () => {
    const mockRequest = {} as Request;
    mockRequest.body = {
      id: '1',
    };

    const response = mockResponse();
    const fishLogRepository = connection.getRepository(FishLog);
    jest
      .spyOn(fishLogRepository, 'save')
      .mockImplementationOnce(() =>
        Promise.resolve({ id: 'c465c64d-0820-49d8-bbdd-02bc3c05c545' })
      );
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should get a statusCode 500', async () => {
    const mockRequest = {} as Request;

    const response = mockResponse();
    const fishLogRepository = connection.getRepository(FishLog);
    jest
      .spyOn(fishLogRepository, 'save')
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha no sistema de criação de registro'))
      );
    const res = await fishLogController.createFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get All FishLogs function', () => {
  it('should get a statusCode 200 with admin request and get all fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {};
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with admin request and get reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {
      status: 'reviewed',
    };
    mockRequest.headers = {
      authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzIzYmJhZGM0ZDAxMDAyMjU3ODJmMCIsImVtYWlsIjoibmF0YW5AZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkWDZtZ0cwZ0JhQzAwMHhHV1pIbVJrdTdVZkpZbHNxMS9La1hRMDBtdVdtLzdhdlhoanZ4UjIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjMwNjk4Mjg0LCJleHAiOjE2MzA3ODQ2ODR9.uDsTpUWS-R47UquW044GjSdDXR1bgSw5GU7WGM6IIuI',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with admin request and get to be reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {
      status: 'toBeReviewed',
    };
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get all fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {};
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {
      status: 'reviewed',
    };
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with user request and get to be reviewed fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {
      status: 'toBeReviewed',
    };
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha na requisição!'))
      );
    const res = await fishLogController.getAllFishLogs(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get All FishLogs Admin function', () => {
  it('should get a statusCode 200 with admin request and get all fishlogs', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.query = {};
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest.fn().mockResolvedValueOnce([fishMock]);
    const res = await fishLogController.getAllFishLogsAdmin(
      mockRequest,
      response
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    const response = mockResponse();
    fishLogRepository.find = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha na requisição!'))
      );
    const res = await fishLogController.getAllFishLogsAdmin(
      mockRequest,
      response
    );
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test Get One FishLog function', () => {
  it('should get a statusCode 200 with admin request', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    mockRequest.params = {
      id: '3472417428',
    };

    mockRequest.user = {
      id: '3472417428',
      admin: true,
      superAdmin: true,
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 200 with author request', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    mockRequest.params = {
      id: '3472417428',
    };

    mockRequest.user = {
      id: '3472417428',
      admin: true,
      superAdmin: true,
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 401 with user not authozized', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.user = {
      id: '123',
      admin: false,
      superAdmin: false,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.user = {
      id: '3472417428',
      admin: false,
      superAdmin: false,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if user is not the author', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.user = {
      id: '123',
      admin: false,
      superAdmin: false,
    };
    mockRequest.params = {
      id: '61323c37dc4d0100225782f8',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.getOneFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test update FishLog function', () => {
  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '61323c37dc4d0100225782f8',
      specie: 'bb',
    };
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if have unathorized', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '61323c37dc4d0100225782f8',
      specie: 'bb',
    };
    mockRequest.user = {
      id: '123',
      admin: false,
      superAdmin: false,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 400', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '61323c37dc4d0100225782f8',
    };
    mockRequest.user = {
      id: '123',
      admin: true,
      superAdmin: true,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should get a statusCode 200 if update user', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '61323c37dc4d0100225782f8',
      name: 'nome',
      species: 'species',
      photo: 'photo',
    };
    mockRequest.user = {
      id: '123',
      admin: true,
      superAdmin: true,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    fishLogRepository.update = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should get a statusCode 200 if update user', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.body = {
      id: '61323c37dc4d0100225782f8',
      name: 'nome',
      species: 'species',
      photo: 'photo',
    };
    mockRequest.user = {
      id: '123',
      admin: true,
      superAdmin: true,
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    fishLogRepository.update = jest
      .fn()
      .mockResolvedValueOnce(Promise.reject());
    const res = await fishLogController.updateFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('Test delete FishLog function', () => {
  it('should get a statusCode 200 with admin request', async () => {
    const mockRequest = {} as RequestWithUserRole;
    mockRequest.user = {
      id: '3472417428',
      admin: true,
      superAdmin: true,
    };
    const fishLogRepository = connection.getRepository(FishLog);

    mockRequest.params = {
      id: '3472417428',
    };

    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    fishLogRepository.remove = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should get a statusCode 500 with admin request', async () => {
    const mockRequest = {} as RequestWithUserRole;
    const fishLogRepository = connection.getRepository(FishLog);

    mockRequest.params = {
      id: '3472417428',
    };

    mockRequest.user = {
      id: '3472417428',
      admin: true,
      superAdmin: true,
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    jest
      .spyOn(fishLogRepository, 'remove')
      .mockImplementationOnce(() =>
        Promise.reject(Error('Falha no sistema de criação de registro'))
      );
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });

  it('should get a statusCode 404 if fishlog not found', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(undefined);
    fishLogRepository.remove = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should get a statusCode 401 if user is not the author', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    mockRequest.headers = {
      authorization: 'Bearer mockToken',
    };
    mockRequest.params = {
      id: '3472417428',
    };
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    fishLogRepository.remove = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('should get a statusCode 500 if request failed', async () => {
    const mockRequest = {} as Request;
    const fishLogRepository = connection.getRepository(FishLog);
    const response = mockResponse();
    fishLogRepository.findOne = jest.fn().mockResolvedValueOnce(fishMock);
    fishLogRepository.remove = jest.fn().mockResolvedValueOnce({});
    const res = await fishLogController.deleteFishLog(mockRequest, response);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
