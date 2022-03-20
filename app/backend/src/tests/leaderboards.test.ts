import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matchs from '../database/models/matchs';
import leaderboardsMock from './mocks/leaderboardsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('matchs Route', () => {
    const ENDPOINT_MATCHS = '/leaderboard';
    
    describe('"/leaderboard/home" Route', () => {

        describe('Quando a requisição é feita sem filtros', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(leaderboardsMock.validLeaderboard as any);
            request = await chai.request(app).get(ENDPOINT_MATCHS);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar todos os campos', () => {
                expect(request.body[0]).to.have.property('id');
                expect(request.body[0]).to.have.property('homeTeam');
                expect(request.body[0]).to.have.property('homeTeamGoals');
                expect(request.body[0]).to.have.property('awayTeam');
                expect(request.body[0]).to.have.property('awayTeamGoals');
                expect(request.body[0]).to.have.property('inProgress');
                expect(request.body[0]).to.have.property('homeClub');
                expect(request.body[0]).to.have.property('awayClub');
                expect(request.body[0].awayClub).to.have.property('clubName');
                expect(request.body[0].homeClub).to.have.property('clubName');
            });
            it('Deve retornar todos os matchs', () => {
                expect(request.body).to.have.length(2);
                expect(request.body).to.deep.eq(matchsMock.matchsWithoutFilter);
            });
        });
    });