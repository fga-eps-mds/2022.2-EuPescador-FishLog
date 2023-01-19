import { Request } from 'express';

export interface Idata {
  id: string;
  admin: boolean;
  superAdmin: boolean;
}

export interface RequestWithUserRole extends Request {
  user?: Idata;
}
