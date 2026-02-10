# React + TypeScript + Vite + Docker + PostgreSQL

This template provides a minimal setup to get the dockerized application running.


# Executing npm run devo command for application startup

1. Make sure docker engine is running either through docker engine itself or with an active docker desktop
2. in the root directory (e.g c:\username\Project) execute command "npm run devo" which will execute "npm install" which will install all necessary node modules and dev dependencies. Then it will execute docker compose up -d in the command line interface which will build and start all services defined in the docker-compose.yaml file (including frontend, backend, and database), install dependencies as specified in the Dockerfile during the build process. Then it will execute in the CLI which will run the src/server/sql_db/convertData_agnostic.ts file which will convert all JSON files from src/server/data folder into [originalFileName].csv files
3. Then it will execute npm run seed-agno which will seed the local postgreSQL database on port 5432 with the data from all the converted .csv files.
4. Finally it will run npm run types-agno which will generate Typescript schemas from database data
5. Then the docker container monitor for file changes to automatically sync updates to running containers without manual rebuilds.
6. You can visit local host 5173 to view the active application you should see trust controls and FAQs with the appropriate data fetched from the offline postgreSQL database
7. The key word search will be displayed in the top of the page and it should be used for filtering simple categories.

# Executing npm run tear command for docker container teardown

This will run docker compose down in the command line interface (cli)

Then run docker system prune –all --volumes –force in the CLI which removes all unused containers, networks, images (both dangling and unused), and optionally, volumes. **(this is to be used for this project so be very careful if other docker containers and volumes are present)**
