FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

RUN npm i 

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]