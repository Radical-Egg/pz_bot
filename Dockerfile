FROM node:17.1.0


WORKDIR /usr/src/app

COPY ./pz_bot/src/package*.json ./

RUN npm install

COPY ./pz_bot/src .

CMD ["node", "index.js"]