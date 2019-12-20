## Description

## Prerequisites

- Docker / Docker Desktop (<https://www.docker.com/>)

## Get started

### Source
```
// clone repo
~ git clone https://github.com/domengabrovsek/similar-websites.git

// install dependencies
~ npm install 

// setup database
~ npm run setup-db 

// run app
~ node index.js
```

### Docker container

```
// start database
~ docker run -p 27017:27017 -d --restart unless-stopped --name similar-websites-mongodb mongo

// start app
~ docker run -p 4000:3000 -d --restart unless-stopped --name similar-websites-app domengabrovsek/similar-websites

// check if server is up 
~ http://localhost:4000/test
```

## Endpoints

- [GET] http://localhost:3000/websites[yourWebsite] // e.g. http://localhost:3000/websites/google.com
- [GET] http://localhost:3000/websites/save-to-csv // this will fetch all records from database and save it to csv file on desktop
- [DELETE] http://localhost:3000/websites // this will delete all records in database (for testing purposes)
