export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ValidationError extends Error {
    public errors: string[] = [];
    constructor(errors: string[]) {
        super("validation error");
        this.name = this.constructor.name;
        this.errors = errors;
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InternalError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ConnectError extends Error {
    constructor(
        message: string,
        public statusCode: string,
        public connectId: string,
        public connectedBy?: string | null,
        public originalError?: Error
    ) {
        super(message);
        this.name = this.constructor.name;
    }
}
