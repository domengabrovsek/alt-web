# How to use

## Prerequisites

- NodeJs (<https://nodejs.org/en/>)
- Docker (<https://www.docker.com/>)

## Get started

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

## Endpoints

- [GET] http://localhost:3000/websites[yourWebsite] // e.g. http//localhost:3000/websites/google.com
- [GET] http://localhost:3000/websites/save-to-csv // this will fetch all records from database and save it to csv file on desktop
- [DELETE] http://localhost:3000/websites // this will delete all records in database (for testing purposes)
