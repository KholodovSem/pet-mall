import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return {
                    name: configService.get("postgres.name"),
                    host: configService.get("postgres.host"),
                    port: configService.get("postgres.port"),
                    username: configService.get("postgres.username"),
                    password: configService.get("postgres.password"),
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
    ],
})
export class PostgresProvider {}
