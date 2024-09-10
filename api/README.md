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

### Run locally with SQLite (limited version)
1. Install dependencies of the project:
```shell
npm install
```
2. Create and Configure the .env.local file with the content:
```DATABASE_URL="file:./name_of_your_database.db"```
3. Create the tables:
```shell
npm run migrate:sqlite
```
4. Create the Role table for the Users in SQLite:
```shell
npm run seed:sqlite
```
5. Run the API:
```shell
npm run dev:sqlite
```
6. Start testing the API

### Run locally with Postgres SQL
1. Install dependencies of the project:
```shell
npm install
```
2. Create and Configure the .env.local file with the content:
```DATABASE_URL="postgresql://USER_NAME:USER_PWD@localhost:5432/database_name?schema=public"```
3. Create the tables:
```shell
npm run migrate:postgres
```
4. Create the Roles for the Users:
```shell
npm run seed:postgres
```
5. Run the API:
```shell
npm run dev:postgres
```
6. Start testing the API