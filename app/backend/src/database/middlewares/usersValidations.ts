import { NextFunction, Request, Response } from 'express';
import Joi = require("joi");
import serverCodes from '../utils/serverCodes';

export default class UsersValidations {
    public static loginValidation(req: Request, res: Response, next: NextFunction) {
        
        const { email, password } = req.body;

        const { error } = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
          .required(),
        password: Joi.string().min(6).not().empty()
          .required(),
        }).validate({ email, password });
    
        if (error) {
            return res.status(serverCodes.FIEDS_BAD_REQUEST)
            .json({ message: 'All fields must be filled' });
        }
    
        next();
    }
};