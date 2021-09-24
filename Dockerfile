FROM node:current-alpine3.14

RUN mkdir -p /home/app

WORKDIR /home/app

COPY ./app .

RUN npm install

CMD [ "node", "server.js" ]