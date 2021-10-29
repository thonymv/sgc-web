FROM node:14.18.1-alpine3.14

WORKDIR /app

COPY . .

RUN yarn install

CMD ["yarn","start"]