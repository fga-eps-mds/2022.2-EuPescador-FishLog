import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

import axios from 'axios';

interface Idata {
  id: string;
  admin: boolean;
  superAdmin: boolean;
}

export default class AuthService {
  decodeToken = async (token: string) => {
    const decodeToken = decode(token) as Idata;

    return decodeToken;
  };

  authorize = async (req: Request, res: Response, next: () => void) => {
    const token = req.headers.authorization;
    try {
      await axios.get(String(`${process.env.USER_API_URL}/authToken`), {
        headers: {
          Accept: 'application/json',
          authorization: token,
        },
      });
      next();
    } catch (error: any) {
      if (error.response) {
        const { response } = error;
        res.status(response.status).json(response.data);
      }

      res.status(500).json({ message: 'User API not found' });
    }
  };
}
