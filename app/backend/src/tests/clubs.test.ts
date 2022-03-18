import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Clubs from '../database/models/clubs';
// import * as helpers from './mocks/helpers'
import clubsMock from './mocks/clubsMock';


chai.use(chaiHttp);

const { expect } = chai;



describe('Clubs Route', () => {
    const ENDPOINT_CLUBS = '/clubs';
    
    describe('"/clubs" Route', () => {

        describe('Quando o email e senha não é passado', async() => {
            let request: Response;
            before(async() => {
            sinon.stub(Clubs, "findAll").resolves(clubsMock.allclubs as any);
            request = await chai.request(app).get(ENDPOINT_CLUBS);
            });
            
            after(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar todos os clubes', () => {
                expect(request.body).to.deep.eq(clubsMock.allclubs);
            });
        });
    });
});