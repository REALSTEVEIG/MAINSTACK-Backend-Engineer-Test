FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install

ARG NODE_ENV
RUN npm ci

COPY . ./

EXPOSE 8000

CMD ["node", "./src/server.ts"]
