# dockerfile for alt-web-server

FROM alpine

## install nodejs, npm, git, bash
RUN apk --no-cache add --update nodejs npm git bash

# clone minimal source code
RUN git clone --branch refactor-docker-image --single-branch --depth 1 https://github.com/domengabrovsek/alt-web.git app

# build client
WORKDIR /app/client

RUN npm install

RUN npm run build

RUN npm run copy

# install dependencies
# RUN npm install --prefix "app/server"

# # remove all unneeded packages
# RUN apk del git npm

# # copy scripts
# COPY wait-for-it.sh /app/wait-for-it.sh

# # run app
# CMD node ./app/server/index.js
