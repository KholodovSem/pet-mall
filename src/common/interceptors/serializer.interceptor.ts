import { APP_INTERCEPTOR, Reflector } from "@nestjs/core";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";

@Module({
    providers: [
        {
            provide: APP_INTERCEPTOR,
            inject: [Reflector],
            useFactory(reflector: Reflector) {
                return new ClassSerializerInterceptor(reflector, {
                    enableImplicitConversion: true,
                    excludeExtraneousValues: true,
                    excludePrefixes: ["_"],
                });
            },
        },
    ],
})
export class SerializerInterceptor {}
