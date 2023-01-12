import { Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
import FishLog from '../database/entities/fishLog';
import { connection } from '../database';
import AuthService from '../middleware/auth';
import { RequestWithUserRole } from '../Interface/fishLogInterfaces';

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

  getAllFishLogs = async (req: RequestWithUserRole, res: Response) => {
    try {
      const allFishLogs = await fishLogRepository.find({
        where: { createdBy: req.user?.id },
      });

      return res.status(200).json(allFishLogs);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getAllFishLogsAdmin = async (req: RequestWithUserRole, res: Response) => {
    try {
      let allFishLogs: FishLog[] = [];
      if (req.user?.admin || req.user?.superAdmin) {
        allFishLogs = await fishLogRepository.find();
      } else {
        allFishLogs = await fishLogRepository.find({
          where: { createdBy: req.user?.id },
        });
      }

      return res.status(200).json(allFishLogs);
    } catch (error) {
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  getOneFishLog = async (req: RequestWithUserRole, res: Response) => {
    try {
      const { id } = req.params;
      const fishLog = await fishLogRepository.findOne({ where: { id } });
      if (
        !req.user?.admin ||
        fishLog?.createdBy !== req.user?.id ||
        !req.user?.superAdmin
      ) {
        return res.status(200).json(fishLog);
      }

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      return res.status(401).json({
        message: 'Você não tem permissão para ver esse registro',
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Falha ao processar requisição',
      });
    }
  };

  updateFishLog = async (req: RequestWithUserRole, res: Response) => {
    try {
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
        req.user?.admin ||
        req.user?.superAdmin ||
        (!fishLog.reviewed && fishLog?.createdBy === req.user?.id)
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

  deleteFishLog = async (req: RequestWithUserRole, res: Response) => {
    try {
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
        req.user?.admin ||
        req.user?.superAdmin ||
        (!fishLog.reviewed && fishLog?.createdBy === req.user?.id)
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
