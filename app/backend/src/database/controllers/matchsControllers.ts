import { Request, Response } from 'express';
import MatchsServices from '../services/matchsServices';

export default class MatchsControllers {
  public static async getAll(_req: Request, res: Response) {
    const { response, code } = await MatchsServices.getAll();

    res.status(code).json(response);
  }
}
