import Clubs from '../models/clubs';
import ServerCodes from '../utils/serverCodes';

export default class ClubsServices {
  public static async getAll() {
    const clubs = await Clubs.findAll({ attributes: ['id', ['club_name', 'clubName']] });

    return {
      response: clubs,
      code: ServerCodes.RECEIVED,
    };
  }

  public static async getById(id: number) {
    const errorResponse = { response:
      { message: 'There is no team with such id!' },
    code: ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST,
    };

    if (!id || typeof id !== 'number') return errorResponse;

    const club = await Clubs.findOne({
      where: { id },
      attributes: ['id', ['club_name', 'clubName']],
    });

    if (!club) return errorResponse;

    return { response: club, code: ServerCodes.RECEIVED };
  }
}
