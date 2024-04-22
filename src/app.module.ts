import { Module } from "@nestjs/common";

import { ConfigurationModule } from "./config/configuration.module";
import { AppProviders } from "./providers/app.providers";

import { UsersModule } from "./models/users/users.module";

import { SerializerInterceptor } from "./common/interceptors/serializer.interceptor";

@Module({
    imports: [ConfigurationModule, AppProviders, UsersModule],
    providers: [SerializerInterceptor],
})
export class AppModule {}
