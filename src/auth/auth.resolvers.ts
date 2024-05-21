import { Resolvers } from "../__generated__/resolvers-types";
import { userService } from "./user/user.service";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const authResolvers:Resolvers ={
    Mutation:{
        async signup(parent, {input}, context){
                const existingUser = await this.userService.findOneByEmail(input.email);
                if(existingUser) throw new GraphQLError("User already exist",{extensions:{code:"BAD_REQUEST"}});
                
                const user = await userService.create(input);
                const jwtToken = jwt.sign({
                    email:input.email,userId: user.id
                },
                process.env.JWT_KEY!,
                {
                    expiresIn:"7 days"
                })
                return { user, jwt:jwtToken }
        }
    },
    Query:{
        get: () => "ok"
    }
}