import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypt from "bcrypt";

import { Token } from "../common/interfaces/token.interface";

import { UsersService } from "../models/users/users.service";

@Injectable()
export class ClientAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async register(email: string, password: string) {
        const isUserExist = await this.usersService.findOne(email);

        if (isUserExist) {
            throw new BadRequestException(`User with ${email} already exist`);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.usersService.create({ email, password: hashedPassword });
    }

    login(id: string): Token {
        return {
            access_token: this.jwtService.sign(id),
        };
    }

    async validate(email: string, password: string) {
        const user = await this.usersService.findOne(email);
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (user && isPasswordMatch) {
            return user.id;
        }

        return null;
    }
}
