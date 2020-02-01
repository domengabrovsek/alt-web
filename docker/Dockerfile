FROM alpine

# install dependencies
RUN apk add --update npm &&\
    apk add --update git &&\
    git clone https://github.com/domengabrovsek/similar-websites.git app &&\
    cd app && npm install

# run app
CMD node ./app/index.js