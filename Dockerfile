FROM node:current-alpine3.14
RUN mkdir -p /home/app
WORKDIR /home/app
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install
COPY ./app .
CMD [ "node", "server.js" ]