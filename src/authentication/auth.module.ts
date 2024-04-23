import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";

import { UsersModule } from "../models/users/users.module";
import { CrmUsersModule } from "../models/crm-users/crm-users.module";
import { ClientLocalStrategy } from "./client-local.strategy";
import { CrmLocalStrategy } from "./crm-local.strategy";

@Module({
    imports: [UsersModule, CrmUsersModule],
    providers: [AuthService, ClientLocalStrategy, CrmLocalStrategy],
})
export class AuthModule {}
