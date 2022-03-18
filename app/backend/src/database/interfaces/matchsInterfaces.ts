interface Query {
  inProgress: string,
}

interface Match {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export {
  Match,
};

export default Query;
