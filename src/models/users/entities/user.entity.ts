import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { IUser } from "../interfaces/user.interface";

@Entity({ name: "users" })
export class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @CreateDateColumn({ name: "created_at" })
    _createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    _updatedAt!: Date;
}
