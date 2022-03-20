interface Club {
  id: number,
  clubName: string,
}

interface ClubBalanceStatus {
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
}

interface ClubStatus extends ClubBalanceStatus {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  efficiency: number,
}

export {
  ClubStatus,
  ClubBalanceStatus,
};

export default Club;
