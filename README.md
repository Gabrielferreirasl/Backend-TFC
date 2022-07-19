## Description

TFC is an informative website about soccer matches and standings! It was developed a restful API with Express (using the TDD method), the application is consumed by a front-end already provided in this project and that was also integrated - through docker-compose. The entire project was developed in Typescript and following POO and SOLID practices, the ORM used is Sequelize and the architecture pattern is MSC, integration tests were also made using chai and sinon

To access as adm:
-  User: admin@admin.com / Password: secret_admin


Deploy Aws: http://ec2-3-92-187-78.compute-1.amazonaws.com:3000

## After downloading the project:
create an .env file at app/backend to connect to your local MySQL database:
```
example:

PORT=3009
DB_USER=root
DB_PASS=123456
DB_HOST=db
DB_PORT=3306
```

Then:

```
npm run install:apps
npm run compose:up   // to start the app
npm run compose:down   // to drop
Go to: http://localhost:3000
```
