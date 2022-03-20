import * as express from 'express';
import ClubsControllers from '../controllers/clubsControllers';
import LeaderboardsControllers from '../controllers/leaderboardsControllers';
import MatchsControllers from '../controllers/matchsControllers';
import UsersControllers from '../controllers/usersControllers';
import UsersValidations from '../middlewares/usersValidations';

const route = express.Router();

route.post('/login', UsersValidations.loginValidation, UsersControllers.login);
route.get('/login/validate', UsersValidations.tokenValidation, UsersControllers.getRole);

route.get('/clubs', ClubsControllers.getAll);
route.get('/clubs/:id', ClubsControllers.getById);

route.get('/matchs', MatchsControllers.getAll);
route.post('/matchs', MatchsControllers.create);
route.patch('/matchs/:id', MatchsControllers.updateMatch);
route.patch('/matchs/:id/finish', MatchsControllers.finishMatch);

route.get('/leaderboard', LeaderboardsControllers.getAll);
route.get('/leaderboard/home', LeaderboardsControllers.getAll);
route.get('/leaderboard/away', LeaderboardsControllers.getAll);

export default route;
