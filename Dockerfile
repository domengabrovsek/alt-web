FROM ubuntu

# fetch latest stuff
RUN apt-get update -y &&\
    apt-get install nodejs -y && apt-get install npm -y &&\
    apt-get install git -y &&\
    git clone https://github.com/domengabrovsek/similar-websites.git app &&\
    cd app && npm install

# run app
CMD node ./app/index.js