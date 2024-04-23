import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { CrmAuthModule } from "./authentication/crm/crm-auth.module";

@Module({
    imports: [
        CrmAuthModule,
        RouterModule.register([
            {
                path: "crm",
                children: [CrmAuthModule],
            },
        ]),
    ],
})
export class CrmRouter {}
