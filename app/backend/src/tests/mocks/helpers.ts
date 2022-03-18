import * as fs from 'fs/promises';
import jwt = require('jsonwebtoken');
import usersMock from './usersMock';

const verifyToken = async (token: string) => {
    try {
        const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');
        const validation = jwt.verify(token, JWT_SECRET);
        return [true, validation];
        } catch (_) {
        return [false];
        }
}

const createToken = async() => {
    const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');
    return jwt.sign({ email: usersMock.realUser.email, id: usersMock.realUser.id }, JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1d',
    });
}

export  {
    createToken,
    verifyToken
}