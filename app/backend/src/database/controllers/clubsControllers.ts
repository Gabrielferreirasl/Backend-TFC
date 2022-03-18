import { Request, Response } from "express";
import ClubsServices from "../services/clubsServices";

export default class ClubsControllers {
    public static async getAll(_req: Request, res: Response) {
        const { response, code } = await ClubsServices.getAll();

        res.status(code).json(response)
    }
}