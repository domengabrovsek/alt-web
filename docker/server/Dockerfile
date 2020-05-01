# dockerfile for alt-web-server

# https://hub.docker.com/_/node
FROM node:12.16.3

# clone source code
RUN git clone https://github.com/domengabrovsek/alt-web.git app

RUN cd app && git checkout docker-spin-up

# install dependencies
RUN npm install --prefix "app/server"

COPY wait-for-it.sh /app/wait-for-it.sh

# run app
CMD node ./app/server/index.js