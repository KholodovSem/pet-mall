import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { UsersService } from "../models/users/users.service";
import { CrmUsersService } from "../models/crm-users/crm-users.service";
import { ICrmUser } from "../models/crm-users/interfaces/crm-user.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly crmUsersService: CrmUsersService
    ) {}

    async validateDefaultUser(email: string, password: string): Promise<string | null> {
        const user = await this.usersService.findOne(email);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (user && isPasswordMatch) {
            return user.id;
        }

        return null;
    }

    async validateCrmUser(email: string, password: string): Promise<Omit<ICrmUser, "password" | "email"> | null> {
        const crmUser = await this.crmUsersService.findOne(email);
        const isPasswordMatch = await bcrypt.compare(password, crmUser.password);

        if (crmUser && isPasswordMatch) {
            const { password, email, ...rest } = crmUser;

            return rest;
        }

        return null;
    }
}
