import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/users';
import usersMock from './mocks/usersMock';
import * as helpers from './mocks/helpers'


chai.use(chaiHttp);

const { expect } = chai;



describe('Login Route', () => {
    const ENDPOINT_LOGIN = '/login';
    const ENDPOINT_LOGIN_VALIDATE = '/login/validate';
    
    describe('"/login" Route', () => {

    describe('Quando o email e senha não é passado', async() => {
        let request: Response;
        before(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send();
        });
        
        after(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar a mensagem: "All fields must be filled"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq('All fields must be filled');
        });
    });

    describe('Quando o email não é valido', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserEmail);
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar a mensagem: "Incorrect email or password"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq("Incorrect email or password");
        });
    });

    describe('Quando a password é menor que 6 caracteres', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserPass);
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar a mensagem: "Incorrect email or password"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq("Incorrect email or password");
        });
    });

    describe('Quando o email está correto mas a password não', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserWrongPass);
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar a mensagem: "Incorrect email or password"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq("Incorrect email or password");
        });
    });

    describe('Quando o email e password estão corretos', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.validUserBody);
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 200', async() => {
            expect(request).to.have.status(200);
        });
        it('Deve retornar o usuario e o token', () => {
            expect(request.body.user).to.have.property('id');
            expect(request.body.user).to.have.property('username');
            expect(request.body.user).to.have.property('role');
            expect(request.body.user).to.have.property('email');
            expect(request.body.user).not.to.have.property('password');
        });
        it('Deve token um token valido', async() => {
            expect(request.body).to.have.property('token');
            const [tokenIsValid, user] = await helpers.verifyToken(request.body.token)
            expect(tokenIsValid).to.eq(true);
            expect(user).to.have.property('id');
        });
    });
});

describe('"/login/validate" Route', () => {

    describe('Quando o authorization é valido', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            const Authorization = await helpers.createToken()
            request = await chai.request(app).get(ENDPOINT_LOGIN_VALIDATE).set({ Authorization });
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 200', async() => {
            expect(request).to.have.status(200);
        });
        it('Deve retornar o role', () => {
            expect(request.body).to.eq(usersMock.realUser.role);
        });
    });

    describe('Quando o authorization não é valido', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).get(ENDPOINT_LOGIN_VALIDATE).set({ Authorization: "564sdvvs" });
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar o message: "Expired or invalid token"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq("Expired or invalid token");
        });
    });

    describe('Quando o authorization não é enviado', async() => {
        let request: Response;
        beforeEach(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).get(ENDPOINT_LOGIN_VALIDATE);
        });
        
        afterEach(() => {
            sinon.restore();
        });

        it('Deve retornar o status: 401', async() => {
            expect(request).to.have.status(401);
        });
        it('Deve retornar o message: "Token not found"', () => {
            expect(request.body).to.have.property('message');
            expect(request.body.message).to.eq("Token not found");
        });
    });
});
});
