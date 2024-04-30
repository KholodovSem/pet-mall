export enum PossibleRole {
    ADMIN = "admin",
    MANAGER = "manager",
}

export enum Action {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
}

export enum Resource {
    PRODUCT = "product",
    MANUFACTURER = "manufacturer",
    PURPOSE = "purpose",
    TAG = "tag",
    USER = "user",
}

export enum PassportStrategyType {
    CLIENT_LOCAL = "client-local",
    CRM_LOCAL = "crm-local",
    CLIENT_JWT = "client-jwt",
    CRM_JWT = "crm-jwt",
}
