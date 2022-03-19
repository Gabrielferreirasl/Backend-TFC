import { Request, Response } from 'express';
import Query, { CreateMatch } from '../interfaces/matchsInterfaces';
import MatchsServices from '../services/matchsServices';

export default class MatchsControllers {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query as unknown as Query;

    const { response, code } = await MatchsServices.getAll(inProgress);

    res.status(code).json(response);
  }

  public static async create(req: Request, res: Response) {
    const { userId, ...objMatch } = req.body as CreateMatch;

    const { response, code } = await MatchsServices.create(objMatch);

    res.status(code).json(response);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { response, code } = await MatchsServices.finishMatch(+id);

    res.status(code).json(response);
  }
}
