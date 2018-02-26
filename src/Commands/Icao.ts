import { BBPromise } from "bluebird";
import { Message, Permissions } from "discord.js";

import * as sqlite from "sqlite";
import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

import { Airport } from "../Lib/Definitions/Airport";

export class Icao implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Get ICAO from IATA";
    public examples = [
        "icao OSL",
    ];

    private db;

    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;

    constructor() {
        this.db = sqlite.open("./data/airports.sqlite", { promise: BBPromise });
    }

    public async run(message: Message, args: string[]) {
        const App = Application.getInstance();

        const IATA = args.shift();
        try {
            const db = await this.db;
            const airport = await db.get('SELECT * FROM airports WHERE IATA LIKE ?', IATA);
            if (airport.ICAO !== "") {
                return message.channel.send(`ICAO for IATA ${IATA}: ${airport.ICAO}`);
            }
        } catch (e) {
        }
        message.channel.send(`Sorry, could not find a match for IATA ${IATA}`);
    }
}
