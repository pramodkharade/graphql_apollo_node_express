import { appModule } from "./module"
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
const bootstrap = async ()=>{
    if(!process.env.JWT_KEY){
        throw new Error("Database error");
    }
    const {httpServer,server} = await appModule.startApollo();

    httpServer.listen(4000,()=>console.log('Server is ready at http://localhost:4000/'+ server.graphqlPath))
}
bootstrap()