FROM node

ENV NPM_CONFIG_LOGLEVEL warn

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 8000

CMD [ "node", "server.js" ]
