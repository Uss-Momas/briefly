# Briefly - Backend API
This is the backend API for the briefly application

## Setup project


### Requirements
1. Create .env files for diferent environments

* ```.env.local```: to use sqlite as main datasource - in the file .env.sqlite you can have the datasource URL
* ```.env.dev```: to use postgres as main datasource - in the file .env.postgres you can have the datasource URL

2. Install dotenv-cli globally
```shell
npm install -g dotenv-cli
```