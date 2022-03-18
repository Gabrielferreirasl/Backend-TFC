interface Query {
  inProgress: string,
}

interface Match {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

interface createMatch extends Match {
  userId?: number,
}

export {
  Match,
  createMatch,
};

export default Query;
