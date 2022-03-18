import Clubs from '../models/clubs';
import Matchs from '../models/matchs';
import ServerCodes from '../utils/serverCodes';

export default class MatchsServices {
  public static async getAll() {
    const allMatchs = await Matchs.findAll({
      include: [
        { model: Clubs, as: 'homeClub', attributes: [['club_name', 'clubName']] },
        { model: Clubs, as: 'awayClub', attributes: [['club_name', 'clubName']] },
      ],
    });

    return {
      response: allMatchs,
      code: ServerCodes.RECEIVED,
    };
  }
}
