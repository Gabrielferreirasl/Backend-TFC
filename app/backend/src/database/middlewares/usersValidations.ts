import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import jwt = require('jsonwebtoken');
import * as fs from 'fs/promises';
import ServerCodes from '../utils/serverCodes';
import { User } from '../interfaces/usersInterfaces';

const INCORRET_EMAIL_OR_PASSWORD = 'Incorrect email or password';

const LOGIN_MESSAGES = {
  'string.min': INCORRET_EMAIL_OR_PASSWORD,
  'string.base': INCORRET_EMAIL_OR_PASSWORD,
  'string.email': INCORRET_EMAIL_OR_PASSWORD,
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
};

export default class UsersValidations {
  public static loginValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const { error } = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages(LOGIN_MESSAGES),
      password: Joi.string().min(6).not().empty()
        .required()
        .messages(LOGIN_MESSAGES),
    }).validate({ email, password });

    if (error) {
      return res.status(ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST)
        .json({ message: error.details[0].message });
    }

    next();
  }

  public static async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST)
        .json({ message: 'Token not found' });
    }

    const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');

    try {
      const user = jwt.verify(authorization, JWT_SECRET);
      const { id } = user as User;
      req.body = { userId: id, ...req.body };

      next();
    } catch (_) {
      return res.status(ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST)
        .json({ message: 'Expired or invalid token' });
    }
  }
}
