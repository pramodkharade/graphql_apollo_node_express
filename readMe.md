# install base packages
`npm i express @types/express apollo-server-express graphql @types/graphql @types/node`

# autogenerate schema defination 
`npm i -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers`

# add typeorm postgress driver and typescript  for it
`npm i typeorm pg reflect-metadata`

# added Bcrypt npm to encryption of password
`npm i bcrypt @types/bcrypt`

# jwtwebtoken npm
`npm i jsonwebtoken @types/jsonwebtoken`

`npm i dotenv --save`

# create image with postgres docker image with container name and expose port and read env name of DB connection
`docker run -ti --name app_postgres -p 5455:5432 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=main postgres`

# create image from app_postgress
`docker commit app_postgres msgappdb`

# while terminating docker. it should create container with same config
`docker run --rm -ti -p 5455:5432 msgappdb`
