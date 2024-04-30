import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UsersModule } from "../models/users/users.module";
import { CrmUsersModule } from "../models/crm-users/crm-users.module";

import { ClientJwtStrategy, ClientLocalStrategy } from "./client.strategy";
import { CrmJwtStrategy, CrmLocalStrategy } from "./crm.strategy";

import { ClientAuthService } from "./client-auth.service";
import { CrmAuthService } from "./crm-auth.service";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        UsersModule,
        CrmUsersModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    secret: configService.get("jwt.secret"),
                    global: true,
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [
        ClientLocalStrategy,
        ClientJwtStrategy,
        CrmLocalStrategy,
        CrmJwtStrategy,
        ClientAuthService,
        CrmAuthService,
    ],
})
export class AuthModule {}
