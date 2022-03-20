import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matchs from '../database/models/matchs';
import leaderboardsMock from './mocks/leaderboardsMock';
import Clubs from '../database/models/clubs';
import matchsMock from './mocks/matchsMock';
import clubsMock from './mocks/clubsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard Route', () => {
    const ENDPOINT_LEADERBOARD = '/leaderboard';
    
    describe('"/leaderboard/home" Route', () => {

        describe('Quando a requisição é feita com o filtro "home"', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(matchsMock.allMatchs as any);
            sinon.stub(Clubs, "findAll").resolves(clubsMock.allclubs as any);
            request = await chai.request(app).get(`${ENDPOINT_LEADERBOARD}/home`);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar todos os campos', () => {
                expect(request.body[0]).to.have.property('name');
                expect(request.body[0]).to.have.property('totalPoints');
                expect(request.body[0]).to.have.property('totalGames');
                expect(request.body[0]).to.have.property('totalVictories');
                expect(request.body[0]).to.have.property('totalDraws');
                expect(request.body[0]).to.have.property('totalLosses');
                expect(request.body[0]).to.have.property('goalsFavor');
                expect(request.body[0]).to.have.property('goalsOwn');
                expect(request.body[0]).to.have.property('goalsBalance');
                expect(request.body[0]).to.have.property('efficiency');
            });
            it('Deve retornar a tabela filtrada por Home', () => {
                expect(request.body).to.have.length(clubsMock.allclubs.length);
                expect(request.body).to.deep.eq(leaderboardsMock.leaderboardFilterHome);
            });
        });
    });

    describe('"/leaderboard/away" Route', () => {

        describe('Quando a requisição é feita com o filtro "away"', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(matchsMock.allMatchs as any);
            sinon.stub(Clubs, "findAll").resolves(clubsMock.allclubs as any);
            request = await chai.request(app).get(`${ENDPOINT_LEADERBOARD}/away`);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar todos os campos', () => {
                expect(request.body[0]).to.have.property('name');
                expect(request.body[0]).to.have.property('totalPoints');
                expect(request.body[0]).to.have.property('totalGames');
                expect(request.body[0]).to.have.property('totalVictories');
                expect(request.body[0]).to.have.property('totalDraws');
                expect(request.body[0]).to.have.property('totalLosses');
                expect(request.body[0]).to.have.property('goalsFavor');
                expect(request.body[0]).to.have.property('goalsOwn');
                expect(request.body[0]).to.have.property('goalsBalance');
                expect(request.body[0]).to.have.property('efficiency');
            });
            it('Deve retornar a tabela filtrada por Home', () => {
                expect(request.body).to.have.length(clubsMock.allclubs.length);
                expect(request.body).to.deep.eq(leaderboardsMock.leaderboardFilterAway);
            });
        });
    });
});