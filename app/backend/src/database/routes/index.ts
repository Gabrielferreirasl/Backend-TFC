import * as express from 'express';
import ClubsControllers from '../controllers/clubsControllers';
import MatchsControllers from '../controllers/matchsControllers';
import UsersControllers from '../controllers/usersControllers';
import UsersValidations from '../middlewares/usersValidations';

const route = express.Router();

route.post('/login', UsersValidations.loginValidation, UsersControllers.login);
route.get('/clubs', ClubsControllers.getAll);
route.get('/matchs', MatchsControllers.getAll);
route.post('/matchs', UsersValidations.tokenValidation, MatchsControllers.create);

route.get('/login/validate', UsersValidations.tokenValidation, UsersControllers.getRole);

route.get('/clubs/:id', ClubsControllers.getById);

export default route;
