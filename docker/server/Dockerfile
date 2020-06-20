# dockerfile for alt-web-server

FROM alpine

## install nodejs, npm, git
RUN apk --no-cache add --update nodejs npm git

# clone source code
RUN git clone --branch master --single-branch --depth 1 https://github.com/domengabrovsek/alt-web.git app

# install dependencies
RUN npm install --prefix "app/server"

# remove all unneeded packages
RUN apk del git npm

# copy scripts
COPY wait-for-it.sh /app/wait-for-it.sh

# run app
CMD node ./app/server/index.js
