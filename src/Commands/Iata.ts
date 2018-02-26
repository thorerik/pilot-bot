import { BBPromise } from "bluebird";
import { Message, Permissions } from "discord.js";

import * as sqlite from "sqlite";
import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

import { Airport } from "../Lib/Definitions/Airport";

export class Iata implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Get IATA from ICAO";
    public examples = [
        "iata OSL",
    ];

    private db;

    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;

    constructor() {
        this.db = sqlite.open("./data/airports.sqlite", { promise: BBPromise });
    }

    public async run(message: Message, args: string[]) {
        const App = Application.getInstance();

        const ICAO = args.shift();
        try {
            const db = await this.db;
            const airport = await db.get('SELECT * FROM airports WHERE ICAO LIKE ?', ICAO);
            if (airport.IATA !== "") {
                return message.channel.send(`IATA for ICAO ${ICAO}: ${airport.IATA}`);
            }
        } catch (e) {
        }
        message.channel.send(`Sorry, could not find a match for ICAO ${ICAO}`);
    }
}
