import { Entity,Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName: string="pramod";

    @Column()
    lastName: string="Kharade";

    @Column({nullable:false})
    email: string="";

    @Column()
    password: string="";

}