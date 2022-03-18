import Clubs from "../models/clubs";
import serverCodes from "../utils/serverCodes";

export default class ClubsServices {
    public static async getAll() {
        const clubs = await Clubs.findAll({ attributes: ['id', ['club_name', 'clubName']] });

        return {
            response: clubs,
            code: serverCodes.RECEIVED
        }
    }
}