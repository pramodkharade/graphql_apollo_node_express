import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import { readFileSync } from "fs";
import http from "http";
import { authResolvers } from "./auth/auth.resolvers";
import { Resolvers } from "./__generated__/resolvers-types";

export class AppModule {
    constructor(public resolvers: Resolvers){}

    async startApollo(): Promise<{httpServer: http.Server, server:ApolloServer}>{
       const typeDefs = readFileSync('schema.graphql',{ encoding:"utf-8"})
       const app: Application = express();  // Explicitly type the app variable
       const httpServer = http.createServer(app);
       const server = new ApolloServer({
            resolvers: this.resolvers,
            typeDefs:typeDefs
        });

        await server.start();
        server.applyMiddleware({ app });
        return {httpServer,server};
    }
}

export const appModule = new AppModule(authResolvers);
