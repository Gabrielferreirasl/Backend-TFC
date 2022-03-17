import { Login, User } from "../interfaces/usersInterfaces";
import jwt = require('jsonwebtoken');
import Users from "../models/users";
import serverCodes from "../utils/serverCodes";
import * as fs from 'fs/promises';
import * as bcrypt from 'bcryptjs';

export default class UsersServices {
    public static async login({ email, password }: Login) {
    const user = await Users.findOne({ where: { email }, raw: true });

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return { response: { message: 'Incorrect email or password'},
    code: serverCodes.TOKEN_OR_FIELD_BAD_REQUEST };
    }

    const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');

    const token = jwt.sign({ email, id: user.id }, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
    });

      const newUser: User = user;
      delete newUser.password;

      return { response: { user: { ...newUser }, token }, code: serverCodes.RECEIVED }
    }
}