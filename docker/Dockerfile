# dockerfile for alt-web-server

FROM alpine

# install nodejs, npm, git, bash
RUN apk --no-cache add --update nodejs npm git bash

# clone minimal source code
RUN git clone --branch master --single-branch --depth 1 https://github.com/domengabrovsek/alt-web.git app

# client
WORKDIR /app/client

# build client, copy dist, remove unneeded files
RUN npm install && npm run build && npm run copy && rm ../client -rf

# build server
WORKDIR /app/server
RUN npm install

# remove all unneeded packages
RUN apk del git npm

# copy scripts
COPY wait-for-it.sh /app/wait-for-it.sh

# start app
CMD node ./app/server/index.js
