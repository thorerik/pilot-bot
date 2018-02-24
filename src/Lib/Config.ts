import { readFileSync } from "fs";

export class Config {

    public config: {
        checkWXApiToken: string,
        iataCodes: string,
        prefix: string,
        token: string,
        owners: string[],
        webhooks: {
            logs: {
                id: string,
                token: string,
            },
        },
    };
    constructor(configFile: string) {
        const buffer = readFileSync(configFile);
        this.config = JSON.parse(buffer.toString());
    }
}
