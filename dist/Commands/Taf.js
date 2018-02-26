"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// type=""
const discord_js_1 = require("discord.js");
const snekfetch = require("snekfetch");
const Application_1 = require("../Lib/Application");
class Taf {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Get TAF for <ICAO>";
        this.examples = [
            "taf ENGM",
        ];
        this.apiEndpoint = "https://avwx.rest/api/taf/";
        this.apiOptions = "?options=translate,summary,speech,info";
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
    }
    async run(message, args) {
        const App = Application_1.Application.getInstance();
        const ICAO = args.shift();
        const data = await snekfetch.get(`${this.apiEndpoint}${ICAO}${this.apiOptions}`);
        const TAF = data.body;
        // Sort the response
        const sorted = TAF.Forecast.sort((a, b) => { return +a["End-Time"] - +b["End-Time"]; });
        let reply = "```";
        reply += `TAF for ${ICAO}`;
        reply += "\n";
        sorted.forEach((forecast) => {
            reply += `From ${forecast["Start-Time"]} to ${forecast["End-Time"]}`;
            reply += "\n";
            reply += `${forecast.Summary}`;
            reply += "\n\n";
        });
        reply += "```";
        message.channel.send(reply);
    }
}
exports.Taf = Taf;
