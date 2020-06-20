# dockerfile for alt-web-client

FROM alpine

## install nodejs, npm git
RUN apk --no-cache add --update nodejs npm git

# clone minimal source code
RUN git clone --branch master --single-branch --depth 1 https://github.com/domengabrovsek/alt-web.git app

# install dependencies
RUN npm install --prefix "app/client"

# remove all unneeded packages
RUN apk del git npm

# run app
CMD npm run serve --prefix "app/client"