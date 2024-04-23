import { Module } from "@nestjs/common";

import { CrmAuthController } from "./crm-auth.controller";
import { CrmAuthService } from "./crm-auth.service";

import { CrmUsersModule } from "../../models/crm-users/crm-users.module";

@Module({
    imports: [CrmUsersModule],
    controllers: [CrmAuthController],
    providers: [CrmAuthService],
})
export class CrmAuthModule {}
