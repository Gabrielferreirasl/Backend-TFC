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
    const ENDPOINT_CLUBS_ID = '/clubs';
    
    describe('"/clubs" Route', () => {

        describe('Quando o email e senha não é passado', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Clubs, "findAll").resolves(clubsMock.allclubs as any);
            request = await chai.request(app).get(ENDPOINT_CLUBS);
            });
            
            afterEach(() => {
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

    describe('"/clubs/:id" Route', () => {

        describe('Quando o id do clube é valido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Clubs, "findOne").resolves(clubsMock.allclubs[0] as any);
            const endpoint = `${ENDPOINT_CLUBS_ID}/${clubsMock.allclubs[0].id}`
            request = await chai.request(app).get(endpoint);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar o clube', () => {
                expect(request.body).to.deep.eq(clubsMock.allclubs[0]);
                expect(request.body.id).to.deep.eq(clubsMock.allclubs[0].id);
                expect(request.body.clubName).to.deep.eq(clubsMock.allclubs[0].clubName);
            });
        });

        describe('Quando o id do clube é invalido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Clubs, "findOne").resolves(clubsMock.allclubs[0] as any);
            const endpoint = `${ENDPOINT_CLUBS_ID}/k}`
            request = await chai.request(app).get(endpoint);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar a mensagem: "Team not found"', () => {
                expect(request.body).to.have.property('message');
                expect(request.body.message).to.be.eq('Team not found');
            });
        });

        describe('Quando o id é de um clube que não existe', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Clubs, "findOne").resolves(null as any);
            const endpoint = `${ENDPOINT_CLUBS_ID}/${clubsMock.allclubs[clubsMock.allclubs.length -1].id + 1}`
            request = await chai.request(app).get(endpoint);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar a mensagem: "Team not found"', () => {
                expect(request.body).to.have.property('message');
                expect(request.body.message).to.be.eq('Team not found');
            });
        });
    });
});