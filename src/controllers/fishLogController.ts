import { Request, Response } from 'express';
import { FishLog } from '../models/fishLog';
import { connection } from '../config/database';
import AuthService from '../middleware/auth';

const Object2Csv = require('objects-to-csv');

const auth = new AuthService();

export default class FishController {
  createFishLog = async (req: Request, res: Response) => {
    try {
      const { coordenates } = req.body;

      if (!(req.body.name || req.body.species || req.body.photo)) {
        return res.status(400).json({
          message:
            'Registro não foi criado, é necessário o nome, a espécie ou a foto para a criação de um registro.',
        });
      }
      const fishLogRepository = connection.getRepository(FishLog);
      const fish = await fishLogRepository.save({
        ...req.body,
        latitude: coordenates.latitude,
        longitude: coordenates.longitude
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

      const entries = Object.entries(req.query);
      const nonEmptyOrNull = entries.filter(
        ([, val]) => val !== '' && val !== null
      );
      if (!data.admin) {
        nonEmptyOrNull.push(['userId', data.id]);
      }

      const query = Object.fromEntries(nonEmptyOrNull);
      const fishLogRepository = connection.getRepository(FishLog);
      const allFishLogs = await fishLogRepository.find(query);

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
      const fishLogRepository = connection.getRepository(FishLog);
      const fishLog = await fishLogRepository.findOne({ where: {id: Number(logId)} });

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (data.admin || fishLog?.id === data.id) {
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
      const fishLogRepository = connection.getRepository(FishLog);
      const fishLog = await fishLogRepository.findOne({ where: {id: Number(logId)} });

      const newFishLog = req.body;

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        (!fishLog.reviewed && String(fishLog?.id) === data.id)
      ) {
        try {
          if (!(req.body.name || req.body.species || req.body.photo)) {
            return res.status(400).json({
              message:
                'É necessário ao menos informar foto, espécie ou nome do peixe',
            });
          }
          const fishLogRepository = connection.getRepository(FishLog);
          const fishLog = await fishLogRepository.findOne({ where: {id: Number(logId)} });
          await fishLogRepository.save(newFishLog);

          // await fishLog.updateOne({ $push: { updatedBy: data.id } });

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
      const fishLogRepository = connection.getRepository(FishLog);
      const fishLog = await fishLogRepository.findOne({ where: {id: Number(logId)} });

      if (!fishLog) {
        return res.status(404).json({
          message: 'Relatório não encontrado',
        });
      }

      if (
        data.admin ||
        (!fishLog.reviewed && String(fishLog?.id) === data.id)
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

  generateCSV = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const data = JSON.parse(await auth.decodeToken(token as string));
      const fishLogIds = req.params.id_array;

      const fishLogRepository = connection.getRepository(FishLog);

      const fishIdArray = fishLogIds.split(",");
      console.log(fishIdArray);

      if (data.admin) {
        const fishLogArray = fishIdArray.map(async (el: string) => {
          const fishLog = await fishLogRepository.findOneBy({ id: Number(el) });
          if (fishLog)
            return {
              "Especie": fishLog.species,
              "Grande Grupo": fishLog.largeGroup,
              "Coordenadas": fishLog.coordenates,
              "Tamanho (cm)": fishLog.length,
              "Peso (kg)": fishLog.weight,
            };
          throw new Error();
        });
        const csvFile = await new Object2Csv(
          await Promise.all(fishLogArray)
        ).toString();
        res.attachment('Registro.csv');
        return res.status(200).send(csvFile);
      }
      return res.status(401).json({ message: 'Autorização negada!' });
    } catch (error) {
      console.log(error);
      console.log(error);
      return res.status(500).json({ message: 'Falha na requisição' });
    }
  };
}
