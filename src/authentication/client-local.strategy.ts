import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "./auth.service";

import { PassportLocalStrategy } from "../common/constants";

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(Strategy, PassportLocalStrategy.CLIENT) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string) {
        const id = await this.authService.validateDefaultUser(email, password);

        if (!id) {
            throw new UnauthorizedException("");
        }

        return id;
    }
}
