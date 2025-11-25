FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY ./package-lock.json ./
COPY ./package.json ./

COPY . .

RUN npm i


CMD ["sh", "-c", "npm run build"]