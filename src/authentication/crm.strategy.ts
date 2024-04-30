import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigType } from "@nestjs/config";

import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { CrmAuthService } from "./crm-auth.service";

import jwtConfig from "../config/jwt/jwt.config";

import { PassportStrategyType } from "../common/constants";

@Injectable()
export class CrmLocalStrategy extends PassportStrategy(LocalStrategy, PassportStrategyType.CRM_LOCAL) {
    constructor(private authService: CrmAuthService) {
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validate(email, password);

        if (!user) {
            throw new UnauthorizedException("");
        }

        return user;
    }
}

@Injectable()
export class CrmJwtStrategy extends PassportStrategy(JwtStrategy, PassportStrategyType.CRM_JWT) {
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
