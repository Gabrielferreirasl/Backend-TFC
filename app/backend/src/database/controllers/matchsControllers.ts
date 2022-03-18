import { Request, Response } from 'express';
import Query from '../interfaces/matchsInterfaces';
import MatchsServices from '../services/matchsServices';

export default class MatchsControllers {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as Query;
    
    const { response, code } = await MatchsServices.getAll(inProgress);

    res.status(code).json(response);
  }
}
