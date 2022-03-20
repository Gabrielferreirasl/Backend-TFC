import { Request, Response } from 'express';
import LeaderboardsServices from '../services/leaderboardsServices';

export default class LeaderboardsControllers {
  public static async geAllByHome(_req: Request, res: Response) {
    const { response, code } = await LeaderboardsServices.geAllByHome();

    res.status(code).json(response);
  }
}
