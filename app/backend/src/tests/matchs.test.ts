import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Matchs from '../database/models/matchs';
import matchsMock from './mocks/matchsMock';
import { Match } from '../database/interfaces/matchsInterfaces';
import * as helpers from './mocks/helpers'
import Clubs from '../database/models/clubs';


chai.use(chaiHttp);

const { expect } = chai;



describe('matchs Route', () => {
    const ENDPOINT_MATCHS = '/matchs';
    const ENDPOINT_CREATE_MATCH = '/matchs';
    const ENDPOINT_MATCHS_INPROGRESS = '/matchs?inProgress';
    const ENDPOINT_MATCHS_FINISH = '/matchs';
    
    describe('"/matchs" Route', () => {

        describe('Quando a requisição é feita sem filtros', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(matchsMock.matchsWithoutFilter as any);
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

    describe('"/matchs?inProgress" Route', () => {

        describe('Quando a requisição é feita com o filtro "true"', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(matchsMock.matchsWithProgressTrue as any);
            request = await chai.request(app).get(`${ENDPOINT_MATCHS_INPROGRESS}=true`);
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
                expect(request.body).to.have.length(matchsMock.matchsWithProgressTrue.length);
                expect(request.body).to.deep.eq(matchsMock.matchsWithProgressTrue);
            });
            it('Deve retornar todos os matchs com o inProgress: "true"', () => {
                expect(request.body.every(({ inProgress }: Match) => inProgress)).to.be.eq(true);
            });
        });

        describe('Quando a requisição é feita com o filtro "false"', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "findAll").resolves(matchsMock.matchsWithProgressFalse as any);
            request = await chai.request(app).get(`${ENDPOINT_MATCHS_INPROGRESS}=false`);
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
                expect(request.body).to.have.length(matchsMock.matchsWithProgressFalse.length);
                expect(request.body).to.deep.eq(matchsMock.matchsWithProgressFalse);
            });
            it('Deve retornar todos os matchs com o inProgress: "false"', () => {
                expect(request.body.every(({ inProgress }: Match) => inProgress)).to.be.eq(false);
            });
        });
    });

    describe('"/matchs" Route create', () => {

        describe('Quando a requisição é feita com o token valido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "create").resolves({ id: 1, ...matchsMock.matchToBeAdded } as any);
            const Authorization = await helpers.createToken();
            request = await chai.request(app).post(ENDPOINT_CREATE_MATCH)
              .set({ Authorization }).send(matchsMock.matchToBeAdded);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 201', async() => {
                expect(request).to.have.status(201);
            });
            it('Deve retornar todos os campos', () => {
                expect(request.body).to.have.property('id');
                expect(request.body).to.have.property('homeTeam');
                expect(request.body).to.have.property('homeTeamGoals');
                expect(request.body).to.have.property('awayTeam');
                expect(request.body).to.have.property('awayTeamGoals');
                expect(request.body).to.have.property('inProgress');
            });
            it('Deve retornar o match com o id inserido', () => {
                expect(request.body).to.deep.eq({ id: 1, ...matchsMock.matchToBeAdded });
            });
        });

        describe('Quando a requisição é feita com o token invalido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "create").resolves({ id: 1, ...matchsMock.matchToBeAdded } as any);
            request = await chai.request(app).post(ENDPOINT_CREATE_MATCH)
              .set({ Authorization: 'fdsassa' }).send(matchsMock.matchToBeAdded);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar o message: "Expired or invalid token"', () => {
                expect(request.body.message).to.be.eq("Expired or invalid token");
            });
        });

        describe('Quando a requisição é feita com times iguais', async() => {
            let request: Response;
            beforeEach(async() => {
                sinon.stub(Matchs, "create").resolves({} as any);
                const Authorization = await helpers.createToken();
                request = await chai.request(app).post(ENDPOINT_CREATE_MATCH)
                  .set({ Authorization }).send(matchsMock.matchToBeAddedEqualTeams);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar o message: "It is not possible to create a match with two equal teams"', () => {
                expect(request.body.message).to.be.eq("It is not possible to create a match with two equal teams");
            });
        });

        describe('Quando a requisição é feita com um time que não existe', async() => {
            let request: Response;
            beforeEach(async() => {
                sinon.stub(Matchs, "create").resolves({} as any);
                sinon.stub(Clubs, "findOne").resolves(null as any);
                const Authorization = await helpers.createToken();
                request = await chai.request(app).post(ENDPOINT_CREATE_MATCH)
                  .set({ Authorization }).send(matchsMock.matchToBeAdded);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar o message: "There is no team with such id!"', () => {
                expect(request.body.message).to.be.eq("There is no team with such id!");
            });
        });
    });

    describe('"/matchs/:id/finish" Route', () => {

        describe('Quando a requisição é feita com o token valido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "update").resolves(0 as any);
            sinon.stub(Matchs, "findOne").resolves(matchsMock.matchFinished as any);
            const Authorization = await helpers.createToken();
            const endpoint = `${ENDPOINT_MATCHS_FINISH}/1/finish`;
            request = await chai.request(app).patch(endpoint)
              .set({ Authorization });
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar todos os campos', () => {
                expect(request.body).to.have.property('id');
                expect(request.body).to.have.property('homeTeam');
                expect(request.body).to.have.property('homeTeamGoals');
                expect(request.body).to.have.property('awayTeam');
                expect(request.body).to.have.property('awayTeamGoals');
                expect(request.body).to.have.property('inProgress');
            });
            it('Deve retornar o match finalizado', () => {
                expect(request.body).to.deep.eq(matchsMock.matchFinished);
            });
        });

        describe('Quando a requisição é feita com o token invalido', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "update").resolves({} as any);
            sinon.stub(Matchs, "findOne").resolves({} as any);
            const endpoint = `${ENDPOINT_MATCHS_FINISH}/1/finish`;
            request = await chai.request(app).patch(endpoint)
                .set({ Authorization: 'sadasda' });
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 401', async() => {
                expect(request).to.have.status(401);
            });
            it('Deve retornar o message: "Expired or invalid token"', () => {
                expect(request.body.message).to.be.eq("Expired or invalid token");
            });
        });

        describe('Quando a requisição é feita com um Match que não existe', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "update").resolves({} as any);
            const Authorization = await helpers.createToken();
            request = await chai.request(app).patch(`${ENDPOINT_MATCHS}/1`)
                .set({ Authorization });
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar o message: "There is no match with such id!"', () => {
                expect(request.body.message).to.be.eq("There is no match with such id!");
            });
        });
    });

    describe('"/matchs/:id" Route', () => {

        describe('Quando a requisição é feita com os gols', async() => {
            let request: Response;
            beforeEach(async() => {
            sinon.stub(Matchs, "update").resolves(0 as any);
            const endpoint = `${ENDPOINT_MATCHS}/1`;
            request = await chai.request(app).patch(endpoint).send(matchsMock.editMatch);
            });
            
            afterEach(() => {
                sinon.restore();
            });

            it('Deve retornar o status: 200', async() => {
                expect(request).to.have.status(200);
            });
            it('Deve retornar o message: "Goals updated"', () => {
                expect(request.body.message).to.be.eq("Goals updated");
            });
        });
    });
});