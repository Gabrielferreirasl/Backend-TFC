import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboardsServices';

export default class LeaderboardsControllers {
  public static async getAll(req: Request, res: Response) {
    const [,, type] = req.path.split('/');

    const { response, code } = await LeaderboardsServices.getAll({ type, filter: !!type });

    res.status(code).json(response);
  }
}
