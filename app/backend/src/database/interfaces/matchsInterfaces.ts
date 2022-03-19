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

interface CreateMatch extends Match {
  userId?: number,
}

export {
  Match,
  CreateMatch,
};

export default Query;
