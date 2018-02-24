import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

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

        console.log(decoded);

        const data = await snekfetch.get(`${this.apiEndpoint}${ICAO}${this.apiOptions}`);

        if (decoded && typeof decoded === 'string' && decoded === "decoded") {
            let reply = "```";
            reply += `METAR for ${ICAO}`;
            reply += "\n";

            const trans = Object.keys(data.body.Translations);

            trans.forEach((field) => {
                if (field === "Remarks") {
                    const remarks = Object.keys(data.body.Translations[field]);
                    if (remarks.length > 0) {
                        reply += "Remarks: \n";
                        remarks.forEach((remark) => {
                            console.log(field, remark, data.body.Translations[field][remark]);
                            reply += "\t";
                            reply += data.body.Translations[field][remark];
                            reply += "\n";
                        });
                    }
                } else if (data.body.Translations[field] !== "") {
                    reply += `${field}: ${data.body.Translations[field]}`;
                    reply += "\n";
                }
            });

            reply += "```";

            message.channel.send(reply);
        } else {
            message.channel.send(`\`\`\`${data.body["Raw-Report"]}\`\`\``);
        }
    }
}
