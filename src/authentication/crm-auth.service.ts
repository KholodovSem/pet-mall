import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { CrmUsersService } from "../models/crm-users/crm-users.service";

import { Token } from "../common/interfaces/token.interface";
import { CrmUserPayload } from "./interfaces/crm-user-payload.interface";

@Injectable()
export class CrmAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly crmUsersService: CrmUsersService
    ) {}

    async register(email: string, password: string) {
        const isUserExist = await this.crmUsersService.findOne(email);

        if (isUserExist) {
            throw new BadRequestException(`User with ${email} already exist`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.crmUsersService.create({ email, password: hashedPassword });
    }

    login(payload: CrmUserPayload): Token {
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async validate(email: string, password: string): Promise<CrmUserPayload | null> {
        const user = await this.crmUsersService.findOne(email);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (user && isPasswordMatch) {
            return {
                id: user.id,
                roles: user.roles,
            };
        }

        return null;
    }
}
