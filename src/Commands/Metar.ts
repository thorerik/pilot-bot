import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

import {MetarData} from "MetarData";

export class Metar implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Get METAR for <ICAO> and optionally [decoded]";
    public examples = [
        "metar ENGM",
        "metar ENGM decoded",
    ];

    private apiEndpoint = "https://avwx.rest/api/metar/";
    private apiOptions = "?options=translate,summary,speech,info";

    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;

    public async run(message: Message, args: string[]) {
        const App = Application.getInstance();
        
        const ICAO = args.shift();
        const decoded = args.shift();

        const data = await snekfetch.get(`${this.apiEndpoint}${ICAO}${this.apiOptions}`);
        const METAR: MetarData = data.body;

        if (decoded && typeof decoded === 'string' && decoded === "decoded") {
            let reply = "```";
            reply += `METAR for ${ICAO}`;
            reply += "\n";

            const trans = Object.keys(METAR.Translations);

            trans.forEach((field) => {
                if (field === "Remarks") {
                    const remarks = Object.keys(METAR.Translations[field]);
                    if (remarks.length > 0) {
                        reply += "Remarks: \n";
                        remarks.forEach((remark) => {
                            reply += "\t";
                            reply += METAR.Translations[field][remark];
                            reply += "\n";
                        });
                    }
                } else if (METAR.Translations[field] !== "") {
                    reply += `${field}: ${METAR.Translations[field]}`;
                    reply += "\n";
                }
            });

            reply += "```";

            message.channel.send(reply);
        } else {
            message.channel.send(`\`\`\`${METAR["Raw-Report"]}\`\`\``);
        }
    }
}
