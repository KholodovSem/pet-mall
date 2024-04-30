import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { Request as ExpressRequest } from "express";

import { ClientAuthService } from "./client-auth.service";
import { CrmAuthService } from "./crm-auth.service";

import { CrmUserPayload } from "./interfaces/crm-user-payload.interface";

import { RegisterUserDto } from "../common/dtos/register-user.dto";
import { ClientLocalAuthGuard } from "../common/guards/client-local-auth.guard";
import { CrmLocalAuthGuard } from "../common/guards/crm-local-auth.guard";

@Controller()
export class AuthController {
    constructor(
        private readonly clientAuthService: ClientAuthService,
        private readonly crmAuthService: CrmAuthService
    ) {}

    @Post("api/register")
    clientRegister(@Body() { email, password }: RegisterUserDto) {
        return this.clientAuthService.register(email, password);
    }

    @UseGuards(ClientLocalAuthGuard)
    @Post("api/login")
    clientLogin(@Request() req: ExpressRequest) {
        return this.clientAuthService.login(req.user as string);
    }

    @Post("crm/register")
    crmRegister(@Body() { email, password }: RegisterUserDto) {
        return this.crmAuthService.register(email, password);
    }

    @UseGuards(CrmLocalAuthGuard)
    @Post("crm/login")
    crmLogin(@Request() req: ExpressRequest) {
        return this.crmAuthService.login(req.user as CrmUserPayload);
    }
}
