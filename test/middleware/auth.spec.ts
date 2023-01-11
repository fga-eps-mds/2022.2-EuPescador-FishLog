import { Response, Request } from 'express';
import axios from 'axios';
import Auth from '../../src/middleware/auth';

const authService = new Auth();
const mockResponse = () => {
  const response = {} as Response;
  response.status = jest.fn().mockReturnValue(response);
  response.sendStatus = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe('Test middleware authUser', () => {
  it('Should get a statusCode 200 when user have authorization', async () => {
    const response = mockResponse();
    const mockRequest = {} as Request;
    mockRequest.headers = {};

    jest.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
    });

    const res = (await authService.authorize(
      mockRequest,
      response,
      () => {}
    )) as Response;
    expect(res).toBeNull();
  });

  it('Should get a statusCode 401 when user not have authorization', async () => {
    const mockData = {
      response: {
        status: 401,
        data: {
          message: 'Usuário não encontado',
        },
      },
    };

    const response = mockResponse();
    const mockRequest = {} as Request;
    mockRequest.headers = {};

    jest.spyOn(axios, 'get').mockRejectedValueOnce(mockData);

    const res = (await authService.authorize(
      mockRequest,
      response,
      () => {}
    )) as Response;
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should get a statusCode 500 when have internal error', async () => {
    const response = mockResponse();
    const mockRequest = {} as Request;
    const mockData = undefined;
    jest.spyOn(axios, 'get').mockRejectedValueOnce(mockData);
    const res = (await authService.authorize(
      mockRequest,
      response,
      () => {}
    )) as Response;
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
