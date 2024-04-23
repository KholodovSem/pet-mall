import { Module } from "@nestjs/common";

import { ConfigurationModule } from "./config/configuration.module";
import { AppProviders } from "./providers/app.providers";

import { ApiRouter } from "./api.router";
import { CrmRouter } from "./crm.router";

import { SerializerInterceptor } from "./common/interceptors/serializer.interceptor";
import { AuthModule } from "./authentication/auth.module";
import { AppController } from "./app.controller";

@Module({
    imports: [ConfigurationModule, AppProviders, AuthModule, ApiRouter, CrmRouter],
    controllers: [AppController],
    providers: [SerializerInterceptor],
})
export class AppModule {}
