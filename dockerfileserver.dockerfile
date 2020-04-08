FROM node

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 
RUN apt-get update

COPY . .

EXPOSE 8080
EXPOSE 9200

CMD node server/server.js