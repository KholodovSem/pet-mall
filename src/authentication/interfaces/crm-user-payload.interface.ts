import { PossibleRole } from "../../common/constants";

export type CrmUserPayload = {
    id: string;
    roles: PossibleRole[];
};
