import { PossibleRole } from "../../../common/constants";

export interface ICrmUser {
    email: string;
    password: string;
    roles: PossibleRole[];
}
