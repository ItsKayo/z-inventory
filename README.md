# How to run this application
- Fork and clone from the main repository
### Creating the docker container and database
- Run ```docker run --rm --name pg-docker -e POSTGREST_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres``` *** Take note of the container ID that is returned ***
- Run ```docker exec -it <container-ID> bash```
- Run ```psql -U postgres```
- Run ```CREATE DATABASE z_inventory;```
### Installing dependencies
- In a command prompt, navigate to the cloned repository
- Navigate to the frontend directory
- Run ```npm install```
- Navigate to the server directory
- Run ```npm install```
### Initializing the database
- In a command prompt, navigate to the server directory
- Run ```npx knex migrate:latest```
- (Optional) If you want test data you can run ```npx knex seed:run```
  
# Running the local servers
- Open two fresh command prompts
- In one command prompt, navigate to the server directory
- Run ```npm start```
- In the other command prompt, navigate to the frontend directory
- Run ```npm start```
