import { Module } from "@nestjs/common";

import { CrmUsersService } from "./crm-users.service";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CrmUser } from "./entities/crm-user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CrmUser])],
    providers: [CrmUsersService],
    exports: [CrmUsersService],
})
export class CrmUsersModule {}
