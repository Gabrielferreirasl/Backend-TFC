import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/users';
import usersMock from './mocks/usersMock';
import * as fs from 'fs/promises';
import jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const { expect } = chai;

const verifyToken = async (token: string) => {
    try {
        const JWT_SECRET = await fs.readFile('jwt.evaluation.key', 'utf-8');
        const validation = jwt.verify(token, JWT_SECRET);
        return [true, validation];
        } catch (_) {
        return [false];
        }
}

describe('Login Route', () => {
    const ENDPOINT_LOGIN = '/login';
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
        before(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserEmail);
        });
        
        after(() => {
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
        before(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserPass);
        });
        
        after(() => {
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
        before(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.invalidUserBody.invalidUserWrongPass);
        });
        
        after(() => {
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
        before(async() => {
            sinon.stub(Users, "findOne").resolves(usersMock.realUser as any);
            request = await chai.request(app).post(ENDPOINT_LOGIN).send(usersMock.validUserBody);
        });
        
        after(() => {
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
            const [tokenIsValid, user] = await verifyToken(request.body.token)
            expect(tokenIsValid).to.eq(true);
            expect(user).to.have.property('id');
        });
    });
})
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

//   it('Seu sub-teste', () => {
//     expect(false).to.be.eq(true);
//   });
});
