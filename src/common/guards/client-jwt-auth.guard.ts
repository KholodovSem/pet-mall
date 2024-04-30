import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PassportStrategyType } from "../constants";

@Injectable()
export class ClientJwtAuthGuard extends AuthGuard(PassportStrategyType.CLIENT_JWT) {}
