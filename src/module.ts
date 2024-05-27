import { ApolloServer, ExpressContext } from "apollo-server-express";
import express, { Application } from "express";
import { readFileSync } from "fs";
import http from "http";
import jwt from "jsonwebtoken";
import { AppDataSource } from "./app-data.source";
import { authResolvers } from "./auth/auth.resolvers";
import { JwtPayload, Resolvers } from "./__generated__/resolvers-types";


export interface MyContext extends ExpressContext{
    currentUser: JwtPayload;
    authorized: boolean;
}

export class AppModule {
    constructor(public resolvers: Resolvers){}

    async startApollo(): Promise<{httpServer: http.Server, server:ApolloServer<MyContext>}>{
      await AppDataSource.initialize();
        const typeDefs = readFileSync('schema.graphql',{ encoding:"utf-8"})
       const app: Application = express();  // Explicitly type the app variable
       const httpServer = http.createServer(app);
       const server = new ApolloServer({
            resolvers: this.resolvers,
            typeDefs:typeDefs,
            context: ({req,res}) =>{
                // if(!req.headers.authorization){
                //     return {currentUser: null, req, authorized: false}
                // }
                let payload;
                try {
                     payload = jwt.verify(req.headers.authorization || '',process.env.JWT_KEY!)
                } catch (error) {
                    payload=null;
                }
                
                return {currentUser: payload, req, authorized: !!payload}
            }
        });

        await server.start();
        server.applyMiddleware({ app });
        return {httpServer,server};
    }
}

export const appModule = new AppModule(authResolvers);
