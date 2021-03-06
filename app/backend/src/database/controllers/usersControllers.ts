import { Request, Response } from 'express';
import UsersServices from '../services/usersServices';

export default class UsersControllers {
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { response, code } = await UsersServices.login({ email, password });

    res.status(code).json(response);
  }

  public static async getRole(req: Request, res: Response) {
    const { userId } = req.body;

    const { response, code } = await UsersServices.getRole(+userId);

    res.status(code).json(response);
  }
}
