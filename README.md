# SPA_Pokedex
<img align="left" alt="Pokebal" width="26px" src="https://www.kindpng.com/picc/m/290-2906150_pokeball-pixel-art-png-transparent-png.png" />
A Pokedex showcase using ReactJS, VueJS, and GraphQL


## Compiling and Building
Used by maintainer to update and improve running software

### via Local Images 💻
This method used for building the image from local Dockerfile blueprint
```sh
$ docker-compose -f builde-compose.yml build --no-cache --force-rm
$ docker-compose up -d
$ docker rmi -f $(docker images -f "dangling=true" -q)
```

### via Docker Registry 🌍
This method used for building the image from local Dockerfile and submit it to the GitLab Registry
```sh
$ docker login
$ docker build -t accalina/pokedex_react --no-cache .
$ docker push accalina/pokedex_react
```

## Installation 💾

### via Docker-compose 🐬

Docker-compose file is set to read the .env file we've created before and do the required steps automatically, provided the .env file is valid the installation should be completed in no time.
 ```sh
$ docker-compose up -d
```

### via Dockerfile 🐳

Docker file can be directly called without docker-compose, you can do this if you haven't installed docker-compose yet.
```sh
$ docker build -t accalina/pokedex_react --no-cache .
$ docker run -p 80:3000 --name=pokedex_react accalina/pokedex_react
```

### via Docker Swarm 🐳🐳🐳

You can run this steps after you've initiated the Swarm nodes, please note that in this example we're using docker-compose as base file.
```sh
$ docker stack deploy pokedex_react -c docker-compose.yml
$ docker service scale pokedex_react=1
```

### Manually 📟

If don't have docker or just want to run manually, we'll manually clone and run it ourself, be advice this steps is quite lengthy compared to previous steps.
```sh
$ git clone --branch master --single-branch https://github.com/accalina/SPA_Pokedex.git
$ cd SPA_Pokedex/react_pokedex
$ npm install
$ cd reactpokedex
$ npm install
$ npm run build
$ yarn global add serve
$ serve -p 3000 -s .
```
