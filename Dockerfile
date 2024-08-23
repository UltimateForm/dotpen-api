FROM node:20-slim 

COPY ./dist /app
COPY .env /app
WORKDIR /app

EXPOSE 3000

CMD [ "node", "index.js" ]	