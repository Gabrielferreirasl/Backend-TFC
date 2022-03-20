import Club, { ClubStatus, ClubBalanceStatus } from '../interfaces/clubsInterfaces';
import { Match } from '../interfaces/matchsInterfaces';

const getAllMatchsFromClub = (matchs: Match[], { id }: Club) =>
  matchs.filter(({ homeTeam, awayTeam, inProgress }) =>
    (homeTeam === id || id === awayTeam) && !inProgress);

const verifyWinner = (match: Match, id: number): number => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    return match.homeTeam === id ? 3 : 0;
  }
  if (match.awayTeamGoals > match.homeTeamGoals) {
    return match.awayTeam === id ? 3 : 0;
  }
  return 1;
};

const getFavorAndOwnGoalsBalance = (matchs: Match[], id: number): ClubBalanceStatus => {
  let goalsFavor = 0;
  let goalsOwn = 0;

  matchs.forEach((match) => {
    if (match.homeTeam === id) {
      goalsOwn += match.awayTeamGoals;
      goalsFavor += match.homeTeamGoals;
    } else {
      goalsOwn += match.homeTeamGoals;
      goalsFavor += match.awayTeamGoals;
    }
  });

  const goalsBalance = goalsFavor - goalsOwn;

  return {
    goalsFavor,
    goalsOwn,
    goalsBalance,
  };
};

const getWinLossDrawCount = (matchs: Match[], id: number, filter: number): number => {
  const total = matchs.reduce((sum, match) => {
    const result = verifyWinner(match, id) === filter ? 1 : 0;
    return sum + result;
  }, 0);
  return total;
};

const handletotalPoints = (matchs: Match[], id: number): number => {
  const total = matchs.reduce((sum, match) => {
    const result = verifyWinner(match, id);
    return sum + result;
  }, 0);
  return total;
};

const WIN = 3;
const LOSS = 0;
const DRAW = 1;

const getStatusFromAllClubs = (matchs: Match[], clubs: Club[]): ClubStatus[] =>
  clubs.map((club) => {
    const allMatchs: Match[] = getAllMatchsFromClub(matchs, club);

    const totalPoints = handletotalPoints(allMatchs, club.id);
    const { goalsBalance, goalsFavor, goalsOwn } = getFavorAndOwnGoalsBalance(allMatchs, club.id);
    const efficiency = Number(((totalPoints / (allMatchs.length * 3)) * 100).toFixed(2));

    return {
      name: club.clubName,
      totalPoints,
      totalGames: allMatchs.length,
      totalVictories: getWinLossDrawCount(allMatchs, club.id, WIN),
      totalDraws: getWinLossDrawCount(allMatchs, club.id, DRAW),
      totalLosses: getWinLossDrawCount(allMatchs, club.id, LOSS),
      goalsBalance,
      goalsFavor,
      goalsOwn,
      efficiency,
    };
  });

export default getStatusFromAllClubs;
