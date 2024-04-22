import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { PossibleRole } from "../constants";

export const Roles = (...roles: PossibleRole[]) => SetMetadata("roles", roles);
