import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICrmUser } from "../interfaces/crm-user.interface";
import { PossibleRole } from "../../../common/constants";

@Entity({ name: "crm_users" })
export class CrmUser implements ICrmUser {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: PossibleRole,
        array: true,
    })
    roles!: PossibleRole[];
}
