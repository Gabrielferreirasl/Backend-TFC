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

interface UpdateMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
  id: number;
}

export {
  Match,
  CreateMatch,
  UpdateMatch,
};

export default Query;
