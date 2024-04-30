declare namespace Express {
    export interface Request {
        user:
            | string
            | {
                  id: string;
                  roles: string[];
              };
    }
}
