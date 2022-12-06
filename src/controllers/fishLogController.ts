import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import FishLog from '../database/entities/fishLog';
import { connection } from '../database';
import AuthService from '../middleware/auth';

const auth = new AuthService();
const fishLogRepository = connection.getRepository(FishLog);

export default class FishController {
  createFishLog = async (req: Request, res: Response) => {
    try {
      if (!(req.body.name || req.body.species || req.body.photo)) {
        return res.status(400).json({
          message:
            'Registro não foi criado, é necessário o nome, a espécie ou a foto para a criação de um registro.',
        });
      }
      const fish = await fishLogRepository.save({
        id: uuidV4(),
        ...req.body,
      });

      return res.status(200).json({ fish });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha no sistema de criação de registro, tente novamente!',
      });
    }
  };

  getAllFishLogs = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));

      let allFishLogs: FishLog[] = [];
      allFishLogs = await fishLogRepository.find({
        where: { createdBy: data.id },
      });

      return res.status(200).json(allFishLogs);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getAllFishLogsAdmin = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));

      let allFishLogs: FishLog[] = [];
      if (data.admin || data.superAdmin) {
        allFishLogs = await fishLogRepository.find();
      } else {
        allFishLogs = await fishLogRepository.find({
          where: { createdBy: data.id },
        });
      }

      return res.status(200).json(allFishLogs);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await fishLogRepository.findOne({
        where: { id: logId },
      });

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (data.admin || fishLog?.createdBy === data.id || data.superAdmin) {
        return res.status(200).json(fishLog);
      }
      return res.status(401).json({
        message: 'Você não tem permissão para ver esse registro',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  updateFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await fishLogRepository.findOne({
        where: { id: logId },
      });

      const newFishLog = req.body;

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        data.superAdmin ||
        (!fishLog.reviewed && Number(fishLog?.createdBy) === data.id)
      ) {
        try {
          if (!(req.body.name || req.body.species || req.body.photo)) {
            return res.status(400).json({
              message:
                'É necessário ao menos informar foto, espécie ou nome do peixe',
            });
          }

          await fishLogRepository.update({ id: logId }, { ...newFishLog });

          return res.status(200).json({
            message: 'Registo atualizado com sucesso!',
          });
        } catch (error) {
          return res.status(500).json({
            message: 'Falha ao atualizar o registro. Tente novamente',
          });
        }
      } else {
        return res.status(401).json({
          message: 'Você não tem permissão para ver esse registro',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  deleteFishLog = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const logId = req.params.id;
      const fishLog = await fishLogRepository.findOne({
        where: { id: logId },
      });

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        data.superAdmin ||
        (!fishLog.reviewed && Number(fishLog?.createdBy) === data.id)
      ) {
        try {
          await fishLogRepository.remove(fishLog);
          return res.status(200).json({
            message: 'Registo deletado com sucesso!',
          });
        } catch (error) {
          return res.status(500).json({
            message: 'Falha ao deletar o registro. Tente novamente',
          });
        }
      } else {
        return res.status(401).json({
          message: 'Você não tem permissão para deletar esse registro',
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };
}
