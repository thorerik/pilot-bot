"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluebird_1 = require("bluebird");
const discord_js_1 = require("discord.js");
const sqlite = require("sqlite");
const Application_1 = require("../Lib/Application");
class Icao {
    constructor() {
        // tslint:disable-next-line:max-line-length
        this.help = "Get ICAO from IATA";
        this.examples = [
            "icao OSL",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
        this.db = sqlite.open("./data/airports.sqlite", { promise: bluebird_1.BBPromise });
    }
    async run(message, args) {
        const App = Application_1.Application.getInstance();
        const IATA = args.shift();
        try {
            const db = await this.db;
            const airport = await db.get('SELECT * FROM airports WHERE IATA LIKE ?', IATA);
            if (airport.ICAO !== "") {
                return message.channel.send(`ICAO for IATA ${IATA}: ${airport.ICAO}`);
            }
        }
        catch (e) {
        }
        message.channel.send(`Sorry, could not find a match for IATA ${IATA}`);
    }
}
exports.Icao = Icao;
