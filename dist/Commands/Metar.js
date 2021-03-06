"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const snekfetch = require("snekfetch");
const Application_1 = require("../Lib/Application");
class Metar {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Get METAR for <ICAO> and optionally [decoded]";
        this.examples = [
            "metar ENGM",
            "metar ENGM decoded",
        ];
        this.apiEndpoint = "https://avwx.rest/api/metar/";
        this.apiOptions = "?options=translate,summary,speech,info";
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
    }
    async run(message, args) {
        const App = Application_1.Application.getInstance();
        const ICAO = args.shift();
        const decoded = args.shift();
        const data = await snekfetch.get(`${this.apiEndpoint}${ICAO}${this.apiOptions}`);
        const METAR = data.body;
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
                }
                else if (METAR.Translations[field] !== "") {
                    reply += `${field}: ${METAR.Translations[field]}`;
                    reply += "\n";
                }
            });
            reply += "```";
            message.channel.send(reply);
        }
        else {
            message.channel.send(`\`\`\`${METAR["Raw-Report"]}\`\`\``);
        }
    }
}
exports.Metar = Metar;
