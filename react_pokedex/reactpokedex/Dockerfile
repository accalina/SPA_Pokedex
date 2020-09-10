
# Preparing Stage
FROM node:alpine as base
LABEL author="Accalina"

# Builder Stage
FROM base as builder
WORKDIR /cloudwolf



RUN apk update && apk add --update git curl
# RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
# RUN apt-get update && apt-get install -y nodejs
RUN git clone --branch develop --single-branch https://github.com/accalina/SPA_Pokedex.git

WORKDIR /cloudwolf/SPA_Pokedex/react_pokedex
RUN npm i
WORKDIR /cloudwolf/SPA_Pokedex/react_pokedex/reactpokedex
RUN npm i 
RUN npm run build

# Runtime Stage
FROM base as runtime 
RUN yarn global add serve
WORKDIR /cloudwolf
COPY --from=builder /cloudwolf/SPA_Pokedex/react_pokedex/reactpokedex/build .
