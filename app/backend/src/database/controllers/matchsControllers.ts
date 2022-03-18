import { Request, Response } from 'express';
import Query, { createMatch } from '../interfaces/matchsInterfaces';
import MatchsServices from '../services/matchsServices';

export default class MatchsControllers {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as Query;

    const { response, code } = await MatchsServices.getAll(inProgress);

    res.status(code).json(response);
  }

  public static async create(req: Request, res: Response) {
    const objMatch = req.body as createMatch;

    const { response, code } = await MatchsServices.create(objMatch);

    res.status(code).json(response);
  }
}
