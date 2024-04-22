import { Module } from "@nestjs/common";

import { JwtProvider } from "./jwt/jwt.provider";
import { PostgresProvider } from "./db/postgres.provider";

@Module({
    imports: [JwtProvider, PostgresProvider],
})
export class AppProviders {}
