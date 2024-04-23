import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "../../models/users/users.service";
import { LoginUserDto } from "../../common/dtos/login-user.dto";

import { Token } from "../../common/interfaces/token.interface";
import { ApiTokenPayload } from "./interfaces/api-token-payload";
import { RegisterUserDto } from "../../common/dtos/register-user.dto";

@Injectable()
export class ApiAuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login({ email, password }: LoginUserDto): Promise<Token> {
        const user = await this.usersService.findOne(email);

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            throw new BadRequestException("Invalid email address or password");
        }

        const payload = { id: user.id } satisfies ApiTokenPayload;

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register({ email, password }: RegisterUserDto): Promise<void> {
        const SALT_ROUNDS = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        await this.usersService.create({ email, password: hashedPassword });
    }
}
