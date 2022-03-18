import { Request, Response } from 'express';
import ClubsServices from '../services/clubsServices';

export default class ClubsControllers {
  public static async getAll(_req: Request, res: Response) {
    const { response, code } = await ClubsServices.getAll();

    res.status(code).json(response);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const { response, code } = await ClubsServices.getById(+id);

    res.status(code).json(response);
  }
}
