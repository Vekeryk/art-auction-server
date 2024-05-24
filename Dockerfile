FROM node:22-alpine AS build

WORKDIR /usr/src/app
ARG SERVICE_NAME

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY . .
RUN yarn build ${SERVICE_NAME}

FROM node:22-alpine AS production

ARG SERVICE_NAME

COPY --from=build /usr/src/app/dist .
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/apps/${SERVICE_NAME}/.env ./apps/bids/

ENV APP_MAIN_FILE=apps/${SERVICE_NAME}/main
CMD node ${APP_MAIN_FILE}