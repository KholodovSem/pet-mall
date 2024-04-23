import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PassportLocalStrategy } from "./common/constants";

@Controller()
export class AppController {
    @UseGuards(AuthGuard(PassportLocalStrategy.CLIENT))
    @Post("auth/login")
    async login(@Request() req: any) {
        return req.user;
    }
}
