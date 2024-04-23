import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { ApiAuthService } from "./api-auth.service";
import { LoginUserDto } from "../../common/dtos/login-user.dto";
import { RegisterUserDto } from "../../common/dtos/register-user.dto";
import { Token } from "../../common/interfaces/token.interface";

@Controller("auth")
export class ApiAuthController {
    constructor(private readonly apiAuthService: ApiAuthService) {}

    @Post("login")
    login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
        return this.apiAuthService.login(loginUserDto);
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    register(@Body() RegisterUserDto: RegisterUserDto): Promise<void> {
        return this.apiAuthService.register(RegisterUserDto);
    }
}
