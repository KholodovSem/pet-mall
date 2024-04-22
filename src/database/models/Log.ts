import { Schema, model } from "mongoose";
import { PossibleRole, Action, Resource } from "../../common/constants";

interface ILog {
    userId: number;
    roles: PossibleRole[];
    action: Action;
    resource: Resource;
    createdAt: string;
}

const logSchema = new Schema<ILog>({
    userId: {
        type: Number,
        required: true,
    },
    roles: {
        type: [{ type: String, enum: Object.values(PossibleRole) }],
        required: true,
    },
    action: {
        type: String,
        enum: Object.values(Action),
        required: true,
    },
    resource: {
        type: String,
        enum: Object.values(Resource),
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
});

export const Log = model("Log", logSchema);
