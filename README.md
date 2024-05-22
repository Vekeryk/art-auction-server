[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
### Installation
```bash
$ yarn install
```
### Running the app
```bash
# development
$ yarn run start
# watch mode auction
$ yarn run start:dev
# watch mode bids
$ yarn run start:dev bids
# production mode
$ yarn run start:prod
```
### Running Keycloak
```bash
# run container
$ docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:24.0.4 start-dev
```
### Test
```bash
# unit tests
$ yarn run test
# e2e tests
$ yarn run test:e2e
# test coverage
$ yarn run test:cov
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