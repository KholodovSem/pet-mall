import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PassportStrategyType } from "../constants";

@Injectable()
export class CrmJwtAuthGuard extends AuthGuard(PassportStrategyType.CRM_JWT) {}
