import { Request, Response, Router } from 'express';
import FishController from '../controllers/fishLogController';
import AuthService from '../middleware/auth';
import { RequestWithUserRole } from '../Interface/fishLogInterfaces';

const authService = new AuthService();

const fishLogRoutes = Router();

const fishLogController = new FishController();

fishLogRoutes.post(
  '/',
  authService.authorize,
  (req: Request, res: Response) => {
    fishLogController.createFishLog(req, res);
  }
);

fishLogRoutes.get('/', authService.authorize, (req: Request, res: Response) => {
  fishLogController.getAllFishLogs(req, res);
});

fishLogRoutes.get(
  '/all',
  authService.authorize,
  (req: Request, res: Response) => {
    fishLogController.getAllFishLogsAdmin(req, res);
  }
);

fishLogRoutes.get(
  '/:id',
  authService.authorize,
  (req: RequestWithUserRole, res: Response) => {
    fishLogController.getOneFishLog(req, res);
  }
);

fishLogRoutes.put(
  '/:id',
  authService.authorize,
  (req: Request, res: Response) => {
    fishLogController.updateFishLog(req, res);
  }
);

fishLogRoutes.delete(
  '/:id',
  authService.authorize,
  (req: Request, res: Response) => {
    fishLogController.deleteFishLog(req, res);
  }
);

export default fishLogRoutes;
