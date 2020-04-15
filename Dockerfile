FROM node:lts-alpine

WORKDIR /app

RUN apk update && \
    npm install -g @vue/cli \
    json-server

EXPOSE 8080
EXPOSE 3000