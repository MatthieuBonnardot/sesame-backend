FROM node:14

WORKDIR /usr/src/app

COPY package*.json .env ./

RUN npm install

RUN npm install -g ts-node
RUN npm install -g typescript

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev:watch"]

