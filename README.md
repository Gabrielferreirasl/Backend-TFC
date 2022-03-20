**Requisitos obrigatórios:**

!Sequelize!

- [x] 1 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de club
-
- [x] 2 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matchs

- [x] 3 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela users

_LOGIN_:

- [x] 4 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos back-end em /src com um mínimo de 7 linhas cobertas
-
- [x] 5 - Desenvolva o endpoint /login no backend de maneira ele permita o acesso com dados válidos no frontend

- [x] 6 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos back-end em /src com um mínimo de 19 linhas cobertas

- [x] 7 - Desenvolva o endpoint /login no backend de maneira ele não permita o acesso com um email inválido no front-end

- [x] 8 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos back-end em /src com um mínimo de 25 linhas cobertas

- [x] 9 - Desenvolva o endpoint /login no back-end de maneira ele não permita o acesso com uma senha inválida no front-end

- [x] 10 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos back-end em /src com um mínimo de 35 linhas cobertas

- [x] 11 - Desenvolva o endpoint /login no back-end de maneira ele não permita o acesso sem informar um email no front-end

- [x] 12 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos back-end em /src com um mínimo de 45 linhas cobertas

- [x] 13 - Desenvolva o endpoint /login no back-end de maneira ele não permita o acesso sem informar uma senha no front-end 

- [x] 14 - Desenvolva o endpoint /login/validate no back-end de maneira ele retorne os dados corretamente no front-end

_JOGOS:_

- [x] 15 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos back-end em /src com um mínimo de 70 
linhas cobertas

- [x] 16 - Desenvolva o endpoint /clubs no back-end de forma que ele possa retornar todos os times corretamente

- [x] 17 - Desenvolva o endpoint /clubs/:id no back-end de forma que ele possa retornar dados de um time específico

- [x] 18 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos back-end em /src com um mínimo de 80 linhas cobertas

- [x] 19 - Desenvolva o endpoint /matchs de forma que os dados apareçam corretamente na tela de partidas no front-end.

- [x] 20 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas em andamento na tela de partidas do front-end

- [x] 21 - Desenvolva o endpoint /matchs de forma que seja possível filtrar as partidas finalizadas na tela de partidas do front-end

_ADICIONAR PARTIDAS:_


- [x] 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivo back-end em /src com um mínimo de 100 linhas cobertas

- [x] 23 - Desenvolva a rota /matchs de modo que seja possível salvar uma partida com o status de inProgress como true no banco de dados

- [x] 24 - Desenvolva a rota /matchs/:id/finish de modo que seja possível salvar uma partida com o status de inProgress como false no banco de dados

- [x] 25 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com times iguais

- [x] 26 - Desenvolva o endpoint /matchs de forma que não seja possível inserir uma partida com time que não existe na tabela clubs

_EDITAR PARTIDAS:_

- [x] 27 - Desenvolva o endpoint /matchs/:id de forma que seja possível atualizar partidas em andamento

- [x] 28 - Desenvolva o endpoint /matchs/:id de forma que seja possível finalizar partidas em andamento

_LEADERBOARD HOME:_

- [x] 29 - Desenvolva o endpoint /leaderboard/home de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do frontend com os dados iniciais do banco de dados

- [x] 30 - Desenvolva o endpoint /leaderboard/home, de forma que seja possível filtrar a classificações dos times quando mandantes na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela será atualizada

_LEADERBOARD AWAY_

- [x] 31 - Desenvolva o endpoint /leaderboard/away, de forma que seja possível filtrar as classificações dos times na tela de classificação do front-end, com os dados iniciais do banco de dados

- [x] 32 - Desenvolva o endpoint /leaderboard/away de forma que seja possível filtrar a classificações dos times na tela de classificação do front-end e ao inserir a partida Corinthians 2 X 1 Internacional a tabela seja atualizada

_LEADERBOARD:_

- [x] 33 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

- [x] 34 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Flamengo 3 X 0 Napoli-SC a tabela será atualizada

- [x] 35 - Desenvolva o endpoint /leaderboard de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e ao inserir a partida Minas Brasília 1 X 0 Ferroviária a tabela será atualizada
