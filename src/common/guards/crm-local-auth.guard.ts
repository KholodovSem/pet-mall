import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PassportStrategyType } from "../constants";

@Injectable()
export class CrmLocalAuthGuard extends AuthGuard(PassportStrategyType.CRM_LOCAL) {}
