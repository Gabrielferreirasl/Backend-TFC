import * as express from 'express';
import ClubsControllers from '../controllers/clubsControllers';
import LeaderboardsControllers from '../controllers/leaderboardsControllers';
import MatchsControllers from '../controllers/matchsControllers';
import UsersControllers from '../controllers/usersControllers';
import UsersValidations from '../middlewares/usersValidations';

const route = express.Router();

route.patch('/matchs/:id/finish', MatchsControllers.finishMatch);
route.patch('/matchs/:id', MatchsControllers.updateMatch);
route.post('/login', UsersValidations.loginValidation, UsersControllers.login);
route.get('/clubs', ClubsControllers.getAll);
route.get('/matchs', MatchsControllers.getAll);
route.post('/matchs', MatchsControllers.create);
route.get('/leaderboard/home', LeaderboardsControllers.getAll);
route.get('/leaderboard/away', LeaderboardsControllers.getAll);

route.get('/login/validate', UsersValidations.tokenValidation, UsersControllers.getRole);

route.get('/clubs/:id', ClubsControllers.getById);

export default route;
