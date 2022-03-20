import Filter from '../interfaces/leaderboardInterfaces';
import generateLeaderboard from '../utils/handleLeaderboard';
import ServerCodes from '../utils/serverCodes';
import ClubsServices from './clubsServices';
import MatchsServices from './matchsServices';

export default class LeaderboardsServices {
  public static async geAllByHome() {
    const leaderboard = await LeaderboardsServices.getAllMatchsAndClubs({
      filter: true,
      type: 'home',
    });

    return { response: leaderboard, code: ServerCodes.RECEIVED };
  }

  private static async getAllMatchsAndClubs(filter: Filter) {
    let [{ response: matchs }, { response: clubs }] = await Promise.all([
      MatchsServices.getAll('false'),
      ClubsServices.getAll(),
    ]);

    matchs = JSON.parse(JSON.stringify(matchs));
    clubs = JSON.parse(JSON.stringify(clubs));

    return generateLeaderboard(matchs, clubs, filter);
  }
}
