import jwt = require('jsonwebtoken');
import * as fs from 'fs/promises';
import * as bcrypt from 'bcryptjs';
import { Login, User } from '../interfaces/usersInterfaces';
import Users from '../models/users';
import ServerCodes from '../utils/serverCodes';

export default class UsersServices {
  public static async login({ email, password }: Login) {
    const user = await Users.findOne({ where: { email }, raw: true });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { response: { message: 'Incorrect email or password' },
        code: ServerCodes.TOKEN_OR_FIELD_BAD_REQUEST };
    }

    const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');

    const token = jwt.sign({ email, id: user.id }, JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    const newUser: User = user;
    delete newUser.password;

    return { response: { user: { ...newUser }, token }, code: ServerCodes.RECEIVED };
  }

  public static async getRole(userId: number) {
    const user = await Users.findOne({ where: { id: userId }, raw: true });
    const { role } = user as User;

    return {
      response: role,
      code: ServerCodes.RECEIVED,
    };
  }
}
