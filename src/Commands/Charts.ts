import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

export class Charts implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Quickly get links to Skyvector by ICAO";
    public examples = [
        "icao ENGM",
    ];

    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;

    public async run(message: Message, args: string[]) {
        const App = Application.getInstance();

        const ICAO = args.shift();
        return message.channel.send(`https://skyvector.com/airport/${ICAO}`);
    }
}
