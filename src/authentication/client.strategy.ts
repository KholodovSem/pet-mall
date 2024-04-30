import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from "@nestjs/config";

import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { ClientAuthService } from "./client-auth.service";

import jwtConfig from "../config/jwt/jwt.config";

import { PassportStrategyType } from "../common/constants";

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(LocalStrategy, PassportStrategyType.CLIENT_LOCAL) {
    constructor(private authService: ClientAuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string) {
        const id = await this.authService.validate(email, password);

        if (!id) {
            throw new UnauthorizedException("");
        }

        return id;
    }
}

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(JwtStrategy, PassportStrategyType.CLIENT_JWT) {
    constructor(@Inject(jwtConfig.KEY) jwtConfiguration: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfiguration.secret,
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
