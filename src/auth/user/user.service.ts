import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { SignupInput } from "../../__generated__/resolvers-types";
import bcrypt from "bcrypt";
import { AppDataSource } from "../../app-data.source";
export class UserService {
    constructor(public userRepository:Repository<User>){}
    async create(signupInput:SignupInput){
        const password = await bcrypt.hash(signupInput.password,10);
        const user = this.userRepository.create({...signupInput,password:password})
        return await this.userRepository.save(user);
    }
    async findOneByEmail(email:string){
        //const user = await this.userRepository.findOneBy({email:email})
        // only if entity.column({select:false})
        const user = await this.userRepository.createQueryBuilder('user')
        .addSelect('user.password').select().where('email = :email',{email}).getOne();
        return user;
        
        
    }
}

export const userService = new UserService(AppDataSource.getRepository(User));