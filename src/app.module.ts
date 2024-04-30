import { Module } from "@nestjs/common";

import { ConfigurationModule } from "./config/configuration.module";
import { AppProviders } from "./providers/app.providers";

import { SerializerInterceptor } from "./common/interceptors/serializer.interceptor";
import { AuthModule } from "./authentication/auth.module";

@Module({
    imports: [ConfigurationModule, AppProviders, AuthModule],
    providers: [SerializerInterceptor],
})
export class AppModule {}
