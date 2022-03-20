import Club, { ClubStatus } from '../interfaces/clubsInterfaces';
import { Match } from '../interfaces/matchsInterfaces';
import getStatusFromAllClubs from './getStatusFromAllClubs';

// Tiebreaker ====> 1º totalVictories; 2º goalsBalance; 3º goalsFavor; 4º goalsOwn.

const filters = {
  totalVictories: (club1: ClubStatus, club2: ClubStatus) =>
    club2.totalVictories - club1.totalVictories,
  goalsBalance: (club1: ClubStatus, club2: ClubStatus) => club2.goalsBalance - club1.goalsBalance,
  goalsFavor: (club1: ClubStatus, club2: ClubStatus) => club2.goalsFavor - club1.goalsFavor,
  goalsOwn: (club1: ClubStatus, club2: ClubStatus) => club1.goalsOwn - club2.goalsOwn,
};

const handleTiebreaker = (club1: ClubStatus, club2: ClubStatus): number => {
  let winner = 0;
  const funcs = Object.values(filters);

  for (let index = 0; index < funcs.length; index += 1) {
    const func = funcs[index];

    winner = func(club1, club2);
    if (winner !== 0) {
      break;
    }
  }
  return winner;
};

const generateLeaderboard = (matchs: Match[], clubs: Club[]) => {
  const allClubs: ClubStatus[] = getStatusFromAllClubs(matchs, clubs);

  allClubs.sort((club1, club2) => {
    const points = club2.totalPoints - club1.totalPoints;

    if (points === 0) {
      return handleTiebreaker(club1, club2);
    }
    return points;
  });

  return allClubs;
};

export default generateLeaderboard;

// console.log(generalFilter(leaderboardsMock.allMatchs,clubsMock.allclubs));
