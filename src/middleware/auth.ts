import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import axios from 'axios';

interface Idata {
  id: string;
  admin: boolean;
  superAdmin: boolean;
}

interface RequestWithUserRole extends Request {
  user?: Idata;
}

export default class AuthService {
  decodeToken = async (token: string) => {
    const decodeToken = decode(token) as Idata;

    return decodeToken;
  };

  authorize = async (
    req: RequestWithUserRole,
    res: Response,
    next: () => void
  ) => {
    try {
      const token = req.headers.authorization;
      const url = `${process.env.USER_API_URL}/authToken`;
      await axios.get(url, {
        headers: {
          Accept: 'application/json',
          authorization: token,
        },
      });

      req.user = await this.decodeToken(token as string);
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
