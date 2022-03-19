import { CreateMatch } from '../interfaces/matchsInterfaces';
import Clubs from '../models/clubs';
import Matchs from '../models/matchs';
import ServerCodes from '../utils/serverCodes';
import ClubsServices from './clubsServices';

export default class MatchsServices {
  public static async getAll(inProgress: string) {
    let where = {};

    if (inProgress === 'true' || inProgress === 'false') {
      where = { inProgress: inProgress === 'true' };
    }

    const allMatchs = await Matchs.findAll({
      include: [
        { model: Clubs, as: 'homeClub', attributes: [['club_name', 'clubName']] },
        { model: Clubs, as: 'awayClub', attributes: [['club_name', 'clubName']] },
      ],
      where,
    });

    return {
      response: allMatchs,
      code: ServerCodes.RECEIVED,
    };
  }

  public static async create(objMatch: CreateMatch) {
    const error = ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST;

    if (objMatch.awayTeam === objMatch.homeTeam) {
      return { response:
        { message: 'It is not possible to create a match with two equal teams' },
      code: error,
      };
    }

    const [{ code, response }, { code: code2 }] = await Promise.all([
      ClubsServices.getById(objMatch.awayTeam),
      ClubsServices.getById(objMatch.homeTeam),
    ]);

    if (code === error || code2 === error) return { response, code };

    const { id } = await Matchs.create(objMatch);

    return {
      response: { id, ...objMatch },
      code: ServerCodes.CREATED,
    };
  }
}
