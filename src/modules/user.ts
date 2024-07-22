import { Unique, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import ExtendedBaseEntity from "./extend-base";

@Entity()
@Unique(["email"])
export class User extends ExtendedBaseEntity{

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    is_verified: boolean;


}