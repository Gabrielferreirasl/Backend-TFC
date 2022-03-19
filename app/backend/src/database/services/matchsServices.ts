import { CreateMatch, UpdateMatch } from '../interfaces/matchsInterfaces';
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
      return { response: { message: 'It is not possible to create a match with two equal teams' },
        code: error,
      };
    }

    const [awayTeam, homeTeam] = await Promise.all([
      ClubsServices.getById(objMatch.awayTeam),
      ClubsServices.getById(objMatch.homeTeam),
    ]);

    if (awayTeam.code === error || homeTeam.code === error) {
      return awayTeam.code === error ? awayTeam : homeTeam;
    }
    
    objMatch.inProgress = true;
    const { id } = await Matchs.create(objMatch);

    return {
      response: { id, ...objMatch },
      code: ServerCodes.CREATED,
    };
  }

  public static async getById(id: number) {
    if (Number.isNaN(id)) {
      return { response: { message: 'id must be a number' },
        code: ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST };
    }

    const match = await Matchs.findOne({ where: { id } });

    if (!match) {
      return { response: { message: 'There is no match with such id!' },
        code: ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST };
    }
    return { response: match, code: ServerCodes.RECEIVED };
  }

  public static async finishMatch(id: number) {
    const validate = await MatchsServices.getById(id);

    if (validate.code === ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST) return validate;

    await Matchs.update({ inProgress: false }, { where: { id } });

    const match = await MatchsServices.getById(id);

    return match;
  }

  public static async updateMatch({ id, homeTeamGoals, awayTeamGoals }: UpdateMatch) {
    await Matchs.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return { response: { message: 'Goals updated' }, code: ServerCodes.RECEIVED };
  }
}
