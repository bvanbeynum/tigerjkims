FROM node:latest

RUN apt-get update

RUN mkdir /usr/src/web
WORKDIR /usr/src/web
COPY ./web /usr/src/web

RUN npm install

EXPOSE 7576
CMD ["npm", "start"]
