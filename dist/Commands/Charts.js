"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Application_1 = require("../Lib/Application");
class Charts {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Quickly get links to Skyvector by ICAO";
        this.examples = [
            "icao ENGM",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
    }
    async run(message, args) {
        const App = Application_1.Application.getInstance();
        const ICAO = args.shift();
        return message.channel.send(`https://skyvector.com/airport/${ICAO}`);
    }
}
exports.Charts = Charts;
