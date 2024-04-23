import { Module } from "@nestjs/common";

import { ApiAuthController } from "./api-auth.controller";
import { ApiAuthService } from "./api-auth.service";

import { UsersModule } from "../../models/users/users.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [UsersModule, JwtModule],
    controllers: [ApiAuthController],
    providers: [ApiAuthService],
})
export class ApiAuthModule {}
