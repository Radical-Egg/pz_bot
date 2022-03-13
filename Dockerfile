FROM node:17.1.0


WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

COPY ./src .

CMD ["node", "index.js"]
