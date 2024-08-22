FROM node:20-slim 

COPY ./dist /app
WORKDIR /app

EXPOSE 3000

CMD [ "node", "/main" ]	