FROM node:16-alpine as build-stage
ENV NODE_ENV build
USER node
WORKDIR /home/node
COPY --chown=node:node package*.json ./
RUN npm i
COPY --chown=node:node . .
RUN npm run build

FROM node:16-alpine as production-stage
ENV NODE_ENV production
USER node
WORKDIR /home/node
COPY --from=build-stage --chown=node:node /home/node/build ./build/
COPY --from=build-stage --chown=node:node /home/node/node_modules ./node_modules/

EXPOSE 8000
ENTRYPOINT [ "node", "/home/node/build/src/server.js" ]
