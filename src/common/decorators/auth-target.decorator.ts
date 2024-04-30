import { SetMetadata } from "@nestjs/common";

export enum PossibleAuthTarget {
    CLIENT = "client",
    CRM = "crm",
}

export const AUTH_DECORATOR_KEY = "auth_decorator_token";
export const AuthTarget = (target: PossibleAuthTarget) =>
    SetMetadata<typeof AUTH_DECORATOR_KEY, PossibleAuthTarget>(AUTH_DECORATOR_KEY, target);
