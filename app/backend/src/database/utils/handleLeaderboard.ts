import Club, { ClubStatus } from '../interfaces/clubsInterfaces';
import { Match } from '../interfaces/matchsInterfaces';
import getStatusFromAllClubs from './getStatusFromAllClubs';
import Filter from '../interfaces/leaderboardInterfaces';

// Tiebreaker ====> 1º totalVictories; 2º goalsBalance; 3º goalsFavor; 4º goalsOwn.

const filters = {
  totalPoints: (club1: ClubStatus, club2: ClubStatus) => club2.totalPoints - club1.totalPoints,
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

const generateLeaderboard = (matchs: Match[], clubs: Club[], filter: Filter) => {
  const allClubs: ClubStatus[] = getStatusFromAllClubs(matchs, clubs, filter);

  allClubs.sort(handleTiebreaker);

  return allClubs;
};

export default generateLeaderboard;
