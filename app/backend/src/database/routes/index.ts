import * as express from 'express';
import ClubsControllers from '../controllers/clubsControllers';
import UsersControllers from '../controllers/usersControllers';
import UsersValidations from '../middlewares/usersValidations';

const route = express.Router();

route.post('/login', UsersValidations.loginValidation, UsersControllers.login);
route.get('/clubs', ClubsControllers.getAll);

route.use(UsersValidations.tokenValidation);

route.get('/login/validate', UsersControllers.getRole);

export default route;
