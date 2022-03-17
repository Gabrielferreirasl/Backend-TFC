import * as express from 'express';
import UsersControllers from '../controllers/usersControllers';
import UsersValidations from '../middlewares/usersValidations';


const route = express.Router();

route.post('/login', UsersValidations.loginValidation, UsersControllers.login);
route.get('/login/validate', UsersValidations.tokenValidation, UsersControllers.getRole);

export default route;