[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
### Installation
```bash
$ npm install
```
### Running the app
```bash
# development
$ npm run start
# watch mode
$ npm run start:dev
# production mode
$ npm run start:prod
```
### Running Keycloak
```bash
# run container
$ docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.4 start-dev
```
### Test
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
# test coverage
$ npm run test:cov
```
### Setup env variables
```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=auction

KEYCLOAK_PUBLIC_KEY=

FOREST_ENV_SECRET=
FOREST_AUTH_SECRET=
DATABASE_URL=postgres://postgres:postgres@localhost:5432/auction
```