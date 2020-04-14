FROM alpine

# install dependencies
RUN apk add --update npm
RUN apk add --update git
RUN git clone https://github.com/domengabrovsek/alt-web.git app
RUN cd app && npm install

# run app
CMD node ./app/server/index.js