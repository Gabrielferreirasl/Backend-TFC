export default {
    matchsWithoutFilter: [
        {
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: false,
          homeClub: {
            clubName: 'São Paulo'
          },
          awayClub: {
            clubName: 'Grêmio'
          }
        },
        {
          id: 41,
          homeTeam: 16,
          homeTeamGoals: 2,
          awayTeam: 9,
          awayTeamGoals: 0,
          inProgress: true,
          homeClub: {
            clubName: 'São Paulo'
          },
          awayClub: {
            clubName: 'Internacional'
          }
        },
      ],
      matchsWithProgressTrue: [
        {
          "id": 41,
          "homeTeam": 16,
          "homeTeamGoals": 2,
          "awayTeam": 9,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeClub": {
            "clubName": "São Paulo"
          },
          "awayClub": {
            "clubName": "Internacional"
          }
        },
        {
          "id": 42,
          "homeTeam": 6,
          "homeTeamGoals": 1,
          "awayTeam": 1,
          "awayTeamGoals": 0,
          "inProgress": true,
          "homeClub": {
            "clubName": "Ferroviária"
          },
          "awayClub": {
            "clubName": "Avaí/Kindermann"
          }
        }
      ],
      matchsWithProgressFalse: [
        {
          "id": 1,
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeClub": {
            "clubName": "São Paulo"
          },
          "awayClub": {
            "clubName": "Grêmio"
          }
        },
        {
          "id": 2,
          "homeTeam": 9,
          "homeTeamGoals": 1,
          "awayTeam": 14,
          "awayTeamGoals": 1,
          "inProgress": false,
          "homeClub": {
            "clubName": "Internacional"
          },
          "awayClub": {
            "clubName": "Santos"
          }
        }
      ],
      matchToBeAdded: {
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true,
      },
      matchToBeAddedEqualTeams: {
        "homeTeam": 8,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true,
      },
}