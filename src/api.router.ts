import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ApiAuthModule } from "./authentication/api/api-auth.module";

@Module({
    imports: [
        ApiAuthModule,
        RouterModule.register([
            {
                path: "api",
                children: [ApiAuthModule],
            },
        ]),
    ],
})
export class ApiRouter {}
