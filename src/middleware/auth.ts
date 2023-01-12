import { Response } from 'express';
import { decode } from 'jsonwebtoken';

import axios from 'axios';

import { RequestWithUserRole, Idata } from '../Interface/fishLogInterfaces';

export default class AuthService {
  authorize = async (
    req: RequestWithUserRole,
    res: Response,
    next: () => void
  ) => {
    try {
      const token = req.headers.authorization?.split(' ')[1] as string;
      const url = `${process.env.USER_API_URL}/authToken`;
      await axios.get(url, {
        headers: {
          Accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      req.user = decode(token) as Idata;
      next();
      return null;
    } catch (error: any) {
      if (error.response) {
        const { response } = error;
        return res.status(response.status).json(response.data);
      }
      return res.status(500).json({ message: 'User API not found' });
    }
  };
}
