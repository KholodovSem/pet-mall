import { Module } from "@nestjs/common";

import { PostgresProvider } from "./db/postgres.provider";

@Module({
    imports: [PostgresProvider],
})
export class AppProviders {}
